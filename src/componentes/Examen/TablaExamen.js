import React from 'react';

// Componentes de librerias
import Snackbar from '@material-ui/core/Snackbar';
import { Alert as Mensaje } from '@material-ui/lab';
import Alert from 'react-bootstrap/Alert';
import { Table, ButtonGroup, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTrash} from '@fortawesome/free-solid-svg-icons';

//Redux
import { actionGetDetallesConExamenes, actionEliminarDetalleConsulta } from '../../actions/actionDetalleConsulta.js';
import { actionMensajeRegistrar,actionEliminarExamenConsulta } from '../../actions/actionExamen.js';
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
        const { mensajeExamen, actionMensajeRegistrar } = this.props;
        switch (mensajeExamen) {
            case 'Examen agregado':
                this.mensaje('success', mensajeExamen);
                this.props.actionGetDetallesConExamenes(this.props.detallesExamen.consulta.id);
                // this.props.actionGetExamenesNoAsociados(this.state.codigoConsulta);
                actionMensajeRegistrar('');
                break;
            case 'Examen eliminado':
                this.mensaje('success', mensajeExamen);
                this.props.actionGetDetallesConExamenes(this.props.detallesExamen.consulta.id);
                // this.props.actionGetExamenesNoAsociados(this.state.codigoConsulta);
                actionMensajeRegistrar('');
                break;
            default:
                break;
        }
    }

    componentDidMount() {

    }

    handleClose() {
        if (this.state.open) {
            this.setState({ open: false });
        }
    }

    borrarExamen = (examenId) => {
        this.props.actionEliminarExamenConsulta(examenId,this.props.detallesExamen.consulta.id);
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

    render() {
        const {detallesExamen } = this.props;

        return (
            <div>
                {detallesExamen.listaExamen.length === 0 ?
                    <>
                        <Alert variant='info'>
                            Sin examenes asociados
                                    </Alert>
                    </> :
                    <>
                        <Table bordered hover striped>
                            <thead className='thead-dark'>
                                <tr>
                                    <th>Codigo</th>
                                    <th>Nombre</th>
                                    <th>descripcion</th>
                                    <th>infoAdicional</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    detallesExamen.listaExamen.map((book) => (
                                        <tr key={book.idExamen}>
                                            <td>{book.idExamen}</td>
                                            <td>{book.nombre}</td>
                                            <td>{book.descripcion}</td>
                                            <td>{book.infoAdicional}</td>
                                            <td>
                                                <ButtonGroup>
                                                    <Button size="sm" variant="outline-danger" onClick={this.borrarExamen.bind(this, book.idExamen)}><FontAwesomeIcon icon={faTrash} /></Button>
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
        mensajeExamen: state.examen.mensaje,
        detallesExamen: state.detalle.detallesExamen,
    }
}


export default withRouter(connect(mapStateToProps, { actionEliminarDetalleConsulta, actionGetDetallesConExamenes,actionEliminarExamenConsulta, actionMensajeRegistrar })(TablaConsulta));