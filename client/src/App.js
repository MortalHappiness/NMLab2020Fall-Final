import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { HashRouter, Switch, Route } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import store from "./store";
import AppBar from "./components/appBar";
import Main from "./features/pages/mainPage";
import PostPage from "./features/pages/postPage";
import UserPage from "./features/pages/userPage";

import Web3Provider from "./Web3";
import ContractProvider from "./contractContext";

import "./App.css";

const theme = createMuiTheme({
  typography: {
    // In Chinese and Japanese the characters are usually larger,
    // so a smaller fontsize may be appropriate.
    h1: {
      fontSize: "2rem",
    },
    h2: {
      fontSize: "1.5rem",
    },
    h3: {
      fontSize: "1.1rem",
    },
    h4: {
      fontSize: "1rem",
    },
    h5: {
      fontSize: "0.8rem",
    },
    h6: {
      fontSize: "0.6rem",
    },
    fontSize: 16,
  },
  palette: {
    type: "light",
    primary: {
      main: "#006AC7",
    },
  },
});

function MyRoute() {
  return (
    <HashRouter basename={process.env.PUBLIC_URL}>
      <AppBar />
      <Switch>
        <Route path="/post/:postid">
          <PostPage />
        </Route>
        <Route path="/user/:userid">
          <UserPage />
        </Route>
        <Route path="/">
          <Main />
        </Route>
      </Switch>
    </HashRouter>
  );
}

function App() {
  return (
    <Provider store={store}>
      <ContractProvider>
        {/* <Web3Provider> */}
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <MyRoute />
        </ThemeProvider>
        {/* </Web3Provider> */}
      </ContractProvider>
    </Provider>
  );
}

export default App;
