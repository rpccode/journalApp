import { onAuthStateChanged } from "firebase/auth"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { FireBaseAuth } from "../firebase/config"
import { Login, Logout } from "../store/auth"
import { startLoadinNotes } from "../store/journal"



export const useCheckAuth = () => {
    const { status } = useSelector( state => state.Auth)
    const dispatch = useDispatch()

    useEffect(() => {
      onAuthStateChanged( FireBaseAuth, async( user ) => {
        if( !user ) return dispatch( Logout() ) ;
        const{ uid, displayName, photoURL,email }= user
        dispatch(Login({ uid, displayName, photoURL, email }))
        dispatch( startLoadinNotes() )



      } )
      
      
    }, [])
    


    
  return {
        status,

  }
}
