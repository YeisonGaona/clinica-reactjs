
import {
    MENSAJE_LOGIN
} from '../actions/actionLogin.js'


const initialState = {
    mensaje: ''
}

export function reducerLogin(state = initialState, action) {
    switch (action.type) {
        case MENSAJE_LOGIN:
            return Object.assign({}, state, { mensaje: action.mensaje })
        default:
            return state
    }
}