import React, { useState, useEffect } from 'react';
import { TextField, Button } from '@mui/material';
import guidelines from '../../../../../../Modules/Guidelines/Guidelines';
import MatTable from '../../../../../../Modules/MaterialTable/MaterialTable';
import { ApiCallPost, ApiCallGet, ApiCallPut } from "../../../../../../Modules/CoreModules/ApiCall";
import Toast from '../../../../../../Modules/UiModules/Core/Toast/Toast';

const AppFee = () => {
    const [fee, setFee] = React.useState({guardFee:'',hirerFee:''});
    const [updated, setUpdated] = useState(0);
    const { response, error } = ApiCallGet('/AppData', { getUpdatedData: updated });
    const columns = [
      {
        title: "Hirer Fee",
        editable: () => true,
        field: "hirerFee",
        type: "text",
        cellStyle: { textAlign: "left" },
        headerStyle: { textAlign: "left" },
      },
      {
        title: "Guard Fee",
        editable: () => true,
        field: "guardFee",
        type: "text",
        cellStyle: { textAlign: "left" },
        headerStyle: { textAlign: "left" },
      },
    ];

    const handleformSubmit = async (e) => {
        e.preventDefault();

        const result1 = await ApiCallPost('/AppData', fee);
        if (result1.error) {
            Toast(result1.text, 'error');
        }
        else {
            console.log(result1.data);
            Toast("Success", "success");
            setUpdated(old => (old + 1));
        }

    }
    const options = {
        filtering: true,
        exportAllData: true,
        exportButton: {
            csv: true,
            pdf: true
        }
    }
    const update = async (oldRow, newRow) => {

        let validate = true;
        if (newRow.fee === '' || newRow.fee === null || newRow.fee === undefined) {
            validate = false;
            Toast("Name Cannot be empty", "error");
        }
        if (validate === true) {

            const result1 = await ApiCallPut(`/AppData/${newRow._id}`, { ...newRow });
            if (result1.error) {
                Toast(result1.text, "error");
            } else {

                setUpdated(old => (old + 1));
                Toast('Data Updated Successfully!', 'success');
            }
        }
    };


    return (
      <>
        <div
          className="w-100"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <form
            container
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "2rem",
              marginBottom: "5rem",
              position: "relative",
              width: "100%",
            }}
          >
            <div
              className="row w-100"
              style={{ alignItems: "center", justifyContent: "center" }}
            >
              <div className={`col  ${guidelines.inputclass}`}>
                <TextField
                  fullWidth
                  required
                  label="Hirer Fee"
                  variant="standard"
                  value={fee.hirerFee}
                  name="hirerFee"
                  onChange={(e) => {
                    setFee((old) => ({ ...old, hirerFee: e.target.value }))
                  }}
                />
                <TextField
                  fullWidth
                  required
                  label="Guard Fee"
                  variant="standard"
                  value={fee.guardFee}
                  name="guardFee"
                                onChange={(e) => {
                    setFee((old) => ({ ...old, guardFee: e.target.value }))
                  }}
                />
              </div>

              <div className={`col  ${guidelines.inputclass}`}>
                <Button
                  onClick={(e) => handleformSubmit(e)}
                  variant="contained"
                  color="primary"
                >
                  Enter
                </Button>
              </div>
            </div>
          </form>

          <MatTable
            title="App Fee"
            columns={columns}
            style={{ margin: "1rem" }}
            data={response ?? []}
            onUpdate={update}
            // Options={options}
            actionsAtStart={true}
          />
        </div>
      </>
    );
}
export default AppFee;