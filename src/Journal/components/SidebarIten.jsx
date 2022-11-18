import { TurnedInNot } from "@mui/icons-material";
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { setActiveNote } from "../../store/journal/journalSlice";

export const SidebarIten = ({ note, title='',body,id, date, imageUrl=[]}) => {
    const dispatch = useDispatch()
    const newTitle = useMemo(()=>{
        return title.length > 17 
                ? title.substring(0,17) + '....'
                : title
    },[title])

    const onSetActiveNotes = () =>{
            
        dispatch( setActiveNote( { id,title,body, date , imageUrl } ) )
        
    }
  return (
    <ListItem disablePadding>
      <ListItemButton onClick={ onSetActiveNotes }>
        <ListItemIcon>
          <TurnedInNot />
        </ListItemIcon>
        <Grid container>
          <ListItemText primary={ newTitle } />
          <ListItemText secondary={ body } />
        </Grid>
      </ListItemButton>
    </ListItem>
  );
};
