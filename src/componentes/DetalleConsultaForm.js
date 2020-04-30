import React from 'react';

import Button from '@material-ui/core/Button';
import { reduxForm, Field } from 'redux-form';
import { withRouter } from 'react-router-dom';
import { generarInput } from '../utilitario/GenerarInput.js';
import { requerido, minimoTresCaracteres, validacionVeintiCincoCaracteres, validacionCincuentaCaracteres } from '../utilitario/ValidacionCampos.js';
import { actionAgregarConsulta, actionMensajeRegistrar,detalleConsultaAgregar } from '../actions/actionDetalleConsulta.js';
import { actionGet } from '../actions/actionConsulta.js';
import { connect } from 'react-redux';
import CheckIcon from '@material-ui/icons/Check';
import CancelIcon from '@material-ui/icons/Cancel';

class DetalleConsultForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            habilitado: true,
            detalles: []
        };
    }

    handleSubmit = formValues => {
        this.props.detalleConsultaAgregar(formValues);
        this.props.reset();
        this.props.cambiar();
    }

    render() {
        return (
            <div>
                <form onSubmit={this.props.handleSubmit(this.handleSubmit)} id='formularioDos'>
                    <div className="row">
                        <div className="col-sm-4">
                            <Field name="diagnostico" validate={[requerido, validacionVeintiCincoCaracteres, minimoTresCaracteres]} component={generarInput} label="Diagnostico" />
                        </div>
                        <div className="col-sm-4">
                            <Field name="tratamiento" type='text' validate={[requerido, validacionCincuentaCaracteres, minimoTresCaracteres]} component={generarInput} label="Tratamiento" />
                        </div>
                        <div className="col-sm-2" style={{ paddingLeft: '0px', paddingTop: '15px' }}>
                            <Button style={{ background: '#1b9e2f', color: 'white', fontSize: "14px", fontFamily: "sans-serif", textTransform: "none" }} startIcon={<CheckIcon/>} className="btn btn-dark" variant="contained" type="submit"></Button>{''}
                        </div>
                        <div className="col-sm-2" style={{ paddingLeft: '0px', paddingTop: '15px' }}>
                            <Button style={{ background: '#781422', color: 'white', fontSize: "14px", fontFamily: "sans-serif", textTransform: "none" }}  startIcon={<CancelIcon/>} className="btn btn-dark" onClick={this.props.cambiar} variant="contained"  ></Button>{''}
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        detallesConsulta:state.detalle.detallesConsultas
    }
}

let formulario = reduxForm({
    form: 'registrarDetalleConsultaForm'
})(DetalleConsultForm)

export default withRouter(connect(mapStateToProps, { actionAgregarConsulta, actionMensajeRegistrar, actionGet,detalleConsultaAgregar })(formulario));