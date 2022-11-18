import { Link as RLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material";
import { AuthLayout } from "../layouts/AuthLayout";
import { useForm } from "../../hooks";
import { useState } from "react";
import { startCreatingUserwithEmailAndPassword } from "../../store/auth";
import { useMemo } from "react";

const formData = {
  displayName: "",
  email: "",
  password: "",
};

const formValidatior = {
  email: [(value) => value.includes("@"), "EL Correo No es Valiido"],
  password: [
    (value) => value.length >= 6,
    "El Password deve ser Mayor a 6 letras",
  ],
  displayName: [(value) => value.length >= 1, "El Nombre es Requeriido"],
};

export const RegisterPages = () => {
  const dispatch = useDispatch();
  const {
    displayName,
    email,
    password,
    onInputChange,
    formState,
    isFormValid,
    displayNameValid,
    emailValid,
    passwordValid,
  } = useForm(formData, formValidatior);

  const [formSumbmitte, setformSumbmitte] = useState(false);

  const { status, errorMessage } = useSelector((state) => state.Auth);
  const isCheckingAuthentication = useMemo(() => {
    status === "checking";
  }, [status]);

  const onSubmit = (e) => {
    e.preventDefault();
    setformSumbmitte(true);

    if (!isFormValid) return;

    dispatch(startCreatingUserwithEmailAndPassword(formState));
  };

  return (
    <AuthLayout title="Registro">
      <form action="" onSubmit={onSubmit}
      className="animate__animated animate__fadeIn animate__faster"
      
      >
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              id=""
              label="nombre"
              type="text"
              placeholder="Tu Nombre"
              fullWidth
              name="displayName"
              value={displayName}
              onChange={onInputChange}
              error={!!displayNameValid && formSumbmitte}
              helperText={displayNameValid}
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              id=""
              label="correo"
              type="email"
              placeholder="Correo@correo.com"
              fullWidth
              autoComplete="none"
              name="email"
              value={email}
              onChange={onInputChange}
              error={!!emailValid && formSumbmitte}
              helperText={emailValid}
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              id=""
              label="Contraseña"
              type="password"
              placeholder="******"
              fullWidth
              name="password"
              value={password}
              onChange={onInputChange}
              error={!!passwordValid && formSumbmitte}
              helperText={passwordValid}
            />
          </Grid>
          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
          <Grid item xs={12} display={ !!errorMessage ? '' : 'none' }>
              <Alert severity="error">{ errorMessage }</Alert>
             
            </Grid>
            <Grid item xs={12}>
              
              <Button
                variant="contained"
                fullWidth
                type="submit"
                disabled={isCheckingAuthentication}
              >
                Crear Cuenta
              </Button>
            </Grid>
          </Grid>
          <Grid container direction="row" justifyContent="end">
            <Typography sx={{ mr: 1 }}>Ya tienes una Cuenta?</Typography>
            <Link component={RLink} color="inherit" to="/auth/login">
              Ingresar
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
