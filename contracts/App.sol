// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.8.0;
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts/math/SafeMath.sol";

contract App {
  using SafeMath for uint256;

  // ========================================
  // Constants

  uint256 constant ACCOUNT_CREATE_EHTER_FEE = 0.001 ether;
  uint256 constant TOKEN_VALUE = 0.000001 ether;
  uint256 constant INIT_TOKENS = 500;
  uint256 constant MIN_POST_CREATE_TOKEN_FEE = 100;

  // ========================================
  // Events

  // ========================================
  // Struct definitions

  // A "View" is a representation of the original struct that hides the
  // implementation details and can be cleanly passed to frontend

  struct Post {
    address author;
    string title;
    string content;
    uint256[] answerIds;
    string[] tags;
    uint256 tokens;
    uint256 timestamp;
  }

  struct PostView {
    address author;
    string title;
    string content;
    string[] tags;
    uint256 tokens;
    uint256 timestamp;
  }

  struct Answer {
    address author;
    string content;
    mapping (address => bool) votesMap;
    uint256 upVotes;
    uint256 downVotes;
    uint256 timestamp;
    uint256 parentPostId;
  }

  struct AnswerView {
    address author;
    string content;
    uint256 upVotes;
    uint256 downVotes;
    uint256 timestamp;
  }

  struct User {
    uint256 id;
    address userAddress;
    uint256 tokens;
    uint256[] postIds;
    uint256[] issuedAnswerIds;
    uint256[] upVotedAnswerIds;
    uint256[] downVotedAnswerIds;
  }

  struct UserView {
    uint256 id;
    address userAddress;
    uint256 tokens;
    uint256[] postIds;
    uint256[] issuedAnswerIds;
    uint256[] upVotedAnswerIds;
    uint256[] downVotedAnswerIds;
  }

  // ========================================
  // Members

  Post[] private _posts;
  Answer[] private _answers;
  User[] private _users;
  mapping (address => uint256) private _userIds;

  // ========================================
  // Constructor

  constructor() public {
    // Add a null user
    _users.push();
  }

  // ========================================
  // View conversion functions

  function _toPostView(Post memory post
                      ) internal pure returns (PostView memory) {
    PostView memory postView;

    postView.author = post.author;
    postView.title = post.title;
    postView.content = post.content;
    postView.tags = post.tags;
    postView.tokens = post.tokens;
    postView.timestamp = post.timestamp;

    return postView;
  }

  function _toAnswerView(Answer memory answer
                        ) internal pure returns (AnswerView memory) {
    AnswerView memory answerView;

    answerView.author = answer.author;
    answerView.content = answer.content;
    answerView.upVotes = answer.upVotes;
    answerView.downVotes = answer.downVotes;
    answerView.timestamp = answer.timestamp;

    return answerView;
  }

  function _toUserView(User memory user
                      ) internal pure returns (UserView memory) {
    UserView memory userView;

    userView.id = user.id;
    userView.userAddress = user.userAddress;
    userView.tokens = user.tokens;
    userView.postIds = user.postIds;
    userView.issuedAnswerIds = user.issuedAnswerIds;
    userView.upVotedAnswerIds = user.upVotedAnswerIds;
    userView.downVotedAnswerIds = user.downVotedAnswerIds;

    return userView;
  }

  // ========================================
  // Modifiers

  // ========================================
  // Constant getter functions

  function getAccountCreateEtherFee() external pure returns (uint256) {
    return ACCOUNT_CREATE_EHTER_FEE;
  }

  function getTokenValue() external pure returns (uint256) {
    return TOKEN_VALUE;
  }

  function getInitTokens() external pure returns (uint256) {
    return INIT_TOKENS;
  }

  function getMinPostCreateTokenFee() external pure returns (uint256) {
    return MIN_POST_CREATE_TOKEN_FEE;
  }

  // ========================================
  // External functions

  function addPost(string memory title,
                   string memory content,
                   uint256 tokens,
                   string[] memory tags
                  ) external {
    require(tokens >= MIN_POST_CREATE_TOKEN_FEE,
           "Tokens must be greater than MIN_POST_CREATE_TOKEN_FEE");
    Post storage post = _posts.push();
    post.author = msg.sender;
    post.title = title;
    post.content = content;
    post.tokens = tokens;
    post.tags = tags;
    post.timestamp = now;
  }

  function getPosts() external view returns (PostView[] memory) {
    PostView[] memory postViews = new PostView[](_posts.length);
    for (uint256 i = 0; i < _posts.length; ++i) {
      postViews[i] = _toPostView(_posts[i]);
    }
    return postViews;
  }

  function getPostsByIds(uint256[] memory postIds
                        ) external view returns (PostView[] memory) {
    PostView[] memory postViews = new PostView[](postIds.length);
    for (uint256 i = 0; i < postIds.length; ++i) {
      uint256 postId = postIds[i];
      require(postId < _posts.length);
      postViews[i] = _toPostView(_posts[postId]);
    }
    return postViews;
  }

  function addAnswer(uint256 postId, string memory content) external {
    require(postId < _posts.length);
    _posts[postId].answerIds.push(_answers.length);
    Answer storage answer = _answers.push();
    answer.author = msg.sender;
    answer.content = content;
    answer.timestamp = now;
    answer.parentPostId = postId;
  }

  function getAnswers(uint256 postId
                     ) external view returns (AnswerView[] memory) {
    require(postId < _posts.length);
    uint256[] memory answerIds = _posts[postId].answerIds;
    AnswerView[] memory answerViews = new AnswerView[](answerIds.length);
    for (uint256 i = 0; i < answerIds.length; ++i) {
      uint256 answerId = answerIds[i];
      require(answerId < _answers.length);
      answerViews[i] = _toAnswerView(_answers[answerId]);
    }
    return answerViews;
  }

  function getAnswersByIds(uint256[] memory answerIds
                          ) external view returns (AnswerView[] memory) {
    AnswerView[] memory answerViews = new AnswerView[](answerIds.length);
    for (uint256 i = 0; i < answerIds.length; ++i) {
      uint256 answerId = answerIds[i];
      require(answerId < _answers.length);
      answerViews[i] = _toAnswerView(_answers[answerId]);
    }
    return answerViews;
  }

  function increaseUpVotes(uint256 answerId) external {
    require(answerId < _answers.length);
    Answer storage answer = _answers[answerId];
    require(answer.votesMap[msg.sender] == false);
    answer.votesMap[msg.sender] = true;
    answer.upVotes = answer.upVotes.add(1);
  }

  function increaseDownVotes(uint256 answerId) external {
    require(answerId < _answers.length);
    Answer storage answer = _answers[answerId];
    require(answer.votesMap[msg.sender] == false);
    answer.votesMap[msg.sender] = true;
    answer.downVotes = answer.downVotes.add(1);
  }

  function createAccount() external payable {
    require(msg.value == ACCOUNT_CREATE_EHTER_FEE,
           "The ether you paid is not equal to ACCOUNT_CREATE_EHTER_FEE");
    require(_users[_userIds[msg.sender]].userAddress == address(0),
           "You have already have an account");
    uint256 userId = _users.length;
    User storage user = _users.push();
    user.id = userId;
    user.userAddress = msg.sender;
    user.tokens = INIT_TOKENS;
    _userIds[msg.sender] = userId;
  }

  function getAccountInfo() external view returns (UserView memory) {
    User memory user = _users[_userIds[msg.sender]];
    require(user.userAddress == msg.sender,
           "You have no account yet");
    return _toUserView(user);
  }

  function ether2token() external payable {
    require(msg.value >= TOKEN_VALUE,
           "The ether you paid is less than TOKEN_VALUE");
    User storage user = _users[_userIds[msg.sender]];
    require(user.userAddress == msg.sender,
           "You have no account yet");
    uint token = msg.value.div(TOKEN_VALUE);
    user.tokens = user.tokens.add(token);
  }

  function token2ether(uint256 token) external {
    User storage user = _users[_userIds[msg.sender]];
    require(user.userAddress == msg.sender,
           "You have no account yet");
    uint256 money = token.mul(TOKEN_VALUE);
    require(user.tokens >= token,
           "You don't have enough tokens");
    user.tokens = user.tokens.sub(token);
    msg.sender.transfer(money);
  }
}
