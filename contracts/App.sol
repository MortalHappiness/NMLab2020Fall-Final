// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.8.0;
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts/math/SafeMath.sol";

contract App {
  using SafeMath for uint256;

  struct Post {
    address author;
    string title;
    string content;
    uint256[] answerIds;
    string[] tags;
    uint256 tokens;
    uint256 timestamp;
  }

  struct Answer {
    address author;
    string content;
    uint256 upVotes;
    uint256 downVotes;
    uint256 timestamp;
    uint256 parentPostId;
  }

  struct User {
    uint256 tokens;
    uint256[] postIds;
    uint256[] issuedAnswerIds;
    uint256[] upVotedAnswerIds;
    uint256[] downVotedAnswerIds;
  }

  // ========================================

  Post[] private _posts;
  Answer[] private _answers;
  User[] private _users;
  mapping (address => uint256) private _userIds;

  uint256 constant MIN_POST_CREATE_FEE = 20;

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

  function getPosts() external view returns (Post[] memory) {
    return _posts;
  }

  function getPostsByIds(uint256[] memory postIds
                        ) external view returns (Post[] memory) {
    Post[] memory posts = new Post[](postIds.length);
    for (uint256 i = 0; i < postIds.length; ++i) {
      uint256 postId = postIds[i];
      require(postId < _posts.length);
      posts[i] = _posts[postId];
    }
    return posts;
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

  function getAnswers(uint256 postId) external view returns (Answer[] memory) {
    require(postId < _posts.length);
    uint256[] memory answerIds = _posts[postId].answerIds;
    Answer[] memory answers = new Answer[](answerIds.length);
    for (uint256 i = 0; i < answerIds.length; ++i) {
      uint256 answerId = answerIds[i];
      require(answerId < _answers.length);
      answers[i] = _answers[answerId];
    }
    return answers;
  }

  function getAnswersByIds(uint256[] memory answerIds
                          ) external view returns (Answer[] memory) {
    Answer[] memory answers = new Answer[](answerIds.length);
    for (uint256 i = 0; i < answerIds.length; ++i) {
      uint256 answerId = answerIds[i];
      require(answerId < _answers.length);
      answers[i] = _answers[answerId];
    }
    return answers;
  }

  //function increaseUpVotes(uint256 postIdx, uint256 ansIdx) external {
  //  require(postIdx < _posts.length);
  //  require(ansIdx < _posts[postIdx].answers.length);
  //  Answer storage answer = _posts[postIdx].answers[ansIdx];
  //  answer.upVotes = answer.upVotes.add(1);
  //}

  //function increaseDownVotes(uint256 postIdx, uint256 ansIdx) external {
  //  require(postIdx < _posts.length);
  //  require(ansIdx < _posts[postIdx].answers.length);
  //  Answer storage answer = _posts[postIdx].answers[ansIdx];
  //  answer.downVotes = answer.downVotes.add(1);
  //}
}
