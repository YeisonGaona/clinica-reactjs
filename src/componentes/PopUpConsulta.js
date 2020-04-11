import React from 'react';

import Button from '@material-ui/core/Button';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { reduxForm, Field } from 'redux-form';
import { withRouter } from 'react-router-dom';
import { generarInput, generarDate } from '../utilitario/GenerarInput.js';
import AddIcon from '@material-ui/icons/Add';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import CheckIcon from '@material-ui/icons/Check';
import CancelIcon from '@material-ui/icons/Cancel';
import { requerido, validacionCuarentaCaracteres,validacionVeintiCincoCaracteres,minimoTresCaracteres } from '../utilitario/ValidacionCampos.js';
import { actionAgregarConsulta, actionMensajeRegistrar } from '../actions/actionConsulta.js';
import { connect } from 'react-redux';
import MaterialTable from 'material-table';

class PopUpActividad extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            habilitado: true,
            detalles: []
        };
        this.toggle = this.toggle.bind(this);
        this.cambiar = this.cambiar.bind(this);
    }

    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
        this.setState({
            detalles: []
        })
        this.props.reset();
    }

    cambiar() {
        this.setState(prevState => ({
            habilitado: !prevState.habilitado
        }));
    }

    componentWillMount() {
        // this.props.actionConsultarModulos(localStorage.getItem('Token'));

    }

    componentDidUpdate() {
        console.log('mensj', this.props.mensaje);
        switch (this.props.mensaje) {
            case 'Consulta registrada':
                if (this.state.modal) {
                    this.setState({ modal: false })
                    this.props.reset();
                }
                break;
            default:
                break;
        }
        this.props.actionMensajeRegistrar('');

    }

    handleSubmit = formValues => {
        let consulta = {
            'nombreMedico': formValues.nombreMedico,
            'fecha': formValues.fecha,
            'detalleConsulta': this.state.detalles
        }
        this.props.actionAgregarConsulta(consulta);
        this.setState({
            detalles: []
        })
        this.props.reset();
    }

    handleSubmitConsulta = formValues => {
        let detalle = {
            'diagnostico': formValues.diagnostico,
            'tratamiento': formValues.tratamiento
        }
        this.setState(prevState => ({
            detalles: [...prevState.detalles, detalle]
        }))
        this.cambiar();
    }

    render() {
        return (
            <div>
                <Button style={{ background: '#001F54', color: 'white', fontSize: "14px", textTransform: "none" }} startIcon={<AddIcon />} className="btn btn-dark" variant="contained" onClick={this.toggle}>Registrar consulta</Button>
                <Modal isOpen={this.state.modal}
                    toggle={this.toggle}
                    className={this.props.className}
                    style={{ paddingTop: '120px' }}
                    size="col-md-4"
                >
                    <ModalHeader toggle={this.toggle} className="center">Crear consulta</ModalHeader>
                    <ModalBody>
                        <form onSubmit={this.props.handleSubmit(this.handleSubmit)}>
                            <div className="row">
                                <div className="col-sm-12">
                                    <Field name="nombreMedico" validate={[requerido, validacionCuarentaCaracteres,minimoTresCaracteres]} component={generarInput} label="Nombre del medico" />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-12">
                                    <Field name="fecha" type='date' validate={[requerido]} component={generarDate} label="Fecha de consulta" />
                                </div>
                            </div>
                            <div className="row" style={{ paddingLeft: '6px', paddingTop: '10px' }}>
                                <div className="col-sm-10">
                                    <label>Detalle de consulta </label>
                                </div>
                                <div className="col-sm-2" style={{ paddingLeft: '0px', paddingBottom: '11px' }}>
                                    <Button style={{background: '#001F54', fontSize: "14px", fontFamily: "sans-serif",color:'white', textTransform: "none",borderRadius:'20%'}} className="btn btn-dark" variant="contained" onClick={this.cambiar} startIcon={<AddIcon />} ></Button>{''}
                                </div>
                            </div>
                            <div style={{ paddingLeft: '170px' }}>
                                <Button style={{ background: '#001F54', fontSize: "14px", fontFamily: "sans-serif",color:'white', textTransform: "none" }} className="btn btn-dark" variant="contained" startIcon={<SaveAltIcon />} type="submit">Registrar</Button>{''}
                            </div>
                        </form>
                        {this.state.habilitado ? <></> :
                            <>
                                <form onSubmit={this.props.handleSubmit(this.handleSubmitConsulta)}>
                                    <div className="row">
                                        <div className="col-sm-4">
                                            <Field name="diagnostico" validate={[requerido,validacionVeintiCincoCaracteres,minimoTresCaracteres]} component={generarInput} label="Diagnostico" />
                                        </div>
                                        <div className="col-sm-4">
                                            <Field name="tratamiento" validate={[requerido,validacionCuarentaCaracteres,minimoTresCaracteres]} component={generarInput} label="Tratamiento" />
                                        </div>
                                        <div className="col-sm-2" style={{ paddingLeft: '0px', paddingTop: '15px' }}>
                                            <Button style={{ background: '#1b9e2f',color:'white', fontSize: "14px", fontFamily: "sans-serif", textTransform: "none" }} className="btn btn-dark" variant="contained" startIcon={<CheckIcon />} type="submit"></Button>{''}
                                        </div>
                                        <div className="col-sm-2" style={{ paddingLeft: '0px', paddingTop: '15px' }}>
                                            <Button style={{ background: '#781422',color:'white', fontSize: "14px", fontFamily: "sans-serif", textTransform: "none" }} className="btn btn-dark" variant="contained" onClick={this.cambiar} startIcon={<CancelIcon />}></Button>{''}
                                        </div>
                                    </div>
                                </form>
                            </>
                        }
                        {this.state.detalles.length === 0 ? <></> :
                            <>
                                <MaterialTable
                                    title=""
                                    localization={{
                                        header: {
                                            actions: ' '
                                        },
                                        pagination: {
                                            nextTooltip: 'Siguiente ',
                                            previousTooltip: 'Anterior',
                                            labelDisplayedRows: '{from}-{to} de {count}',
                                            lastTooltip: 'Ultima pagina',
                                            firstTooltip: 'Primera pagina',
                                            labelRowsSelect: 'Registros',
                                            firstAriaLabel: 'oooo'
                                        },
                                        body: {
                                            emptyDataSourceMessage: 'Aun no hay ningun detalle de consulta'
                                        },
                                        toolbar: {
                                            searchTooltip: 'Buscar',
                                            searchPlaceholder: 'Buscar'
                                        }
                                    }}
                                    columns={[
                                        { title: 'Diagnostico', field: 'diagnostico', headerStyle: estiloCabecera, cellStyle: estiloFila },
                                        { title: 'Tratamiento', field: 'tratamiento', headerStyle: estiloCabecera, cellStyle: estiloFila }
                                    ]}
                                    data={this.state.detalles}
                                    options={{
                                        search: false,
                                        rowStyle: estiloFila
                                    }}
                                />
                            </>
                        }
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

const estiloCabecera = {
    fontSize: '15px',
    fontFamily: 'sans-serif',
    padding: '8px',
    background: '#e7ecf1'

}

const estiloFila = {
    fontSize: '14px',
    fontFamily: 'sans-serif',
    padding: '8px',
}

function mapStateToProps(state) {
    return {
        mensaje: state.consulta.mensaje
    }
}

let formulario = reduxForm({
    form: 'registrarConsulta'
})(PopUpActividad)

export default withRouter(connect(mapStateToProps, { actionAgregarConsulta, actionMensajeRegistrar })(formulario));