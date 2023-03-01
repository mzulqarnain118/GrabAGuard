import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PostAddIcon from '@mui/icons-material/PostAdd';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import InsightsIcon from '@mui/icons-material/Insights';
import AssuredWorkloadIcon from '@mui/icons-material/AssuredWorkload';
import BadgeIcon from '@mui/icons-material/Badge';
import LibraryBooksOutlinedIcon from '@mui/icons-material/LibraryBooksOutlined';

//Sublinks
import FormSublinks from "../../../BodyContent/Components/Forms/FormLinks";
import HomeSublinks from "../../../BodyContent/Components/Home/HomeLinks";
import FilesSublinks from "../../../BodyContent/Components/Files/FileLinks";
import AdminSubLinks from "../../../BodyContent/Components/Admin/AdminLinks";
import SanctionSublinks from "../../../BodyContent/Components/Sanctions/SanctionsLinks";
import EmpFixSublinks from "../../../BodyContent/Components/EmployeeFix/EmployeeFixSublinks";
import ReportSublinks from "../../../BodyContent/Components/Reports/ReportSublinks";
import UsersSublinks from "../../../BodyContent/Components/Users/UsersSublinks"
import React from "react";
import { AccountCircleOutlined } from "@mui/icons-material";

// import Log from "../../../../Modules/CoreModules/Log";

const links = [
  {
    text: "Home",
    Icon: <HomeOutlinedIcon />,
    path: "/main/home",
    roles: ['user','DEO', 'DVO','HRM_ADM', 'ADM'],
    sublinks: HomeSublinks,
  },
  // {
  //   text: "Forms",
  //   Icon: <PostAddIcon />,
  //   path: "/main/forms",
  //   roles: [],
  //   sublinks: FormSublinks,
  // },
  {
    text: "Employees",
    Icon: <BadgeIcon />,
    path: "/main/employee-fix",
    roles: [ 'DEO', 'DVO','HRM_ADM', 'ADM'],
    sublinks: EmpFixSublinks,
  },
  {
    text: "Files",
    Icon: <InsertDriveFileIcon />,
    path: "/main/files",
    roles: [ 'DEO','HRM_ADM', 'ADM'],
    sublinks: FilesSublinks,
  },
  {
    text: "Admin",
    Icon: <AdminPanelSettingsIcon />,
    path: "/main/admin-settings",
    roles: [ 'DEO','HRM_ADM', 'ADM'],
    sublinks: AdminSubLinks,
  },
  {
    text: "Sanctions",
    Icon: <AssuredWorkloadIcon />,
    path: "/main/sanctions",
    roles: ['DEO','HRM_ADM', 'ADM'],
    sublinks: SanctionSublinks,
  },
  {
    text: "Reports",
    Icon: <InsightsIcon />,
    path: "/main/reports",
    roles: ['DEO', 'DVO','HRM_ADM', 'ADM'],
    sublinks: ReportSublinks,
  },
  {
    text: "Users",
    Icon: <AccountCircleOutlined />,
    path: "/main/users",
    roles: ['user', 'HRM_ADM', 'ADM', 'ORIC_ADM','ORIC_CP'],
    sublinks: UsersSublinks,
  }
];

const contextlinks = (pathname) => {
  let sublinks = [];
  let paths = pathname.split('/', 3).join('/');

  for (let i = 0; i < links.length; i++) {
    if (links[i].path === paths) {
      sublinks = links[i].sublinks;
    }
  }
  return sublinks;
};

export { contextlinks };
export default links;
