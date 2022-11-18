import { Grid, Typography, FormControl, FormLabel, FormHelperText, TextField, Button, Link, Alert } from "@mui/material"
import { Google } from '@mui/icons-material'
import {Link as RLink, useLocation, useNavigate} from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { AuthLayout } from "../layouts/AuthLayout"
import { useForm } from "../../hooks"
import { chekingAuthentication, starkGoogleSingIn, startLoginWithEmailAndPassword } from "../../store/auth"
import { useMemo } from "react"


const formData = {
  email: '',
  password:''
}
export const LoginPages = () => {

   
    const navigation = useNavigate()
    const { status, errorMessage } = useSelector((state) => state.Auth)

    const dispatch = useDispatch()

  const { email, password, onInputChange } =  useForm( formData )

    const isAuthenticating = useMemo( ()  => status === 'checking', [status]) ;

  const onSumit = (e) =>{
      e.preventDefault()
      // console.log({ email, password })

      dispatch( startLoginWithEmailAndPassword( { email, password } ) )
      setTimeout(() => {
        navigation('/')
      }, 1000);

  }

  const onGoogleSingIn = () => {

    dispatch( starkGoogleSingIn() )

    setTimeout(() => {
      navigation('/')
    }, 1000);
  }
  return (
   <AuthLayout title="Login">
     <form action="" onSubmit={ onSumit }
      className="animate__animated animate__fadeIn animate__faster"
     >
            <Grid container>
                <Grid item xs={ 12 } sx={{ mt: 2 }}>
                  <TextField
                    id=""
                    label="correo"
                    type="email"
                    placeholder="Correo@correo.com"
                    fullWidth
                    autoComplete="off"
                    name="email"
                    value={ email }
                    onChange={ onInputChange }
                  
                    
                  />
                </Grid>
                <Grid item xs={ 12 } sx={{ mt: 2 }} >
                  <TextField
                    id=""
                    label="Contraseña"
                    type="password"
                    placeholder="******"
                    fullWidth
                    name="password"
                    value={ password }
                    onChange={ onInputChange }
                    autoComplete='off'
                    
                  />
                </Grid>
                  <Grid container spacing={ 2 } sx={ { mb:2,mt:1 }}>
                  <Grid item xs={ 12 } display={ !!errorMessage ? '' : 'none' } >
                         <Alert severity="error" >{ errorMessage }</Alert>
                      </Grid>
                      <Grid item xs={ 12 }  >
                          <Button 
                          variant="contained" 
                          type="submit" 
                          fullWidth
                            disabled={ isAuthenticating }
                          >
                            Login
                          </Button>
                      </Grid>
                      <Grid item xs={ 12 }  >
                          <Button 
                          variant="contained" 
                          fullWidth
                          onClick={ onGoogleSingIn } 
                          disabled={ isAuthenticating }
                          >
                            <Google />
                             <Typography sx={{ ml:1}} > Google</Typography>
                          </Button>
                      </Grid>
                  </Grid>
                  <Grid container direction='row' justifyContent='end'>
                      <Link component={ RLink } color='inherit' to="/auth/register">
                        Crear una  Cuenta
                      </Link>
                      
                  </Grid>
            </Grid>
          </form>
   </AuthLayout>
  )
}
