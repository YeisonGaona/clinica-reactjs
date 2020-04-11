
import {
    MENSAJE_REGISTRAR,
    GET_CONSULTAS,
    AGREGAR_CONSULTA
} from '../actions/actionConsulta.js'


const initialState = {
    mensaje: '',
    consultas: []
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
        default:
            return state
    }
}