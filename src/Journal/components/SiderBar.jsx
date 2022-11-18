import { TurnedInNot } from "@mui/icons-material"
import { Box,Drawer, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from "@mui/material"
import { useSelector } from "react-redux"
import { SidebarIten } from "./SidebarIten"



export const SiderBar = ({drawerWidth }) => {
    const { displayName } = useSelector((state) => state.Auth)
    const { notes } = useSelector((state) => state.journal)

  return (
    <Box 
        className="animate__animated animate__fadeInLeft animate__faster"

        component='nav'
        sx={{ width: {sm: drawerWidth}, flexShrink: {sm: 0}}}
    >
        <Drawer
            variant="permanent" // temporary
            open={ true }
            sx={{
                display:{
                    xs: 'block'
                },
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width : drawerWidth}
            }}
        >
            <Toolbar>
                <Typography  variant="h6" noWrap component='div'>
                        { displayName }
                </Typography>
            </Toolbar>
            <List>
                {
                    notes.map( note => (
                        <SidebarIten key={ note.id } note={ note }  { ...note }  />
                    ))
                }
            </List>

        </Drawer>

    </Box>
  )
}
