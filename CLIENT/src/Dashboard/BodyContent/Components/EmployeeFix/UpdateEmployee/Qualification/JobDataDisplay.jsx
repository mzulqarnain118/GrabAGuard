import { Button, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react'
import guidelines from '../../../../../../Modules/Guidelines/Guidelines';
import Controls from '../../../../../../Modules/UiModules/Control/Controls';
import moment from 'moment';
import Toast from "../../../../../../Modules/UiModules/Core/Toast/Toast";
import {
  ApiCallGet,
  ApiCallPut,
} from "../../../../../../Modules/CoreModules/ApiCall";

const JobDataDisplay = (props) => {

  console.log("🚀 ~ file: JobDataDisplay.jsx:9 ~ JobDataDisplay ~ props:", props, moment(props?.data?.from).format('DD/MM/YYYY'))
 const id=props?.data?._id;
    const [values, setValues] = useState({
      guardRating: props.data?.guardRating ?? "",
      guardReview: props.data?.guardReview ?? "",
      hirerRating: props.data?.hirerRating ?? "",
      hirerReview: props.data?.hirerReview ?? "",
    });

    const handleChange = (e) => {
      const { name, value } = e.target;

      console.log(name, value);

      setValues({
        ...values,
        [name]: value,
      });
    };
    console.log(values, "values");
    const updateUser = React.useCallback(async () => {
      try {

        const response = await ApiCallPut(`/hiredGuards/${id}`, values);

        if (response?.status === 200) {
          console.log(response, "result");
          Toast("Data Updated Successfully!", "success");
          props.setTableUpdated((old) => old + 1);
          props.setJobDataOpen(false);
        }
      } catch (error) {
        console.log(error, "error");
        Toast(error.message, "error");
      }
    }, [values]);

    const handleSubmit = (e) => {
      e.preventDefault();
      updateUser();
    };
  
  return (
    <>
      <>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Stack>
            <div className="row p-3">
              <div className={`${guidelines.inputclass}`}>
                <Controls.Input
                  id="standard-basic"
                  label="Hirer"
                  value={props?.data?.hirer_name}
                  editable={false}
                />
              </div>
              <div className={`${guidelines.inputclass}`}>
                <Controls.Input
                  id="standard-basic"
                  label="Guard"
                  value={props?.data?.guard_name}
                  editable={false}
                />
              </div>
              <div className={`${guidelines.inputclass}`}>
                <Controls.Input
                  id="standard-basic"
                  label="Skill"
                  value={props?.data?.skill}
                  editable={false}
                />
              </div>

              <div className={`${guidelines.inputclass}`}>
                <Controls.Input
                  id="standard-basic"
                  label="From"
                  value={moment(props?.data?.from).format("DD/MM/YYYY")}
                  editable={false}
                />
              </div>

              <div className={`${guidelines.inputclass}`}>
                <Controls.Input
                  id="standard-basic"
                  label="To"
                  value={moment(props?.data?.to).format("DD/MM/YYYY")}
                  editable={false}
                />
              </div>
              <div className={`${guidelines.inputclass} `}>
                <Controls.Input
                  fullWidth
                  label="Job Status"
                  value={props?.data?.jobStatus}
                  editable={false}
                />
              </div>

              <div className={`${guidelines.inputclass} `}>
                <Controls.Input
                  fullWidth
                  label="Guard Rating"
                  name="guardRating"
                  value={values?.guardRating}
                  onChange={handleChange}
                />
              </div>
              <div className={`${guidelines.inputclass} `}>
                <Controls.Input
                  fullWidth
                  label="Hirer Rating"
                  name="hirerRating"
                  value={values?.hirerRating}
                  onChange={handleChange}
                />
              </div>
              <div className={`${guidelines.inputclass} `}>
                <Controls.Input
                  fullWidth
                  label="Guard Review"
                  name="guardReview"
                  value={values?.guardReview}
                  onChange={handleChange}
                />
              </div>
              <div className={`${guidelines.inputclass} `}>
                <Controls.Input
                  fullWidth
                  label="Hirer Review"
                  name="hirerReview"
                  value={values?.hirerReview}
                  onChange={handleChange}
                />
              </div>
              <div className={`${guidelines.inputclass} `}>
                <Controls.Input
                  fullWidth
                  label="Location"
                  name="location"
                  value={props?.data?.location}
                  editable={false}
                />
              </div>
              <div className={`${guidelines.inputclass} `}>
                <Controls.Input
                  fullWidth
                  label="Longitude"
                  name="longitude"
                  value={props?.data?.longitude}
                  editable={false}
                />
              </div>
              <div className={`${guidelines.inputclass} `}>
                <Controls.Input
                  fullWidth
                  label="Latitude"
                  name="latitude"
                  value={props?.data?.latitude}
                  editable={false}
                />
              </div>

              <div className={`${guidelines.inputclass}`}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={() => {
                    props.setJobDataOpen(false);
                  }}
                >
                  BACK
                </Button>
              </div>
              <div className={`${guidelines.inputclass}`}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={(e) => handleSubmit(e)}
                >
                  Update
                </Button>
              </div>
            </div>
          </Stack>
        </div>
      </>
    </>
  );
}


export default JobDataDisplay;