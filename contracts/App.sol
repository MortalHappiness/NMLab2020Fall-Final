// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.8.0;
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts/math/SafeMath.sol";

contract App {
  using SafeMath for uint256;

  struct Answer {
    string text;
    uint256 upVotes;
    uint256 downVotes;
  }

  struct Post {
    string text;
    Answer[] answers;
  }

  Post[] private _posts;

  function getPosts() external view returns (string[] memory) {
    string[] memory postTexts = new string[](_posts.length);
    for (uint256 i = 0; i < _posts.length; ++i) {
      postTexts[i] = _posts[i].text;
    }
    return postTexts;
  }

  function addPost(string memory _text) external {
    Post storage post = _posts.push();
    post.text = _text;
  }

  function getAnswers(uint256 postIdx) external view returns (Answer[] memory) {
    require(postIdx < _posts.length);
    return _posts[postIdx].answers;
  }

  function addAnswer(uint256 postIdx, string memory _text) external {
    require(postIdx < _posts.length);
    _posts[postIdx].answers.push(Answer(_text, 0, 0));
  }

  function increaseUpVotes(uint256 postIdx, uint256 ansIdx) external {
    require(postIdx < _posts.length);
    require(ansIdx < _posts[postIdx].answers.length);
    Answer storage answer = _posts[postIdx].answers[ansIdx];
    answer.upVotes = answer.upVotes.add(1);
  }

  function increaseDownVotes(uint256 postIdx, uint256 ansIdx) external {
    require(postIdx < _posts.length);
    require(ansIdx < _posts[postIdx].answers.length);
    Answer storage answer = _posts[postIdx].answers[ansIdx];
    answer.downVotes = answer.downVotes.add(1);
  }
}
