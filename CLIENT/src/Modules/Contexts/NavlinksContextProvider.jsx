import React, { createContext, useState } from 'react';
import { contextlinks } from '../../Dashboard/Navbar/NavLinks/NavLinksData/NavLinksData';
import { useHistory } from "react-router-dom";
// import Log from "../CoreModules/Log";

export const NavlinksContext = createContext();

const NavlinksContextProvider = (props) => {

    const history = useHistory();
    const [links, setLinks] = useState(contextlinks(history.location.pathname));

    React.useEffect(() => {
        setLinks(contextlinks(history.location.pathname));
    }, [history]);

    return (
        <NavlinksContext.Provider value={[links, setLinks]}>
            {props.children}
        </NavlinksContext.Provider>
    )
}

export default NavlinksContextProvider;
