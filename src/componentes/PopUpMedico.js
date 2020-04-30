import React from 'react';

import { actionAgregarMedico } from '../actions/actionMedico.js';

import Button from '@material-ui/core/Button';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { reduxForm, Field } from 'redux-form';
import { withRouter } from 'react-router-dom';
import { generarInput } from '../utilitario/GenerarInput.js';
import AddIcon from '@material-ui/icons/Add';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import { requerido, minimoTresCaracteres, validacionQuinceCaracteres, validacionCincuentaCaracteres } from '../utilitario/ValidacionCampos.js';

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


    componentWillMount() {
        // this.props.actionConsultarModulos(localStorage.getItem('Token'));
    }

    handleClose() {
        if (this.state.open) {
            this.setState({ open: false });
        }

    }

    componentDidUpdate() {
        // switch (this.props.mensaje) {
        //     case 'Detalle de consulta registrado':

        //         break;
        //     default:
        //         break;
        // }
        // this.props.actionMensajeRegistrar('');
    }

    handleSubmit = formValues => {
        let medico = {
            'nombreMedico': formValues.nombre,
            'cedula': formValues.cedula,
            'direccion':{
                'detalle':formValues.direccion
            }
        }
        this.props.reset();
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
        this.props.actionAgregarMedico(medico);
    }

    render() {
        return (
            <div>
                <Button style={{ background: '#001F54', color: 'white', fontSize: "14px", textTransform: "none" }} startIcon={<AddIcon />} className="btn btn-dark" variant="contained" onClick={this.toggle}>Agregar medico</Button>
                <Modal isOpen={this.state.modal}
                    toggle={this.toggle}
                    className={this.props.className}
                    style={{ paddingTop: '120px' }}
                    size="col-md-4"
                >
                    <ModalHeader toggle={this.toggle} className="center">Agregar medico</ModalHeader>
                    <ModalBody>
                        <form onSubmit={this.props.handleSubmit(this.handleSubmit)}>
                            <div className="row">
                                <div className="col-sm-12">
                                    <Field name="cedula" type='number' validate={[requerido, minimoTresCaracteres,validacionQuinceCaracteres]} component={generarInput} label="Cedula" />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-12">
                                    <Field name="nombre" type='text' validate={[requerido, minimoTresCaracteres,validacionCincuentaCaracteres]} component={generarInput} label="Nombre" />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-12">
                                    <Field name="direccion" type='text' validate={[requerido, validacionCincuentaCaracteres, minimoTresCaracteres]} component={generarInput} label="Direccion" />
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
        mensaje: state.medico.mensaje
    }
}

let formulario = reduxForm({
    form: 'registrarMedico'
})(PopUpDetalle)

export default withRouter(connect(mapStateToProps, { actionAgregarMedico })(formulario));