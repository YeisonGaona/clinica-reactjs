import React from 'react';

//librerias
import { Button } from 'react-bootstrap';

//personalizados
import { requerido,validacionVeintiCincoCaracteres, minimoTresCaracteres,validacionCincuentaCaracteres } from '../../utilitario/ValidacionCampos.js';
import { generarInput } from '../../utilitario/GenerarInput.js';


//redux
import { actionEditarDetalleConsulta } from '../../actions/actionDetalleConsulta.js';
import { withRouter } from 'react-router-dom';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';


class ConsultaList extends React.Component {

    constructor(props) {
        super(props);
        this.ocultar = this.ocultar.bind(this);
    }

    submitEditarDetalleConsulta = formValues => {
        this.ocultar([]);
        let detalle = {
            'id': formValues.id,
            'diagnostico': formValues.diagnostico,
            'tratamiento': formValues.tratamiento
        }
        this.props.actionEditarDetalleConsulta(detalle);
    }


    ocultar(e) {
        this.props.habilitarEditarDetalleConsulta([]);
    }

    render() {
        const { editarHabilitado } = this.props;
        return (
            <div>
                {editarHabilitado ? <>
                    <form onSubmit={this.props.handleSubmit(this.submitEditarDetalleConsulta)}>
                        <div className="row">
                            <div className="col-sm-3">
                                <Field name="id" disabled={true} type="number" validate={[requerido]} component={generarInput} label="Codigo" />
                            </div>
                            <div className="col-sm-3">
                                <Field name="diagnostico" validate={[requerido, validacionVeintiCincoCaracteres, minimoTresCaracteres]} component={generarInput} label="Diagnostico" />
                            </div>
                            <div className="col-sm-3">
                                <Field name="tratamiento" validate={[requerido, validacionCincuentaCaracteres, minimoTresCaracteres]} component={generarInput} label="Tratamiento" />
                            </div>

                            <div className="col-sm-1" style={{ padding: '15px' }}>
                                <Button variant="primary" style={{ fontSize: '14px' }} type='submit'>Editar</Button>{''}
                            </div>
                            <div className="col-sm-1" style={{ padding: '15px' }}>
                                <Button variant="danger" style={{ fontSize: '14px' }} onClick={this.ocultar} >Cancelar</Button>{''}
                            </div>
                        </div>
                    </form>
                </> :
                    <>

                    </>
                }
            </div >
        );
    }
}


function mapStateToProps(state) {
    return {
        mensaje: state.consulta.mensaje,
        detallesExamen: state.detalle.detallesExamen,
        initialValues: {
            id: state.detalle.detalleEditar.id,
            diagnostico: state.detalle.detalleEditar.diagnostico,
            tratamiento: state.detalle.detalleEditar.tratamiento,
        }
    }
}

let formulario = reduxForm({
    form: 'editarDetalleConsulta',
    enableReinitialize: true
})(ConsultaList)



export default withRouter(connect(mapStateToProps, { actionEditarDetalleConsulta })(formulario));