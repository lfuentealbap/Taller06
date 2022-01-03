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
/*function validarActivo(){
    
    let token = localStorage.getItem('TOKEN_APP_TALLER');
    //const [userToken,setUserToken] = useState([])
            
  
    console.log('Token correo: '+ token );
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
    
}*/

export default function Menu() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    //const [users, setUsers] = React.useState([]); //OPCION 1, No en uso

    useEffect(() => {
        const token = localStorage.getItem('TOKEN_APP_TALLER');
        if (token == null) {
            window.location = '/';
        }
        let usuarioToken;
        
        //**Funcion que valida que el usuario que está en el token tenga el campo "activo" en true**
        
        function esActivo(){
            //Usando la api de validar vigencia, podemos descodificar el token
        axios.post('http://localhost:5000/api/usuario/vigencia', {
            Authorization: token //Si vemos en el postman en la parte de headers(estan ocultos), hay un atributo que  
            //se llama Authorization y ahí se ve que está puesto el token que se solicitó en la pestaña Authorization
            })
            .then(function (response){
                if(response.status == 200){
                    //Si vemos en la parte de abajo del postman, hay una parte que dice body y ahi aparece un
                    //atributo llama do usuario, se rescata con response.data
                    usuarioToken = response.data.usuario;
                    //alert("usuario encontrado: "+usuarioToken);
    
                    //Para obtener la lista de usuarios
                    axios.get("http://localhost:5000/api/usuario", {
                        Authorization: token})
                    .then(
                        (response1) => {
                            //alert("Estoy buscando mi actividad"); //Pa probar si esta funcionando esta parte
                            //Extrae los resultados del axios al hook de users (OPCION 1)
                            //setUsers(response1.data.usuario) //NO en uso
                            //Asigna los resultados del axios a una variable. (funca mejor que el hook) (OPCION 2)
                            let users= response1.data.usuario;
                            console.log(response1.data.usuario);
                            //Recorre el contenido de users
                            users.forEach(usuario => {
                                //console.log("Lista de usuarios: "+usuario.nombre);
                                //Busca si existe el usuario del token en la bd
                                if(usuario.mail===usuarioToken){
                                    //alert("Usuario Token: "+usuarioToken+"\nUsuario en recorrido: "+usuario.mail)
                                    //verifica si el usuario no está activo en la bd (activo==false))
                                    if(usuario.activo===false){
                                        //redireccionar a login, mandar mensaje de usuario no esta activo
                                        alert("Usuario no activo, serás redirigido!!")
                                        //*Inserte codigo de redireccion a login**
                                        window.location.href = "http://localhost:3000/login"
                                        //*Inserte código de borrado de localStorage**(Opcional)
                                    }else{
                                        console.log("Usuario activo OK")
                                    }
                                }
                            });//Fin forEach

                        }
                    )
                    .catch((err) => {
                        
                        
                        if (err.response1) {
                            if(err.response1.status==401){
                                let motivo= err.response1.data.mensaje;
                                alert(`No autorizado:${motivo}`)
                            }
                            console.log(err.response1.data.mensaje)
                        } else if (err.request) {
                            // client never received a response, or request never left
                        } else {
                            // anything else
                        }
                
                    });
    
                }
                else {
                    alert("Error al encontrar usuario en el token")
                }
    
            })
            .catch(function (error){
                console.log(error);
            });
        }
        esActivo();
        
    }, []);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    

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