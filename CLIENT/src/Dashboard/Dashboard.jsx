import React, { useEffect } from "react";
import Header from "./Header/Header";
import BodyContent from "./BodyContent/BodyContent";
import styles from "./Dashboard.module.css";

const Dashboard = () => {

  const [collapsed, setCollapsed] = React.useState(true);
  const [toggled, setToggled] = React.useState(false);

  const handleCollapse = (prev) => {
    setCollapsed(!prev);
  }

  const handleToggleSidebar = (prev) => {
    setToggled(!prev);
  }

  return (
        <div className={`${styles.grid__wrapper} app`}>
          <Header styleClass={styles.header}  collapsed={collapsed} handleCollapse={handleCollapse} toggled={toggled} handleToggleSidebar={handleToggleSidebar} />
          <BodyContent styleClass={styles.body__content}  collapsed={collapsed} handleCollapse={handleCollapse} toggled={toggled} handleToggleSidebar={handleToggleSidebar} />
        </div>
  );
};

export default Dashboard;
