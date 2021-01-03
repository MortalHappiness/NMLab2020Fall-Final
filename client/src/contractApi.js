import AppContract from "./contracts/App.json";
import getWeb3 from "./utils/getWeb3";

class ContractAPI {
  constructor() {
    this.web3 = null;
    this.accounts = null;
    this.networkId = null;
    this.deployedNetwork = null;
    this.contract = null;

    this.gas = 1000000;

    // constant
    this.ACCOUNT_CREATE_EHTER_FEE = null;
    this.TOKEN_VALUE = null;
    this.INIT_TOKENS = null;
    this.MIN_POST_CREATE_TOKEN_FEE = null;

    this.init();
    this.initConstant();
  }

  // initialize function
  async init() {
    this.web3 = await getWeb3();
    this.accounts = await this.web3.eth.getAccounts();
    this.networkId = await this.web3.eth.net.getId();
    this.deployedNetwork = AppContract.networks[this.networkId];
    this.contract = new this.web3.eth.Contract(
      AppContract.abi,
      this.deployedNetwork && this.deployedNetwork.address
    );
    console.log(this.web3, this.accounts, this.networkId, this.contract);
  }

  async initConstant() {
    this.ACCOUNT_CREATE_EHTER_FEE = await this.getAccountCreateEtherFee();
    this.TOKEN_VALUE = await this.getTokenValue();
    this.INIT_TOKENS = await this.getInitTokens();
    this.MIN_POST_CREATE_TOKEN_FEE = await this.getMinPostCreateTokenFee();
    console.log(
      this.ACCOUNT_CREATE_EHTER_FEE,
      this.TOKEN_VALUE,
      this.INIT_TOKENS,
      this.MIN_POST_CREATE_TOKEN_FEE
    );
  }

  // getter function
  getAccountCreateEtherFee() {
    return this.contract.methods.getAccountCreateEtherFee().call();
  }

  getTokenValue() {
    return this.contract.methods.getTokenValue().call();
  }

  getInitTokens() {
    return this.contract.methods.getInitTokens().call();
  }

  getMinPostCreateTokenFee() {
    return this.contract.methods.getMinPostCreateTokenFee().call();
  }

  // mutate function
  addPost(title, content, tokens, tags) {
    // assert(tokens > this.MIN_POST_CREATE_TOKEN_FEE);
    return this.contract.methods
      .addPost(title, content, tokens, tags)
      .send({ from: this.accounts[0], gas: this.gas });
  }

  getPosts() {
    return this.contract.methods.getPosts().call();
  }

  getPostsByIds(postIds) {
    // array
    return this.contract.methods.getPostsByIds(postIds).call();
  }

  addAnswer(postId, content) {
    return this.contract.methods
      .addAnswer(postId, content)
      .send({ from: this.accounts[0], gas: this.gas });
  }

  getAnswers(postId) {
    return this.contract.methods.getAnswers(postId).call();
  }

  getAnswersByIds(answerIds) {
    // array
    return this.contract.methods.getAnswersByIds(answerIds).call();
  }

  increaseUpVotes(answerId) {
    return this.contract.methods
      .increaseUpVotes(answerId)
      .send({ from: this.accounts[0], gas: this.gas });
  }

  increaseDownVotes(answerId) {
    return this.contract.methods
      .increaseDownVotes(answerId)
      .send({ from: this.accounts[0], gas: this.gas });
  }

  createAccount() {
    return this.contract.methods.createAccount().send({
      from: this.accounts[0],
      value: this.AccountCreateEtherFee,
      gas: this.gas,
    });
  }

  getAccountInfo() {
    return this.contract.methods.getAccountInfo().call();
  }

  ether2token() {
    return this.contract.methods.ether2token().call().send({
      from: this.accounts[0],
      gas: this.gas,
    });
  }

  token2ether(tokens) {
    return this.contract.methods.token2ether(tokens).call();
  }
}

export default ContractAPI;
