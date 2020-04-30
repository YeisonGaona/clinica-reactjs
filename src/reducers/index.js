import { combineReducers } from 'redux';
import { reducerConsulta } from './reducerConsulta.js';
import {reducerDetalleConsulta} from './reducerDetalleConsulta.js';
import { reducer as formReducer } from 'redux-form';
import { reducerExamen } from './reducerExamen.js';
import { reducerMedico } from './reducerMedico.js';


const rootReducer = combineReducers({
    consulta: reducerConsulta,
    detalle:reducerDetalleConsulta,
    examen:reducerExamen,
    medico:reducerMedico,
    form: formReducer
})

export default rootReducer;