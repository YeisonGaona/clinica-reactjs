
import {
    MENSAJE_REGISTRAR,
    GET_EXAMEN,
    FILTRAR_EXAMEN,
    EXAMEN_REGISTRAR,
    EXAMEN_RECUPERAR,
    ACTUALIZAR_EXAMEN_REGISTRAR,
    ASIGNAR_EXAMEN_REGISTRAR,
    GET_EXAMEN_NO_ASOCIADOS,
    EXAMEN_EDITAR
} from '../actions/actionExamen.js'


const initialState = {
    mensaje: '',
    examenes: [],
    examenesRegistrar: [],
    examenesNoAsociados: [],
    examenEditar:[]
}

export function reducerExamen(state = initialState, action) {
    switch (action.type) {
        case MENSAJE_REGISTRAR:
            return Object.assign({}, state, { mensaje: action.mensaje })
        case GET_EXAMEN:
            return Object.assign({}, state, { examenes: action.respuesta })
        case EXAMEN_EDITAR:
            return Object.assign({}, state, { examenEditar: action.examen })
        case ASIGNAR_EXAMEN_REGISTRAR:
            return Object.assign({}, state, { examenesRegistrar: action.examenes })
        case GET_EXAMEN_NO_ASOCIADOS:
            return Object.assign({}, state, { examenesNoAsociados: action.respuesta })
        case EXAMEN_RECUPERAR:
            return {
                ...state,
                examenes: state.examenes.concat(action.examen)
            }
        case ACTUALIZAR_EXAMEN_REGISTRAR:
            let filtradoActualizar = [];
            let examenesActual = state.examenesRegistrar;
            for (var i = 0; i < examenesActual.length; i++) {
                if (examenesActual[i].value !== action.examen.value) {
                    filtradoActualizar.push(examenesActual[i]);
                }
            }
            return Object.assign({}, state, { examenesRegistrar: filtradoActualizar })
        case FILTRAR_EXAMEN:
            let filtrado = [];
            let normal = state.examenes;
            for (var j = 0; j < normal.length; j++) {
                if (normal[j].idExamen !== action.value) {
                    filtrado.push(normal[j]);
                }
            }
            return Object.assign({}, state, { examenes: filtrado })
        case EXAMEN_REGISTRAR:
            let presente = false;
            let examenesActuales = state.examenesRegistrar;
            for (var k = 0; k < examenesActuales.length; k++) {
                if (examenesActuales[k].value === action.examen.value) {
                    presente = true;
                }
            }
            if (presente) {
                return state
            } else {
                return {
                    ...state,
                    examenesRegistrar: state.examenesRegistrar.concat(action.examen)
                }
            }
        default:
            return state
    }
}