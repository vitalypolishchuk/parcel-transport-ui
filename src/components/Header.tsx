import { AppBar, Box, IconButton, Menu, MenuItem, Toolbar, Typography } from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from "react";
import { AccountCircle } from "@mui/icons-material";
import { useSelector } from 'react-redux';
import { RootState } from "../store/store";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
    const location = useLocation();
    const [pathName, setPathName] = useState('');
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const userInfo = useSelector((state: RootState) => state.userInfo);
    const [navAnchorEl, setNavAnchorEl] = useState<null | HTMLElement>(null);
    
    useEffect(() => {
        handlePageName();
    }, []);

    const handlePageName = () => {
        if(location.pathname === '/'){
            return setPathName('Home')
        };
        if(location.pathname === '/signup'){
            return setPathName('SignUp')
        };
        if(location.pathname === '/signin'){
            return setPathName('Sign In')
        };
        if(location.pathname === '/requests'){
            return setPathName('Requests')
        };
        if(location.pathname === '/create'){
            return setPathName('Create')
        };
        if(location.pathname === '/order'){
            return setPathName('Order')
        };
        if(location.pathname === '/deliver'){
            return setPathName('Deliver')
        };
    };

    const handleLogOut = () => {}

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <div>
                        <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={(e: React.MouseEvent<HTMLElement>) => {
                            setNavAnchorEl(e.currentTarget)
                        }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={navAnchorEl}
                            anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                            }}
                            open={Boolean(navAnchorEl)}
                            onClose={() => setNavAnchorEl(null)}
                        >
                            {userInfo.email && (
                                <>
                                    <MenuItem component={Link} to="/requests">Requests</MenuItem>
                                    <MenuItem component={Link} to="/create">Create</MenuItem>
                                    <MenuItem component={Link} to="/order">Order</MenuItem>
                                    <MenuItem component={Link} to="/deliver">Deliver</MenuItem>
                                </>
                            )}
                            {!userInfo.email && (
                                <>
                                    <MenuItem component={Link} to="/signup">Sign Up</MenuItem>
                                    <MenuItem component={Link} to="/signin">Sign In</MenuItem>
                                </>
                            )}
                        </Menu>
                    </div>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    {pathName ? pathName : "Invalid Page"}
                    </Typography>
                    
                    <div>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={(e: React.MouseEvent<HTMLElement>) => {
                                if(userInfo.email) setAnchorEl(e.currentTarget)
                            }}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                            }}
                            open={Boolean(anchorEl)}
                            onClose={() => setAnchorEl(null)}
                        >
                            {userInfo.email && <MenuItem>Email: {userInfo?.email}</MenuItem>}
                            {userInfo.requests && <MenuItem>Requests: {userInfo?.requests}</MenuItem>}
                            {userInfo.email && (
                                <MenuItem onClick={handleLogOut}>Log Out</MenuItem>
                            )}
                        </Menu>
                    </div>
                </Toolbar>
            </AppBar>
      </Box>
    )
}

export default Header;