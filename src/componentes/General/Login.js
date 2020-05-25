import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { generarInput } from '../../utilitario/GenerarInput.js';
import { requerido } from '../../utilitario/ValidacionCampos.js';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Alert from '@material-ui/lab/Alert';

import { actionLoginUsuario ,actualizarMensaje} from '../../actions/actionLogin.js';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';



class Login extends React.Component {

    state = {
        habilitado: false,
        recuperar: false,
        severidad: 'error'
    }

    handleSubmit = formValues => {
        this.props.actionLoginUsuario(formValues.nickname, formValues.contrasena);

    }

    componentDidUpdate() {
        const { mensaje ,actualizarMensaje}=this.props;
        if(mensaje!==''){
            switch (mensaje) {
                case 'Logeado':
                    this.props.history.push('/medicos');
                    actualizarMensaje('');
                    break;
                default:
                    break;
            }
        }
    }

    render() {
        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Paper style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '30px',
                    marginTop: '10em'
                }}
                    elevation={3}
                >
                    <Avatar style={{ background: 'blue' }} >
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Iniciar sesion
                    </Typography>
                    <form style={{ width: '100%' }} noValidate onSubmit={this.props.handleSubmit(this.handleSubmit)}>
                        <Field name="nickname" validate={[requerido]} component={generarInput} label="Nickname" />
                        <Field name="contrasena" validate={[requerido]} component={generarInput} type='password' label="Contraseña" />
                        <Field name="mensaje" component={generarMensaje} type={this.state.severidad}  label={this.props.mensaje}   />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                        >
                            Ingresar
                        </Button>
                    </form>
                </Paper>
            </Container>
        );
    }
}

const generarMensaje = ({ input, label, type, meta: { touched, error, warning } }) => (
    <div>
        <div>
            <br />
            {label === undefined | label === '' ? <div></div> : <Alert draggable={true} style={{fontSize:'13px'}} severity={type}>{label}</Alert>}
            <br />
        </div>
    </div>
)




function mapStateToProps(state) {
    return {
        mensaje: state.login.mensaje
    }
}

let formulario = reduxForm({
    form: 'iniciarSesion'
})(Login)

export default withRouter(connect(mapStateToProps, { actionLoginUsuario,actualizarMensaje })(formulario));