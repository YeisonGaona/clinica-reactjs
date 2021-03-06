import React from 'react';

import Button from '@material-ui/core/Button';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { reduxForm, Field } from 'redux-form';
import { withRouter } from 'react-router-dom';
import { generarInput } from '../../utilitario/GenerarInput.js';
import AddIcon from '@material-ui/icons/Add';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import { requerido, minimoTresCaracteres, validacionVeintiCincoCaracteres, validacionCincuentaCaracteres } from '../../utilitario/ValidacionCampos.js';
import { actionAgregarConsulta, actionMensajeRegistrar } from '../../actions/actionDetalleConsulta.js';
import { actionGet } from '../../actions/actionConsulta.js';
import { connect } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from 'react-bootstrap/Alert';

class PopUpDetalle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            habilitado: true,
            detalles: [],
            open: false,
            mensaje: '',
            severidad: 'error'
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

    opciones = () => {
        let respuesta = [];
        this.props.consultas.forEach(
            modulo => {
                let objeto = {
                    label: modulo.nombreMedico,
                    value: modulo.id,
                }
                respuesta.push(objeto);
            }
        )
        return respuesta;
    }

    componentWillMount() {
        // this.props.actionConsultarModulos(localStorage.getItem('Token'));
        this.props.actionGet();

    }

    handleClose() {
        if (this.state.open) {
            this.setState({ open: false });
        }

    }

    handleSubmit = formValues => {
        let detalle = {
            'diagnostico': formValues.diagnostico,
            'tratamiento': formValues.tratamiento,
            'consultaDto': {
                'id': this.props.detallesExamen.consulta.id
            }
        }
        console.log('detalle',detalle)
        this.props.actionAgregarConsulta(detalle);
        this.props.reset();
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    render() {
        return (
            <div>
                <Button style={{ background: '#001F54', color: 'white', fontSize: "14px", textTransform: "none" }} startIcon={<AddIcon />} className="btn btn-dark" variant="contained" onClick={this.toggle}>Registrar detalle consulta</Button>
                <Modal isOpen={this.state.modal}
                    toggle={this.toggle}
                    className={this.props.className}
                    style={{ paddingTop: '120px' }}
                    size="col-md-4"
                >
                    <ModalHeader toggle={this.toggle} className="center">Crear detalle de consulta</ModalHeader>
                    <ModalBody>
                        <form onSubmit={this.props.handleSubmit(this.handleSubmit)}>
                            <div className="row">
                                <div className="col-sm-12">
                                    <Field name="diagnostico" validate={[requerido, validacionVeintiCincoCaracteres, minimoTresCaracteres]} component={generarInput} label="Diagnostico" />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-12">
                                    <Field name="tratamiento" type='text' validate={[requerido, validacionCincuentaCaracteres, minimoTresCaracteres]} component={generarInput} label="Tratamiento" />
                                </div>
                            </div>
                            <ModalFooter>
                                <div style={{ paddingRight: '170px' }}>
                                    <Button style={{ background: '#001F54', color: 'white', fontSize: "14px", fontFamily: "sans-serif", textTransform: "none" }} className="btn btn-dark" variant="contained" startIcon={<SaveAltIcon />} type="submit">Registrar</Button>{''}
                                </div>
                            </ModalFooter>
                        </form>
                    </ModalBody>
                    <Snackbar open={this.state.open} autoHideDuration={6000} onClose={this.handleClose}>
                        <Alert variant="filled" severity={this.state.severidad}>
                            {this.state.mensaje}
                        </Alert>
                    </Snackbar>
                </Modal>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        mensaje: state.detalle.mensaje,
        consultas: state.consulta.consultas,
        detallesExamen: state.detalle.detallesExamen,

    }
}

let formulario = reduxForm({
    form: 'registrarDetalleConsulta'
})(PopUpDetalle)

export default withRouter(connect(mapStateToProps, { actionAgregarConsulta, actionMensajeRegistrar, actionGet })(formulario));