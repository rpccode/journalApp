import { AddAlarmOutlined, AddOutlined } from "@mui/icons-material";
import { IconButton, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { starkNewNota } from "../../store/journal";
import { HomeLayout } from "../layouts/homeLayout";
import { NoteView, NothingSelectedView } from "../views";

export const HomePage = () => {
  const { isSaving, active } = useSelector((state) => state.journal)

  const dispatch = useDispatch()
  
  const onClickNewNote = () =>{

        dispatch( starkNewNota() )
  }
  return (
    <HomeLayout>
      {/* <Typography>
       
      </Typography> */}

      {/* NothinSelected */}
      {
         ( !!active ) 
         ? <NoteView/>
         : <NothingSelectedView />
      }

      <IconButton
        className="animate__animated animate__rotateIn animate__faster"
        onClick={ onClickNewNote }
        size="large"
        disabled= { isSaving }
        sx={{ color:'white' , 
            backgroundColor:'error.main',
            ':hover':{ backgroundColor:'error.main', opacity:0.9},
            position: 'fixed',
            right: 50,
            bottom: 50       
          }}
      
      ><AddOutlined sx={{ fontSize: 30 }}/>
      </IconButton>

      {/* NoteView */}

      {/* <NoteView/> */}
    </HomeLayout>
  );
};
