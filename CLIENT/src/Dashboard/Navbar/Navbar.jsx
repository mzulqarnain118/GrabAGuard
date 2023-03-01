import React, { useState } from "react";
// import { useIntl } from "react-intl";
import { NavLink } from "react-router-dom";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";
import { FaBars } from "react-icons/fa";
import { BiLogOutCircle } from "react-icons/bi";

import "./custom.scss";
import { useLocation } from "react-router-dom";
import links from "./NavLinks/NavLinksData/NavLinksData";

const Navbar = ({
  rtl,
  toggled,
  handleToggleSidebar,
  styleClass,
  collapsed,
  handleCollapse,
  userlog,
}) => {
  const location = useLocation();

  return (
    <div className={styleClass}>
      <ProSidebar
        rtl={rtl}
        toggled={toggled}
        breakPoint="md"
        onToggle={handleToggleSidebar}
        collapsed={collapsed}
      >
        {/* <SidebarHeader>

        </SidebarHeader> */}

        <SidebarContent>
          {links &&
            links.map((link, index) => {
              return (
                <>
                  {(userlog?.role === "user" || userlog?.role === 'DVO') &&
                    (userlog?.role === link.roles[0] || userlog?.role === link.roles[1]) ? (
                    <Menu iconShape="circle" key={index}>
                      {link.sublinks.length > 0 ? (
                        <SubMenu
                          icon={link.Icon}
                          title={link.text}
                          data-element={location.pathname}
                        >
                          {link.sublinks.map((sublink, index) => {
                            if (sublink.roles[0]
                              !== "ADM")
                              return (
                                <MenuItem key={index}>
                                  <NavLink
                                    to={sublink.path}
                                    activeClassName={"nav-link-active"}
                                  >
                                    {sublink.text}
                                  </NavLink>
                                </MenuItem>
                              );
                          })}
                        </SubMenu>
                      ) : (
                        <MenuItem icon={link.Icon}>
                          <NavLink
                            to={link.path}
                            activeClassName={"nav-link-active"}
                          >
                            {link.text}
                          </NavLink>
                        </MenuItem>
                      )}
                    </Menu>
                  ) : null}



                  {(userlog?.role === 'ORIC_ADM') &&
                    (userlog?.role === link.roles[0] || userlog?.role === link.roles[1] || userlog?.role === link.roles[2] || userlog?.role === link.roles[3] || userlog?.role === link.roles[4] || userlog?.role === link.roles[5]) ? (
                    <Menu iconShape="circle" key={index}>
                      {console.log('oric role')}
                      {link.sublinks.length > 0 ? (
                        <SubMenu
                          icon={link.Icon}
                          title={link.text}
                          data-element={location.pathname}
                        >
                          {link.sublinks.map((sublink, index) => {
                            console.log(sublink)
                            if (sublink?.roles[0]
                              === "ORIC_ADM" || sublink?.roles[1]
                              === "ORIC_ADM" || sublink?.roles[2]
                              === "ORIC_ADM")
                              return (
                                <MenuItem key={index}>
                                  <NavLink
                                    to={sublink.path}
                                    activeClassName={"nav-link-active"}
                                  >
                                    {sublink.text}
                                  </NavLink>
                                </MenuItem>
                              );
                          })}
                        </SubMenu>
                      ) : (
                        <MenuItem icon={link.Icon}>
                          <NavLink
                            to={link.path}
                            activeClassName={"nav-link-active"}
                          >
                            {link.text}
                          </NavLink>
                        </MenuItem>
                      )}
                    </Menu>
                  ) : null}



                  {(userlog?.role === 'ORIC_CP') &&
                    (userlog?.role === link.roles[0] || userlog?.role === link.roles[1] || userlog?.role === link.roles[2] || userlog?.role === link.roles[3]) ? (
                    <Menu iconShape="circle" key={index}>
                      {console.log('oric role')}
                      {link.sublinks.length > 0 ? (
                        <SubMenu
                          icon={link.Icon}
                          title={link.text}
                          data-element={location.pathname}
                        >
                          {link.sublinks.map((sublink, index) => {
                            console.log(sublink)
                            if (sublink?.roles[0]
                              === "ORIC_CP" || sublink?.roles[1]
                              === "ORIC_CP" || sublink?.roles[2]
                              === "ORIC_CP")
                              return (
                                <MenuItem key={index}>
                                  <NavLink
                                    to={sublink.path}
                                    activeClassName={"nav-link-active"}
                                  >
                                    {sublink.text}
                                  </NavLink>
                                </MenuItem>
                              );
                          })}
                        </SubMenu>
                      ) : (
                        <MenuItem icon={link.Icon}>
                          <NavLink
                            to={link.path}
                            activeClassName={"nav-link-active"}
                          >
                            {link.text}
                          </NavLink>
                        </MenuItem>
                      )}
                    </Menu>
                  ) : null}









                  {(userlog?.role === 'HRM_ADM') &&
                    (userlog?.role === link.roles[0] || userlog?.role === link.roles[1] || userlog?.role === link.roles[2]) ? (

                    <Menu iconShape="circle" key={index}>
                      {console.log('link', link)}
                      {link.sublinks.length > 0 ? (
                        <SubMenu
                          icon={link.Icon}
                          title={link.text}
                          data-element={location.pathname}
                        >
                          {link.sublinks.map((sublink, index) => {
                            if (sublink?.roles[0]
                              === "HRM_ADM" || sublink?.roles[1]
                              === "HRM_ADM" || sublink?.roles[2]
                              === "HRM_ADM")
                              return (
                                <MenuItem key={index}>
                                  <NavLink
                                    to={sublink.path}
                                    activeClassName={"nav-link-active"}
                                  >
                                    {sublink.text}
                                  </NavLink>
                                </MenuItem>
                              );
                          })}
                        </SubMenu>
                      ) : (
                        <MenuItem icon={link.Icon}>
                          <NavLink
                            to={link.path}
                            activeClassName={"nav-link-active"}
                          >
                            {link.text}
                          </NavLink>
                        </MenuItem>
                      )}
                    </Menu>
                  ) : null}






                  {userlog?.role === "ADM" ? (
                    <Menu iconShape="circle" key={index}>
                      {link.sublinks.length > 0 ? (
                        <SubMenu
                          icon={link.Icon}
                          title={link.text}
                          data-element={location.pathname}
                        >
                          {link.sublinks.map((sublink, index) => {
                            return (
                              <MenuItem key={index}>
                                <NavLink
                                  to={sublink.path}
                                  activeClassName={"nav-link-active"}
                                >
                                  {sublink.text}
                                </NavLink>
                              </MenuItem>
                            );
                          })}
                        </SubMenu>
                      ) : (
                        <MenuItem icon={link.Icon}>
                          <NavLink
                            to={link.path}
                            activeClassName={"nav-link-active"}
                          >
                            {link.text}
                          </NavLink>
                        </MenuItem>
                      )}
                    </Menu>
                  ) : null}
                </>
              );
            })}
        </SidebarContent>

        <SidebarFooter>
          <Menu iconShape="circle">
            <MenuItem icon={<BiLogOutCircle />}>
              <NavLink exact to={"/logout"}>
                Log Out
              </NavLink>
            </MenuItem>
          </Menu>
        </SidebarFooter>
      </ProSidebar>
    </div>
  );
};

export default Navbar;
