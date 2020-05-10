import React from 'react';

//Compoentes de librerias
import Snackbar from '@material-ui/core/Snackbar';
import { Alert as Mensaje } from '@material-ui/lab';
import { Card, } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faEdit } from '@fortawesome/free-solid-svg-icons';

//Componentes personalizados
import TablaDetalleConsulta from "../DetalleConsulta/TablaDetalleConsulta.js";
import EditarDetalleConsulta from '../DetalleConsulta/EditarDetalleConsulta.js';

//redux
import { asignarDetalleConsultaEditar,filtrarDetalles,actionGetDetallesConExamenes } from '../../actions/actionDetalleConsulta.js';
import { actionGet } from '../../actions/actionMedico.js';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import PopUp from '../DetalleConsulta/PopUpDetalleConsulta.js';

class ContenedorConsulta extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            search: '',
            editarHabilitado: false
        }
    }

    habilitarEditarDetalleConsulta = (detalleEditar) => {
        if (!this.state.editarHabilitado) {
            this.setState({ editarHabilitado: true });
            this.props.asignarDetalleConsultaEditar(detalleEditar);
        } else {
            this.setState({ editarHabilitado: false });
        }
    }

    searchChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    cancelSearch = () => {
        // this.props.actionGetConsultas();
        this.props.actionGetDetallesConExamenes(this.props.detallesExamen.consulta.id);
        this.setState({ "search": '' });
    };

    searchData = () => {
        const { search } = this.state;
        var difficult_tasks = [];
        this.props.detallesExamen.consulta.detalleConsultaDto.forEach(function (task) {
            if (task.diagnostico === search) {
                difficult_tasks.push(task);
            }
        });
        this.props.filtrarDetalles(difficult_tasks);
    }

    render() {
        const { mensaje, open, severidad, editarHabilitado } = this.state;

        return (
            <div style={{ width: '100%' }}>
                <Card className={"border border-dark text-white"} >
                    <Card.Header className={"bg-dark"}>
                        <div style={{ "float": "left" }}>
                            <FontAwesomeIcon icon={editarHabilitado ? faEdit : faList} />

                            {editarHabilitado ?
                                <> Editar consulta</> :
                                <> Lista de detalles consultas</>
                            }
                        </div>
                    </Card.Header>
                    <Card.Body>
                        <>
                            <EditarDetalleConsulta editarHabilitado={editarHabilitado} habilitarEditarDetalleConsulta={this.habilitarEditarDetalleConsulta} />
                        </>
                        <>
                            <TablaDetalleConsulta editarHabilitado={editarHabilitado} habilitarEditarDetalleConsulta={this.habilitarEditarDetalleConsulta} />
                        </>

                    </Card.Body>
                    <Card.Footer>
                        <div style={{ "float": "right", color: 'black' }}>
                            <PopUp />
                        </div>
                    </Card.Footer>
                </Card>
                <Snackbar open={open} autoHideDuration={6000} onClose={this.handleClose}>
                    <Mensaje variant="filled" severity={severidad}>
                        {mensaje}
                    </Mensaje>
                </Snackbar>
            </div >
        );
    }
}

function mapStateToProps(state) {
    return {
        consultaEditar: state.consulta.consultaEditar,
        medicos: state.medico.medicos,
        detallesExamen: state.detalle.detallesExamen
    }
}


export default withRouter(connect(mapStateToProps, { actionGet, asignarDetalleConsultaEditar,filtrarDetalles,actionGetDetallesConExamenes })(ContenedorConsulta));