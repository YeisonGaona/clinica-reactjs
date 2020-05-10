import React from 'react';
import { actionEditarConsulta } from '../../actions/actionConsulta.js';
import { generarInput } from '../../utilitario/GenerarInput.js';
import { reduxForm, Field } from 'redux-form';
import { requerido, seleccione } from '../../utilitario/ValidacionCampos.js';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { ReduxFormSelect } from '../../utilitario/GenerarSelect.js';

class ConsultaList extends React.Component {

    constructor(props) {
        super(props);
        this.ocultar = this.ocultar.bind(this);
    }

    state = {
        valor: undefined
    }
    
    componentWillMount(){
        if(this.state.valor===undefined){
            this.handleChange(this.props.initialValues.medico);
        }
    }

    submitEditarConsulta = formValues => {
        this.ocultar([]);
        this.setState({ valor: undefined });
        const { id, fecha, medico } = formValues;
        let consulta = {
            'id': id,
            'fecha': fecha,
            'medico': {
                'id': medico.value
            }
        }
        this.props.actionEditarConsulta(consulta);
    }

    // Dropdown de medicos
    retornarValor = () => {
        return this.state.valor;
    }

    //Dropdown de medicos
    handleChange = selectedOption => {
        this.setState({ valor: selectedOption });
    };

    ocultar(e) {
        this.props.habilitarEditarConsulta([]);
    }

    opcionesMedicos = () => {
        let respuesta = [];
        this.props.medicos.forEach(
            medico => {
                let objeto = {
                    label: medico.nombreMedico,
                    value: medico.id,
                }
                respuesta.push(objeto);
            }
        )
        return respuesta;
    }


    render() {
        const { editarHabilitado } = this.props;
        return (
            <div>
                {editarHabilitado ? <>
                    <form onSubmit={this.props.handleSubmit(this.submitEditarConsulta)}>
                        <div className="row">
                            <div className="col-sm-3">
                                <Field name="id" type="number" disabled={true} validate={[requerido]} component={generarInput} label="Codigo" />
                            </div>
                            <div className="col-sm-3" style={{ color: 'black', paddingTop: '13px' }}>
                                <Field name="medico" validate={[seleccione]} component={ReduxFormSelect} valor={this.retornarValor()} onChange={this.handleChange} options={this.opcionesMedicos()} />
                            </div>
                            <div className="col-sm-3">
                                <Field name="fecha" type='date' validate={[requerido]} component={generarInput} label="Fecha" />
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
        medicos: state.medico.medicos,
        consultaEditar:state.consulta.consultaEditar,
        initialValues: {
            id: state.consulta.consultaEditar.id,
            medico: state.consulta.consultaEditar.medico,
            fecha: state.consulta.consultaEditar.fecha
        }
    }
}

let formulario = reduxForm({
    form: 'editarConsulta',
    enableReinitialize: true
})(ConsultaList)



export default withRouter(connect(mapStateToProps, {actionEditarConsulta})(formulario));