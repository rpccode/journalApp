import Swal from "sweetalert2";
import moment from "moment/moment";
import { useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  DeleteOutline,
  SaveAltOutlined,
  UploadFileOutlined,
  UploadOutlined,
} from "@mui/icons-material";
import { Button, Grid, Typography, TextField, IconButton } from "@mui/material";
import { useForm } from "../../hooks/useForm";
import { setActiveNote } from "../../store/journal/journalSlice";
import { startDeletingNote, startLoadinFiles, startSavingNote } from "../../store/journal/thunks";
import { ImageGalery } from "../components";
import "sweetalert2/dist/sweetalert2.css";

export const NoteView = () => {
  const dispatch = useDispatch();
  const {
    active: note,
    messageSave,
    isSaving,
  } = useSelector((state) => state.journal);


  const { id, title, body, date, imageUrl, formState, onInputChange } =
    useForm(note);
    const fileInputRef = useRef()

  const dateString = useMemo(() => {

    const newDate = new Date(date);
    return moment(newDate).format("MMM-DD-YYYY", "h:mm:ss a");

  }, [date]);

  useEffect(() => {
    if (messageSave.length > 0) {
      Swal.fire("Nota Actualizada", messageSave, "success");
    }
  }, [messageSave]);
  useEffect(() => {
    dispatch(setActiveNote(formState));
  }, [formState]);

  const onSaveNote = () => {
    dispatch(startSavingNote());
  };
  const onFileInputChange = ({ target }) => {
    if (target.files === 0) return;

    dispatch( startLoadinFiles( target.files ) )
  };
  const onDelete = ()=>{
          Swal.fire({
            title: 'Estas Seguro De Borrar esta Nota?',
            text: "Esta Accion No Puede ser Revertida!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'SI, Borrar!'
          }).then((result) => {
            if (result.isConfirmed) {

              dispatch( startDeletingNote() )
              Swal.fire(
                'Borrado!',
                'Tu Nota A sido Borrada Correctamente.',
                'success'
              )
              
            }
          })  
      
  }

  return (
    <Grid
      className="animate__animated animate__fadeIn "
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{ mb: 1 }}
    >
      <Grid item>
        <Typography
          variant="h1"
          color="initial"
          fontSize={39}
          fontWeight="light"
        >
          {dateString}
        </Typography>
      </Grid>
      <Grid item>
        <input
          type="file"
          ref={ fileInputRef }
          multiple
          onChange={onFileInputChange}
          style={{ display: "none" }}
        />
        <IconButton color="primary" disabled={isSaving}
          onClick={ () => fileInputRef.current.click() }
        >
          <UploadOutlined />
        </IconButton>
        <Button
          disabled={isSaving}
          color="primary"
          sx={{ padding: 2 }}
          onClick={onSaveNote}
        >
          <SaveAltOutlined sx={{ fontSize: 30, mr: 1 }} />
          Guardar
        </Button>
      </Grid>
      <Grid container>
        <TextField
          type="text"
          variant="filled"
          fullWidth
          placeholder="Ingrese un Titulo"
          label="Titulo"
          name="title"
          value={title}
          onChange={onInputChange}
          sx={{ border: "none", mb: 1 }}
        />
        <TextField
          type="text"
          variant="filled"
          fullWidth
          multiline
          placeholder="Que Sucedio Hoy?"
          label="Descripcion"
          name="body"
          value={body}
          onChange={onInputChange}
          minRows={5}
        />
          <Grid container justifyContent='end' >
              <Button
                onClick={ onDelete }
                sx={{ mt:2}}
                color='error'
              >
                  <DeleteOutline/>
                  Borrar
              </Button>
          </Grid>


        {/* Galeria de Imagenes */}
        <ImageGalery images={ note.imageUrl } />
      </Grid>
    </Grid>
  );
};
