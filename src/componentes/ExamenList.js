import React from 'react';
import { actionGet, actionEditarConsulta, asignarConsultaEditar, actionEliminarConsulta } from '../actions/actionConsulta.js';
import { actionGetDetallesConExamenes, asignarDetalleConsultaEditar, actionEditarDetalleConsulta, actionEliminarDetalleConsulta } from '../actions/actionDetalleConsulta.js';
import { actionGet as actionMedicos } from '../actions/actionMedico.js';
import { actionFiltrarExamenPorNombre, actionEliminarExamen, actionGetExamenesNoAsociados, actionGet as actionGetExamenes, asignarExamenEditar, actionEditarExamen, actionMensajeRegistrar } from '../actions/actionExamen.js';
import Snackbar from '@material-ui/core/Snackbar';
import { Alert as Mensaje } from '@material-ui/lab';
import Alert from 'react-bootstrap/Alert';
import { generarInput } from '../utilitario/GenerarInput.js';
import { reduxForm, Field } from 'redux-form';
import { requerido, validacionCientoCincuentaCaracteres, minimoTresCaracteres, validacionCincuentaCaracteres } from '../utilitario/ValidacionCampos.js';
import { Card, Table, ButtonGroup, Button, InputGroup, FormControl } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faEdit, faTrash, faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PopUpExamenRegistro from './PopUpExamenRegistro.js';


class ConsultaList extends React.Component {

    constructor(props) {
        super(props);
        this.handleClose = this.handleClose.bind(this);
    }

    state = {
        habilitado: false,
        recuperar: false,
        severidad: 'error',
        detallesConsulta: [],
        open: false,
        mensaje: '',
        books: [],
        search: '',
        currentPage: 1,
        booksPerPage: 5,
        sortToggle: true,
        codigoConsulta: 0,
        editarExamen: false,
        valor: null,
        editarDetalleConsulta: false,
    }



    componentDidMount() {
        this.props.actionGetExamenes();
    }

    handleClose() {
        if (this.state.open) {
            this.setState({ open: false });
        }
    }

    editConsulta = (examenEditar) => {
        if (!this.state.editarExamen) {
            this.setState({ editarExamen: true });
        }
        this.props.asignarExamenEditar(examenEditar);
    }

    ocultarEditar = () => {
        if (this.state.editarExamen) {
            this.setState({ editarExamen: false });
        }
    }

    deleteExamen = (idExamen) => {
        //this.state.codigoConsulta
        this.props.actionEliminarExamen(idExamen, this.state.codigoConsulta);
    }

    searchChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    cancelSearch = () => {
        this.props.actionGetExamenes();
        this.setState({ "search": '' });
    };

    searchData = () => {
        const { search } = this.state;
        var difficult_tasks = [];
        this.props.examenes.forEach(function (task) {
            if (task.nombre === search) {
                difficult_tasks.push(task);
            }
        });
        this.props.actionFiltrarExamenPorNombre(difficult_tasks);
    }

    handleSubmitExamen = formValues => {
        let examen = {
            'idExamen': formValues.id,
            'nombre': formValues.nombre,
            'descripcion': formValues.descripcion
        }
        this.props.actionEditarExamen(examen);
    }


    componentDidUpdate() {
        switch (this.props.mensajeExamen) {
            case 'Examen registrado':
                if (this.state.severidad !== 'success') {
                    this.setState({ severidad: 'success' });
                }
                if (!this.state.open) {
                    this.setState({ open: true });
                }
                if (this.state.mensaje !== 'Examen registrado') {
                    this.setState({ mensaje: 'Examen registrado' })
                    this.props.actionGetExamenes();
                }
                break;
            case 'Examen eliminado':
                if (this.state.severidad !== 'success') {
                    this.setState({ severidad: 'success' });
                }
                if (!this.state.open) {
                    this.setState({ open: true });
                }
                this.setState({ mensaje: 'Examen eliminado' })
                this.props.actionGetExamenes();
                break;
            case 'Examen modificado':
                if (this.state.severidad !== 'success') {
                    this.setState({ severidad: 'success' });
                }
                if (!this.state.open) {
                    this.setState({ open: true });
                }
                if (this.state.editarExamen) {
                    this.setState({ editarExamen: false });
                }
                if (this.state.mensaje !== 'Examen modificado') {
                    this.setState({ mensaje: 'Examen modificado' })
                    this.props.actionGetExamenes();
                }
                break;
            case 'Examen asociado':
                if (this.state.severidad !== 'error') {
                    this.setState({ severidad: 'error' });
                }
                if (!this.state.open) {
                    this.setState({ open: true });
                }
                if (this.state.mensaje !== 'El examen tiene consultas asociadas') {
                    this.setState({ mensaje: 'El examen tiene consultas asociadas' })
                }
                break;
            case 'Ocurrio un error':
                if (this.state.severidad !== 'error') {
                    this.setState({ severidad: 'error' });
                }
                if (!this.state.open) {
                    this.setState({ open: true });
                }
                this.setState({ mensaje: 'Ocurrio un error' })
                break;
            default:
                break;
        }
        this.props.actionMensajeRegistrar('');
        //mensajeExamen
    }



    render() {
        const { search, editarExamen } = this.state;
        const { examenes } = this.props;

        return (
            <div>
                {editarExamen ? <>
                    <Card className={"border border-dark text-white"}>
                        <Card.Header className={"bg-dark"}>
                            <div style={{ "float": "left" }}>
                                <FontAwesomeIcon icon={faList} /> Editar examen
                            </div>
                        </Card.Header>
                        <Card.Body>
                            <form onSubmit={this.props.handleSubmit(this.handleSubmitExamen)}>
                                <div className="row">
                                    <div className="col-sm-3">
                                        <Field name="id" disabled={true} validate={[requerido]} component={generarInput} label="Codigo" />
                                    </div>
                                    <div className="col-sm-3">
                                        <Field name="nombre" validate={[requerido, validacionCincuentaCaracteres, minimoTresCaracteres]} component={generarInput} label='Nombre' />
                                    </div>
                                    <div className="col-sm-3">
                                        <Field name="descripcion" validate={[requerido, validacionCientoCincuentaCaracteres, minimoTresCaracteres]} component={generarInput} label="Descripcion" />
                                    </div>
                                    <div className="col-sm-1" style={{ padding: '15px' }}>
                                        <Button variant="primary" style={{ fontSize: '14px' }} type='submit'>Editar</Button>{''}
                                    </div>
                                    <div className="col-sm-1" style={{ padding: '15px' }}>
                                        <Button variant="danger" style={{ fontSize: '14px' }} onClick={this.ocultarEditar} >Cancelar</Button>{''}
                                    </div>
                                </div>
                            </form>
                        </Card.Body>
                    </Card>
                </> : <><Card className={"border border-dark text-white"}>
                    <Card.Header className={"bg-dark"}>
                        <div style={{ "float": "left" }}>
                            <FontAwesomeIcon icon={faList} /> Lista de examenes
                        </div>
                        <div style={{ "float": "right" }}>
                            {(editarExamen | examenes.length === 0) & search === '' ?
                                <> </> :
                                <InputGroup size="sm">
                                    <FormControl placeholder="Buscar por nombre" name="search" value={search}
                                        className={"info-border bg-dark text-white"}
                                        onChange={this.searchChange} />
                                    <InputGroup.Append>
                                        <Button size="sm" variant="outline-info" type="button" onClick={this.searchData}>
                                            <FontAwesomeIcon icon={faSearch} />
                                        </Button>
                                        <Button size="sm" variant="outline-danger" type="button" onClick={this.cancelSearch}>
                                            <FontAwesomeIcon icon={faTimes} />
                                        </Button>
                                    </InputGroup.Append>
                                </InputGroup>
                            }
                        </div>
                    </Card.Header>
                    <Card.Body>
                        {
                            examenes.length === 0 ?
                                <Alert variant='info'>
                                    Sin examenes asociados
                                    </Alert> : <>
                                    <Table bordered hover striped>
                                        <thead className='thead-dark'>
                                            <tr>
                                                <th>Codigo</th>
                                                <th>Nombre</th>
                                                <th>Descripcion</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                examenes.map((book) => (
                                                    <tr key={book.idExamen}>
                                                        <td>{book.idExamen}</td>
                                                        <td>{book.nombre}</td>
                                                        <td>{book.descripcion}</td>
                                                        <td>
                                                            <ButtonGroup>
                                                                <Button size="sm" variant="outline-info" onClick={this.editConsulta.bind(this, book)}><FontAwesomeIcon icon={faEdit} /></Button>
                                                                <Button size="sm" variant="outline-danger" onClick={this.deleteExamen.bind(this, book.idExamen)}><FontAwesomeIcon icon={faTrash} /></Button>
                                                            </ButtonGroup>
                                                        </td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </Table>
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

                    </Card.Body>
                    <Card.Footer>
                        <div style={{ "float": "right", color: 'black' }}>
                            <PopUpExamenRegistro />
                        </div>
                    </Card.Footer>
                </Card>
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
        mensajeExamen: state.examen.mensaje,
        examenes: state.examen.examenes,
        initialValues: {
            id: state.examen.examenEditar.idExamen,
            nombre: state.examen.examenEditar.nombre,
            descripcion: state.examen.examenEditar.descripcion,
        }
    }
}

let formulario = reduxForm({
    form: 'registrarExamen',
    enableReinitialize: true
})(ConsultaList)



export default withRouter(connect(mapStateToProps, { actionFiltrarExamenPorNombre, asignarExamenEditar, actionGet, actionEditarExamen, actionEditarConsulta, actionGetExamenesNoAsociados, actionGetExamenes, actionEliminarExamen, actionEditarDetalleConsulta, actionMedicos, actionEliminarDetalleConsulta, asignarDetalleConsultaEditar, actionGetDetallesConExamenes, actionMensajeRegistrar, asignarConsultaEditar, actionEliminarConsulta })(formulario));