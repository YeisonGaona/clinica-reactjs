import React from 'react';

//Compoentes de librerias
import { Card} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, } from '@fortawesome/free-solid-svg-icons';

//Componentes personalizados
import TablaExamen from "../Examen/TablaExamen.js";

//redux
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { actionGetExamenesNoAsociados } from '../../actions/actionExamen.js';

import PopUp from '../Examen/PopUpExamen.js';

class ContenedorConsulta extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            search: ''
        }
    }

    componentDidMount() {
        this.props.actionGetExamenesNoAsociados(this.props.detallesExamen.consulta.id);
    }

    searchChange = event => {
        this.setState({
            [event.target.name] : event.target.value
        });
    };

    cancelSearch = () => {
        this.setState({"search" : ''});
    };

    searchData = (currentPage) => {
        console.log('buscar ',this.state.search);
    }

    render() {
        return (
            <div style={{ width: '100%' }}>
                <Card className={"border border-dark text-white"} >
                    <Card.Header className={"bg-dark"}>
                        <div style={{ "float": "left" }}>
                            <FontAwesomeIcon icon={faList} /> Lista de examenes
                        </div>
                    </Card.Header>
                    <Card.Body>
                        <>
                            <TablaExamen />
                        </>

                    </Card.Body>
                    <Card.Footer>
                        <div style={{ "float": "right", color: 'black' }}>
                            <PopUp />
                        </div>
                    </Card.Footer>
                </Card>
            </div >
        );
    }
}

function mapStateToProps(state) {
    return {
        medicos: state.medico.medicos,
        detallesExamen: state.detalle.detallesExamen,
    }
}


export default withRouter(connect(mapStateToProps, { actionGetExamenesNoAsociados })(ContenedorConsulta));