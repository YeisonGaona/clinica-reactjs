
import {
    MENSAJE_REGISTRAR,
    GET_DETALLE,
    GET_DETALLE_EXAMEN,
    AGREGAR_DETALLE,
    AGREGAR_DETALLE_REGISTRO,
    BORRAR_DETALLE,
    ASIGNAR_DETALLE_CONSULTA,
    DETALLE_EDITAR
} from '../actions/actionDetalleConsulta.js'


const initialState = {
    mensaje: '',
    detalles: [],
    detallesConsultas: [],
    detallesExamen: {
        consulta: {
            id: 0,
            medico: {
                id: 0,
                cedula: 0,
                nombreMedico: '',
                direccion: ''
            },
            fecha: '',
            detalleConsultaDto: []
        },
        listaExamen: []
    },
    detalleEditar:[]
}

export function reducerDetalleConsulta(state = initialState, action) {
    switch (action.type) {
        case MENSAJE_REGISTRAR:
            return Object.assign({}, state, { mensaje: action.mensaje })
        case GET_DETALLE:
            return Object.assign({}, state, { detalles: action.respuesta })
        case ASIGNAR_DETALLE_CONSULTA:
            return Object.assign({}, state, { detallesConsultas: action.detalles })
        case DETALLE_EDITAR:
            return Object.assign({}, state, { detalleEditar: action.detalle })
        case AGREGAR_DETALLE_REGISTRO:
            const { detalleConsulta } = action;
            let detalleConsultaId = {
                'id': Math.round(Math.random() * 100) + Math.round(Math.random() * 10),
                'tratamiento': detalleConsulta.tratamiento,
                'diagnostico': detalleConsulta.diagnostico
            }
            return {
                ...state,
                detallesConsultas: state.detallesConsultas.concat(detalleConsultaId)
            }
        case BORRAR_DETALLE:
            let filtrado = [];
            let normal = state.detallesConsultas;
            for (var i = 0; i < normal.length; i++) {
                if (normal[i].id !== action.idDetalle) {
                    filtrado.push(normal[i]);
                }
            }
            return Object.assign({}, state, { detallesConsultas: filtrado })
        case AGREGAR_DETALLE:
            return {
                ...state,
                detalles: state.detalles.concat(action.detalleARegistrar)
            }
        case GET_DETALLE_EXAMEN:
            console.log('reducer',action.detalleExamen);
            return Object.assign({}, state, { detallesExamen: action.detalleExamen })
        default:
            return state
    }
}