import React from "react";
import links from "./NavLinksData/NavLinksData";
import NavLinkItem from "./NavLinkItem/NavLinkItem";

function Navlinks(props) {
  const user = props.userlog;
  console.log('User Log: ', user);
  return (
    <nav>
      <ul>
        {links.map((item, index) => {
          return (
            <>{["user", "hirer", "guard", "admin"].includes(user?.role) && item.roles[0] === user.role ? <li key={index}>
              <NavLinkItem
                key={index}
                Icon={item.Icon}
                heading={item.text}
                path={item.path}
                onHover={props.hover}
                show={props.show}
                sublinks={item.sublinks}
                hoverStatus={props.hoverStatus}
                showStatus={props.showStatus}
              />
            </li> : user.role === 'DVO' && (item.roles[0] === user.role || item.roles[1] === user.role) ? <li key={index}>
              <NavLinkItem
                key={index}
                Icon={item.Icon}
                heading={item.text}
                path={item.path}
                onHover={props.hover}
                show={props.show}
                sublinks={item.sublinks}
                hoverStatus={props.hoverStatus}
                showStatus={props.showStatus}
              />
            </li> : user.role === 'HRM_ADM' && (item?.roles[0] === user.role || item?.roles[1] === user.role || item?.roles[2] === user.role || item?.roles[3] === user.role) ? <li key={index}>
              <NavLinkItem
                key={index}
                Icon={item.Icon}
                heading={item.text}
                path={item.path}
                onHover={props.hover}
                show={props.show}
                sublinks={item.sublinks}
                hoverStatus={props.hoverStatus}
                showStatus={props.showStatus}
              />
            </li> :
              user.role === 'ORIC_ADM' && (item.roles[0] === user.role || item.roles[1] === user.role || item?.roles[2] === user.role || item?.roles[3] === user.role)|| item?.roles[4] === user.role|| item?.roles[5] === user.role ? <li key={index}>
                {console.log(user.role)}
                <NavLinkItem
                  key={index}
                  Icon={item.Icon}
                  heading={item.text}
                  path={item.path}
                  onHover={props.hover}
                  show={props.show}
                  sublinks={item.sublinks}
                  hoverStatus={props.hoverStatus}
                  showStatus={props.showStatus}
                />
              </li> :
                user.role === 'ORIC_CP' && (item.roles[0] === user.role || item.roles[1] === user.role || item.roles[2] === user.role || item.roles[3] === user.role || item?.roles[4] === user.role|| item?.roles[5] === user.role) ? <li key={index}>
                  {console.log(user.role)}
                  <NavLinkItem
                    key={index}
                    Icon={item.Icon}
                    heading={item.text}
                    path={item.path}
                    onHover={props.hover}
                    show={props.show}
                    sublinks={item.sublinks}
                    hoverStatus={props.hoverStatus}
                    showStatus={props.showStatus}
                  />
                </li> :
                  user.role === 'ADM' ?
                    <li key={index}>
                      <NavLinkItem
                        Icon={item.Icon}
                        heading={item.text}
                        path={item.path}
                        onHover={props.hover}
                        show={props.show}
                        sublinks={item.sublinks}
                        hoverStatus={props.hoverStatus}
                        showStatus={props.showStatus}
                      />
                    </li> : null
            }

            </>

          );
        })}
      </ul>
    </nav>
  );
}

export default Navlinks;
