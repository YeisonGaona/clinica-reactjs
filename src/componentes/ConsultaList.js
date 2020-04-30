import React from 'react';
import { actionGet, actionEditarConsulta, actionMensajeRegistrar, asignarConsultaEditar, actionEliminarConsulta } from '../actions/actionConsulta.js';
import { actionGetDetallesConExamenes, asignarDetalleConsultaEditar, actionEditarConsulta as actionEditarDetalleConsulta, actionEliminarConsulta as actionEliminarDetalleConsulta } from '../actions/actionDetalleConsulta.js';
import { actionGet as actionMedicos } from '../actions/actionMedico.js';
import {actionEliminarExamenConsulta,actionGetExamenesNoAsociados} from '../actions/actionExamen.js';
import Snackbar from '@material-ui/core/Snackbar';
import Select from 'react-select';
import Alert from 'react-bootstrap/Alert';
import { Alert as Mensaje } from '@material-ui/lab';
import PopUpDetalleConsulta from './PopUpDetalleConsulta.js';
import PopUpExamen from './PopUpExamen.js';
import { generarInput } from '../utilitario/GenerarInput.js';
import { reduxForm, Field } from 'redux-form';
import { requerido, validacionCincuentaCaracteres, seleccione, validacionVeintiCincoCaracteres, minimoTresCaracteres } from '../utilitario/ValidacionCampos.js';
import { Card, Table, ButtonGroup, Button, InputGroup, FormControl } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faEdit, faTrash,faSearch, faTimes, faEye } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PopUpConsulta from './PopUpConsulta.js';

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
        editarConsulta: false,
        valor: null,
        editarDetalleConsulta: false,
    }



    componentDidMount() {
        this.props.actionGet();
        this.props.actionMedicos();

    }

    handleClose() {
        if (this.state.open) {
            this.setState({ open: false });
        }
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


    viewDetails = (consulta) => {
        this.props.actionGetDetallesConExamenes(consulta.id);
        this.setState({ detallesConsulta: consulta.detalleConsulta });
        this.setState({ codigoConsulta: consulta.id });

    }

    editConsulta = (consultaEditar) => {
        if (!this.state.editarConsulta) {
            this.setState({ editarConsulta: true });
        }
        this.props.asignarConsultaEditar(consultaEditar);
        this.setState({ valor: consultaEditar.medico.id });
    }

    ocultarEditar = () => {
        if (this.state.editarConsulta) {
            this.setState({ editarConsulta: false });
        }
    }

    editDetalleConssulta = (detalleConsultaEditar) => {
        if (!this.state.editarDetalleConsulta) {
            this.setState({ editarDetalleConsulta: true });
        }
        this.props.asignarDetalleConsultaEditar(detalleConsultaEditar);
    }

    ocultarEditarDetalle = () => {
        if (this.state.editarDetalleConsulta) {
            this.setState({ editarDetalleConsulta: false });
        }
    }

    deleteBook = (bookId) => {
        this.props.actionEliminarConsulta(bookId);
    };

    deleteDetalle = (detalleId) => {
        this.props.actionEliminarDetalleConsulta(detalleId)
    }

    deleteExamen = (idExamen) => {
        //this.state.codigoConsulta
        this.props.actionEliminarExamenConsulta(idExamen,this.state.codigoConsulta);
    }

    searchChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    handleSubmitConsulta = formValues => {
        let consulta = {
            'id': formValues.id,
            'fecha': formValues.fecha,
            'medico': {
                'id': formValues.medico.value
            }
        }
        this.props.actionEditarConsulta(consulta);
    }

    handleSubmitDetalleConsulta = formValues => {
        let detalle = {
            'id': formValues.idDetalle,
            'diagnostico': formValues.diagnostico,
            'tratamiento': formValues.tratamiento
        }
        this.props.actionEditarDetalleConsulta(detalle);
    }

    retornarValor = () => {
        return this.state.valor;
    }

    handleChange = selectedOption => {
        this.setState({ valor: selectedOption });
    };


    componentDidUpdate() {
        switch (this.props.mensaje) {
            case 'Consulta editada':
                if (this.state.severidad !== 'success') {
                    this.setState({ severidad: 'success' });
                }
                if (!this.state.open) {
                    this.setState({ open: true });
                }
                if (this.state.editarConsulta) {
                    this.setState({ editarConsulta: false });
                }
                this.setState({ mensaje: 'Consulta editada' })
                this.setState({ detallesConsulta: [] })
                this.props.actionGet();
                break;
            case 'Consulta eliminada':
                if (this.state.severidad !== 'success') {
                    this.setState({ severidad: 'success' });
                }
                if (!this.state.open) {
                    this.setState({ open: true });
                }
                this.setState({ mensaje: 'Consulta eliminada' })
                this.setState({ detallesConsulta: [] })
                this.setState({ codigoConsulta: 0 });
                this.props.actionGet();
                break;
            case 'Consulta registrada':
                if (this.state.severidad !== 'success') {
                    this.setState({ severidad: 'success' });
                }
                if (!this.state.open) {
                    this.setState({ open: true });
                }
                this.setState({ mensaje: 'Consulta registrada' })
                this.props.actionGet();
                break;
            case 'Datos ingresados en formato incorrecto':
                if (this.state.severidad !== 'error') {
                    this.setState({ severidad: 'error' });
                }
                if (!this.state.open) {
                    this.setState({ open: true });
                }
                this.setState({ mensaje: 'Datos ingresados en formato incorrecto' })
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
        switch (this.props.mensajeDetalle) {
            case 'Detalle de consulta registrado':
                if (this.state.severidad !== 'success') {
                    this.setState({ severidad: 'success' });
                }
                if (!this.state.open) {
                    this.setState({ open: true });
                }
                if (this.state.editarConsulta) {
                    this.setState({ editarConsulta: false });
                }
                this.props.actionGetDetallesConExamenes(this.state.codigoConsulta);
                this.setState({ mensaje: 'Detalle de consulta registrado' })
                break;
            case 'Detalle consulta editada':
                if (this.state.severidad !== 'success') {
                    this.setState({ severidad: 'success' });
                }
                if (!this.state.open) {
                    this.setState({ open: true });
                }
                if (this.state.editarDetalleConsulta) {
                    this.setState({ editarDetalleConsulta: false });
                }
                this.props.actionGetDetallesConExamenes(this.state.codigoConsulta);
                this.setState({ mensaje: 'Detalle de consulta actualizado' })
                break;
            case 'Detalle consulta eliminada':
                if (this.state.severidad !== 'success') {
                    this.setState({ severidad: 'success' });
                }
                if (!this.state.open) {
                    this.setState({ open: true });
                }
                if (this.state.editarDetalleConsulta) {
                    this.setState({ editarDetalleConsulta: false });
                }
                this.props.actionGetDetallesConExamenes(this.state.codigoConsulta);
                this.setState({ mensaje: 'Detalle de consulta eliminado' })
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

        switch (this.props.mensajeExamen) {
            case 'Examen agregado':
                if (this.state.severidad !== 'success') {
                    this.setState({ severidad: 'success' });
                }
                if (!this.state.open) {
                    this.setState({ open: true });
                }
                if (this.state.editarConsulta) {
                    this.setState({ editarConsulta: false });
                }
                this.props.actionGetDetallesConExamenes(this.state.codigoConsulta);
                this.props.actionGetExamenesNoAsociados(this.state.codigoConsulta);
                this.setState({ mensaje: 'Examen agregado a la consulta' })
                break;
            case 'Examen eliminado':
                if (this.state.severidad !== 'success') {
                    this.setState({ severidad: 'success' });
                }
                if (!this.state.open) {
                    this.setState({ open: true });
                }
                this.props.actionGetDetallesConExamenes(this.state.codigoConsulta);
                this.props.actionGetExamenesNoAsociados(this.state.codigoConsulta);
                this.setState({ mensaje: 'Examen eliminado de la consulta' })
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
        //mensajeExamen
    }



    render() {
        const { search, editarConsulta, codigoConsulta, editarDetalleConsulta } = this.state;
        const { consultas, detallesExamen } = this.props;

        return (
            <div>
                {editarConsulta ? <>
                    <Card className={"border border-dark text-white"}>
                        <Card.Header className={"bg-dark"}>
                            <div style={{ "float": "left" }}>
                                <FontAwesomeIcon icon={faList} /> Editar consulta
                            </div>
                        </Card.Header>
                        <Card.Body>
                            <form onSubmit={this.props.handleSubmit(this.handleSubmitConsulta)}>
                                <div className="row">
                                    <div className="col-sm-3">
                                        <Field name="id" type="number" disabled={true} validate={[requerido]} component={generarInput} label="Codigo" />
                                    </div>
                                    <div className="col-sm-3" style={{ color: 'black', paddingTop: '13px' }}>
                                        <Field name="medico" validate={[seleccione]} component={ReduxFormSelect} valor={this.retornarValor()} onChange={this.handleChange} options={this.opcionesMedicos()} />
                                    </div>
                                    <div className="col-sm-3">
                                        <Field name="fecha" type='date' validate={[requerido]} component={generarInput} label="Fecha" />
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
                            <FontAwesomeIcon icon={faList} /> Lista de consultas
                        </div>
                        <div style={{ "float": "right" }}>
                            <InputGroup size="sm">
                                <FormControl placeholder="Search" name="search" value={search}
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
                        </div>
                    </Card.Header>
                    <Card.Body>
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
                                    consultas.length === 0 ?
                                        <tr align="center">
                                            <td colSpan="7">No hay consultas registradas</td>
                                        </tr> :
                                        consultas.map((book) => (
                                            <tr key={book.id}>
                                                <td>{book.id}</td>
                                                <td>{book.medico.nombreMedico}</td>
                                                <td>{book.fecha}</td>
                                                <td>
                                                    <ButtonGroup>
                                                        <Button size="sm" variant="outline-danger" onClick={this.editConsulta.bind(this, book)}><FontAwesomeIcon icon={faEdit} /></Button>
                                                        <Button size="sm" variant="outline-danger" onClick={this.deleteBook.bind(this, book.id)}><FontAwesomeIcon icon={faTrash} /></Button>
                                                        <Button size="sm" variant="outline-info" onClick={this.viewDetails.bind(this, book)}><FontAwesomeIcon icon={faEye} /></Button>
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
                    </Card.Body>
                    <Card.Footer>
                        <div style={{ "float": "right", color: 'black' }}>
                            <PopUpConsulta />
                        </div>
                    </Card.Footer>
                </Card>
                    </>}
                <br />
                <br />
                {/* Detalles de consulta */}
                {codigoConsulta === 0 ? <></> : <>
                    {editarDetalleConsulta ? <>
                        <Card className={"border border-dark text-white"}>
                            <Card.Header className={"bg-dark"}>
                                <div style={{ "float": "left" }}>
                                    <FontAwesomeIcon icon={faList} /> Editar detalle de consulta
                            </div>
                            </Card.Header>
                            <Card.Body>
                                <form onSubmit={this.props.handleSubmit(this.handleSubmitDetalleConsulta)}>
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <Field name="idDetalle" disabled={true} type="number"  validate={[requerido]} component={generarInput} label="Codigo" />
                                        </div>
                                        <div className="col-sm-3">
                                            <Field name="diagnostico" validate={[requerido, validacionVeintiCincoCaracteres, minimoTresCaracteres]} component={generarInput} label="Diagnostico" />
                                        </div>
                                        <div className="col-sm-3">
                                            <Field name="tratamiento" validate={[requerido, validacionCincuentaCaracteres, minimoTresCaracteres]} component={generarInput} label="Tratamiento" />
                                        </div>

                                        <div className="col-sm-1" style={{ padding: '15px' }}>
                                            <Button variant="primary" style={{ fontSize: '14px' }} type='submit'>Editar</Button>{''}
                                        </div>
                                        <div className="col-sm-1" style={{ padding: '15px' }}>
                                            <Button variant="danger" style={{ fontSize: '14px' }} onClick={this.ocultarEditarDetalle} >Cancelar</Button>{''}
                                        </div>
                                    </div>
                                </form>
                            </Card.Body>
                        </Card>
                    </> : <>
                            <Card className={"border border-dark text-white"}>
                                <Card.Header className='bg-dark'>
                                    <div style={{ "float": "left" }}>
                                        <FontAwesomeIcon icon={faList} /> Detalles de consulta
                            </div>
                                    {detallesExamen.consulta.detalleConsultaDto.length === 0 ? <></> : <>
                                        <div style={{ "float": "right" }}>
                                            <InputGroup size="sm">
                                                <FormControl placeholder="Search" name="search" value={search}
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
                                        </div>
                                    </>}
                                </Card.Header>
                                <Card.Body>
                                    {detallesExamen.consulta.detalleConsultaDto.length === 0 ?
                                        <>
                                            <Alert variant='info'>
                                                Sin detalles de consulta
                                            </Alert>
                                        </> :
                                        <>
                                            <Table bordered hover striped>
                                                <thead className='thead-dark'>
                                                    <tr>
                                                        <th>Codigo</th>
                                                        <th>Diagnostico</th>
                                                        <th>Tratamiento</th>
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
                                                                        <Button size="sm" variant="outline-danger" onClick={this.deleteDetalle.bind(this, book.id)}><FontAwesomeIcon icon={faTrash} /></Button>
                                                                        <Button size="sm" variant="outline-danger" onClick={this.editDetalleConssulta.bind(this, book)}><FontAwesomeIcon icon={faEdit} /></Button>
                                                                        {/* <Button size="sm" variant="outline-danger" onClick={this.deleteBook.bind(this, book.id)}><FontAwesomeIcon icon={faTrash} /></Button> */}
                                                                    </ButtonGroup>
                                                                </td>
                                                            </tr>
                                                        ))
                                                    }
                                                </tbody>
                                            </Table>
                                            {/* <div style={{ "float": "left" }}>
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
                                    </div> */}
                                        </>}
                                </Card.Body>
                                <Card.Footer>
                                    <div style={{ "float": "right", color: 'black' }}>
                                        <PopUpDetalleConsulta codigoConsulta={codigoConsulta} />
                                    </div>
                                </Card.Footer>
                            </Card>
                        </>}
                </>}
                <br />
                <br />
                {/* Examenes asociados */}
                {codigoConsulta === 0 ? <></> : <>
                    <Card className={"border border-dark text-white"}>
                        <Card.Header className='bg-dark'>
                            <div style={{ "float": "left" }}>
                                <FontAwesomeIcon icon={faList} /> Examenes asociados
                            </div>
                            {detallesExamen.listaExamen.length === 0 ? <></> : <>
                                <div style={{ "float": "right" }}>
                                    <InputGroup size="sm">
                                        <FormControl placeholder="Search" name="search" value={search}
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
                                </div>
                            </>}
                        </Card.Header>
                        <Card.Body>
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
                                                                <Button size="sm" variant="outline-danger" onClick={this.deleteExamen.bind(this, book.idExamen)}><FontAwesomeIcon icon={faTrash} /></Button>
                                                            </ButtonGroup>
                                                        </td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </Table>
                                    {/* <div style={{ "float": "left" }}>
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
                                    </div> */}
                                </>}
                        </Card.Body>
                        <Card.Footer>
                            <div style={{ "float": "right", color: 'black' }}>
                                <PopUpExamen codigoConsulta={codigoConsulta} />
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

export const ReduxFormSelect = props => {
    const customStyles = {
        option: (provided, state) => ({
            ...provided,
            fontSize: 13
        }),
        control: styles => ({ ...styles, backgroundColor: 'white', color: 'black', fontSize: 13, fontFamily: 'sans-serif' }),
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
                value={props.valor}
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
        mensajeExamen:state.examen.mensaje,
        mensajeDetalle: state.detalle.mensaje,
        consultas: state.consulta.consultas,
        detallesExamen: state.detalle.detallesExamen,
        medicos: state.medico.medicos,
        examenesNoAsociados: state.examen.examenesNoAsociados,
        initialValues: {
            id: state.consulta.consultaEditar.id,
            nombreMedico: state.consulta.consultaEditar.nombreMedico,
            fecha: state.consulta.consultaEditar.fecha,
            diagnostico: state.detalle.detalleEditar.diagnostico,
            tratamiento: state.detalle.detalleEditar.tratamiento,
            idDetalle: state.detalle.detalleEditar.id
        }
    }
}

let formulario = reduxForm({
    form: 'registrarConsultaList',
    enableReinitialize: true
})(ConsultaList)



export default withRouter(connect(mapStateToProps, { actionGet, actionEditarConsulta,actionGetExamenesNoAsociados, actionEliminarExamenConsulta,actionEditarDetalleConsulta, actionMedicos, actionEliminarDetalleConsulta, asignarDetalleConsultaEditar, actionGetDetallesConExamenes, actionMensajeRegistrar, asignarConsultaEditar, actionEliminarConsulta })(formulario));