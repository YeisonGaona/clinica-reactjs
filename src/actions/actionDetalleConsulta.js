import axios from 'axios';

export const MENSAJE_REGISTRAR = 'MENSAJE_REGISTRAR';
export const GET_DETALLE = 'GET_DETALLE';
export const GET_DETALLE_EXAMEN = 'GET_DETALLE_EXAMEN';
export const AGREGAR_DETALLE = 'AGREGAR_DETALLE';
export const AGREGAR_DETALLE_REGISTRO = 'AGREGAR_DETALLE_REGISTRO';
export const BORRAR_DETALLE = 'BORRAR_DETALLE';
export const ASIGNAR_DETALLE_CONSULTA = 'ASIGNAR_DETALLE_CONSULTA';
export const DETALLE_EDITAR = 'DETALLE_EDITAR';

export function actionMensajeRegistrar(mensaje) {
    return (dispatch, getState) => {
        dispatch({
            type: MENSAJE_REGISTRAR,
            mensaje: mensaje
        });
    }
}


export function asignarDetalleConsultaEditar(detalle) {
    return (dispatch, getState) => {
        dispatch({
            type: DETALLE_EDITAR,
            detalle
        });
    }
}

export function asignarDetalleExamen() {
    return (dispatch, getState) => {
        dispatch({
            type: GET_DETALLE_EXAMEN,
            detalleExamen: {
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
            }
        });
    }
}


export function detalleConsultaAgregar(detalleConsulta) {
    return (dispatch, getState) => {
        dispatch({
            type: AGREGAR_DETALLE_REGISTRO,
            detalleConsulta
        });
    }
}

export function detalleConsultaAsignar(detalles) {
    return (dispatch, getState) => {
        dispatch({
            type: ASIGNAR_DETALLE_CONSULTA,
            detalles
        });
    }
}


export function borrarDetalle(idDetalle) {
    return (dispatch, getState) => {
        dispatch({
            type: BORRAR_DETALLE,
            idDetalle
        });
    }
}

export function filtrarDetalles(respuesta) {
    return (dispatch, getState) => {
        let filtrado = getState().detalle.detallesExamen;
        filtrado.consulta.detalleConsultaDto=respuesta
        dispatch({
            type: GET_DETALLE_EXAMEN,
            detalleExamen:filtrado
        });
    }
}


export function actionGet() {
    return (dispatch, getState) => {
        axios.get(`http://localhost:8081/detalleConsultas/listar`)
            .then(response => {
                dispatch({
                    type: GET_DETALLE,
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

export function actionGetDetallesConExamenes(idConsulta) {
    return (dispatch, getState) => {
        axios.get(`http://localhost:8081/consultaexamenes/listarPorIdConsulta/${idConsulta}`)
            .then(response => {
                dispatch({
                    type: GET_DETALLE_EXAMEN,
                    detalleExamen: response.data
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



export function actionAgregarConsulta(consulta) {
    const headers = {
        'Content-Type': 'application/json'
    }
    return (dispatch, getState) => {
        axios.post(`http://localhost:8081/detalleConsultas/guardar`, consulta, { headers: headers })
            .then(response => {
                dispatch({
                    type: MENSAJE_REGISTRAR,
                    mensaje: 'Detalle de consulta registrado'
                });
                dispatch({
                    type: AGREGAR_DETALLE,
                    detalleARegistrar: response.data
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

export function actionEditarDetalleConsulta(consulta) {
    const headers = {
        'Content-Type': 'application/json'
    }
    return (dispatch, getState) => {
        axios.put(`http://localhost:8081/detalleConsultas/editar`, consulta, { headers: headers })
            .then(response => {
                dispatch({
                    type: MENSAJE_REGISTRAR,
                    mensaje: 'Detalle consulta editada'
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

export function actionEliminarDetalleConsulta(id) {
    const headers = {
        'Content-Type': 'application/json'
    }
    return (dispatch, getState) => {
        axios.delete(`http://localhost:8081/detalleConsultas/eliminar/${id}`, { headers: headers })
            .then(response => {
                dispatch({
                    type: MENSAJE_REGISTRAR,
                    mensaje: 'Detalle consulta eliminada'
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