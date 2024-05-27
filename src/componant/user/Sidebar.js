import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import UserHeader from './UserHeader';
import '../../Assets/css/userdashboard.css'
import ImageGenerator from './ImageGenerator';
import ImageGallery from './ImageGallery';
import MyAccount from './MyAccount';
import HelpCenter from './HelpCenter';


const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

// const AppBar = styled(MuiAppBar, {
//     shouldForwardProp: (prop) => prop !== 'open',
// })(({ theme, open }) => ({
//     zIndex: theme.zIndex.drawer + 1,
//     transition: theme.transitions.create(['width', 'margin'], {
//         easing: theme.transitions.easing.sharp,
//         duration: theme.transitions.duration.leavingScreen,
//     }),
//     ...(open && {
//         marginLeft: drawerWidth,
//         width: `calc(100% - ${drawerWidth}px)`,
//         transition: theme.transitions.create(['width', 'margin'], {
//             easing: theme.transitions.easing.sharp,
//             duration: theme.transitions.duration.enteringScreen,
//         }),
//     }),
// }));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

export default function Sidebar() {
    const theme = useTheme();
    const [open, setOpen] = React.useState(true);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            {/* <AppBar position="fixed" open={open}>
                <Toolbar className='menuBar'>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                            marginRight: 5,
                            ...(open && { display: 'none' }),
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
            Mini variant drawer
          </Typography>
                </Toolbar>
                <UserHeader/>
            </AppBar> */}

            <Drawer variant="permanent" open={open} className='menuBar-sidebar'>
                <DrawerHeader className='arrowbtn'>
                    {open === false ?
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                        >
                            <ChevronRightIcon />
                        </IconButton> :
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronLeftIcon />}
                        </IconButton>
                    }
                </DrawerHeader>
                {/* <Divider /> */}
                <List>
                    <ListItem className='active'>
                        <ListItemButton >
                            <ListItemIcon>
                                {/* <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5.5 13.1664H10.5V16.4998H5.5V13.1664ZM0.5 15.2164L3.83333 11.8831V16.4998H1.33333C0.875 16.4998 0.5 16.1248 0.5 15.6664V15.2164ZM10.3583 2.99976L3.83333 9.52476L0.5 12.8498V8.49143C0.5 8.28309 0.575 8.09143 0.708333 7.94143C0.716667 7.92476 0.733333 7.91643 0.741667 7.89976L7.40833 1.23309C7.43333 1.20809 7.45 1.19143 7.475 1.18309L7.53333 1.12476C7.86667 0.916428 8.30833 0.949761 8.59167 1.23309L10.3583 2.99976ZM15.5 8.49143V15.6664C15.5 16.1248 15.125 16.4998 14.6667 16.4998H12.1667V9.52476L9.18333 6.54143L11.5417 4.18309L15.2583 7.89976C15.4083 8.05809 15.5 8.26643 15.5 8.49143Z" fill="url(#paint0_linear_2671_2007)"></path>
                                    <defs>
                                        <linearGradient id="paint0_linear_2671_2007" x1="10.2526" y1="14.5909" x2="4.74869" y2="2.57816" gradientUnits="userSpaceOnUse">
                                            <stop stop-color="#141414"></stop>
                                            <stop offset="1" stop-color="#141414"></stop>
                                        </linearGradient>
                                    </defs>
                                </svg> */}
                                <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5.5 13.1664H10.5V16.4998H5.5V13.1664ZM0.5 15.2164L3.83333 11.8831V16.4998H1.33333C0.875 16.4998 0.5 16.1248 0.5 15.6664V15.2164ZM10.3583 2.99976L3.83333 9.52476L0.5 12.8498V8.49143C0.5 8.28309 0.575 8.09143 0.708333 7.94143C0.716667 7.92476 0.733333 7.91643 0.741667 7.89976L7.40833 1.23309C7.43333 1.20809 7.45 1.19143 7.475 1.18309L7.53333 1.12476C7.86667 0.916428 8.30833 0.949761 8.59167 1.23309L10.3583 2.99976ZM15.5 8.49143V15.6664C15.5 16.1248 15.125 16.4998 14.6667 16.4998H12.1667V9.52476L9.18333 6.54143L11.5417 4.18309L15.2583 7.89976C15.4083 8.05809 15.5 8.26643 15.5 8.49143Z" fill="url(#paint0_linear_2671_2007)"></path>
                                    <defs>
                                        <linearGradient id="paint0_linear_2671_2007" x1="10.2526" y1="14.5909" x2="4.74869" y2="2.57816" gradientUnits="userSpaceOnUse">
                                            <stop stop-color="#E60C84"></stop>
                                            <stop offset="1" stop-color="#FFCF4B"></stop>
                                        </linearGradient>
                                    </defs>
                                </svg>
                            </ListItemIcon>
                            <ListItemText sx={{ opacity: open ? 1 : 0 }} > Dashboard </ListItemText>
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding sx={{ display: 'block' }}>
                        <ListItemButton >
                            <ListItemIcon>
                                <svg className="category-svg w-4 h-4" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0.5 8.83333H7.16667V0.5H0.5V8.83333ZM0.5 15.5H7.16667V10.5H0.5V15.5ZM8.83333 15.5H15.5V7.16667H8.83333V15.5ZM8.83333 0.5V5.5H15.5V0.5H8.83333Z" fill="url(#paint0_linear_3040_2060)"></path>
                                    <defs>
                                        <linearGradient id="paint0_linear_3040_2060" x1="10.2526" y1="13.6538" x2="5.04573" y2="1.90371" gradientUnits="userSpaceOnUse">
                                            <stop stop-color="#141414"></stop>
                                            <stop offset="1" stop-color="#141414"></stop>
                                        </linearGradient>
                                    </defs>
                                </svg>
                            </ListItemIcon>
                            <ListItemText sx={{ opacity: open ? 1 : 0 }} > Pre-built Templates </ListItemText>
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding sx={{ display: 'block' }}>
                        <ListItemButton >
                            <ListItemIcon>
                                <svg className="category-svg w-4 h-4" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0.5 8.83333H7.16667V0.5H0.5V8.83333ZM0.5 15.5H7.16667V10.5H0.5V15.5ZM8.83333 15.5H15.5V7.16667H8.83333V15.5ZM8.83333 0.5V5.5H15.5V0.5H8.83333Z" fill="url(#paint0_linear_3040_2060)"></path>
                                    <defs>
                                        <linearGradient id="paint0_linear_3040_2060" x1="10.2526" y1="13.6538" x2="5.04573" y2="1.90371" gradientUnits="userSpaceOnUse">
                                            <stop stop-color="#141414"></stop>
                                            <stop offset="1" stop-color="#141414"></stop>
                                        </linearGradient>
                                    </defs>
                                </svg>
                            </ListItemIcon>
                            <ListItemText sx={{ opacity: open ? 1 : 0 }} > Mid Journey Generator </ListItemText>
                        </ListItemButton>
                    </ListItem>
                </List>
                
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }} className='p-0'>
                {/* <DrawerHeader /> */}
                {window.location.pathname === '/user/sidebar' ? <ImageGenerator/> : 
                window.location.pathname === '/user/image-gallery' ? <ImageGallery/> : 
                window.location.pathname === '/user/subscription' ? <MyAccount/> : 
                window.location.pathname === '/user/help-center' ? <HelpCenter/> : 
                <MyAccount/> }
                {/* {window.location.pathname === 'user/image-gallery' ? <ImageGallery/> : ' ' } */}
            </Box>
        </Box>
    );
}
