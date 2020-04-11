import React from 'react';

import Button from '@material-ui/core/Button';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { reduxForm, Field } from 'redux-form';
import { withRouter } from 'react-router-dom';
import { generarInput } from '../utilitario/GenerarInput.js';
import AddIcon from '@material-ui/icons/Add';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import { requerido, minimoTresCaracteres,validacionVeintiCincoCaracteres,validacionCincuentaCaracteres, seleccione } from '../utilitario/ValidacionCampos.js';
import { actionAgregarConsulta, actionMensajeRegistrar } from '../actions/actionDetalleConsulta.js';
import { actionGet } from '../actions/actionConsulta.js';
import { connect } from 'react-redux';
import Select from 'react-select';

class PopUpDetalle extends React.Component {
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

    componentDidUpdate() {
        console.log('mensj', this.props.mensaje);
        switch (this.props.mensaje) {
            case 'Consulta registrada':
                this.props.reset();
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
        let detalle = {
            'diagnostico': formValues.diagnostico,
            'tratamiento': formValues.tratamiento,
            'consulta': {
                'id': formValues.modulo.value
            }
        }
        this.props.reset();
        this.props.actionAgregarConsulta(detalle);
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
                                    <Field name="diagnostico" validate={[requerido, validacionVeintiCincoCaracteres,minimoTresCaracteres]} component={generarInput} label="Diagnostico" />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-12">
                                    <Field name="tratamiento" type='text' validate={[requerido,validacionCincuentaCaracteres,minimoTresCaracteres]} component={generarInput} label="Tratamiento" />
                                </div>
                            </div>
                            <div className="row" style={{ paddingTop: "9px" }}>
                                <div className="col-sm-12">
                                    <Field name="modulo" validate={[seleccione]} component={ReduxFormSelect} options={this.opciones()} />
                                </div>
                            </div>
                            <ModalFooter>
                                <div style={{ paddingRight: '170px' }}>
                                    <Button style={{ background: '#001F54', color:'white',fontSize: "14px", fontFamily: "sans-serif", textTransform: "none" }} className="btn btn-dark" variant="contained" startIcon={<SaveAltIcon />} type="submit">Registrar</Button>{''}
                                </div>
                            </ModalFooter>
                        </form>
                    </ModalBody>
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
                placeholder='Seleccione un medico'
                onChange={value => input.onChange(value)}
                onBlur={() => input.onBlur(input.value)}
                noOptionsMessage={() => 'Aun no hay ningun medico registrado'}
                options={options}
            />
            {touched && ((error && <span className="text-danger form-group" style={{ fontSize: '12px', fontFamily: 'sans-serif' }}>{error}</span>))}
        </>
    )
}

function mapStateToProps(state) {
    return {
        mensaje: state.detalle.mensaje,
        consultas: state.consulta.consultas
    }
}

let formulario = reduxForm({
    form: 'registrarDetalleConsulta'
})(PopUpDetalle)

export default withRouter(connect(mapStateToProps, { actionAgregarConsulta, actionMensajeRegistrar, actionGet })(formulario));