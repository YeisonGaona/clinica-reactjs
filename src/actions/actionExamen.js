import axios from 'axios';

export const MENSAJE_REGISTRAR = 'MENSAJE_REGISTRAR';
export const GET_EXAMEN = 'GET_EXAMEN';
export const FILTRAR_EXAMEN = 'FILTRAR_EXAMEN';
export const EXAMEN_REGISTRAR = 'EXAMEN_REGISTRAR';
export const EXAMEN_RECUPERAR = 'EXAMEN_RECUPERAR';
export const ACTUALIZAR_EXAMEN_REGISTRAR = 'ACTUALIZAR_EXAMEN_REGISTRAR';
export const ASIGNAR_EXAMEN_REGISTRAR = 'ASIGNAR_EXAMEN_REGISTRAR';
export const GET_EXAMEN_NO_ASOCIADOS = 'GET_EXAMEN_NO_ASOCIADOS';
export const EXAMEN_EDITAR = 'EXAMEN_EDITAR';

export function actionMensajeRegistrar(mensaje) {
    return (dispatch, getState) => {
        dispatch({
            type: MENSAJE_REGISTRAR,
            mensaje: mensaje
        });
    }
}

export function asignarExamenEditar(examen) {
    return (dispatch, getState) => {
        dispatch({
            type: EXAMEN_EDITAR,
            examen
        });
    }
}

export function actionAsignarExamenRegistrar(examenes) {
    return (dispatch, getState) => {
        dispatch({
            type: ASIGNAR_EXAMEN_REGISTRAR,
            examenes
        });
    }
}

export function actionFiltrarExamenPorNombre(nuevosExamenes) {
    return (dispatch, getState) => {
        dispatch({
            type: GET_EXAMEN,
            respuesta: nuevosExamenes
        });
    }
}


export function actionFiltrarExamen(value) {
    return (dispatch, getState) => {
        dispatch({
            type: FILTRAR_EXAMEN,
            value
        });
    }
}

export function actionExamenRegistrar(examen) {
    return (dispatch, getState) => {
        dispatch({
            type: EXAMEN_REGISTRAR,
            examen
        });
    }
}



export function actualizarExamenRegistrar(examen) {
    return (dispatch, getState) => {
        dispatch({
            type: ACTUALIZAR_EXAMEN_REGISTRAR,
            examen
        });
    }
}

export function actionExamenRecuperar(examen) {
    let examenTransformado = {
        'idExamen': examen.value,
        'nombre': examen.label
    }
    return (dispatch, getState) => {
        dispatch({
            type: EXAMEN_RECUPERAR,
            examen: examenTransformado
        });
    }
}


export function actionGet() {
    const headers = {
        'Authorization': `bearer  ${sessionStorage.getItem('access-token')}`,
        'Content-Type': 'application/json'
    }
    return (dispatch, getState) => {
        axios.get(`http://localhost:8081/examenes/listar`, { headers: headers })
            .then(response => {
                dispatch({
                    type: GET_EXAMEN,
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
                        case 500:
                            dispatch({
                                type: MENSAJE_REGISTRAR,
                                mensaje: 'Ocurrio un error'
                            });
                            break;
                        default:
                            dispatch({
                                type: MENSAJE_REGISTRAR,
                                mensaje: 'Servidor fuera de servicio temporalmente'
                            });
                            break;
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
        axios.get(`http://localhost:8081/examenes/listarFormulario`, { headers: headers })
            .then(response => {
                dispatch({
                    type: GET_EXAMEN,
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
                        case 500:
                            dispatch({
                                type: MENSAJE_REGISTRAR,
                                mensaje: 'Ocurrio un error'
                            });
                            break;
                        default:
                            dispatch({
                                type: MENSAJE_REGISTRAR,
                                mensaje: 'Servidor fuera de servicio temporalmente'
                            });
                            break;
                    }
                }
            });
    };
}

export function actionEditarExamen(examen) {
    const headers = {
        'Authorization': `bearer  ${sessionStorage.getItem('access-token')}`,
        'Content-Type': 'application/json'
    }
    return (dispatch, getState) => {
        axios.put(`http://localhost:8081/examenes/editar`, examen, { headers: headers })
            .then(response => {
                dispatch({
                    type: MENSAJE_REGISTRAR,
                    mensaje: 'Examen modificado'
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

export function actionGetExamenesNoAsociados(idConsulta) {
    const headers = {
        'Authorization': `bearer  ${sessionStorage.getItem('access-token')}`,
        'Content-Type': 'application/json'
    }
    return (dispatch, getState) => {
        axios.get(`http://localhost:8081/examenes/listarNoAsociados/${idConsulta}`, { headers: headers })
            .then(response => {
                console.log('respuesta', response.data)
                dispatch({
                    type: GET_EXAMEN_NO_ASOCIADOS,
                    respuesta: response.data
                });
            }).catch((error) => {
                if (error.request.response === '') {
                    dispatch({
                        type: MENSAJE_REGISTRAR,
                        mensaje: 'Servidor fuera de servicio temporalmente'
                    });
                } else {
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
                }
            });
    };
}

export function actionEliminarExamenConsulta(idExamen, idConsulta) {
    const headers = {
        'Authorization': `bearer  ${sessionStorage.getItem('access-token')}`,
        'Content-Type': 'application/json'
    }
    return (dispatch, getState) => {
        axios.delete(`http://localhost:8081/examenes/eliminarExamenConsulta/${idExamen}/${idConsulta}`, { headers: headers })
            .then(response => {
                dispatch({
                    type: MENSAJE_REGISTRAR,
                    mensaje: 'Examen eliminado'
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

export function actionEliminarExamen(idExamen) {
    const headers = {
        'Authorization': `bearer  ${sessionStorage.getItem('access-token')}`,
        'Content-Type': 'application/json'
    }
    return (dispatch, getState) => {
        axios.delete(`http://localhost:8081/examenes/eliminar/${idExamen}`, { headers: headers })
            .then(response => {
                dispatch({
                    type: MENSAJE_REGISTRAR,
                    mensaje: 'Examen eliminado'
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
                        case 409:
                            dispatch({
                                type: MENSAJE_REGISTRAR,
                                mensaje: 'Examen asociado'
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

export function actionAgregarExamen(examen) {
    const headers = {
        'Authorization': `bearer  ${sessionStorage.getItem('access-token')}`,
        'Content-Type': 'application/json'
    }
    return (dispatch, getState) => {
        axios.post(`http://localhost:8081/examenes/guardar`, examen, { headers: headers })
            .then(response => {
                dispatch({
                    type: MENSAJE_REGISTRAR,
                    mensaje: 'Examen registrado'
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

export function actionAgregarExamenConsulta(examen) {
    const headers = {
        'Authorization': `bearer  ${sessionStorage.getItem('access-token')}`,
        'Content-Type': 'application/json'
    }
    return (dispatch, getState) => {
        axios.post(`http://localhost:8081/examenes/guardarExamenConsulta`, examen, { headers: headers })
            .then(response => {
                dispatch({
                    type: MENSAJE_REGISTRAR,
                    mensaje: 'Examen agregado'
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
