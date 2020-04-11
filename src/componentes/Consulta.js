import React from 'react';
import MaterialTable from 'material-table';
import MTableToolbar from '../utilitario/MTableToolbar.js';
import { reduxForm } from 'redux-form';
import { actionGet, actionEditarConsulta, actionMensajeRegistrar, actionEliminarConsulta } from '../actions/actionConsulta.js';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
// import { actionLoginUsuario, actualizarMensajeLogin, asignarNombreUsuario, actionAsignarIp, actionRecuperarContrasena, actualizarMensajeInicio } from '../../actions/actionsUsuario.js'
// import { consultarConfiguracionLogin } from '../../actions/actionConfiguracion.js';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PopUpConsulta from './PopUpConsulta.js';


class Consulta extends React.Component {

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
        switch (this.props.mensaje) {
            case 'Consulta editada':
                if (this.state.severidad !== 'success') {
                    this.setState({ severidad: 'success' });
                }
                if (!this.state.open) {
                    this.setState({ open: true });
                }
                // if(!this.state.mensaje==='Consulta editada'){
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
                    <PopUpConsulta />

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
                            emptyDataSourceMessage: 'Aun no hay ninguna consulta registrada',
                            deleteTooltip: 'Borrar consulta',
                            editTooltip: 'Editar consulta',
                            editRow: {
                                deleteText: 'Esta seguro de borrar la consulta?',
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
                            title: 'Nombre del medico', field: 'nombreMedico', headerStyle: estiloCabecera, cellStyle: estiloFila,
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
                            title: 'Fecha', field: 'fecha', headerStyle: estiloCabecera, cellStyle: estiloFila,
                            editComponent: props => (
                                <input
                                    type="date"
                                    value={props.value}
                                    onChange={e => props.onChange(e.target.value)}
                                    required
                                ></input>
                            )
                        }
                    ]}
                    data={this.props.consultas}
                    options={{
                        search: false,
                        rowStyle: estiloFila
                    }}
                    actions={[
                        {
                            icon: 'description',
                            tooltip: 'Ver los detalles',
                            onClick: (event, rowData) => {
                                this.setState({ detallesConsulta: rowData.detalleConsulta })
                            }
                        }
                    ]}
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
                {this.state.detallesConsulta.length === 0 ? <></> :
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
                                emptyDataSourceMessage: 'Aun no hay ningun usuario registrado'
                            },
                            toolbar: {
                                searchTooltip: 'Buscar',
                                searchPlaceholder: 'Buscar'
                            }
                        }}
                        columns={[
                            { title: 'Diagnostico', field: 'diagnostico', headerStyle: estiloCabecera, cellStyle: estiloFila },
                            { title: 'Tratamiento', field: 'tratamiento', headerStyle: estiloCabecera, cellStyle: estiloFila }
                        ]}
                        data={this.state.detallesConsulta}
                        options={{
                            search: false,
                            rowStyle: estiloFila

                        }}
                        components={{
                            Toolbar: props => (
                                <div className="row">
                                    <div className="col-sm-4">
                                        <div style={{ padding: '16px' }}>
                                        </div>
                                    </div>
                                    <div className="col-sm-8">
                                        <MTableToolbar {...props} />
                                    </div>
                                </div>
                            ),
                        }}
                    // editable={{
                    //     onRowAdd: newData =>
                    //         new Promise((resolve, reject) => {
                    //             setTimeout(() => {
                    //                 {
                    //                     const data = this.state.data;
                    //                     data.push(newData);
                    //                     this.setState({ data }, () => resolve());
                    //                 }
                    //                 resolve()
                    //             }, 1000)
                    //         }),
                    //     onRowUpdate: (newData, oldData) =>
                    //         new Promise((resolve, reject) => {
                    //             setTimeout(() => {
                    //                 {
                    //                     const data = this.state.data;
                    //                     const index = data.indexOf(oldData);
                    //                     data[index] = newData;
                    //                     this.setState({ data }, () => resolve());
                    //                 }
                    //                 resolve()
                    //             }, 1000)
                    //         }),
                    //     onRowDelete: oldData =>
                    //         new Promise((resolve, reject) => {
                    //             setTimeout(() => {
                    //                 {
                    //                     let data = this.state.data;
                    //                     const index = data.indexOf(oldData);
                    //                     data.splice(index, 1);
                    //                     this.setState({ data }, () => resolve());
                    //                 }
                    //                 resolve()
                    //             }, 1000)
                    //         }),
                    // }}
                    />
                }
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
        mensaje: state.consulta.mensaje,
        consultas: state.consulta.consultas
    }
}

let formulario = reduxForm({
    form: 'registrarConsulta'
})(Consulta)



export default withRouter(connect(mapStateToProps, { actionGet, actionEditarConsulta, actionMensajeRegistrar, actionEliminarConsulta })(formulario));