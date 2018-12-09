import React, { PureComponent } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect, Switch } from "react-router-dom";
import './App.css';
import Header from './components/Header/Header.jsx';
import Checkout from './components/Checkout/Checkout.jsx';

class App extends PureComponent {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="App-header-container">
            <Header />
          </div>
        </header>

        <main id="main" className="App-main">
          <div className="App-main-container">
            <Checkout {...this.props }/>
          </div>
        </main>
      </div>
    );
  }
}

const NoPage = () => (
  <div>
    <h2>Ops! Esta página não existe!</h2>
    <p>Mas você está convidado a visitar nosso site <Link to="/">enjoei.com</Link></p>
  </div>
);

const AppRouter = () => (
  <Router>
    <div>
      <Switch>
        <Route path="/" exact render={() => (
          <Redirect to="/produto/1321/checkout/6544" />
        )} />
        <Route path="/produto/:productId/checkout/:checkoutId" exact component={App} />
        <Route component={NoPage} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;
