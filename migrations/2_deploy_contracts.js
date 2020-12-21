const SimpleStorage = artifacts.require("./SimpleStorage.sol");
const App = artifacts.require("./App.sol");

module.exports = function (deployer) {
  deployer.deploy(SimpleStorage);
  deployer.deploy(App);
};
