import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { FireBaseDB } from "../../firebase/config";
import { fileUpload } from "../../helpers/fileUpload";
import { loadNotes } from "../../helpers/loadNotes";
import {
  addNewEmptyNote,
  setActiveNote,
  savingNewNote,
  setNote,
  setSavingNote,
  updateNote,
  setPhotosToActiveNotes,
  delectNoteById
} from "./journalSlice";

export const starkNewNota = () => {
  return async (dispatch, getState) => {
    dispatch(savingNewNote());
    const { uid } = getState().Auth;

    const newNote = {
      title: "",
      body: "",
      imageUrls: [],
      date: new Date().getTime(),
    };

    const newDoc = doc(collection(FireBaseDB, `${uid}/journald/notes`));
    const resp = await setDoc(newDoc, newNote);

    newNote.id = newDoc.id;
    ///dsipatch de ;a nueva nota
    dispatch(addNewEmptyNote(newNote));

    ///distpach para activar la nota
    dispatch(setActiveNote(newNote));
  };
};

export const startLoadinNotes = () => {
  return async (distpach, getState) => {
    const { uid } = getState().Auth;
    if (!uid) throw new Error("El id Del Usuario No Existe");

    const resp = await loadNotes(uid);

    distpach(setNote(resp));
  };
};

export const startSavingNote = () => {
  return async (distpach, getState) => {
    distpach(setSavingNote());
    ///console.log( getState())
    const { uid } = getState().Auth;
    const { active: note } = getState().journal;

    const noteToFireStore = { ...note };
    delete noteToFireStore.id;

    // console.log(noteToFireStore)

    const docRef = doc(FireBaseDB, `${uid}/journald/notes/${note.id}`);
    const resp = await setDoc(docRef, noteToFireStore, { merge: true });

    distpach(updateNote(note));
  };
};

export const startLoadinFiles = (files = []) => {
  return async (distpach) => {
    distpach(setSavingNote());

    const fileUploadPromise = [];

    for (const file of files) {
      fileUploadPromise.push(fileUpload(file));
    }

    const photoUrl = await Promise.all(fileUploadPromise);

    distpach(setPhotosToActiveNotes(photoUrl));
  };
};

export const startDeletingNote= () =>{
  return async( dispatch, getState ) =>{
    const { uid } = getState().Auth;
    const { active: note } = getState().journal;

    // console.log(note)
    const docRef =  doc( FireBaseDB, `${uid}/journald/notes/${note.id}`)
    const resp =await deleteDoc( docRef );

    dispatch( delectNoteById( note.id ) )
  }
}

