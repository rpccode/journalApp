import { Grid, Typography } from "@mui/material"
import { StarOutline } from "@mui/icons-material"


export const NothingSelectedView = () => {
  return (
    <Grid
    className="animate__animated animate__fadeIn animate__faster"

    container
    spacing={0}
    direction="column"
    alignItems={"center"}
    justifyContent={"center"}
    sx={{ minHeight: "calc(100vh - 110px)", backgroundColor: "primary.main",borderRadius:5 }}
  >
    <Grid
      item
      xs={12}
      className="box-Shadow"
    //   xs={3}x
      
    //   sx={{ backgroundColor: "white", padding: 3, borderRadius: 2, width:{ sm: 450 } }}
    >
        <StarOutline sx={{fontSize: 100,color: 'white'}}  />

    </Grid>
    <Grid
      item
      xs={12}
      className="box-Shadow"
    //   xs={3}
      
    //   sx={{ backgroundColor: "white", padding: 3, borderRadius: 2, width:{ sm: 450 } }}
    >
        <Typography color='white' variant="h5" >Selecciona o Crea una Entrada</Typography>
    </Grid>

    </Grid>
  )
}
