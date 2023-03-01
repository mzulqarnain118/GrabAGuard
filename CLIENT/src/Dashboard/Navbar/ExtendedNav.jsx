import React from "react";
import styles from "./ExtendedNav.module.css";
import { NavlinksContext } from "../../Modules/Contexts/NavlinksContextProvider";
import { NavLink } from "react-router-dom";
// import Log from "../../Modules/CoreModules/Log";

const ExtendedNav = (props) => {

  let classes = [styles.hero__nav];
  if (props.show || props.hover) {
    classes.push(styles.nav__open);
  }

  const mouseExitHandler = () => {
    if (!props.open) {
      if (props.hover) {
        props.hoverHandler(props.hover);
      }
    }
  }

  const links = React.useContext(NavlinksContext)[0];
  const sublinks = links?.map((link, index) => (
    <NavLink key={index} to={link.path} className={styles.sublink} activeClassName={styles.active__sublink}>{link.text}</NavLink>
  ))
  return (
    <div className={classes.join(" ").toString()} id="extended_nav" onMouseLeave={mouseExitHandler}>
      <div className={styles.border}>

        <ul className={styles.navlinks}>
          {sublinks}
        </ul>
      </div>
    </div>
  );
};

export default ExtendedNav;
