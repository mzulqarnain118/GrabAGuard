import React, { useState } from "react";
import Header from "./Header/Header";
// import { useIntl } from "react-intl";
import Aside from "./Navbar/Navbar";

function Layout(props) {
  const [rtl, setRtl] = useState(false);
  const [toggled, setToggled] = useState(false);
//   const intl = useIntl();

  const handleRtlChange = (checked) => {
    setRtl(checked);
    //setLocale(checked ? "ar" : "en");
  };

  const handleToggleSidebar = (value) => {
    setToggled(value);
  };

  return (
    <div className={`app ${rtl ? "rtl" : ""} ${toggled ? "toggled" : ""}`}>
      <Aside
        rtl={rtl}
        toggled={toggled}
        handleToggleSidebar={handleToggleSidebar}
      />
      <main>
        <Header handleToggleSidebar={handleToggleSidebar} userlog={props.userlog}  />
        <div className="app-content">{props.children}</div>
      </main>
    </div>
  );
}

export default Layout;
