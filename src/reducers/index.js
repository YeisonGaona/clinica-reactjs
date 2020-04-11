import { combineReducers } from 'redux';
import { reducerConsulta } from './reducerConsulta.js';
import {reducerDetalleConsulta} from './reducerDetalleConsulta.js';
import { reducer as formReducer } from 'redux-form';


const rootReducer = combineReducers({
    consulta: reducerConsulta,
    detalle:reducerDetalleConsulta,
    form: formReducer
})

export default rootReducer;