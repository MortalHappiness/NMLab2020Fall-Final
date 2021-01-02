const truffleAssert = require("truffle-assertions");
const App = artifacts.require("./App.sol");
const BN = web3.utils.BN;

contract("App", (accounts) => {
  it("test getAccountInfo before createAccount", async () => {
    const instance = await App.deployed();

    truffleAssert.reverts(instance.getAccountInfo(), "You have no account yet");
  });
  it("test createAccount with no value", async () => {
    const instance = await App.deployed();

    truffleAssert.reverts(
      instance.createAccount(),
      "The ether you paid is not equal to ACCOUNT_CREATE_EHTER_FEE"
    );
  });
  it("test getAccountInfo after createAccount", async () => {
    const instance = await App.deployed();
    const ACCOUNT_CREATE_EHTER_FEE = await instance.getAccountCreateEtherFee();
    const INIT_TOKENS = await instance.getInitTokens();
    await instance.createAccount({ value: ACCOUNT_CREATE_EHTER_FEE });
    const account = await instance.getAccountInfo();
    assert.equal(account.id, "1");
    assert.equal(account.userAddress, accounts[0]);
    assert.equal(account.tokens, INIT_TOKENS);
  });
  it("test ether2token", async () => {
    const instance = await App.deployed();
    const TOKEN_VALUE = await instance.getTokenValue();
    let account = await instance.getAccountInfo();
    const { tokens } = account;
    const value = web3.utils.toWei("1");
    await instance.ether2token({ value });
    account = await instance.getAccountInfo();
    const newTokens = new BN(tokens).add(
      new BN(value).div(new BN(TOKEN_VALUE))
    );
    assert.equal(account.tokens, newTokens.toString());
  });
  it("test token2ether", async () => {
    const instance = await App.deployed();
    const TOKEN_VALUE = await instance.getTokenValue();
    let account = await instance.getAccountInfo();
    const { tokens } = account;
    await instance.token2ether(100);
    account = await instance.getAccountInfo();
    const newTokens = new BN(tokens).sub(new BN(100));
    assert.equal(account.tokens, newTokens.toString());
  });
});
