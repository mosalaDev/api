import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, CircularProgress, Typography } from '@mui/material';
import Alert from '@mui/lab/Alert';
import './style.css';
import TextInput from '../../component/Inputs/TextInput';

import { loginAdmin, getErrors, getReqStatus, actions } from '../../reducers/admin';

const LoginPage = (props) => {
    const { successUrl, successCalback } = props;
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();

    const error = useSelector(getErrors);
    const reqSt = useSelector(getReqStatus);
    const loading = reqSt === 'loading';

    const canSubmit = username !== "" && password !== "" && !loading;
    const dispatch = useDispatch();
    const handleSubmit = (e) => {
        e.preventDefault();

        if (canSubmit) {
            dispatch(loginAdmin({ username, password })).then(() => {
                dispatch(actions.resetStatus());
                document.cookie = "aid = monCookie ; httpOnly";
            });
        }
    };

    React.useEffect(() => {
        return () => {
            dispatch(actions.resetErrors());
        };
    }, [dispatch]);

    React.useEffect(() => {
        if (reqSt === 'fulfilled') {
            if (typeof successCalback === 'function') {
                successCalback();
            } else if (typeof successUrl === 'string') {
                history.push(successUrl);
            }
        }
    }, [history, reqSt, successCalback, successUrl]);

    return (
        <div className="login-form-container">
            <form className="login-form">
                <Typography variant="h5" style={{ marginBottom: 15 }}>Connexion</Typography>
                {error && <Alert severity="error" variant="standard">{error.message}</Alert>}
                <div className="form-controles-wrapper">
                    <TextInput
                        label="Téléphone"
                        type="tel"
                        id="tel"
                        fullWidth
                        value={username}
                        inputStyles={{ marginTop: 5 }}
                        onChange={e => setUsername(e.target.value)}
                        placeholder="Votre numéro de téléphone"
                        inputProps={{ style: { paddingTop: 14.5, paddingBottom: 14.5 } }}
                    />
                    <TextInput
                        label="Mot de passe"
                        type="password"
                        id="password"
                        placeholder="Votre mot de passe"
                        fullWidth
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        inputStyles={{ marginTop: 5 }}
                        inputProps={{ style: { paddingTop: 14.5, paddingBottom: 14.5 } }}
                        style={{
                            marginTop: 20
                        }}
                    />
                    <Link to="/mot_de_passe_oublié" style={{ color: "#0020b1", fontWeight: 600, display: 'block', marginTop: 10 }}>
                        <Typography variant="body2" style={{ fontWeight: 600 }} color="inherit">Mot de passe oublié?</Typography>
                    </Link>
                    <Button
                        className="btn"
                        variant="contained"
                        color="primary"
                        disableElevation
                        fullWidth
                        size="medium"
                        type="submit"
                        onClick={handleSubmit}
                        style={{ marginTop: 20, fontSize: 18 }}
                    >
                        Se connecter
                        {loading && <CircularProgress size={10} style={{ color: '#fff', marginLeft: 20 }} />}
                    </Button>
                </div>
            </form>
        </div>
    )
}


LoginPage.propTypes = {
    successUrl: PropTypes.string,
    successCalback: PropTypes.func,
}

export default LoginPage;