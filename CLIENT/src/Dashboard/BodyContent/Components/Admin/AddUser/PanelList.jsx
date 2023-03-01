
import React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch'


const PanelList = () => {
    const [state, setState] = React.useState({
        dashboard: false,
        personalprof: false,
        alladv: false,
        adv: false,
        emp: false,
        uploadfile: false,
        allfiles: false,
        adduser: false,
        changeper: false,
        setupform: false,

    });




    const [open, setOpen] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const [open3, setOpen3] = React.useState(false);
    const [open4, setOpen4] = React.useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    const handleClick2 = () => {
        setOpen2(!open2);
    };
    const handleClick3 = () => {
        setOpen3(!open3);
    };

    const handleClick4 = () => {
        setOpen4(!open4);
    };

    const handleChange = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.checked,
        });
    };


    return (
        <>

            <Box sx={{ width: '100%', boxShadow: '0 6px 10px rgba(0,0,0,.08), 0 0 6px rgba(0,0,0,.05)' }}>
                <List

                    component="nav"
                    aria-labelledby="nested-list-subheader"
                    subheader={
                        <ListSubheader component="div" id="nested-list-subheader" color="primary">
                            SELECT PANEL AND SUB PANEL
                        </ListSubheader>
                    }
                >
                    <ListItemButton onClick={handleClick}>

                        <ListItemText primary="Home" />

                        {open ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton >
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4 }}>

                                <ListItemText primary="Dashboard" />
                                <ListItemIcon>
                                    <Switch checked={state.dashboard} onChange={handleChange} name="dashboard" />
                                </ListItemIcon>
                            </ListItemButton>
                        </List>
                    </Collapse>
                    {/* <Collapse in={open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4 }}>
                                <ListItemText primary="personal profile" />
                                <ListItemIcon>
                                    <Switch checked={state.personalprof} onChange={handleChange} name="personalprof" />
                                </ListItemIcon>
                            </ListItemButton>
                        </List>
                    </Collapse> */}


                    <ListItemButton onClick={handleClick2} >

                        <ListItemText primary="forms" />
                        {open2 ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={open2} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4 }}>

                                <ListItemText primary="adverdisment" />
                                <ListItemIcon>
                                    <Switch checked={state.alladv} onChange={handleChange} name="alladv" />
                                </ListItemIcon>
                            </ListItemButton>
                        </List>
                    </Collapse>
                    <Collapse in={open2} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4 }}>

                                <ListItemText primary="all advertisment" />
                                <ListItemIcon>
                                    <Switch checked={state.adv} onChange={handleChange} name="adv" />

                                </ListItemIcon>
                            </ListItemButton>
                        </List>
                    </Collapse>
                    <Collapse in={open2} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4 }}>

                                <ListItemText primary="employee form" />
                                <ListItemIcon>
                                    <Switch checked={state.emp} onChange={handleChange} name="emp" />
                                </ListItemIcon>
                            </ListItemButton>
                        </List>
                    </Collapse>


                    <ListItemButton onClick={handleClick3}>

                        <ListItemText primary="Files" />
                        {open3 ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={open3} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4 }}>

                                <ListItemText primary="upload Files" />
                                <ListItemIcon>
                                    <Switch checked={state.uploadfile} onChange={handleChange} name="uplaodfile" />
                                </ListItemIcon>
                            </ListItemButton>
                        </List>
                    </Collapse>

                    <Collapse in={open3} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4 }}>
                                <ListItemText primary="All Files" />
                                <ListItemIcon>
                                    <Switch checked={state.allfiles} onChange={handleChange} name="allfiles" />
                                </ListItemIcon>
                            </ListItemButton>
                        </List>
                    </Collapse>


                    <ListItemButton onClick={handleClick4}>
                        <ListItemText primary="Admin" />
                        {open4 ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={open4} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4 }}>

                                <ListItemText primary="Add User" />
                                <ListItemIcon>
                                    <Switch checked={state.adduser} onChange={handleChange} name="adduser" />
                                </ListItemIcon>
                            </ListItemButton>
                        </List>
                    </Collapse>
                    <Collapse in={open4} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4 }}>

                                <ListItemText primary="Change Permission" />
                                <ListItemIcon>
                                    <Switch checked={state.changeper} onChange={handleChange} name="changeper" />
                                </ListItemIcon>
                            </ListItemButton>
                        </List>
                    </Collapse>
                    <Collapse in={open4} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4 }}>
                                <ListItemText primary="Setup Form" />
                                <ListItemIcon>
                                    <Switch checked={state.setupform} onChange={handleChange} name="setupform" />
                                </ListItemIcon>
                            </ListItemButton>
                        </List>
                    </Collapse>
                </List>
            </Box>

            {/* 
                </CardContent>
            </Card> */}

        </>
    );


}
export default PanelList;
