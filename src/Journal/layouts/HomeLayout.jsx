import { Toolbar } from "@mui/material";
import { Box } from "@mui/system"
import { NavBar , SiderBar} from "../components";


const drawerWidth = 240;

export const HomeLayout = ({ children }) => {
  return (
   <Box sx={{ display: 'flex'}} 
      // className="animate__animated animate__jackInTheBox animate__faster"
    
   >
        {/* Navbar drawerWidth*/}
                <NavBar drawerWidth = { drawerWidth } />

        {/* SiderBar drawerWidth */}
                <SiderBar drawerWidth = { drawerWidth } />
        <Box component='main'
            sx={{ flexGrow: 1, p: 3 }}
        >
            {/* Toolbar */}
            <Toolbar/>

            { children }
        </Box>
   </Box>
  )
}
