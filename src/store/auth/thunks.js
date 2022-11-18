import { async } from "@firebase/util"
import { LoginWithEmailAndPassword, logoutFirebase, registerUserwithEmailAndPassword, singInWithGoogle } from "../../firebase/provider"
import { clearNoteLogout } from "../journal/journalSlice"
import { checkingCredentials, Logout , Login} from "./"

export const chekingAuthentication = ( email='', password='' ) =>{
        return async ( dispatch )=>{

           await dispatch ( checkingCredentials() )
        }
    }

export const starkGoogleSingIn = () => {
    return async ( dispatch ) => {

         dispatch ( checkingCredentials() )
        const result = await singInWithGoogle()
        console.log({ result })
        if ( !result.ok ) return dispatch( Logout( result.errorMessage ) )

        dispatch( Login( result ) )

    }
}

export const startCreatingUserwithEmailAndPassword = ({ email, password, displayName })=>{
        return async( dispatch ) =>{
            dispatch( checkingCredentials() )

            const {ok , uid,photoURL, errorMessage  } = await registerUserwithEmailAndPassword({email, password, displayName})

            if ( !ok ) return dispatch( Logout( { errorMessage } ) )

            dispatch( Login( { uid,displayName, email, photoURL } ) )


        }
}
export const startLoginWithEmailAndPassword = ({ email, password })=>{
    return async ( dispatch ) =>{
        dispatch( checkingCredentials() )

        const {ok , uid, photoURL, displayName , errorMessage} = await LoginWithEmailAndPassword( { email, password } )

        if (!ok ) return dispatch( Logout({ errorMessage })) ;

        dispatch( Login( { uid, displayName, photoURL, displayName, errorMessage } ))

    }

} 

export const startLogout= () =>{
    return async ( dispath ) => {
        await logoutFirebase();
        
        dispath( clearNoteLogout() )

        dispath( Logout({  }) )
    }
}
