import axios from 'axios';

export const MENSAJE_REGISTRAR = 'MENSAJE_REGISTRAR';
export const GET_MEDICO = 'GET_MEDICO';
export const MEDICO_EDITAR = 'MEDICO_EDITAR';



export function actionMensajeRegistrar(mensaje) {
    return (dispatch, getState) => {
        dispatch({
            type: MENSAJE_REGISTRAR,
            mensaje: mensaje
        });
    }
}

export function asignarMedicoEditar(medico) {
    return (dispatch, getState) => {
        dispatch({
            type: MEDICO_EDITAR,
            medico
        });
    }
}

export function filtrarMedicos(medicosFiltrados) {
    return (dispatch, getState) => {
        dispatch({
            type: GET_MEDICO,
            respuesta: medicosFiltrados
        });
    }
}



// actionAgregarMedico

export function actionAgregarMedico(medico) {
    const headers = {
        'Authorization': `bearer  ${sessionStorage.getItem('access-token')}`,
        'Content-Type': 'application/json'
    }
    return (dispatch, getState) => {
        axios.post(`http://localhost:8081/medicos/guardar`, medico, { headers: headers })
            .then(response => {
                dispatch({
                    type: MENSAJE_REGISTRAR,
                    mensaje: 'Medico registrado'
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


export function actionEditarExamen(medico) {
    const headers = {
        'Authorization': `bearer  ${sessionStorage.getItem('access-token')}`,
        'Content-Type': 'application/json'
    }
    return (dispatch, getState) => {
        axios.put(`http://localhost:8081/medicos/editar`, medico, { headers: headers })
            .then(response => {
                dispatch({
                    type: MENSAJE_REGISTRAR,
                    mensaje: 'Medico modificado'
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
//actionEliminarMedico
export function actionEliminarMedico(idMedico) {
    const headers = {
        'Authorization': `bearer  ${sessionStorage.getItem('access-token')}`,
        'Content-Type': 'application/json'
    }
    return (dispatch, getState) => {
        axios.delete(`http://localhost:8081/medicos/eliminar/${idMedico}`, { headers: headers })
            .then(response => {
                dispatch({
                    type: MENSAJE_REGISTRAR,
                    mensaje: 'Medico eliminado'
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


export function actionGet() {
    const headers = {
        'Authorization': `bearer  ${sessionStorage.getItem('access-token')}`,
        'Content-Type': 'application/json'
    }
    return (dispatch, getState) => {
        axios.get(`http://localhost:8081/medicos/listar`, { headers: headers })
            .then(response => {
                dispatch({
                    type: GET_MEDICO,
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

export function actionGetFormulario() {
    const headers = {
        'Authorization': `bearer  ${sessionStorage.getItem('access-token')}`,
        'Content-Type': 'application/json'
    }
    return (dispatch, getState) => {
        axios.get(`http://localhost:8081/medicos/listarFormulario`, { headers: headers })
            .then(response => {
                dispatch({
                    type: GET_MEDICO,
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