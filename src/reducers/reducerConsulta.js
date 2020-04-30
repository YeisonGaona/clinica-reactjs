
import {
    MENSAJE_REGISTRAR,
    GET_CONSULTAS,
    AGREGAR_CONSULTA,
    CONSULTA_EDITAR
} from '../actions/actionConsulta.js'


const initialState = {
    mensaje: '',
    consultas: [],
    consultaEditar: [],

}

export function reducerConsulta(state = initialState, action) {
    switch (action.type) {
        case MENSAJE_REGISTRAR:
            return Object.assign({}, state, { mensaje: action.mensaje })
        case GET_CONSULTAS:
            return Object.assign({}, state, { consultas: action.respuesta })
        case AGREGAR_CONSULTA:
            return {
                ...state,
                consultas: state.consultas.concat(action.consultaARegistrar)
            }
        case CONSULTA_EDITAR:
            return Object.assign({}, state, { consultaEditar: action.consulta })
        default:
            return state
    }
}