import React from 'react';


//componentes
import Menu from './componentes/Menu.js';

//store
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import thunk from 'redux-thunk'

import 'bootstrap/dist/css/bootstrap.min.css';
// import ConsultaList from './componentes/ConsultaList.js';
import ExamenList from './componentes/ExamenList.js';
import MedicoList from './componentes/MedicoList.js';
import NotFound from './componentes/Pagina 404.js';
import ContenedorConsulta from './componentes/Contenedores/ContenedorConsulta.js';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

class App extends React.Component {
  render() {
    return (
      <Provider store={createStoreWithMiddleware(reducers)}>
        <Router>
          <Switch>
            <Route exact path="/">
              <Menu children={
                <>
                {/* <ConsultaList/> */}
                  <ContenedorConsulta />
                </>
              } />
            </Route>
            <Route exact path="/examenes">
              <Menu children={<ExamenList />} />
            </Route>
            <Route exact path="/medicos">
              <Menu children={<MedicoList />} />
            </Route>
            <Route component={NotFound} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
