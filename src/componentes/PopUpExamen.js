import React from 'react';

import Button from '@material-ui/core/Button';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { reduxForm, Field } from 'redux-form';
import { withRouter } from 'react-router-dom';
import { generarInput } from '../utilitario/GenerarInput.js';
import AddIcon from '@material-ui/icons/Add';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import { requerido, minimoTresCaracteres, validacionCincuentaCaracteres, seleccione } from '../utilitario/ValidacionCampos.js';
import { actionGet, actionGetExamenesNoAsociados, actionAgregarExamenConsulta } from '../actions/actionExamen.js';

import { connect } from 'react-redux';
import Select from 'react-select';
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
        this.props.examenesNoAsociados.forEach(
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
        this.props.actionGetExamenesNoAsociados(this.props.codigoConsulta);
    }

    handleClose() {
        if (this.state.open) {
            this.setState({ open: false });
        }

    }

    opcionesExamen = () => {
        let respuesta = [];
        this.props.examenesNoAsociados.forEach(
            examen => {
                let objeto = {
                    label: examen.nombre,
                    value: examen.idExamen,
                }
                respuesta.push(objeto);
            }
        )
        return respuesta;
    }


    componentDidUpdate() {
        switch (this.props.mensaje) {
            case 'Examen agregado':
                this.props.actionGetExamenesNoAsociados(this.props.codigoConsulta);
                this.opcionesExamen();
                break;
            default:
                break;
        }
    }

    handleSubmit = formValues => {
        let examen = {
            'idConsulta': this.props.codigoConsulta,
            'idExamen': formValues.examen.value,
            'infoAdicional': formValues.infoAdicional
        }
        this.props.reset();
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
        this.props.actionAgregarExamenConsulta(examen);
        this.props.actionGetExamenesNoAsociados(this.props.codigoConsulta);
    }

    render() {
        return (
            <div>
                <Button style={{ background: '#001F54', color: 'white', fontSize: "14px", textTransform: "none" }} startIcon={<AddIcon />} className="btn btn-dark" variant="contained" onClick={this.toggle}>Agregar examen</Button>
                <Modal isOpen={this.state.modal}
                    toggle={this.toggle}
                    className={this.props.className}
                    style={{ paddingTop: '120px' }}
                    size="col-sm-2"
                >
                    <ModalHeader toggle={this.toggle} className="center">Agregar examen </ModalHeader>
                    <ModalBody>
                        <form onSubmit={this.props.handleSubmit(this.handleSubmit)}>
                            <div className="row">
                                <div className="col-sm-12" style={{ paddingLeft: '15px', paddingTop: '15px', zIndex: '2' }}>
                                    <Field name="examen" component={ReduxFormSelect} validate={[seleccione]} options={this.opcionesExamen()} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-12">
                                    <Field name="infoAdicional" validate={[requerido, validacionCincuentaCaracteres, minimoTresCaracteres]} component={generarInput} label="Informacion adicional" />
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

export const ReduxFormSelect = props => {
    const customStyles = {
        option: (provided, state) => ({
            ...provided,
            fontSize: 13
        }),
        control: styles => ({ ...styles, backgroundColor: 'white', fontSize: 13, fontFamily: 'sans-serif' }),
        singleValue: (provided, state) => {
            const opacity = state.isDisabled ? 0.5 : 1;
            const transition = 'opacity 300ms';
            return { ...provided, opacity, transition };
        }
    }
    const { input, options } = props;
    const { touched, error } = props.meta;
    return (
        <>
            <Select
                {...input}
                styles={customStyles}
                isSearchable={false}
                placeholder='Examen'
                onChange={value => input.onChange(value)}
                onBlur={() => input.onBlur(input.value)}
                noOptionsMessage={() => 'Aun no hay ningun examen registrado'}
                options={options}
            />
            {touched && ((error && <span className="text-danger form-group" style={{ fontSize: '12px', fontFamily: 'sans-serif' }}>{error}</span>))}
        </>
    )
}


function mapStateToProps(state) {
    return {
        examenesNoAsociados: state.examen.examenesNoAsociados,
        mensajeExamen: state.examen.mensaje
    }
}


let formulario = reduxForm({
    form: 'registrarExamenConsulta'
})(PopUpDetalle)

export default withRouter(connect(mapStateToProps, { actionGet, actionGetExamenesNoAsociados, actionAgregarExamenConsulta })(formulario));