import React, { useState, useEffect, createContext } from "react";
import ContractAPI from "./contractApi";

const ContractContext = createContext(null);

export { ContractContext };

export default ({ children }) => {
  const [contractApi, setContractApi] = useState(null);

  useEffect(() => {
    try {
      const api = new ContractAPI();
      setContractApi(api);
    } catch (error) {
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.error(error);
    }
  }, []);

  return (
    <ContractContext.Provider value={contractApi}>
      {children}
    </ContractContext.Provider>
  );
};
