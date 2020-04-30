import React from 'react';

import Button from '@material-ui/core/Button';
import { reduxForm, Field } from 'redux-form';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Select from 'react-select';
import { actionGet, actionFiltrarExamen, actionExamenRegistrar } from '../actions/actionExamen.js';
import { generarInput } from '../utilitario/GenerarInput.js';
import { requerido, validacionCincuentaCaracteres,minimoTresCaracteres,seleccione } from '../utilitario/ValidacionCampos.js';
import CheckIcon from '@material-ui/icons/Check';
import CancelIcon from '@material-ui/icons/Cancel';

class ExamenForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            habilitado: true,
            detalles: [],
            valor: null
        };
    }

    componentDidMount() {
    }

    opcionesExamen = () => {
        let respuesta = [];
        this.props.examenes.forEach(
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

    retornarValor = () => {
        return this.state.valor;
    }

    handleChange = selectedOption => {
        this.setState({ valor: selectedOption });
    };


    handleSubmit = formValues => {
        this.setState({ valor: null });
        this.props.actionFiltrarExamen(formValues.examen.value);
        let examen = {
            'value': formValues.examen.value,
            'label': formValues.examen.label,
            'info': formValues.infoAdicional
        }
        this.props.actionExamenRegistrar(examen);
        this.opcionesExamen();
        this.props.cambiar();
    }

    render() {
        return (
            <form onSubmit={this.props.handleSubmit(this.handleSubmit)} id='formularioUno'>
                <div className="row" style={{ paddingLeft: '16px', paddingTop: '10px' }}>
                    <div className="col-sm-4" style={{ paddingLeft: '0px', paddingTop: '15px', zIndex: '2' }}>
                        <Field name="examen" component={ReduxFormSelect} validate={[seleccione]} valor={this.retornarValor()} onChange={this.handleChange} options={this.opcionesExamen()} />
                    </div>
                    <div className="col-sm-5" style={{ paddingLeft: '0px', paddingBottom: '11px', zIndex: '2' }}>
                        <Field name="infoAdicional" component={generarInput} validate={[requerido, validacionCincuentaCaracteres,minimoTresCaracteres]} label='Informacion adicional' />
                    </div>
                    <div className="col-sm-1" style={{ paddingLeft: '0px', paddingTop: '15px' }}>
                        <Button style={{ background: '#1b9e2f', color: 'white', fontSize: "14px", fontFamily: "sans-serif", textTransform: "none" }} startIcon={<CheckIcon />} className="btn btn-dark" variant="contained" type="submit"></Button>{''}
                    </div>
                    <div className="col-sm-1" style={{ paddingLeft: '-6px', paddingTop: '15px' }}>
                        <Button style={{ background: '#781422', color: 'white', fontSize: "14px", fontFamily: "sans-serif", textTransform: "none" }} startIcon={<CancelIcon />} className="btn btn-dark" onClick={this.props.cambiar} variant="contained"  ></Button>{''}
                    </div>
                </div>
            </form>
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
                value={props.valor}
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
        examenes: state.examen.examenes,
        examenesRegistrar: state.examen.examenesRegistrar
    }
}

let formulario = reduxForm({
    form: 'registrarExamenForm'
})(ExamenForm)

export default withRouter(connect(mapStateToProps, { actionGet, actionFiltrarExamen, actionExamenRegistrar })(formulario));