import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import store from "./store";
import Main from "./features/main";

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
    // primary: {
    // main: "#3282b8",
    // dark: "#3282b8",
    // },
    // secondary: {
    //   // light: "#63a4ff",
    //   main: "#bbe1fa",
    //   // dark: "#bbe1fa",
    //   // contrastText: "#fff",
    // },
    // background: {
    //   paper: "#292929",
    //   default: "#121212",
    // },
  },
});

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Switch>
            <Route path="/">
              <Main />
            </Route>
          </Switch>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
