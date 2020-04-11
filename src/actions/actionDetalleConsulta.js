import axios from 'axios';

export const MENSAJE_REGISTRAR = 'MENSAJE_REGISTRAR';
export const GET_DETALLE = 'GET_DETALLE';
export const AGREGAR_DETALLE = 'AGREGAR_DETALLE';

export function actionMensajeRegistrar(mensaje) {
    return (dispatch, getState) => {
        dispatch({
            type: MENSAJE_REGISTRAR,
            mensaje: mensaje
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


export function actionAgregarConsulta(consulta) {
    const headers = {
        'Content-Type': 'application/json'
    }
    return (dispatch, getState) => {
        axios.post(`http://localhost:8081/detalleConsultas/guardar`, consulta, { headers: headers })
            .then(response => { 
                dispatch({
                    type: MENSAJE_REGISTRAR,
                    mensaje: 'Consulta registrada'
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

export function actionEditarConsulta(consulta) {
    const headers = {
        'Content-Type': 'application/json'
    }
    return (dispatch, getState) => {
        axios.put(`http://localhost:8081/detalleConsultas/editar`, consulta, { headers: headers })
            .then(response => {
                dispatch({
                    type: MENSAJE_REGISTRAR,
                    mensaje: 'Consulta editada'
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

export function actionEliminarConsulta(id) {
    const headers = {
        'Content-Type': 'application/json'
    }
    return (dispatch, getState) => {
        axios.delete(`http://localhost:8081/detalleConsultas/eliminar/${id}`, { headers: headers })
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
                    dispatch({
                        type: MENSAJE_REGISTRAR,
                        mensaje: 'Servidor fuera de servicio temporalmente'
                    });
                }
            });
    }
}