import React from 'react';

// Componentes de librerias
import Snackbar from '@material-ui/core/Snackbar';
import { Alert as Mensaje } from '@material-ui/lab';
import Alert from 'react-bootstrap/Alert';
import { Table, ButtonGroup, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

//Redux
import { actionGetDetallesConExamenes, actionMensajeRegistrar, actionEliminarDetalleConsulta } from '../../actions/actionDetalleConsulta.js';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

//Componentes personalizados


class TablaConsulta extends React.Component {

    constructor(props) {
        super(props);
        this.handleClose = this.handleClose.bind(this);
        this.state = {
            open: false,
        }
    }

    componentDidUpdate() {
        const { mensajeDetalle, actionMensajeRegistrar } = this.props;
        switch (mensajeDetalle) {
            case 'Detalle de consulta registrado':
                this.mensaje('success', mensajeDetalle);
                this.props.actionGetDetallesConExamenes(this.props.detallesExamen.consulta.id);
                actionMensajeRegistrar('');
                break;
            case 'Detalle consulta editada':
                this.mensaje('success', mensajeDetalle);
                this.props.actionGetDetallesConExamenes(this.props.detallesExamen.consulta.id);
                actionMensajeRegistrar('');
                break;
            case 'Detalle consulta eliminada':
                this.mensaje('success', mensajeDetalle);
                this.props.actionGetDetallesConExamenes(this.props.detallesExamen.consulta.id);
                actionMensajeRegistrar('');
                break;
            case 'Datos ingresados en formato incorrecto':
                this.mensaje('error', mensajeDetalle);
                actionMensajeRegistrar('');
                break;
            case 'Ocurrio un error':
                this.mensaje('error', mensajeDetalle);
                actionMensajeRegistrar('');
                break;
            default:
                break;
        }
    }

    handleClose() {
        if (this.state.open) {
            this.setState({ open: false });
        }
    }

    borrarDetalle = (detalleId) => {
        this.props.actionEliminarDetalleConsulta(detalleId);
    };

    //buscar
    searchChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    mensaje = (severidad, mensaje) => {
        if (this.state.severidad !== severidad) {
            this.setState({ severidad: severidad });
        }
        if (!this.state.open) {
            this.setState({ open: true });
        }
        this.setState({ mensaje: mensaje })
    }

    ocultar(detalleRecibido) {
        this.props.habilitarEditarDetalleConsulta(detalleRecibido);
    }


    render() {
        const { editarHabilitado, detallesExamen } = this.props;
        return (
            <div>
                {
                    detallesExamen.consulta.detalleConsultaDto.length === 0 ?
                        <Alert variant='info'>
                            Sin detalles de consulta registrados
                        </Alert> : <>
                            {editarHabilitado ? <></> : <>
                                <Table bordered hover striped>
                                    <thead className='thead-dark'>
                                        <tr>
                                            <th>Codigo</th>
                                            <th>diagnostico</th>
                                            <th>tratamiento</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            detallesExamen.consulta.detalleConsultaDto.map((book) => (
                                                <tr key={book.id}>
                                                    <td>{book.id}</td>
                                                    <td>{book.diagnostico}</td>
                                                    <td>{book.tratamiento}</td>
                                                    <td>
                                                        <ButtonGroup>
                                                            <Button size="sm" variant="outline-success" onClick={() => { this.ocultar(book) }}><FontAwesomeIcon icon={faEdit} /></Button>
                                                            <Button size="sm" variant="outline-danger" onClick={this.borrarDetalle.bind(this, book.id)}><FontAwesomeIcon icon={faTrash} /></Button>
                                                        </ButtonGroup>
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </Table>
                            </>}
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
                        </>}
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
        mensajeDetalle: state.detalle.mensaje,
        detallesExamen: state.detalle.detallesExamen,
    }
}


export default withRouter(connect(mapStateToProps, { actionEliminarDetalleConsulta, actionGetDetallesConExamenes, actionMensajeRegistrar })(TablaConsulta));