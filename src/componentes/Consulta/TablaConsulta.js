import React from 'react';

// Componentes de librerias
import Snackbar from '@material-ui/core/Snackbar';
import { Alert as Mensaje } from '@material-ui/lab';
import Alert from 'react-bootstrap/Alert';
import { Table, ButtonGroup, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faEye } from '@fortawesome/free-solid-svg-icons';

//Redux
import { actionGetDetallesConExamenes, asignarDetalleExamen } from '../../actions/actionDetalleConsulta.js';
import { actionGet, actionEditarConsulta, actionMensajeRegistrar, asignarConsultaEditar, actionEliminarConsulta } from '../../actions/actionConsulta.js';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

//Componentes personalizados


class TablaConsulta extends React.Component {

    constructor(props) {
        super(props);
        this.ocultar = this.ocultar.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.state = {
            open: false,
            codigoSeleccionado: 0
        }
    }

    componentDidUpdate() {
        const { mensaje, actionGet, actionMensajeRegistrar } = this.props;
        switch (mensaje) {
            case 'Consulta registrada':
                this.mensaje('success', mensaje);
                actionGet();
                actionMensajeRegistrar('');
                break;
            case 'Consulta editada':
                this.mensaje('success', mensaje);
                actionGet();
                actionMensajeRegistrar('');
                break;
            case 'Consulta eliminada':
                this.props.asignarDetalleExamen();
                this.mensaje('success', mensaje);
                //llamar acciones de limpiar detalles de consulta y el id de consulta
                actionMensajeRegistrar('');
                actionGet();
                break;
            case 'Datos ingresados en formato incorrecto':
                this.mensaje('error', mensaje);
                break;
            case 'Ocurrio un error':
                this.mensaje('error', mensaje);
                break;
            default:
                break;
        }
    }

    componentDidMount() {
        this.props.actionGet();
    }

    handleClose() {
        if (this.state.open) {
            this.setState({ open: false });
        }
    }

    borrarConsulta = (bookId) => {
        this.setState({ codigoSeleccionado: 0 });
        this.props.actionEliminarConsulta(bookId);
    };

    //buscar
    searchChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    verDetalles = (consulta) => {
        this.props.cambiarVerDetalle();
        this.setState({ codigoSeleccionado: consulta.id });
        this.props.actionGetDetallesConExamenes(consulta.id);
    }

    mensaje = (severidad, mensaje) => {
        if (this.state.severidad !== severidad) {
            this.setState({ severidad: severidad });
        }
        if (!this.state.open) {
            this.setState({ open: true });
        }
        this.setState({ mensaje: mensaje })
    }

    ocultar(consultaRecibida) {
        this.props.asignarDetalleExamen();
        this.setState({ codigoSeleccionado: 0 });
        let consulta = {
            id: consultaRecibida.id,
            medico: {
                label: consultaRecibida.medico.nombreMedico,
                value: consultaRecibida.medico.id,
            },
            fecha: consultaRecibida.fecha
        }
        this.props.habilitarEditarConsulta(consulta);
    }


    render() {
        const { consultas, editarHabilitado } = this.props;
        const { codigoSeleccionado } = this.state;
        return (
            <div>
                {consultas.length === 0 ?
                    <Alert variant='info'>
                        Sin consultas registradas
                            </Alert> :
                    <>
                        {editarHabilitado ? <></> : <>
                            <Table bordered hover striped>
                                <thead className='thead-dark'>
                                    <tr>
                                        <th>Codigo</th>
                                        <th>medico</th>
                                        <th>Fecha</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                    consultas.map((book) => (
                                        <tr key={book.id} style={codigoSeleccionado === book.id ? { background: '#efae4d94' } : {}}>
                                            <td>{book.id}</td>
                                            <td>{book.medico.nombreMedico}</td>
                                            <td>{book.fecha}</td>
                                            <td>
                                                <ButtonGroup>
                                                    <Button size="sm" variant="outline-success" onClick={() => { this.ocultar(book) }}><FontAwesomeIcon icon={faEdit} /></Button>
                                                    <Button size="sm" variant="outline-danger" onClick={this.borrarConsulta.bind(this, book.id)}><FontAwesomeIcon icon={faTrash} /></Button>
                                                    <Button size="sm" variant="outline-info" onClick={this.verDetalles.bind(this, book)}><FontAwesomeIcon icon={faEye} /></Button>
                                                </ButtonGroup>
                                            </td>
                                        </tr>
                                    ))
                                    }
                                </tbody>
                            </Table>
                        </>
                        }
                        {/* {consultas.length > 0 ?
                            <>
                                <div style={{ "float": "left" ,color:'black'}}>
                                    Showing Page {currentPage} of {totalPages}
                                </div>
                                <div style={{ "float": "right" }}>
                                    <InputGroup size="sm">
                                        <InputGroup.Prepend>
                                            <Button type="button" variant="outline-info" disabled={currentPage === 1 ? true : false}
                                                onClick={this.firstPage}>
                                                <FontAwesomeIcon icon={faFastBackward} /> First
                                        </Button>
                                            <Button type="button" variant="outline-info" disabled={currentPage === 1 ? true : false}
                                                onClick={this.prevPage}>
                                                <FontAwesomeIcon icon={faStepBackward} /> Prev
                                        </Button>
                                        </InputGroup.Prepend>
                                        <FormControl className={"page-num bg-dark"} name="currentPage" value={currentPage}
                                            onChange={this.changePage} />
                                        <InputGroup.Append>
                                            <Button type="button" variant="outline-info" disabled={currentPage === totalPages ? true : false}
                                                onClick={this.nextPage}>
                                                <FontAwesomeIcon icon={faStepForward} /> Next
                                        </Button>
                                            <Button type="button" variant="outline-info" disabled={currentPage === totalPages ? true : false}
                                                onClick={this.lastPage}>
                                                <FontAwesomeIcon icon={faFastForward} /> Last
                                        </Button>
                                        </InputGroup.Append>
                                    </InputGroup>
                                </div>
                            </>
                            : null
                        } */}
                    </>
                }
                <Snackbar open={this.state.open} autoHideDuration={6000} onClose={this.handleClose}>
                    <Mensaje variant="filled" severity={this.state.severidad}>
                        {this.state.mensaje}
                    </Mensaje>
                </Snackbar>
            </div >
        );
    }
}

function mapStateToProps(state) {
    return {
        mensaje: state.consulta.mensaje,
        mensajeExamen: state.examen.mensaje,
        mensajeDetalle: state.detalle.mensaje,
        consultas: state.consulta.consultas,
        detallesExamen: state.detalle.detallesExamen,
        medicos: state.medico.medicos,
        examenesNoAsociados: state.examen.examenesNoAsociados
    }
}


export default withRouter(connect(mapStateToProps, { actionGet, actionEditarConsulta, asignarDetalleExamen, actionMensajeRegistrar, actionGetDetallesConExamenes, asignarConsultaEditar, actionEliminarConsulta })(TablaConsulta));