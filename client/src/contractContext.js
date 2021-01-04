import React, { useState, useEffect, createContext } from "react";
import ContractAPI from "./contractApi";

const ContractContext = createContext(null);

export { ContractContext };

export default ({ children }) => {
  const [contractAPI, setContractAPI] = useState(null);

  useEffect(async () => {
    const api = new ContractAPI();
    await api.init();
    setContractAPI(api);
  }, []);
  return (
    <ContractContext.Provider value={contractAPI}>
      {children}
    </ContractContext.Provider>
  );
};
