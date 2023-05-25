import React, { useEffect, useState,useMemo } from 'react'
import MatTable from '../../../../../../Modules/MaterialTable/MaterialTable';
import Toast from '../../../../../../Modules/UiModules/Core/Toast/Toast';
import { Stack } from "@mui/material";
import Popup from '../../../../../../Modules/UiModules/Core/Popup';
import { ApiCallPost, ApiCallGet, ApiCallDelete } from '../../../../../../Modules/CoreModules/ApiCall';
import QualificationForm from './QualificationForm';
import { Button } from '@mui/material';
const QualificationTable = (props) => {
    const [updation, setUpdation] = useState(false);
    const [user, setUser] = useState(false);
    const [addition, setAddition] = useState(false);
    const [tableUpdated, setTableUpdated] = useState(0);
    const { response, error } = ApiCallGet('/users', { getUpdatedData: tableUpdated });
    console.log('====================================');
    console.log(response, "IN COMPONENT");
    console.log('====================================');

    const Hirers = useMemo(() => response?.filter((item) => item.role === "hirer"), [response]);
    const Guards = useMemo(() => response?.filter((item) => item.role === "guard"), [response]);
    const [openPopup, setopenPopup] = useState(false);

    const handlePopup = (value) => {
        setopenPopup(value);
        setAddition(value);
        setUpdation(value);
    }
    const [row, setRow] = useState({});
    const columns = [
      {
        title: "ID",
        editable: () => true,
        field: "id",
        type: "string",
        cellStyle: { textAlign: "left" },
        headerStyle: { textAlign: "left" },
        hidden: true,
      },

      {
        title: "Name",
        type: "string",
        editable: () => false,
        cellStyle: { textAlign: "left" },
        headerStyle: { textAlign: "left" },
        render(rowData) {
          return rowData.firstName + " " + rowData.lastName;
        },
      },
      {
        title: "hirerType",
        field: "hirerType",
        type: "string",
        editable: () => false,
        cellStyle: { textAlign: "left" },
        headerStyle: { textAlign: "left" },
        hidden: !user,
      },
      {
        title: "Email",
        field: "email",
        type: "string",
        editable: () => false,
        cellStyle: { textAlign: "left" },
        headerStyle: { textAlign: "left" },
      },
      {
        title: "Address Line 1",
        field: "address1",
        type: "string",
        editable: () => false,
        cellStyle: { textAlign: "left" },
        headerStyle: { textAlign: "left" },
      },
      {
        title: "Address Line 2",
        field: "address2",
        type: "string",
        editable: () => false,
        cellStyle: { textAlign: "left" },
        headerStyle: { textAlign: "left" },
      },
      {
        title: "Town/City",
        field: "city",
        type: "string",
        editable: () => false,
        cellStyle: { textAlign: "left" },
        headerStyle: { textAlign: "left" },
      },
      {
        title: "Postcode",
        field: "postCode",
        type: "string",
        editable: () => false,
        cellStyle: { textAlign: "left" },
        headerStyle: { textAlign: "left" },
      },

      {
        title: "Skill",
        render(rowData) {
          return rowData.skill?.map((item) => item.name).join(", ");
        },
        type: "string",
        editable: () => false,
        cellStyle: { textAlign: "left" },
        headerStyle: { textAlign: "left" },
        hidden: !user,
      },
      {
        title: "Hourly Rate",
        field: "hourlyRate",
        render(rowData) {
          return rowData.hourlyRate.toString();
        },
        type: "array",
        editable: () => false,
        cellStyle: { textAlign: "left" },
        headerStyle: { textAlign: "left" },
        hidden: user,
      },
      {
        title: "Status",
        field: "status",
        type: "text",
        cellStyle: { textAlign: "left" },
        headerStyle: { textAlign: "left" },
      },
      {
        title: "Active",
        field: "active",
        type: "string",
        editable: () => false,
        cellStyle: { textAlign: "left" },
        headerStyle: { textAlign: "left" },
      },
      // {
      //     title: "Warning",
      //     field: "address",
      //     type: "string",
      //     editable: () => false,
      //     cellStyle: { textAlign: "left" },
      //     headerStyle: { textAlign: "left" },
      // },
      {
        title: "Phone",
        field: "phone",
        type: "string",
        editable: () => false,
        cellStyle: { textAlign: "left" },
        headerStyle: { textAlign: "left" },
      },
      {
        title: " Registration Date ",
        field: "createdAt",
        type: "date",
        dateSetting: { locale: "en-GB" },
        editable: () => false,
        cellStyle: { textAlign: "left" },
        headerStyle: { textAlign: "left" },
      },
      {
        title: "companyNumber",
        field: "companyNumber",
        type: "string",
        editable: () => false,
        cellStyle: { textAlign: "left" },
        headerStyle: { textAlign: "left" },
        hidden: !user,
      },
      {
        title: "position",
        field: "position",
        type: "string",
        editable: () => false,
        cellStyle: { textAlign: "left" },
        headerStyle: { textAlign: "left" },
        hidden: !user,
      },
      {
        title: "summary",
        field: "summary",
        type: "string",
        editable: () => false,
        cellStyle: { textAlign: "left" },
        headerStyle: { textAlign: "left" },
        hidden: user,
      },
      {
        title: "previousWork",
        field: "previousWork",
        type: "string",
        editable: () => false,
        cellStyle: { textAlign: "left" },
        headerStyle: { textAlign: "left" },
        hidden: user,
      },
      {
        title: "about",
        field: "about",
        type: "string",
        editable: () => false,
        cellStyle: { textAlign: "left" },
        headerStyle: { textAlign: "left" },
        hidden: user,
      },
      {
        title: "location",
        field: "location",
        type: "string",
        editable: () => false,
        cellStyle: { textAlign: "left" },
        headerStyle: { textAlign: "left" },
      },
      {
        title: "Phone",
        field: "phone",
        type: "string",
        editable: () => false,
        cellStyle: { textAlign: "left" },
        headerStyle: { textAlign: "left" },
      },
      {
        title: "longitude",
        field: "longitude",
        type: "string",
        editable: () => false,
        cellStyle: { textAlign: "left" },
        headerStyle: { textAlign: "left" },
      },
      {
        title: "latitude",
        field: "latitude",
        type: "string",
        editable: () => false,
        cellStyle: { textAlign: "left" },
        headerStyle: { textAlign: "left" },
      },
      {
        title: "companyName",
        field: "companyName",
        type: "string",
        editable: () => false,
        cellStyle: { textAlign: "left" },
        headerStyle: { textAlign: "left" },
        hidden: !user,
      },
      {
        title: "dob",
        field: "dob",
        type: "string",
        editable: () => false,
        cellStyle: { textAlign: "left" },
        headerStyle: { textAlign: "left" },
      },
      {
        title: "weight",
        field: "weight",
        type: "string",
        editable: () => false,
        cellStyle: { textAlign: "left" },
        headerStyle: { textAlign: "left" },
      },
      {
        title: "height",
        field: "height",
        type: "string",
        editable: () => false,
        cellStyle: { textAlign: "left" },
        headerStyle: { textAlign: "left" },
      },
    ];
  
    const onDelete = React.useCallback(

        async (row) => {
            try {
                const response = await ApiCallDelete(`/users/${row?.id}`);
                
                if (response.status === 204) {
                    console.log(response, "result")
                    setTableUpdated(old => old + 1);
                    Toast('Data Deleted', 'success')                   
                }
            } catch (error) {
                console.log(error, "error")
                // setLoading(false);
                Toast(error.message, "error");

            }
        },
        []
    );
    useEffect(() => {
    }, [tableUpdated]);
    return (
      <>
        <form>
          <Stack sx={{ display: "block" }}>
            {addition ? (
              <QualificationForm
                setTableUpdated={setTableUpdated}
                setopenPopup={handlePopup}
                label={"Add"}
                submitAction={"Insert"}
              />
            ) : updation ? (
              <QualificationForm
                data={row}
                setTableUpdated={setTableUpdated}
                setopenPopup={handlePopup}
                label={"Update"}
                submitAction={"Update"}
                setUpdation={setUpdation}
              />
            ) : (
              <>
                {" "}
                <Button variant="contained" onClick={() => setUser(false)}>
                 Guard
                </Button>
                <Button variant="contained" onClick={() => setUser(true)} sx={{marginLeft:"10px"}}>
                 Hirer
                </Button>
                <MatTable
                  actionsAtStart={true}
                  title="All Users"
                  columns={columns}
                  data={user ?  Hirers:Guards }
                  onDelete={onDelete}
                  onRowClick={(event, rowData) => {
                    setRow(rowData);
                    setUpdation(true);
                    setopenPopup(true);
                  }}
                />
              </>
            )}
          </Stack>
        </form>
      </>
    );
}

export default QualificationTable;