import React, { useEffect } from "react";
import styles from "./NavLinkItem.module.css";
import { NavLink } from "react-router-dom";
import { NavlinksContext } from "../../../../Modules/Contexts/NavlinksContextProvider";
import { useLocation } from 'react-router-dom'
// import Log from "../../../../Modules/CoreModules/Log";

const NavLinkItem = (props) => {
  const setSublinks = React.useContext(NavlinksContext)[1];
  const currentPath = useLocation();

  // useEffect(() => {
  //   window.addEventListener('mousemove', (e) => {
  //    console.log(e.target.parentNode);
  //   });
  
  //   // returned function will be called on component unmount 
  //   return () => {
  //     window.removeEventListener('mousemove', () => {})
  //   }
  // }, [])

  const clickHandler = (prevState) => {
    console.log(props.sublinks)
    if(props.sublinks.length === 0)
    {
        props.onHover(true);
        if(props.show)
        {
          props.showStatus(true)
        }
    }
    else if (!props.show) {
      props.onHover(!prevState);
    }
    setSublinks(props.sublinks);
  }

  const hoverHandler = (prevState, event) => {
    if(props.sublinks.length === 0)
    {
      return;
    }
    if (!props.show && (currentPath.pathname.includes(props.path))) {
      props.onHover(!prevState);
      setSublinks(props.sublinks);
    }
  }

  const hoverExitHandler = (prevState,event) =>{
    
    if(!props.hoverStatus)
    {
      props.onHover(!prevState);
    }
  }

  return (
    <NavLink id="hrm__navlinkitem" to={props.path} activeClassName={styles.active__link} onClick={(e) => clickHandler(true, e)} onMouseEnter={(e) => hoverHandler(true, e)} onMouseLeave={(e) => hoverExitHandler(false, e)} >
      <div className={styles.hero__navitem} >
        <div className={styles.icon}>{props.Icon}</div>
        <p className={styles.heading}>{props.heading}</p>
      </div>
    </NavLink>
  );
};

export default NavLinkItem;
