//@ts-nocheck
import React from "react";
import { Provider } from "react-redux";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { UseWalletProvider } from "use-wallet";
import MinesProvider from "./contexts/Mines";
import ItanksProvider from "./contexts/ITanks";
import DebtsProvider from "./contexts/Debts";
import ParassetProvider from "./contexts/ParassetProvider";
import Page from "./components/Page";

import Home from "./views/Home";
import Liquidation from "./views/Liquidation";
import Coin from "./views/Coin";
import Mine from "./views/Mine";
import MinePool from "./views/MinePool";
import ITankDetail from "./views/ITankDetail";
import ITank from "./views/ITank";
import Exchange from "./views/Exchange";
import DebtDetail from "./views/DebtDetail";
import DatumOverview from "./views/DatumOverview";
import DatumItank from "./views/DatumItank";
import DatumUser from "./views/DatumUser";
import DatumCoin from "./views/DatumCoin";

import store from "./state";
import theme from "./theme";
import config from "./config";
import Updaters from "./state/Updaters";
import StatusModal from "./components/StatusModal";

const App: React.FC = () => {
  return (
    <Providers>
      <Router>
        <Switch>
          <Page>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route
              path="/coin/:selectInputCurrency?/:selectOutputCurrency?"
              exact
            >
              <Coin />
            </Route>
            <Route path="/liquidation" exact>
              <Liquidation />
            </Route>
            <Route path="/datum/overview" exact>
              <DatumOverview />
            </Route>
            <Route path="/datum/itank" exact>
              <DatumItank />
            </Route>
            <Route path="/datum/user" exact>
              <DatumUser />
            </Route>
            <Route path="/datum/coin" exact>
              <DatumCoin />
            </Route>
            <Route path="/debt/detail/:debtId" exact>
              <DebtDetail />
            </Route>
            <Route path="/exchange" exact>
              <Exchange />
            </Route>
            <Route path="/mine" exact>
              <Mine />
            </Route>
            <Route path="/mine/pool/:mineId" exact>
              <MinePool />
            </Route>
            <Route path="/itank" exact>
              <ITank />
            </Route>
            <Route path="/itank/detail/:itankId" exact>
              <ITankDetail />
            </Route>
          </Page>
        </Switch>
        <StatusModal />
      </Router>
    </Providers>
  );
};

const Providers: React.FC = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <UseWalletProvider
        chainId={config.chainId}
        connectors={{
          walletconnect: { rpcUrl: config.defaultProvider },
        }}
      >
        <Provider store={store}>
          <Updaters />
          <ParassetProvider>
            <ItanksProvider>
              <MinesProvider>
                <DebtsProvider>
                  <>{children}</>
                </DebtsProvider>
              </MinesProvider>
            </ItanksProvider>
          </ParassetProvider>
        </Provider>
      </UseWalletProvider>
    </ThemeProvider>
  );
};

export default App;
