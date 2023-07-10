import { AppBar, Toolbar, IconButton, Typography, Link } from "@mui/material"
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { useContext } from "react";
import { UIContext } from "@/context/ui";
import NextLink from "next/link";


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

            <NextLink href='/' passHref  legacyBehavior>
              <Link underline="none" color='white'>
                <Typography variant="h6">OpenJira</Typography>
              </Link>
            </NextLink>
        </Toolbar>
    </AppBar>
  )
}
