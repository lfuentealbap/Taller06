import React, { useState, useEffect } from "react";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useForm } from 'react-hook-form';
import axios from 'axios';

import Collapse from '@material-ui/core/Collapse';
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));




const SignIn = ({}) => {


    const { register, handleSubmit, errors } = useForm();
    const [modoregistro,setModoregistro] = useState(false);


  


    const onSubmit = data => {


        console.log(data.email);
        axios
        .post("/api/usuario/validar", {
            mail:data.email,
            pass:data.password
        })
        .then(
          (response) => {
             console.log(response.data);
            
              if(response.data.mensaje=='correcto'){


                localStorage.setItem('TOKEN_APP_TALLER',response.data.token)
            
          
                window.location='/menu'
        
              }
            

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
    

    }

  const classes = useStyles();

    const registro = () =>{

      setModoregistro(true);
    }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>


        <form onSubmit={handleSubmit(onSubmit)} className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
       
            inputRef={register}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            inputRef={register}
          />
        
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          
        </form>
      </div>


      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );


}

export default SignIn;