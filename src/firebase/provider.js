import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile } from 'firebase/auth'
import { FireBaseAuth } from './config';


const googleProvider = new GoogleAuthProvider();


export const singInWithGoogle = async () => {

    try {
        const result = await signInWithPopup( FireBaseAuth, googleProvider );
        // const credentials = GoogleAuthProvider.credentialFromResult( result )
        const{ displayName,email, photoURL ,uid ,} = result.user;

        return {
            ok: true,
            //user info
            displayName,
            email,
            photoURL,
            uid
        }
        

   


    } catch (error) {
        return {
            ok: false,
            errorCode : error.code,
            errorMessage : error.message,
            errorEmail: error.customData.email
        }
    }
}

export  const registerUserwithEmailAndPassword = async( { email, password, displayName } ) =>{

        try {
                
          const resp= await  createUserWithEmailAndPassword( FireBaseAuth, email, password)
               const { uid, photoURL } = resp.user 
               //todo: actualizar el displayName en firebase
                await    updateProfile( FireBaseAuth.currentUser, { displayName } );
                console.log({ resp })

               return {
                ok: true,
                uid, photoURL, email, displayName
               }
        } catch (error) {
            return {
                ok : false,
                errorMessage: error.message
            }
        }
}

export const LoginWithEmailAndPassword= async({ email, password }) => {
        try {

            const resp = await signInWithEmailAndPassword(FireBaseAuth, email, password )
            const {uid, photoURL, displayName } = resp.user
            console.log( resp.user )
            return {

                ok: true,
                uid,
                photoURL,
                displayName
            }

        } catch (error) {
            return {
                ok: false,
                errorMessage: error.message
            }
        }
}

export const logoutFirebase = async() =>{
    return await FireBaseAuth.signOut();
}