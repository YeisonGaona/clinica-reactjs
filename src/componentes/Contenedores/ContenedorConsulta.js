import React from 'react';

//Compoentes de librerias
import Snackbar from '@material-ui/core/Snackbar';
import { Alert as Mensaje } from '@material-ui/lab';
import { Card, Button, InputGroup, FormControl } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faSearch, faTimes, faEdit } from '@fortawesome/free-solid-svg-icons';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

//Componentes personalizados
import TablaConsulta from "../Consulta/TablaConsulta.js";
import EditarConsulta from '../Consulta/EditarConsulta.js';
import ContenedorDetalleConsulta from '../Contenedores/ContenedorDetalleConsulta.js';
import ContenedorExamen from '../Contenedores/ContenedorExamen.js';
import PopUp from '../Consulta/PopUpConsulta.js';

//redux
import { asignarConsultaEditar, filtrarConsultas, actionGet as actionGetConsultas } from '../../actions/actionConsulta.js';
import { actionGetFormulario } from '../../actions/actionMedico.js';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// import PopUpConsulta from './PopUpConsulta.js';

class ContenedorConsulta extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            search: '',
            editarHabilitado: false,
            verConsulta: true,
            verDetalle: false,
            verExamen: false,
            control: 'consulta'
        }
    }



    componentDidMount() {
        if (sessionStorage.getItem('access-token') === null) {
            this.props.history.push('/');
        }
        this.props.actionGetFormulario();
    }

    componentDidUpdate() {
        if (sessionStorage.getItem('access-token') === null) {
            this.props.history.push('/');
        }
        if(this.props.mensajeConsulta==='Token invalido'){
            this.props.history.push('/');
            sessionStorage.clear();
        }
    }

    habilitarEditarConsulta = (consultaEditar) => {
        if (!this.state.editarHabilitado) {
            this.setState({ editarHabilitado: true });
            this.props.asignarConsultaEditar(consultaEditar);
        } else {
            this.setState({ editarHabilitado: false });
        }
    }

    handleClose() {
        if (this.state.open) {
            this.setState({ open: false });
        }
    }

    cambiarVerConsulta = () => {
        this.setState({ verDetalle: false });
        this.setState({ verExamen: false });
        this.setState(estadoAnterior => ({
            verConsulta: !estadoAnterior.verConsulta
        }));
    }

    cambiarVerDetalle = () => {
        this.setState({ verExamen: false });
        this.setState({ verConsulta: false });
        this.setState(estadoAnterior => ({
            verDetalle: !estadoAnterior.verDetalle
        }));
    }

    cambiarVerExamen = () => {
        this.setState({ verDetalle: false });
        this.setState({ verConsulta: false });
        this.setState(estadoAnterior => ({
            verExamen: !estadoAnterior.verExamen
        }));
    }

    searchChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    cancelSearch = () => {
        this.props.actionGetConsultas();
        this.setState({ "search": '' });
    };


    searchData = () => {
        const { search } = this.state;
        var difficult_tasks = [];
        this.props.consultas.forEach(function (task) {
            // console.log(task.medico.nombreMedico);
            if (task.medico.nombreMedico === search) {
                difficult_tasks.push(task);
            }
        });
        this.props.filtrarConsultas(difficult_tasks);
    }

    render() {
        const { search, mensaje, open, severidad, editarHabilitado, verConsulta, verDetalle, verExamen } = this.state;
        const { medicos, detallesExamen, consultas, mensajeConsulta } = this.props;
        return (
            <>
                {mensajeConsulta === 'Sin permiso' ?
                    <Mensaje draggable={true} style={{ fontSize: '13px' }} severity={'error'}>No tiene suficientes permisos</Mensaje>
                    :
                    <div>

                        <ExpansionPanel expanded={verConsulta} onChange={this.cambiarVerConsulta}>
                            <ExpansionPanelSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel2a-content"
                                id="panel2a-header">
                                <Typography style={{ fontSize: '15px' }}>Consultas</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <Card className={"border border-dark text-white"} style={{ width: '100%' }}>
                                    <Card.Header className={"bg-dark"}>
                                        <div style={{ "float": "left" }}>
                                            <FontAwesomeIcon icon={editarHabilitado ? faEdit : faList} />
                                            {
                                                editarHabilitado ?
                                                    <> Editar consulta</> :
                                                    <> Lista de consultas</>
                                            }
                                        </div>
                                        <div style={{ "float": "right" }}>
                                            {(editarHabilitado | consultas.length === 0) & search === '' ?
                                                <> </> :
                                                <InputGroup size="sm">
                                                    <FormControl placeholder="Buscar consulta por medico" name="search" value={search}
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
                                        <>
                                            <EditarConsulta medicos={medicos} editarHabilitado={editarHabilitado} habilitarEditarConsulta={this.habilitarEditarConsulta} />
                                        </>
                                        <>
                                            <TablaConsulta editarHabilitado={editarHabilitado} habilitarEditarConsulta={this.habilitarEditarConsulta} cambiarVerDetalle={this.cambiarVerDetalle} />
                                        </>

                                    </Card.Body>
                                    <Card.Footer>
                                        <div style={{ "float": "right", color: 'black' }}>
                                            <PopUp />
                                        </div>
                                    </Card.Footer>
                                </Card>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>

                        <ExpansionPanel expanded={verDetalle} disabled={detallesExamen.consulta.id === 0 ? true : false} onChange={this.cambiarVerDetalle} >
                            <ExpansionPanelSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel2a-content"
                                id="panel2a-header">
                                <Typography style={{ fontSize: '15px' }}>Detalles de consulta</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <ContenedorDetalleConsulta />
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                        <ExpansionPanel expanded={verExamen} disabled={detallesExamen.consulta.id === 0 ? true : false} onChange={this.cambiarVerExamen} >
                            <ExpansionPanelSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel2a-content"
                                id="panel2a-header">
                                <Typography style={{ fontSize: '15px' }}>Examen</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <ContenedorExamen />
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                        <Snackbar open={open} autoHideDuration={6000} onClose={this.handleClose}>
                            <Mensaje variant="filled" severity={severidad}>
                                {mensaje}
                            </Mensaje>
                        </Snackbar>
                    </div >

                }

            </>

        );
    }
}

function mapStateToProps(state) {
    return {
        consultaEditar: state.consulta.consultaEditar,
        medicos: state.medico.medicos,
        detallesExamen: state.detalle.detallesExamen,
        consultas: state.consulta.consultas,
        mensajeConsulta: state.consulta.mensaje
    }
}


export default withRouter(connect(mapStateToProps, { asignarConsultaEditar, filtrarConsultas, actionGetFormulario, actionGetConsultas })(ContenedorConsulta));