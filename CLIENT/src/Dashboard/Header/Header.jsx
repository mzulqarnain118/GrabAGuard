import React, { useEffect } from "react";
import styles from "./Header.module.css";
import { Link } from "react-router-dom";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
// import Divider from "@mui/material/Divider";
import { makeStyles } from "@mui/styles";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import SettingsIcon from "@mui/icons-material/Settings";
import Avatar from "@mui/material/Avatar";
import NotificationsActive from "@mui/icons-material/NotificationsActive";
import AccountMenu from "./AccountMenu";
import { Tooltip } from "@mui/material";
import { ApiCallGet } from "../../Modules/CoreModules/ApiCall";
import { FaBars } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import logo from './logo.png';
import oric_logo from './oric_logo.png'

const useStyles = makeStyles({
  root: {
    display: "flex",
    alignItems: "center",
  },
  menuButton: {
    marginRight: '16px'
  },
});



const Header = (props) => {

  const classes = useStyles();
  console.log("Header Rerendered");
  return (
    <header className={`${styles.header} ${props.styleClass}`}>
      <div
        className={`btn-toggle ${classes.menuButton}`}
        onClick={() => props.handleToggleSidebar(props.toggled)}
      >
        <FaBars />
      </div>
      <div className="d-flex align-items-center">
        <div
          className={`btn-collapse`}
          onClick={() => props.handleCollapse(props.collapsed)}
        >
          <FaBars />
        </div>

      </div>
      <NavLink to={`${props.collapsed ? `#` : `/main`}`}>

          <img src={logo} alt="logo" width="100%" style={{ maxHeight: '55px', transition: 'all ease-in-out 0.3s' }} />
        
      </NavLink>
      <div className={styles.user__profile__data}>

        <AccountMenu />
      </div>
    </header>
  );
};

export default Header;

