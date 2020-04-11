
import {
    MENSAJE_REGISTRAR,
    GET_DETALLE,
    AGREGAR_DETALLE
} from '../actions/actionDetalleConsulta.js'


const initialState = {
    mensaje: '',
    detalles: []
}

export function reducerDetalleConsulta(state = initialState, action) {
    switch (action.type) {
        case MENSAJE_REGISTRAR:
            return Object.assign({}, state, { mensaje: action.mensaje })
        case GET_DETALLE:
            return Object.assign({}, state, { detalles: action.respuesta })
        case AGREGAR_DETALLE:
            return {
                ...state,
                detalles: state.detalles.concat(action.detalleARegistrar)
            }
        default:
            return state
    }
}