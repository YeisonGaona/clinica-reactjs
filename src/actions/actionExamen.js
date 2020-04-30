import axios from 'axios';

export const MENSAJE_REGISTRAR = 'MENSAJE_REGISTRAR';
export const GET_EXAMEN= 'GET_EXAMEN';
export const FILTRAR_EXAMEN = 'FILTRAR_EXAMEN';
export const EXAMEN_REGISTRAR = 'EXAMEN_REGISTRAR';
export const EXAMEN_RECUPERAR='EXAMEN_RECUPERAR';
export const ACTUALIZAR_EXAMEN_REGISTRAR='ACTUALIZAR_EXAMEN_REGISTRAR';
export const ASIGNAR_EXAMEN_REGISTRAR='ASIGNAR_EXAMEN_REGISTRAR';
export const GET_EXAMEN_NO_ASOCIADOS='GET_EXAMEN_NO_ASOCIADOS';
export const EXAMEN_EDITAR='EXAMEN_EDITAR';

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
    let examenTransformado={
        'idExamen':examen.value,
        'nombre':examen.label
    }
    return (dispatch, getState) => {
        dispatch({
            type: EXAMEN_RECUPERAR,
            examen:examenTransformado
        });
    }
}


export function actionGet() {
    return (dispatch, getState) => {
        axios.get(`http://localhost:8081/examenes/listar`)
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
                    if (error.request) {
                        dispatch({
                            type: MENSAJE_REGISTRAR,
                            mensaje: 'Servidor fuera de servicio temporalmente'
                        });
                    }
                }
            });
    };
}

export function actionEditarExamen(examen) {
    const headers = {
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
                if (error.request.status === 400) {
                    dispatch({
                        type: MENSAJE_REGISTRAR,
                        mensaje: 'Datos ingresados en formato incorrecto'
                    });
                } else {
                    dispatch({
                        type: MENSAJE_REGISTRAR,
                        mensaje: 'Ocurrio un error'
                    });
                }
            });
    }
}

export function actionGetExamenesNoAsociados(idConsulta) {
    return (dispatch, getState) => {
        axios.get(`http://localhost:8081/examenes/listarNoAsociados/${idConsulta}`)
            .then(response => {
                console.log('respuesta',response.data)
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
                    if (error.request) {
                        dispatch({
                            type: MENSAJE_REGISTRAR,
                            mensaje: 'Servidor fuera de servicio temporalmente'
                        });
                    }
                }
            });
    };
}

export function actionEliminarExamenConsulta(idExamen,idConsulta) {
    const headers = {
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
                    dispatch({
                        type: MENSAJE_REGISTRAR,
                        mensaje: 'Servidor fuera de servicio temporalmente'
                    });
                }
            });
    }
}

export function actionEliminarExamen(idExamen) {
    const headers = {
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
                    if(error.request.status===409){
                        dispatch({
                            type: MENSAJE_REGISTRAR,
                            mensaje: 'Examen asociado'
                        });
                    }else{
                        dispatch({
                            type: MENSAJE_REGISTRAR,
                            mensaje: 'Ocurrio un error'
                        });
                    }
                }
            });
    }
}

export function actionAgregarExamen(examen) {
    const headers = {
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
                if (error.request.status === 400) {
                    dispatch({
                        type: MENSAJE_REGISTRAR,
                        mensaje: 'Datos ingresados en formato incorrecto'
                    });
                } else {
                    dispatch({
                        type: MENSAJE_REGISTRAR,
                        mensaje: 'Ocurrio un error'
                    });
                }
            });

    }
}

export function actionAgregarExamenConsulta(examen) {
    const headers = {
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
                if (error.request.status === 400) {
                    dispatch({
                        type: MENSAJE_REGISTRAR,
                        mensaje: 'Datos ingresados en formato incorrecto'
                    });
                } else {
                    dispatch({
                        type: MENSAJE_REGISTRAR,
                        mensaje: 'Ocurrio un error'
                    });
                }
            });

    }
}
