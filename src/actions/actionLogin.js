import axios from 'axios';
import { enviroment } from '../utilitario/Configuracion.js';
export const MENSAJE_LOGIN = 'MENSAJE_LOGIN';


export function actualizarMensaje(mensaje) {
    return (dispatch, getState) => {
        dispatch({
            type: MENSAJE_LOGIN,
            mensaje
        });
    }
}


export function actionLoginUsuario(nick, contrasena) {
    const headers = {
        'Authorization': `Basic ${btoa(enviroment.TOKEN_AUTH_USERNAME + ':' + enviroment.TOKEN_AUTH_PASSWORD)}`,
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }
    const body = `grant_type=password&username=${encodeURIComponent(nick)}&password=${encodeURIComponent(contrasena)}`;
    return (dispatch, getState) => {
        axios.post(`http://localhost:8081/oauth/token`, body, { headers: headers })
            .then(response => {
                sessionStorage.setItem('access-token',response.data.access_token);
                dispatch({
                    type: MENSAJE_LOGIN,
                    mensaje: 'Logeado'
                });
            }).catch((error) => {
                try {
                    var respuesta = JSON.parse(error.request.response);
                    switch (respuesta.error_description) {
                        case 'Bad credentials':
                            dispatch({
                                type: MENSAJE_LOGIN,
                                mensaje: 'Credenciales incorrectas'
                            });
                            break;
                        default:
                            dispatch({
                                type: MENSAJE_LOGIN,
                                mensaje: respuesta.error_description
                            });
                            break;
                    }

                } catch (error) {
                    dispatch({
                        type: MENSAJE_LOGIN,
                        mensaje: 'Servidor fuera de servicio temporalmente'
                    });
                }
            });
    }
}