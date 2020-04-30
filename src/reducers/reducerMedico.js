
import {
    MENSAJE_REGISTRAR,
    GET_MEDICO,
    MEDICO_EDITAR
} from '../actions/actionMedico.js'


const initialState = {
    mensaje: '',
    medicos: [],
    medicoEditar: {
        direccion: {
            detalle: ''
        },
        cedula: 0,
        nombreMedico:'',
        id:0
    }
}

export function reducerMedico(state = initialState, action) {
    switch (action.type) {
        case MENSAJE_REGISTRAR:
            return Object.assign({}, state, { mensaje: action.mensaje })
        case MEDICO_EDITAR:
            return Object.assign({}, state, { medicoEditar: action.medico })
        case GET_MEDICO:
            return Object.assign({}, state, { medicos: action.respuesta })
        default:
            return state
    }
}