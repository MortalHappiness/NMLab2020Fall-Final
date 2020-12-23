// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.8.0;
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts/math/SafeMath.sol";

contract App {
  using SafeMath for uint256;

  // ========================================
  // Constants

  uint256 constant MIN_POST_CREATE_FEE = 20;

  // ========================================
  // Struct definitions

  // A "View" is a representation of the original struct that hides the
  // implementation details and can be safely passed to frontend

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
  // View conversion functions

  function toPostView(Post memory post
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

  function toAnswerView(Answer memory answer
                       ) internal pure returns (AnswerView memory) {
    AnswerView memory answerView;

    answerView.author = answer.author;
    answerView.content = answer.content;
    answerView.upVotes = answer.upVotes;
    answerView.downVotes = answer.downVotes;
    answerView.timestamp = answer.timestamp;

    return answerView;
  }

  // ========================================

  function addPost(string memory title,
                   string memory content,
                   uint256 tokens,
                   string[] memory tags
                  ) external {
    require(tokens >= MIN_POST_CREATE_FEE);
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
      postViews[i] = toPostView(_posts[i]);
    }
    return postViews;
  }

  function getPostsByIds(uint256[] memory postIds
                        ) external view returns (PostView[] memory) {
    PostView[] memory postViews = new PostView[](postIds.length);
    for (uint256 i = 0; i < postIds.length; ++i) {
      uint256 postId = postIds[i];
      require(postId < _posts.length);
      postViews[i] = toPostView(_posts[postId]);
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
      answerViews[i] = toAnswerView(_answers[answerId]);
    }
    return answerViews;
  }

  function getAnswersByIds(uint256[] memory answerIds
                          ) external view returns (AnswerView[] memory) {
    AnswerView[] memory answerViews = new AnswerView[](answerIds.length);
    for (uint256 i = 0; i < answerIds.length; ++i) {
      uint256 answerId = answerIds[i];
      require(answerId < _answers.length);
      answerViews[i] = toAnswerView(_answers[answerId]);
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
}
