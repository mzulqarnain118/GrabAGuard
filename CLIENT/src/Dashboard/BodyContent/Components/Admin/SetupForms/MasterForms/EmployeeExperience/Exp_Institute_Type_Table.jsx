import React, { useEffect, useState } from "react";
import { ApiCallGet, ApiCallPost } from "../../../../../../../Modules/CoreModules/ApiCall";
import MatTable from "../../../../../../../Modules/MaterialTable/MaterialTable"
import Popup from "../../../../../../../Modules/UiModules/Core/Popup";
import Toast from "../../../../../../../Modules/UiModules/Core/Toast/Toast";
import Exp_Institute_Type from "./Exp_Institute_type";



const Exp_Institute_Type_Table = (props) => {

    const [openPopup, setopenPopup] = useState(false);
    const [record, setrecord] = React.useState([]);
    const [updated, setUpdated] = useState(0);

    const [row, setRow] = useState({});

    const handlePopup = (value) => {
        setopenPopup(value);
        // setAddition(value);

    }

    const columns = [


        {
            title: "Experience Institute Type",
            editable: () => true,
            field: "inst_type_desc",
            type: "string",
            cellStyle: { textAlign: "left" },
            headerStyle: { textAlign: "left" },
        },

        {
            title: "Entered By",
            field: "emp_name",
            type: "string",
            editable: () => false,
            cellStyle: { textAlign: "left" },
            headerStyle: { textAlign: "left" },
        },

        {
            title: " Entery Time ",
            field: "entry_datetime",
            type: "date",
            editable: () => false,
            cellStyle: { textAlign: "left" },
            headerStyle: { textAlign: "left" },
        },

    ]


    const options = {
        filtering: true,
        exportAllData: true,
        exportButton: {
            csv: true,
            pdf: true
        }
    }



    useEffect(() => {

        const fetchData = async () => {
            try {
                var result = await ApiCallGet('/get_exp_institute_type');
                console.log(result);
                setrecord(result.data);


            }
            catch {
                alert("error");

            }

        }
        fetchData();

    }, [updated]);





    const update = async (oldRow, newRow) => {

        let validate = true;
        if (newRow.inst_type_desc === '' || newRow.inst_type_desc === null || newRow.inst_type_desc === undefined) {
            validate = false;
            Toast("Institute Type  Cannot be empty", "error");
        }




        if (validate === true) {

            const data = {
                inst_type_id: newRow.inst_type_id,
                inst_type_desc: newRow.inst_type_desc,

            }

            console.log(data);

            const result1 = await ApiCallPost('/Update_exp_institute_type', { ...data });
            if (result1.error) {
                Toast(result1.text, "error");
            } else {

                setUpdated(old => (old + 1));
                Toast('Data Updated Successfully!', 'success');
            }
        }
    };

    return (<>
        <Popup title='ADD Institute Type' openPopup={openPopup} setOpenPopup={setopenPopup} style={{ width: '800px' }}>
            <div style={{ width: '800px%' }}>
                <Exp_Institute_Type setUpdated={setUpdated} setOpenPopup={setopenPopup} />
            </div>

        </Popup>
        <MatTable title="Experience Institute Type" columns={columns} style={{ margin: '1rem' }}

            data={record}
            onUpdate={update}
            actionsAtStart={true}
            Options={options}
            customAdd={() => { setopenPopup(true); }}
            onRowClick={(event, rowData) => {
                console.log(event.target, rowData);
                setRow(rowData);
            }} />
    </>);
}


export default Exp_Institute_Type_Table;