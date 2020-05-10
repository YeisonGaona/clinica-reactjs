import React from 'react';

// Actions
import { actionGet, actionMensajeRegistrar, asignarMedicoEditar, actionEditarExamen, actionEliminarMedico, filtrarMedicos } from '../actions/actionMedico.js';

// Componentes
import Snackbar from '@material-ui/core/Snackbar';
import { Alert as Mensaje } from '@material-ui/lab';
import Alert from 'react-bootstrap/Alert';
import PopUpMedico from './PopUpMedico.js';
import { generarInput } from '../utilitario/GenerarInput.js';
import { Card, Table, ButtonGroup, Button, InputGroup, FormControl } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// validaciones
import { requerido, validacionCincuentaCaracteres, validacionQuinceCaracteres, minimoTresCaracteres } from '../utilitario/ValidacionCampos.js';

// iconos
import { faList, faEdit, faTrash, faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';

// Redux
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { reduxForm, Field } from 'redux-form';



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
        editarMedico: false,
        valor: null,
        editarDetalleConsulta: false,
    }



    componentDidMount() {
        this.props.actionGet();
    }

    handleClose() {
        if (this.state.open) {
            this.setState({ open: false });
        }
    }

    editConsulta = (examenEditar) => {
        if (!this.state.editarMedico) {
            this.setState({ editarMedico: true });
        }
        this.props.asignarMedicoEditar(examenEditar);
    }

    ocultarEditar = () => {
        if (this.state.editarMedico) {
            this.setState({ editarMedico: false });
        }
    }

    deleteExamen = (idMedico) => {
        //this.state.codigoConsulta
        this.props.actionEliminarMedico(idMedico);
    }

    searchChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    cancelSearch = () => {
        this.props.actionGet();
        this.setState({ "search": '' });
    };

    searchData = () => {
        const { search } = this.state;
        var difficult_tasks = [];
        this.props.medicos.forEach(function (task) {
            if (task.nombreMedico === search) {
                difficult_tasks.push(task);
            }
        });
        this.props.filtrarMedicos(difficult_tasks);
    }

    handleSubmitExamen = formValues => {
        let medico = {
            'id': formValues.id,
            'cedula': formValues.cedula,
            'nombreMedico': formValues.nombreMedico,
            'direccion': {
                'detalle': formValues.direccion
            }
        }
        this.props.actionEditarExamen(medico);
    }


    componentDidUpdate() {
        switch (this.props.mensaje) {
            case 'Medico registrado':
                if (this.state.severidad !== 'success') {
                    this.setState({ severidad: 'success' });
                }
                if (!this.state.open) {
                    this.setState({ open: true });
                }
                if (this.state.mensaje !== 'Medico registrado') {
                    this.setState({ mensaje: 'Medico registrado' })
                    this.props.actionMensajeRegistrar('');
                    this.props.actionGet();
                }
                break;
            case 'Medico eliminado':
                if (this.state.severidad !== 'success') {
                    this.setState({ severidad: 'success' });
                }
                if (!this.state.open) {
                    this.setState({ open: true });
                }
                this.setState({ mensaje: 'Medico eliminado' })
                this.props.actionGet();
                break;
            case 'Medico modificado':
                if (this.state.severidad !== 'success') {
                    this.setState({ severidad: 'success' });
                }
                if (!this.state.open) {
                    this.setState({ open: true });
                }
                if (this.state.editarMedico) {
                    this.setState({ editarMedico: false });
                }
                this.setState({ mensaje: 'Informacion del medico actualizada' })
                this.props.actionMensajeRegistrar('');

                this.props.actionGet();
                break;
            case 'Medico asociado':
                if (this.state.severidad !== 'error') {
                    this.setState({ severidad: 'error' });
                }
                if (!this.state.open) {
                    this.setState({ open: true });
                }
                this.setState({ mensaje: 'El medico tiene consultas asociadas' })
                this.props.actionMensajeRegistrar('');
                break;
            case 'Cedula registrada':
                if (this.state.severidad !== 'error') {
                    this.setState({ severidad: 'error' });
                }
                if (!this.state.open) {
                    this.setState({ open: true });
                }
                this.setState({ mensaje: 'La cedula ingresada ya esta registrada' })
                this.props.actionMensajeRegistrar('');
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
        const { search, editarMedico } = this.state;
        const { medicos } = this.props;

        return (
            <div>
                {editarMedico ? <>
                    <Card className={"border border-dark text-white"}>
                        <Card.Header className={"bg-dark"}>
                            <div style={{ "float": "left" }}>
                                <FontAwesomeIcon icon={faList} /> Editar medico
                            </div>
                        </Card.Header>
                        <Card.Body>
                            <form onSubmit={this.props.handleSubmit(this.handleSubmitExamen)}>
                                <div className="row">
                                    <div className="col-sm-3">
                                        <Field name="id" disabled={true} validate={[requerido]} component={generarInput} label="Codigo" />
                                    </div>
                                    <div className="col-sm-3">
                                        <Field name="cedula" type='number' validate={[requerido, minimoTresCaracteres, validacionQuinceCaracteres]} component={generarInput} label='Cedula' />
                                    </div>
                                    <div className="col-sm-3">
                                        <Field name="nombreMedico" validate={[requerido, minimoTresCaracteres, validacionCincuentaCaracteres]} component={generarInput} label="Nombre" />
                                    </div>
                                    <div className="col-sm-3">
                                        <Field name="direccion" validate={[requerido, validacionCincuentaCaracteres, minimoTresCaracteres]} component={generarInput} label="Direccion" />
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
                            <FontAwesomeIcon icon={faList} /> Lista de medicos
                        </div>
                        <div style={{ "float": "right" }}>
                            {(editarMedico | medicos.length === 0) & search === '' ?
                                <> </>
                                :
                                <InputGroup size="sm">
                                    <FormControl placeholder="Search" name="Buscar por nombre" value={search}
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
                        {medicos.length === 0 ?
                            <Alert variant='info'>
                                Sin medicos registrados
                                         </Alert> :
                            <>
                                <Table bordered hover striped>
                                    <thead className='thead-dark'>
                                        <tr>
                                            <th>Cedula</th>
                                            <th>Nombre</th>
                                            <th>Direccion</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            medicos.map((book) => (
                                                <tr key={book.cedula}>
                                                    <td>{book.cedula}</td>
                                                    <td>{book.nombreMedico}</td>
                                                    <td>{book.direccion.detalle}</td>
                                                    <td>
                                                        <ButtonGroup>
                                                            <Button size="sm" variant="outline-info" onClick={this.editConsulta.bind(this, book)}><FontAwesomeIcon icon={faEdit} /></Button>
                                                            <Button size="sm" variant="outline-danger" onClick={this.deleteExamen.bind(this, book.id)}><FontAwesomeIcon icon={faTrash} /></Button>
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
                            <PopUpMedico />
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
        mensaje: state.medico.mensaje,
        medicos: state.medico.medicos,
        initialValues: {
            id: state.medico.medicoEditar.id,
            cedula: state.medico.medicoEditar.cedula,
            nombreMedico: state.medico.medicoEditar.nombreMedico,
            direccion: state.medico.medicoEditar.direccion.detalle,
        }
    }
}

let formulario = reduxForm({
    form: 'registrarExamen',
    enableReinitialize: true
})(ConsultaList)



export default withRouter(connect(mapStateToProps, { actionGet, actionMensajeRegistrar, asignarMedicoEditar, filtrarMedicos, actionEditarExamen, actionEliminarMedico })(formulario));