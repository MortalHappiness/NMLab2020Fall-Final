const App = artifacts.require("./App.sol");

contract("App", (accounts) => {
  it("test addPost and getPosts", async () => {
    const instance = await App.deployed();

    await instance.addPost("post0");
    await instance.addPost("post1");
    const posts = await instance.getPosts();

    assert.equal(posts.length, 2, "posts.length must be 2");
    assert.equal(posts[0], "post0", "posts[0] must be 'post0'");
    assert.equal(posts[1], "post1", "posts[1] must be 'post1'");
  });
  it("test addAnswer and getAnswers", async () => {
    const instance = await App.deployed();

    await instance.addAnswer(0, "ans0");
    const answers = await instance.getAnswers(0);

    assert.equal(answers.length, 1, "answers.length must be 1");
    assert.equal(answers[0].text, "ans0", "text must be 'ans0'");
    assert.equal(answers[0].upVotes, 0, "upVotes must be 0");
    assert.equal(answers[0].downVotes, 0, "downVotes must be 0");
  });
  it("test increaseUpVotes", async () => {
    const instance = await App.deployed();

    await instance.increaseUpVotes(0, 0);
    const answers = await instance.getAnswers(0);

    assert.equal(answers.length, 1, "answers.length must be 1");
    assert.equal(answers[0].upVotes, 1, "upVotes must be 1");
  });
});
