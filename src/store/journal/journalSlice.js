import { createSlice } from "@reduxjs/toolkit";

export const journalSlice = createSlice({
  name: "journal",
  initialState: {
    isSaving: false,
    messageSave: "",
    notes: [],
    active: {
      //nota activa
      id: "",
      title: "",
      body: "",
      date: "",
      imageUrl: [], /// https.img1.jpg, https.img1.jpg, https.img1.jpg,
    },
  },
  reducers: {
    savingNewNote: (state) =>{
        state.isSaving = true;
    },
    addNewEmptyNote: (state, action) => {
        state.notes.push( action.payload )
        state.isSaving = false
    },
    setActiveNote: (state, action) => {
        state.active = action.payload;
        state.messageSave = ''

    },
    setNote: (state, action) => {
        state.notes = action.payload 
    },
    setSavingNote: (state) => {
      state.isSaving = true;
      state.messageSave = ''
    },
    updateNote: (state, action) => {
      state.isSaving = false;
      state.notes =  state.notes.map( note => {

        if(note.id === action.payload.id ){
              return action.payload
        }

        return note;
      })
      ///mostrar mensage de actulaizacion
      state.messageSave = `${ action.payload.title }, Actualizada Correctamente`;
    },
    setPhotosToActiveNotes: (state, action) => {
        state.isSaving =false;
        state.active.imageUrl = [...state.active.imageUrl, ...action.payload]
    },
    clearNoteLogout: ( state) => {
        state.isSaving = false;
        state.messageSave = '';
        state.notes = [];
        state.active = null;

    },
    delectNoteById: (state, action) => {
      state.notes = state.notes.filter( note => note.id !== action.payload)
      state.active =null;
    },
  },
});

export const {
  addNewEmptyNote,
  clearNoteLogout,
  delectNoteById,
  setActiveNote,
  setNote,
  setSavingNote,
  savingNewNote,
  setPhotosToActiveNotes,
  updateNote,
} = journalSlice.actions;
