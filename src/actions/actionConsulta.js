import axios from 'axios';

export const MENSAJE_REGISTRAR = 'MENSAJE_REGISTRAR';
export const GET_CONSULTAS = 'GET_CONSULTAS';
export const AGREGAR_CONSULTA = 'AGREGAR_CONSULTA';
export const CONSULTA_EDITAR = 'CONSULTA_EDITAR';

export function actionMensajeRegistrar(mensaje) {
    return (dispatch, getState) => {
        dispatch({
            type: MENSAJE_REGISTRAR,
            mensaje: mensaje
        });
    }
}


export function asignarConsultaEditar(consulta) {
    return (dispatch, getState) => {
        dispatch({
            type: CONSULTA_EDITAR,
            consulta
        });
    }
}


export function filtrarConsultas(respuesta) {
    return (dispatch, getState) => {
        dispatch({
            type: GET_CONSULTAS,
            respuesta
        });
    }
}

export function actionGet() {
    const headers = {
        'Authorization': `bearer  ${sessionStorage.getItem('access-token')}`,
        'Content-Type': 'application/json'
    }
    return (dispatch, getState) => {
        axios.get(`http://localhost:8081/consultas/listar`, { headers: headers })
            .then(response => {
                dispatch({
                    type: GET_CONSULTAS,
                    respuesta: response.data
                });
            }).catch((error) => {
                if (error.request.response === '') {
                    dispatch({
                        type: MENSAJE_REGISTRAR,
                        mensaje: 'Servidor fuera de servicio temporalmente'
                    });
                } else {
                    var respuesta = JSON.parse(error.request.response);
                    switch (respuesta.status) {
                        case 401:
                            dispatch({
                                type: MENSAJE_REGISTRAR,
                                mensaje: 'Sin permiso'
                            });
                            break;
                        case 400:
                            dispatch({
                                type: MENSAJE_REGISTRAR,
                                mensaje: 'Datos ingresados en formato incorrecto'
                            });
                            break;
                        case 500:
                            dispatch({
                                type: MENSAJE_REGISTRAR,
                                mensaje: 'Ocurrio un error'
                            });
                            break;
                        default:
                            if (respuesta.error === 'invalid_token') {
                                dispatch({
                                    type: MENSAJE_REGISTRAR,
                                    mensaje: 'Token invalido'
                                });
                                break;
                            } else {
                                dispatch({
                                    type: MENSAJE_REGISTRAR,
                                    mensaje: 'Servidor fuera de servicio temporalmente'
                                });
                                break;
                            }
                    }
                }
            });
    };
}


export function actionAgregarConsulta(consulta) {
    const headers = {
        'Authorization': `bearer  ${sessionStorage.getItem('access-token')}`,
        'Content-Type': 'application/json'
    }
    return (dispatch, getState) => {
        axios.post(`http://localhost:8081/consultas/guardar`, consulta, { headers: headers })
            .then(response => {
                dispatch({
                    type: MENSAJE_REGISTRAR,
                    mensaje: 'Consulta registrada'
                });
            }).catch((error) => {
                if (error.request.response === '') {
                    dispatch({
                        type: MENSAJE_REGISTRAR,
                        mensaje: 'Servidor fuera de servicio temporalmente'
                    });
                } else {
                    var respuesta = JSON.parse(error.request.response);
                    switch (respuesta.status) {
                        case 401:
                            dispatch({
                                type: MENSAJE_REGISTRAR,
                                mensaje: 'Sin permiso'
                            });
                            break;
                        case 400:
                            dispatch({
                                type: MENSAJE_REGISTRAR,
                                mensaje: 'Datos ingresados en formato incorrecto'
                            });
                            break;
                        case 500:
                            dispatch({
                                type: MENSAJE_REGISTRAR,
                                mensaje: 'Ocurrio un error'
                            });
                            break;
                        default:
                            if (respuesta.error === 'invalid_token') {
                                dispatch({
                                    type: MENSAJE_REGISTRAR,
                                    mensaje: 'Token invalido'
                                });
                                break;
                            } else {
                                dispatch({
                                    type: MENSAJE_REGISTRAR,
                                    mensaje: 'Servidor fuera de servicio temporalmente'
                                });
                                break;
                            }
                    }
                }
            });

    }
}

export function actionEditarConsulta(consulta) {
    const headers = {
        'Authorization': `bearer  ${sessionStorage.getItem('access-token')}`,
        'Content-Type': 'application/json'
    }
    return (dispatch, getState) => {
        axios.put(`http://localhost:8081/consultas/editar`, consulta, { headers: headers })
            .then(response => {
                dispatch({
                    type: MENSAJE_REGISTRAR,
                    mensaje: 'Consulta editada'
                });
            }).catch((error) => {
                if (error.request.response === '') {
                    dispatch({
                        type: MENSAJE_REGISTRAR,
                        mensaje: 'Servidor fuera de servicio temporalmente'
                    });
                } else {
                    var respuesta = JSON.parse(error.request.response);
                    switch (respuesta.status) {
                        case 401:
                            dispatch({
                                type: MENSAJE_REGISTRAR,
                                mensaje: 'Sin permiso'
                            });
                            break;
                        case 400:
                            dispatch({
                                type: MENSAJE_REGISTRAR,
                                mensaje: 'Datos ingresados en formato incorrecto'
                            });
                            break;
                        case 500:
                            dispatch({
                                type: MENSAJE_REGISTRAR,
                                mensaje: 'Ocurrio un error'
                            });
                            break;
                        default:
                            if (respuesta.error === 'invalid_token') {
                                dispatch({
                                    type: MENSAJE_REGISTRAR,
                                    mensaje: 'Token invalido'
                                });
                                break;
                            } else {
                                dispatch({
                                    type: MENSAJE_REGISTRAR,
                                    mensaje: 'Servidor fuera de servicio temporalmente'
                                });
                                break;
                            }
                    }
                }
            });
    }
}

export function actionEliminarConsulta(id) {
    const headers = {
        'Authorization': `bearer  ${sessionStorage.getItem('access-token')}`,
        'Content-Type': 'application/json'
    }
    return (dispatch, getState) => {
        axios.delete(`http://localhost:8081/consultas/eliminar/${id}`, { headers: headers })
            .then(response => {
                dispatch({
                    type: MENSAJE_REGISTRAR,
                    mensaje: 'Consulta eliminada'
                });
            }).catch((error) => {
                if (error.request.response === '') {
                    dispatch({
                        type: MENSAJE_REGISTRAR,
                        mensaje: 'Servidor fuera de servicio temporalmente'
                    });
                } else {
                    var respuesta = JSON.parse(error.request.response);
                    switch (respuesta.status) {
                        case 401:
                            dispatch({
                                type: MENSAJE_REGISTRAR,
                                mensaje: 'Sin permiso'
                            });
                            break;
                        case 400:
                            dispatch({
                                type: MENSAJE_REGISTRAR,
                                mensaje: 'Datos ingresados en formato incorrecto'
                            });
                            break;
                        case 500:
                            dispatch({
                                type: MENSAJE_REGISTRAR,
                                mensaje: 'Ocurrio un error'
                            });
                            break;
                        default:
                            if (respuesta.error === 'invalid_token') {
                                dispatch({
                                    type: MENSAJE_REGISTRAR,
                                    mensaje: 'Token invalido'
                                });
                                break;
                            } else {
                                dispatch({
                                    type: MENSAJE_REGISTRAR,
                                    mensaje: 'Servidor fuera de servicio temporalmente'
                                });
                                break;
                            }
                    }
                }
            });
    }
}