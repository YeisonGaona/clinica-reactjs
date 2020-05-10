import React from 'react';

import Button from '@material-ui/core/Button';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { reduxForm, Field } from 'redux-form';
import { withRouter } from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import Select from 'react-select';
import { generarDate } from '../../utilitario/GenerarInput.js';
import { requerido, seleccione } from '../../utilitario/ValidacionCampos.js';
import { actionAgregarConsulta, actionMensajeRegistrar } from '../../actions/actionConsulta.js';
import { actionGet as actionMedicos } from '../../actions/actionMedico.js';
import { actionExamenRecuperar, actualizarExamenRegistrar,actionAsignarExamenRegistrar,actionGet } from '../../actions/actionExamen.js';
import { borrarDetalle,detalleConsultaAsignar } from '../../actions/actionDetalleConsulta.js';
import { connect } from 'react-redux';

import ExamenForm from '../Examen/ExamenForm.js';
import DetalleConsultaForm from '../DetalleConsulta/DetalleConsultaForm.js';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Table, ButtonGroup } from 'react-bootstrap';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class PopUpActividad extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            habilitado: true,
            examenes:true,
            detalles: []
        };
        this.toggle = this.toggle.bind(this);
        this.cambiar = this.cambiar.bind(this);
        this.cambiarExamenes=this.cambiarExamenes.bind(this);
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

    cambiarExamenes() {
        this.setState(prevState => ({
            examenes: !prevState.examenes
        }));
    }

    componentWillMount() {
        this.props.actionMedicos();
        this.props.actionGet();
    }

    componentDidUpdate() {
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

    deleteBook = (bookId) => {
        this.props.borrarDetalle(bookId);
    };

    deleteExamen = (examen) => {
        this.props.actionExamenRecuperar(examen);
        this.props.actualizarExamenRegistrar(examen);
    };

    formatoExamenes = (lista) => {
        let examenesFormato = [];
        for (var i = 0; i < lista.length; i++) {
            let examenDto = {
                'idExamen': lista[i].value,
                'infoAdicional':lista[i].info
            }
            examenesFormato.push(examenDto);
        }
        return examenesFormato;
    }

    formatoDetalles = (lista) => {
        let detallesFormato = [];
        for (var i = 0; i < lista.length; i++) {
            let detalleConsultaDto = {
                'diagnostico': lista[i].diagnostico,
                'tratamiento': lista[i].tratamiento
            }
            detallesFormato.push(detalleConsultaDto);
        }
        return detallesFormato;
    }

    handleSubmit = formValues => {
        let consultaExamenReporteDto = {
            'consulta': {
                'medico': {
                    'id': formValues.medico.value,
                    'nombre': formValues.medico.label
                },
                'fecha': formValues.fecha,
                'detalleConsultaDto': this.formatoDetalles(this.props.detallesConsulta)
            },
            'listaExamen': this.formatoExamenes(this.props.examenesRegistrar)
        }
        this.props.actionAgregarConsulta(consultaExamenReporteDto);
        this.toggle();
        this.props.actionAsignarExamenRegistrar([]);
        this.props.detalleConsultaAsignar([]);
        this.props.actionGet();
    }

    render() {
        const { detallesConsulta, examenesRegistrar } = this.props;

        return (
            <div>
                <Button style={{ background: '#001F54', color: 'white', fontSize: "14px", textTransform: "none" }} startIcon={<AddIcon />} className="btn btn-dark" variant="contained" onClick={this.toggle}>Agregar consulta</Button>
                <Modal isOpen={this.state.modal}
                    toggle={this.toggle}
                    className={this.props.className}
                    style={{ paddingTop: '42px' }}
                    size="col-md-4"
                >
                    <ModalHeader toggle={this.toggle} className="center">Crear consulta</ModalHeader>
                    <ModalBody>
                        <form onSubmit={this.props.handleSubmit(this.handleSubmit)} id='formularioPrin'>
                            <div className="row" style={{ paddingTop: "9px" }}>
                                <div className="col-sm-12" style={{ zIndex: '11' }}>
                                    <Field name="medico" validate={[seleccione]} component={ReduxFormSelect} options={this.opcionesMedicos()} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-12">
                                    <Field name="fecha" type='date' min='2020-04-28' validate={[requerido]} component={generarDate} label="Fecha de consulta" />
                                </div>
                            </div>
                            <div style={{ paddingLeft: '170px' }}>
                                <Button style={{ background: '#001F54', fontSize: "14px", fontFamily: "sans-serif", color: 'white', textTransform: "none" }} className="btn btn-dark" variant="contained" startIcon={<SaveAltIcon />} type="submit">Registrar</Button>{''}
                            </div>
                            <br/>
                        </form>
                        {this.state.examenes ? <>
                            <div className="row" style={{ paddingLeft: '0px', paddingTop: '10px', paddingBottom: '23px' }}>
                                <div className="col-sm-12">
                                    <Button
                                        onClick={this.cambiarExamenes}
                                        variant="contained"
                                        color="secondary"
                                        startIcon={<AddIcon />}
                                        style={{ background: '#001F54', fontSize: "13px", fontFamily: "sans-serif", color: 'white', textTransform: "none" }}
                                    >Agregar examenes</Button>
                                </div>
                            </div>
                        </> :
                            <>
                                <div className="row" style={{ paddingLeft: '16px', paddingTop: '0px', paddingBottom: '13px', paddingRigth: '12px' }}>
                                    <ExamenForm cambiar={this.cambiarExamenes} />
                                </div>
                            </>
                        }
                        {this.state.habilitado ? <>
                            <div className="row" style={{ paddingLeft: '0px', paddingTop: '10px', paddingBottom: '23px' }}>
                                <div className="col-sm-12">
                                    <Button
                                        onClick={this.cambiar}
                                        variant="contained"
                                        color="secondary"
                                        startIcon={<AddIcon />}
                                        style={{ background: '#001F54', fontSize: "13px", fontFamily: "sans-serif", color: 'white', textTransform: "none" }}
                                    >Agregar detalles de consulta</Button>
                                </div>
                            </div>
                        </> :
                            <>
                                <div className="row" style={{ paddingLeft: '16px', paddingTop: '0px', paddingBottom: '13px', paddingRigth: '12px' }}>
                                    <DetalleConsultaForm cambiar={this.cambiar} />
                                </div>
                            </>
                        }
                        <br />
                        <br />
                        {detallesConsulta.length === 0 ? <></> :
                            <ExpansionPanel>
                                <ExpansionPanelSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography  style={{fontSize:'15px'}}>Detalles de consulta</Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                    {/* detallesConsulta */}
                                    <Table bordered hover striped>
                                        <thead className='thead-dark' style={{fontSize:'13px'}}>
                                            <tr>
                                                <th>Diagnostico</th>
                                                <th>tratamiento</th>
                                            </tr>
                                        </thead>
                                        <tbody style={{fontSize:'12px'}}>
                                            {
                                                detallesConsulta.length === 0 ?
                                                    <tr align="center">
                                                        <td colSpan="7">No Books Available.</td>
                                                    </tr> :
                                                    detallesConsulta.map((book) => (
                                                        <tr key={book.id}>
                                                            <td>{book.diagnostico}</td>
                                                            <td>{book.tratamiento}</td>
                                                            <td>
                                                                <ButtonGroup>
                                                                    {/* <Button size="sm" variant="outline-danger" onClick={this.editConsulta.bind(this, book)}><FontAwesomeIcon icon={faEdit} /></Button> */}
                                                                    <Button size="sm" variant="outline-danger" onClick={this.deleteBook.bind(this, book.id)}><FontAwesomeIcon icon={faTrash} /></Button>
                                                                    {/* <Button size="sm" variant="outline-info" onClick={this.viewDetails.bind(this, book)}><FontAwesomeIcon icon={faEye} /></Button> */}
                                                                </ButtonGroup>
                                                            </td>
                                                        </tr>
                                                    ))
                                            }
                                        </tbody>
                                    </Table>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                        }
                        {examenesRegistrar.length === 0 ? <></> :
                            <ExpansionPanel>
                                <ExpansionPanelSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel2a-content"
                                    id="panel2a-header">
                                    <Typography style={{fontSize:'15px'}}>Examenes</Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                    <Table bordered hover striped>
                                        <thead className='thead-dark' style={{fontSize:'13px'}}>
                                            <tr>
                                                <th>Codigo</th>
                                                <th>examen</th>
                                                <th>Informacion adicional</th>
                                            </tr>
                                        </thead>
                                        <tbody style={{fontSize:'12px'}}>
                                            {
                                                examenesRegistrar.length === 0 ?
                                                    <tr align="center">
                                                        <td colSpan="7">No Books Available.</td>
                                                    </tr> :
                                                    examenesRegistrar.map((book) => (
                                                        <tr key={book.value}>
                                                            <td>{book.value}</td>
                                                            <td>{book.label}</td>
                                                            <td>{book.info}</td>
                                                            <td>
                                                                <ButtonGroup>
                                                                    {/* <Button size="sm" variant="outline-danger" onClick={this.editConsulta.bind(this, book)}><FontAwesomeIcon icon={faEdit} /></Button> */}
                                                                    <Button size="sm" variant="outline-danger" onClick={this.deleteExamen.bind(this, book)}><FontAwesomeIcon icon={faTrash} /></Button>
                                                                    {/* <Button size="sm" variant="outline-info" onClick={this.viewDetails.bind(this, book)}><FontAwesomeIcon icon={faEye} /></Button> */}
                                                                </ButtonGroup>
                                                            </td>
                                                        </tr>
                                                    ))
                                            }
                                        </tbody>
                                    </Table>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                        }
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
        mensaje: state.consulta.mensaje,
        detallesConsulta: state.detalle.detallesConsultas,
        medicos: state.medico.medicos,
        examenes: state.examen.examenes,
        examenesRegistrar: state.examen.examenesRegistrar
    }
}

let formulario = reduxForm({
    form: 'registrarConsulta'
})(PopUpActividad)

export default withRouter(connect(mapStateToProps, { actionAgregarConsulta, actionGet,actionExamenRecuperar,detalleConsultaAsignar, actionAsignarExamenRegistrar,borrarDetalle, actualizarExamenRegistrar, actionMedicos, actionMensajeRegistrar })(formulario));