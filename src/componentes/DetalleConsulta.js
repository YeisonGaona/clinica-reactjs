
import React from 'react';
import MaterialTable from 'material-table';
import { reduxForm } from 'redux-form';
import { actionGet,actionEditarConsulta,actionEliminarConsulta,actionMensajeRegistrar} from '../actions/actionDetalleConsulta.js';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
// import { actionLoginUsuario, actualizarMensajeLogin, asignarNombreUsuario, actionAsignarIp, actionRecuperarContrasena, actualizarMensajeInicio } from '../../actions/actionsUsuario.js'
// import { consultarConfiguracionLogin } from '../../actions/actionConfiguracion.js';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PopUpDetalleConsulta from './PopUpDetalleConsulta.js';


class Detalle extends React.Component {

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
        mensaje: ''
    }



    componentDidMount() {
        this.props.actionGet();
    }

    handleClose() {
        if (this.state.open) {
            this.setState({ open: false });
        }
    }

    componentDidUpdate() {
        console.log('detalles',this.props.detalles);
        switch (this.props.mensaje) {
            case 'Consulta editada':
                if (this.state.severidad !== 'success') {
                    this.setState({ severidad: 'success' });
                }
                if (!this.state.open) {
                    this.setState({ open: true });
                }
                // if(!this.state.mensaje==='Consulta editada'){
                this.setState({ mensaje: 'Detalle consulta editado' })
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
                this.setState({ mensaje: 'Detalle consulta eliminado' })
                this.setState({ detallesConsulta: [] })
                this.props.actionGet();
                break;
            case 'Consulta registrada':
                if (this.state.severidad !== 'success') {
                    this.setState({ severidad: 'success' });
                }
                if (!this.state.open) {
                    this.setState({ open: true });
                }
                this.setState({ mensaje: 'Detalle consulta registrado' })
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
    }



    render() {
        return (
            <div>
                <div style={{ paddingTop: '30px', paddingLeft: '30px' }}>
                    <PopUpDetalleConsulta />

                </div>
                <MaterialTable
                    title=""
                    localization={{
                        header: {
                            actions: ' '
                        },
                        pagination: {
                            nextTooltip: 'Siguiente ',
                            previousTooltip: 'Anterior',
                            labelDisplayedRows: '{from}-{to} de {count}',
                            lastTooltip: 'Ultima pagina',
                            firstTooltip: 'Primera pagina',
                            labelRowsSelect: 'Registros',
                            firstAriaLabel: 'oooo'
                        },
                        body: {
                            emptyDataSourceMessage: 'Aun no hay ningun detalle de consulta registrado',
                            deleteTooltip: 'Borrar detalle de consulta',
                            editTooltip: 'Editar detalle de consulta',
                            editRow: {
                                deleteText: 'Esta seguro de borrar el detalle de la consulta?',
                                cancelTooltip: 'cancelar',
                                saveTooltip: 'Confirmar cambios'
                            }
                        },
                        toolbar: {
                            searchTooltip: 'Buscar',
                            searchPlaceholder: 'Buscar'
                        }
                    }}
                    columns={[
                        { title: 'Codigo', field: 'id', headerStyle: estiloCabecera, cellStyle: estiloFila, editable: 'never' },
                        {
                            title: 'Diagnostico', field: 'diagnostico', headerStyle: estiloCabecera, cellStyle: estiloFila,
                            editComponent: props => (
                                <input
                                    type="text"
                                    value={props.value}
                                    onChange={e => props.onChange(e.target.value)}
                                    required
                                ></input>
                            )
                        },
                        {
                            title: 'Tratamiento', field: 'tratamiento', headerStyle: estiloCabecera, cellStyle: estiloFila,
                            editComponent: props => (
                                <input
                                    type="text"
                                    value={props.value}
                                    onChange={e => props.onChange(e.target.value)}
                                    required
                                ></input>
                            )
                        }
                    ]}
                    data={this.props.detalles}
                    options={{
                        search: false,
                        rowStyle: estiloFila
                    }}
                    editable={{
                        onRowUpdate: (newData, oldData) =>
                            new Promise((resolve, reject) => {
                                this.props.actionEditarConsulta(newData);
                                resolve();
                            })
                        ,
                        onRowDelete: oldData =>
                            new Promise((resolve, reject) => {
                                this.props.actionEliminarConsulta(oldData.id);
                                resolve();
                            })
                        ,
                    }}
                />
                <Snackbar open={this.state.open} autoHideDuration={6000} onClose={this.handleClose}>
                    <Alert variant="filled" severity={this.state.severidad}>
                        {this.state.mensaje}
                    </Alert>
                </Snackbar>
            </div>
        )
    }
}

const estiloCabecera = {
    fontSize: '15px',
    fontFamily: 'sans-serif',
    padding: '8px',
    background: '#034078',
    color:'white'

}

const estiloFila = {
    fontSize: '14px',
    fontFamily: 'sans-serif',
    padding: '8px',
}

function mapStateToProps(state) {
    return {
        mensaje: state.detalle.mensaje,
        detalles: state.detalle.detalles
    }
}

let formulario = reduxForm({
    form: 'detalleConsulta'
})(Detalle)



export default withRouter(connect(mapStateToProps, { actionGet,actionEditarConsulta,actionEliminarConsulta,actionMensajeRegistrar})(formulario));