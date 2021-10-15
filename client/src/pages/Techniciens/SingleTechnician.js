import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { useParams } from 'react-router-dom';
import { Typography, Avatar, Grid, Paper, Button, useMediaQuery, useTheme, CircularProgress } from '@mui/material';
import SwitchUnstyled, { switchUnstyledClasses } from '@mui/core/SwitchUnstyled';
import { makeStyles } from '@mui/styles';
import { Box, styled } from '@mui/system';
import { useGetData, usePostData } from '../../utils/customeHooks';
import { LoadingPage, SpecialitiesGrid, Modal, AppMessage } from '../../component';
import { Check, School } from '@mui/icons-material';

export default function SingleTechnician() {
    const { id } = useParams();
    const [activating, setActivating] = useState(false);
    const [certifying, setCertifying] = useState(false);
    const [verifying, setVerifying] = useState(false);
    const [settingEtique, setSettingEtique] = useState(false);
    const [customeError, setCustomeError] = useState(null);
    const [openCert, setOpenCert] = useState(false);
    const { data: d, loading, error } = useGetData(`/technicien/${id}`);
    const [data, setD] = useState();

    const match9 = useMediaQuery("(max-width: 900px)");
    const match6 = useMediaQuery("(max-width: 600px)");

    const canCertify = data ? (!data.certificats.length > 0 && data.etique === 'Vérifié' && data.specialites[0].specialite_artisan.niveau === 'Vérifié') : false;
    const canActivate = data ? data.certificats.length > 0 : false;

    const toggleCertification = () => {
        setOpenCert(!openCert);
    };

    const handleVerifyCompetences = () => {
        verifyCompetences(setVerifying, setD, setCustomeError);
    };

    const handleSetEtique = () => {
        setEtique(setSettingEtique, setD, setCustomeError);
    };

    const verifyCompetences = usePostData(`/technicien/${id}/verify_competences`, { niveau: 'Vérifié' });
    const setEtique = usePostData(`/technicien/${id}/update`, { etique: 'Vérifié' });
    const handleCertification = usePostData(`/technicien/${id}/certificat`);
    const handleActivation = usePostData(`/technicien/${id}/activate`);
    const handleDesactivate = usePostData(`/technicien/${id}/desactivate`);

    console.log(data);
    useEffect(() => {
        setD(d);
    }, [d]);
    const theme = useTheme();
    const classes = useStyles(theme)();
    return (
        <div className={classes.root}>
            {loading || !data ?
                <LoadingPage /> :
                <Grid container className={classes.container}>
                    <Grid container item xs={12} className={clsx("profile-heder", classes.header)} component={Paper}>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="body2">
                                <span className={classes.status}>{data.etat === "inactif" ? data.etat : data.status}</span>
                                {data.certicat &&
                                    <span className={classes.cert}>
                                        <School fontSize="small" color="inherit" style={{ marginRight: 10 }} />
                                        Certifié
                                    </span>}
                            </Typography>
                            <Typography variant="h3" sx={{ margin: '15px 0' }} color="inherit">
                                <span className={classes.smallName}>{data.user.prenom}</span><br />
                                <span className={classes.nom}>{data.user.nom}</span>
                            </Typography>
                            <ul className={classes.userData}>
                                <li className={classes.userDataItem}>
                                    <span>Sexe </span><span className={classes.value}>{data.user.sexe}</span>
                                </li>
                                <li className={classes.userDataItem}>
                                    <span>Numéro de téléphone </span><span className={classes.value}>{data.user.tel}</span>
                                </li>
                                <li className={classes.userDataItem}>
                                    <span>Adresse mail </span><span className={classes.value}>{data.user.email || "Non spécifié"}</span>
                                </li>
                                <li className={classes.userDataItem}>
                                    <span>Commune </span><span className={classes.value}>{data.user.commune || "Non spécifiée"}</span>
                                </li>
                            </ul>
                        </Grid>
                        <Grid item xs={3} sm={4}>
                            <Avatar style={{ width: match6 ? 80 : 150, height: match6 ? 80 : 150, marginTop: match6 ? 10 : 0 }}>
                                {data.user.prenom[0]}
                            </Avatar>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <div className={classes.actions}>

                        </div>
                    </Grid>
                    <Grid container item xs={12} className={classes.body}>
                        <Grid item xs={12} md={7}>
                            <div>
                                <Typography variant="h6">Formations</Typography>
                                <ul style={{ margin: '0 0 10px' }}>
                                    {data.formateurs.split(',').map(f => (
                                        <li style={{ display: 'flex', alignItems: 'center' }}>
                                            <Check fontSize="small" color="primary" style={{ marginRight: 10 }} />
                                            {f}
                                        </li>
                                    ))}
                                </ul>
                                <Typography>Travaille dans la zone de <span className={classes.primaryBadge}>{data.zone.nom}</span></Typography>
                            </div>
                            <div className={classes.spec}>
                                <Typography variant="h6" style={{ marginBottom: 10 }}>Spécialités: {data.service.nom_service}</Typography>
                                <SpecialitiesGrid data={data.specialites} />
                            </div>
                        </Grid>
                        <Grid item xs={12} md={4} sx={{ padding: match9 ? 0 : '0 0 0 20px' }}>
                            <Paper sx={{ padding: 2, '& > *:not(:last-child)': { marginBottom: 2 }, borderRadius: 0 }}>
                                <div>
                                    <Box p={1}>
                                        <Typography>Vérification des compétences</Typography>
                                        <div className="horizontal-list">
                                            <SwitchUnstyled checked={data.specialites[0].specialite_artisan.niveau === 'Vérifié'} onChange={handleVerifyCompetences} component={Root} defaultChecked />
                                            <span>
                                                {verifying ? <CircularProgress size={10} color="inherit" /> : data.specialites[0].specialite_artisan.niveau}
                                            </span>
                                        </div>
                                    </Box>
                                    <Box p={1}>
                                        <Typography>Formation en étique</Typography>
                                        <div className="horizontal-list">
                                            <SwitchUnstyled checked={data.etique === 'Vérifié'} onChange={handleSetEtique} component={Root} defaultChecked />
                                            <span>
                                                {settingEtique ? <CircularProgress size={10} color="inherit" /> : data.etique}
                                            </span>
                                        </div>
                                    </Box>
                                </div>
                                {data.etat === 'inactif' ?
                                    <div>
                                        {canCertify &&
                                            <Button
                                                variant="outlined"
                                                color="primary"
                                                size="small"
                                                fullWidth={!match6}
                                                className="btn"
                                                disableElevation
                                                style={{ maxWidth: 300 }}
                                                onClick={toggleCertification}
                                            >
                                                Certifier
                                            </Button>
                                        }
                                        {canActivate &&
                                            <Button
                                                variant="outlined"
                                                color="default"
                                                size="small"
                                                fullWidth={!match6}
                                                className="btn"
                                                disableElevation
                                                style={{ maxWidth: 300, marginTop: 10 }}
                                                onClick={() => handleActivation(setActivating, setD, setCustomeError)}
                                            >
                                                Activer
                                                {activating && <CircularProgress size={10} color="inherit" style={{ marginLeft: 10 }} />}
                                            </Button>
                                        }
                                        {openCert &&
                                            <Modal
                                                open={openCert}
                                                handleClose={toggleCertification}
                                            >
                                                <div className={classes.contentContainer}>
                                                    <div>
                                                        <Button
                                                            variant="contained"
                                                            color="primary"
                                                            className="btn"
                                                            onClick={() => handleCertification(setCertifying, setD, setCustomeError)}
                                                        >
                                                            Confirmer la certification
                                                            {certifying && <CircularProgress size={10} color="inherit" style={{ marginLeft: 10 }} />}
                                                        </Button>
                                                    </div>
                                                </div>
                                            </Modal>
                                        }
                                        {customeError &&
                                            <AppMessage message={customeError} open={customeError ? true : false} handleClose={() => setCustomeError(null)} />
                                        }
                                    </div> :
                                    <div>
                                        <Button
                                            variant="outlined"
                                            color="default"
                                            size="small"
                                            fullWidth={!match6}
                                            className="btn"
                                            disableElevation
                                            style={{ maxWidth: 300, marginTop: 10 }}
                                            onClick={() => handleDesactivate(setActivating, setD, setCustomeError)}
                                        >
                                            Désactiver
                                            {activating && <CircularProgress size={10} color="inherit" style={{ marginLeft: 10 }} />}
                                        </Button>
                                    </div>
                                }
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>
            }
        </div>
    )
}

const useStyles = (theme) => makeStyles(() => ({
    root: {
        padding: 20,
        [theme.breakpoints.down('sm')]: {
            padding: '0'
        }
    },
    container: {
    },
    header: {
        color: '#fff',
        padding: '20px',
        borderRadius: '0!important',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    userDataItem: {
        padding: '5px 0',
        color: '#aaa',
        display: 'flex',
        justifyContent: 'space-between',
        "& > span": {
            flex: 1
        },
        [theme.breakpoints.down('sm')]: {
            justifyContent: 'flex-start',
            "& > span": {
                flex: 0,
                minWidth: 'fit-content',
                marginRight: 10
            },
        }
    },
    value: {
        color: '#fff'
    },
    status: {
        display: 'inline-block',
        borderRadius: 20,
        padding: "3px 15px",
        backgroundColor: '#ff7a00',
        textTransform: 'capitalize',
        color: '#fff',
        fontWeight: '500'
    },
    cert: {
        display: 'inline-block',
        borderRadius: 20,
        padding: "3px 15px",
        backgroundColor: '#0020b1',
        textTransform: 'capitalize',
        marginLeft: 10,
        color: '#fff',
        fontWeight: '500'
    },
    primaryBadge: {
        display: 'inline-block',
        borderRadius: 20,
        padding: "1px 15px",
        backgroundColor: '#0020b11f',
        color: '#0020b1',
        textTransform: 'capitalize',
        fontWeight: '500'
    },
    smallName: {
        fontSize: "1.2rem",
        fontWeight: 400,
        marginBottom: 10,
        color: '#aaa',
    },
    nom: {
        fontSize: "1.5rem",
        fontWeight: '500',
        color: '#fff',
    },
    body: {
        padding: 20,
        backgroundColor: '#fff',
        minHeight: 400,
        justifyContent: 'space-between'
    },
    spec: {
        margin: '20px 0'
    },
    contentContainer: {
        width: 700,
        minHeight: 500,
        backgroundColor: '#fff',
    }
}));

const Root = styled('span')(`
  font-size: 0;
  position: relative;
  display: inline-block;
  width: 50px;
  height: 27px;
  
  cursor: pointer;

  &.${switchUnstyledClasses.disabled} {
    opacity: 0.4;
    cursor: not-allowed;
  }

  & .${switchUnstyledClasses.track} {
    background: #B3C3D3;
    border-radius: 40px;
    display: block;
    height: 100%;
    width: 100%;
    position: absolute;
  }

  & .${switchUnstyledClasses.thumb} {
    display: block;
    width: 20px;
    height: 20px;
    top: 3px;
    left: 3px;
    border-radius: 16px;
    background-color: #FFF;
    position: relative;
    transition: all 200ms ease;
  }

  &.${switchUnstyledClasses.focusVisible} .${switchUnstyledClasses.thumb} {
    background-color: rgba(255,255,255,1);
    box-shadow: 0 0 1px 8px rgba(0,0,0,0.25);
  }

  &.${switchUnstyledClasses.checked} { 
    .${switchUnstyledClasses.thumb} {
      left: 27px;
      top: 3px;
      background-color: #FFF;
    }

    .${switchUnstyledClasses.track} {
      background: #0020b1;
    }
  }

  & .${switchUnstyledClasses.input} {
    cursor: inherit;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    opacity: 0;
    z-index: 1;
    margin: 0;
  }`);