import { collection, doc, getDocs } from "firebase/firestore/lite"
import { FireBaseDB } from "../firebase/config";

export const loadNotes= async( uid= '') =>{
    if( !uid ) throw new Error('El id Del Usuario No Existe')

    const collectionRef = collection( FireBaseDB, `${ uid }/journald/notes` );
    const doc = await getDocs( collectionRef )

        const notes = []
        doc.forEach( doc => {
            notes.push({ id: doc.id, ...doc.data() })
        });

        return notes;
    
}
