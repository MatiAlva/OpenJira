import { AppBar, Toolbar, IconButton, Typography } from "@mui/material"
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { useContext } from "react";
import { UIContext } from "@/context/ui";

export const Navbar = () => {

  const {openSideMenu, closeSideMenu} = useContext(UIContext)

  return (
    <AppBar position="sticky">
        <Toolbar>
            <IconButton
                onClick={openSideMenu}
                
                size='large'
                edge= 'start'
            >
                <MenuOutlinedIcon />
            </IconButton>

            <Typography variant="h6">OpenJira</Typography>
        </Toolbar>
    </AppBar>
  )
}
