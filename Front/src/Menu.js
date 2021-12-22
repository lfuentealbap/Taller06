import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Usuarios from './Usuarios';
import axios from 'axios';
const jwt = require('jwt-simple');
require('dotenv').config()



function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};


function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
}));
function validarActivo(){
    
    let token = localStorage.getItem('TOKEN_APP_TALLER');
    let TokenArray = token.split(" ");
            
    let correo = jwt.decode(TokenArray[1],process.env.SECRET_TOKEN); 
    console.log('Token correo: '+ correo );
    const Usuarios= ()=>{
        //Hook que almacena los usuarios
        const [data,setData] = useState([])
      
        useEffect(() => {
          RecuperaCliente()
      }, []);
        const RecuperaCliente = data => {
      
        //Para obtener la lista de usuarios
        axios
        .get("/api/usuario")
        .then(
        (response) => {
            console.log(response.data);
            setData(response.data.usuario)
            
            data.forEach(usuario => {
                if(usuario['mail']==correo){
                    if(usuario['activo']==false){
                        //redireccionar a login, mandar mensaje de usuario no esta activo

                    }
                }
            });
        }
        )
        .catch((err) => {
            
            
            if (err.response) {
                if(err.response.status==401){
                    let motivo= err.response.data.mensaje;
                    alert(`No autorizado:${motivo}`)
                }
                console.log(err.response.data.mensaje)
            } else if (err.request) {
                // client never received a response, or request never left
            } else {
                // anything else
            }
    
        });
    
    
    }}
    
}

export default function Menu() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    useEffect(() => {
        const token = localStorage.getItem('TOKEN_APP_TALLER');
        if (token == null) {
            window.location = '/';
        }
    }, []);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    
    validarActivo();

    return (
        
        <div className={classes.root}>
            <AppBar position="static">
                <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                    <Tab label="Usuarios" {...a11yProps(0)} />
                    <Tab label="Autor" {...a11yProps(1)} />
                    <Tab label="Item Three" {...a11yProps(2)} />
                    <Tab label="Nuevo" {...a11yProps(3)} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                <Usuarios/>
            </TabPanel>
            <TabPanel value={value} index={1}>

            </TabPanel>
            <TabPanel value={value} index={2}>
                Item Three
            </TabPanel>

            <TabPanel value={value} index={3}>
                Aqui va a ir el menu nuevo
            </TabPanel>
        </div>
    );
}