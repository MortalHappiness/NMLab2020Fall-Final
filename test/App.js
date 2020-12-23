const App = artifacts.require("./App.sol");

contract("App", (accounts) => {
  it("test addPost and getPosts", async () => {
    const instance = await App.deployed();

    await instance.addPost("title", "content", 100, ["a"]);
    const posts = await instance.getPosts();

    assert.equal(posts.length, 1, "posts.length must be 1");
    assert.equal(posts[0].author, accounts[0], "posts.author is wrong");
    assert.equal(posts[0].title, "title", "posts.title is wrong");
    assert.equal(posts[0].content, "content", "posts.content is wrong");
    assert.equal(posts[0].tags[0], "a", "posts.tags is wrong");
    assert.equal(posts[0].tokens, 100, "posts.tokens is wrong");
  });
  //it("test addAnswer and getAnswers", async () => {
  //  const instance = await App.deployed();

  //  await instance.addAnswer(0, "ans0");
  //  const answers = await instance.getAnswers(0);

  //  assert.equal(answers.length, 1, "answers.length must be 1");
  //  assert.equal(answers[0].text, "ans0", "text must be 'ans0'");
  //  assert.equal(answers[0].upVotes, 0, "upVotes must be 0");
  //  assert.equal(answers[0].downVotes, 0, "downVotes must be 0");
  //});
  //it("test increaseUpVotes", async () => {
  //  const instance = await App.deployed();

  //  await instance.increaseUpVotes(0, 0);
  //  const answers = await instance.getAnswers(0);

  //  assert.equal(answers.length, 1, "answers.length must be 1");
  //  assert.equal(answers[0].upVotes, 1, "upVotes must be 1");
  //});
});
