import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Lock from '@mui/icons-material/Lock';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { NavLink } from 'react-router-dom';
import { ApiCallPost } from '../../Modules/CoreModules/ApiCall'
import { Grid } from '@mui/material';
export default function AccountMenu() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [selected, setSelected] = React.useState(false);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <React.Fragment>

            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                <Tooltip title="Profile Information">
                    <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
                        <Avatar sx={{ width: 32, height: 32 }}><Settings fontSize="small" /></Avatar>
                    </IconButton>
                </Tooltip>
            </Box>


            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        width: '300px',

                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <div className='d-flex flex-column align-items-centre justify-content-center'>
                    <div className='d-flex align-items-center justify-content-between p-2'>
                        <strong>Name: </strong>
                        <p className='m-0 ' style={{ color: 'var(--primary-color)' }}>{localStorage.getItem("name") ?? '-'}</p>
                    </div>
                    <div className='d-flex align-items-center justify-content-between p-2'>
                        <strong>Email: </strong>
                        <p className='m-0 ' style={{ color: 'var(--primary-color)' }}>{localStorage.getItem("email") ?? '-'}</p>

                    </div>
                    <div className='d-flex align-items-center justify-content-between p-2'>
                        <strong>User ID: </strong>
                        <p className='m-0 ' style={{ color: 'var(--primary-color)' }}>{localStorage.getItem("id") ?? '-'}</p>
                    </div>
                </div>

                <Divider />
                <NavLink to="/main/home/enable-2fa">
                    <MenuItem>
                        <ListItemIcon>
                            <Lock fontSize="small" />
                        </ListItemIcon>
                        2FA Authentication
                    </MenuItem>
                </NavLink>
                {/* <NavLink to="/main/home/personal-profile">
                    <MenuItem>
                        <Avatar />Profile Info
                    </MenuItem>
                </NavLink> */}
                {/* <MenuItem>
                    <Avatar /> My account
                </MenuItem> */}
                <Divider />
                {/* <MenuItem>
                    <ListItemIcon>
                        <PersonAdd fontSize="small" />
                    </ListItemIcon>
                    Add another account
                </MenuItem> */}
                {/* <NavLink to="/main/users/change_password">
                    <MenuItem>
                        <ListItemIcon>
                            <Lock fontSize="small" />
                        </ListItemIcon>
                        Change Password
                    </MenuItem>
                </NavLink> */}

                <NavLink to="/logout">
                    <MenuItem>
                        <ListItemIcon>
                            <Logout fontSize="small" />
                        </ListItemIcon>
                        Logout
                    </MenuItem>
                </NavLink>
            </Menu>
            <Grid />
        </React.Fragment>
    );
}
