import React from "react";
import { Provider } from "react-redux";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { UseWalletProvider } from "use-wallet";
import BanksProvider from "./contexts/Banks";
import BasisCashProvider from "./contexts/BasisCashProvider";
import Page from "./components/Page";

import Home from "./views/Home";
import Coin from "./views/Coin";
import Mine from "./views/Mine";
import MinePool from "./views/MinePool";
import ITankDetail from "./views/ITankDetail";
import ITank from "./views/ITank";
import Exchange from "./views/Exchange";
import Barn from "./views/Barn";

import store from "./state";
import theme from "./theme";
import config from "./config";
import Updaters from "./state/Updaters";

const App: React.FC = () => {
  return (
    <Providers>
      <Router>
        <Switch>
          <Page>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/coin" exact>
              <Coin />
            </Route>
            <Route path="/mine" exact>
              <Mine />
            </Route>
            <Route path="/mine/pool" exact>
              <MinePool />
            </Route>
            <Route path="/exchange" exact>
              <Exchange />
            </Route>
            <Route path="/barn/detail" exact>
              <Barn />
            </Route>
            <Route path="/itank" exact>
              <ITank />
            </Route>
            <Route path="/itank/detail" exact>
              <ITankDetail />
            </Route>
        
            
          </Page>
        </Switch>
      </Router>
    </Providers>
  );
};

const Providers: React.FC = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <UseWalletProvider chainId={config.chainId}>
        <Provider store={store}>
          <Updaters />
          <BasisCashProvider>
            <BanksProvider>
              <>{children}</>
            </BanksProvider>
          </BasisCashProvider>
        </Provider>
      </UseWalletProvider>
    </ThemeProvider>
  );
};

export default App;
