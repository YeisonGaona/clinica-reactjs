import React from 'react';


//componentes
import Consulta from './componentes/Consulta.js';
import Menu from './componentes/Menu.js';

//store
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import thunk from 'redux-thunk'

import 'bootstrap/dist/css/bootstrap.min.css';
import DetalleConsulta from './componentes/DetalleConsulta.js';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

class App extends React.Component {
  render() {
    return (
      <Provider store={createStoreWithMiddleware(reducers)}>
        <Router>
          <Switch>
            <Route exact path="/">
              <Menu children={<Consulta />} />
            </Route>
            <Route exact path="/detalle">
              <Menu children={<DetalleConsulta />} />
            </Route>
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
