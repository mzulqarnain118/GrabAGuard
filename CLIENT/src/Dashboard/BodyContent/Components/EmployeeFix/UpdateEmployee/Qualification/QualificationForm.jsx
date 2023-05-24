import { Button, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useForm, Form } from '../../../../../../Modules/UiModules/Control/useForm';
import guidelines from '../../../../../../Modules/Guidelines/Guidelines';
import Controls from '../../../../../../Modules/UiModules/Control/Controls';
import { ApiCallGet, ApiCallPatch } from '../../../../../../Modules/CoreModules/ApiCall';
import Toast from '../../../../../../Modules/UiModules/Core/Toast/Toast';
import { Link } from 'react-router-dom';
import ImageDisplay from './DisplayDocs';
import FilteredJobs from './FilteredJobs';
import JobDataDisplay from './JobDataDisplay';
import moment from 'moment';
const QualificationForm = (props) => {
        const [tableUpdated, setTableUpdated] = useState(0);

    const FilteredJobsData = ApiCallGet("/hiredGuards", {
      getUpdatedData: tableUpdated,
    });
    const skills = []
    props.data?.skill?.map((item) => skills.push(item?._id))

   const getSkills = ApiCallGet('/AddServices');
    const id = props?.data?.id
    const [row, setRow] = useState({});

    const [values, setValues] = useState({
        email: props.data?.email??'',
        firstName: props.data?.firstName ??'',
        lastName: props.data?.lastName ??'',
        address: props.data?.address ??'',
        phone: props.data?.phone ??'',
        status: props.data?.status ??'',
        skill: skills ?? [],
        hourlyRate: props.data?.hourlyRate ?? '',
        dob: props.data?.dob ?? '',
        companyName: props.data?.companyName ?? '',
        companyNumber: props.data?.companyNumber ?? '',
        position: props.data?.position ?? '',
        previousWork: props.data?.previousWork ?? '',
        summary: props.data?.summary ?? '',
        about: props.data?.about ?? '',
        height: props.data?.height ?? '',
        weight: props.data?.weight ?? '',
    });
    const [open, setOpen] = useState(false);
    const [jobDataOpen, setJobDataOpen] = useState(false);

    const [statusLookup, setStatusLookup] = useState([{ id: 1, title: 'Approved' }, { id: 2, title: 'Pending' }, { id: 3, title: 'Blocked' }]);
    const { response, error } = ApiCallGet(`/files/${id}`);

    const handleChange = (e) => {
        const { name, value } = e.target;

        console.log(name, value);

        setValues({
            ...values,
            [name]:  value
        })
    }
    console.log(values,"values");

    const updateUser = React.useCallback(
      
        async () => {
            try {
                const screenData = {
                    email: values.email,
                    firstName: values.firstName,
                    lastName: values.lastName,
                    address: values.address,
                    phone: values.phone,
                    status: values.status == 1 ? "Approved" : values.status == 2 ? "Pending" : values.status == 3 ? "Blocked" : values.status,
                    skill: values.skill,
                    hourlyRate: values.hourlyRate.toString().split(","),
                }
                console.log("==========================", screenData)
  
                const response = await ApiCallPatch(`/users/${id}`, screenData);
 
                if (response?.status === 200) {
                    console.log(response, "result")
                    Toast('Data Updated Successfully!', 'success')
                    props.setTableUpdated((old) => old + 1);
                    props.setUpdation(false);
                }
            } catch (error) {
                console.log(error, "error")
                Toast(error.message, "error");
            }
        },
        [values]
    );


    const handleSubmit = (e) => {
        e.preventDefault();
        updateUser()
    }

 
    return (
      <>
        {open ? (
          <ImageDisplay data={response} setOpen={setOpen} />
        ) : jobDataOpen ? (
          <JobDataDisplay data={row} setJobDataOpen={setJobDataOpen} />
        ) : (
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
                      label="First Name"
                      name="firstName"
                      required
                      value={values?.firstName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className={`${guidelines.inputclass}`}>
                    <Controls.Input
                      id="standard-basic"
                      label="Last Name"
                      name="lastName"
                      required
                      value={values?.lastName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className={`${guidelines.inputclass}`}>
                    <Controls.Input
                      id="standard-basic"
                      inputProps={{ type: "email" }}
                      label="Email."
                      name="email"
                      required
                      value={values?.email}
                      onChange={handleChange}
                    />
                  </div>

                  <div className={`${guidelines.inputclass}`}>
                    <Controls.Input
                      id="standard-basic"
                      label="Mobile Phone"
                      name="phone"
                      required
                      value={values?.phone}
                      onChange={handleChange}
                    />
                  </div>

                  <div className={`${guidelines.inputclass}`}>
                    <Controls.Input
                      id="standard-basic"
                      label="Address"
                      name="address"
                      required
                      value={values?.address}
                      onChange={handleChange}
                    />
                  </div>
                  <div
                    className={`${guidelines.inputclass} `}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Controls.Select
                      fullWidth
                      name="status"
                      label="Change Status"
                      value={
                        values?.status === "Pending"
                          ? 2
                          : values?.status === "Approved"
                          ? 1
                          : values?.status === "Blocked"
                          ? 3
                          : values?.status
                      }
                      onChange={handleChange}
                      options={statusLookup}
                    />
                  </div>

                  <div className={`${guidelines.inputclass}`}>
                    <Controls.Input
                      id="standard-basic"
                      label="DOB"
                      value={moment(values.dob).format("DD/MM/YYYY")}
                      onChange={handleChange}
                    />
                  </div>

                  <div className={`${guidelines.inputclass}`}>
                    <Controls.Input
                      id="standard-basic"
                      label="Company Name"
                      value={values.companyName}
                      onChange={handleChange}
                    />
                  </div>

                  <div className={`${guidelines.inputclass}`}>
                    <Controls.Input
                      id="standard-basic"
                      label="Company Number"
                      value={values.companyNumber}
                      onChange={handleChange}
                    />
                  </div>

                  <div className={`${guidelines.inputclass}`}>
                    <Controls.Input
                      id="standard-basic"
                      label="Position"
                      value={values.position}
                      onChange={handleChange}
                    />
                  </div>

                  <div className={`${guidelines.inputclass}`}>
                    <Controls.Input
                      id="standard-basic"
                      label="Previous Work"
                      value={values.previousWork}
                      onChange={handleChange}
                    />
                  </div>

                  <div className={`${guidelines.inputclass}`}>
                    <Controls.Input
                      id="standard-basic"
                      label="Summary"
                      value={values.summary}
                      onChange={handleChange}
                    />
                  </div>

                  <div className={`${guidelines.inputclass}`}>
                    <Controls.Input
                      id="standard-basic"
                      label="About"
                      value={values.about}
                      onChange={handleChange}
                    />
                  </div>
                  <div className={`${guidelines.inputclass}`}>
                    <Controls.Input
                      id="standard-basic"
                      label="Height"
                      value={values.height}
                      onChange={handleChange}
                    />
                  </div>
                  <div className={`${guidelines.inputclass}`}>
                    <Controls.Input
                      id="standard-basic"
                      label="Weight"
                      value={values.weight}
                      onChange={handleChange}
                    />
                  </div>

                  {props?.data?.role === "hirer" && (
                    <>
                      <div className={`${guidelines.inputclass}`}>
                        <Controls.Input
                          id="standard-basic"
                          label="HirerType"
                          value={values.hirerType}
                          onChange={handleChange}
                        />
                      </div>
                    </>
                  )}
                  {props?.data?.role === "guard" && (
                    <>
                      <div
                        className={`${guidelines.inputclass} `}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Controls.Select
                          fullWidth
                          name="skill"
                          multiple
                          label="Change Skill"
                          value={values?.skill}
                          onChange={handleChange}
                          options={
                            getSkills?.response?.map((item) => ({
                              id: item?._id,
                              title: item?.name,
                            })) ?? []
                          }
                        />
                                                </div>
                                                
                    </>
                  )}

                  {props?.data?.role === "guard" && (
                    <div
                      className={`${guidelines.inputclass} `}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Controls.Input
                        fullWidth
                        name="hourlyRate"
                        label="Hourly Rate"
                        value={values?.hourlyRate}
                        onChange={handleChange}
                      />
                    </div>
                  )}
                  <div className={`${guidelines.inputclass}`}>
                    {/* <Link to={{ pathname: 'showDocs', state: { data: response } }}> */}
                    <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      size="large"
                      onClick={() => setOpen(true)}
                    >
                      Check Docs
                    </Button>
                    {/* </Link> */}
                  </div>
                  <div className={`${guidelines.inputclass}`}>
                    <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      size="large"
                      onClick={(e) => handleSubmit(e)}
                    >
                      {props.label}
                    </Button>
                  </div>
                  <div className={`${guidelines.inputclass}`}>
                    <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      size="large"
                      onClick={() => {
                        props.setUpdation(false);
                      }}
                    >
                      BACK
                    </Button>
                  </div>
                </div>
              </Stack>
            </div>
            <FilteredJobs
              data={FilteredJobsData?.response ?? []}
              setRow={setRow}
              setJobDataOpen={setJobDataOpen}
              setTableUpdated={setTableUpdated}
            />
          </>
        )}
      </>
    );
}


export default QualificationForm;