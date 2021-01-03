import React, { useState, useEffect, createContext } from "react";
import AppContract from "./contracts/App.json";
import getWeb3 from "./utils/getWeb3";

const Web3Context = createContext(null);

export { Web3Context };

export default ({ children }) => {
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState(null);
  const [contract, setContract] = useState(null);

  useEffect(async () => {
    try {
      const web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = AppContract.networks[networkId];
      const instance = new web3.eth.Contract(
        AppContract.abi,
        deployedNetwork && deployedNetwork.address
      );
      console.log(accounts, networkId, deployedNetwork, instance);

      setWeb3(web3);
      setAccounts(accounts);
      setContract(instance);
    } catch (error) {
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.error(error);
    }
  }, []);

  return (
    <Web3Context.Provider value={{ web3, accounts, contract }}>
      {children}
    </Web3Context.Provider>
  );
};
