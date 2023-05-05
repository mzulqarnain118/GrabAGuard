import { Button, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react'
import guidelines from '../../../../../../Modules/Guidelines/Guidelines';
import Controls from '../../../../../../Modules/UiModules/Control/Controls';
import moment from 'moment';

const JobDataDisplay = (props) => {

  console.log("🚀 ~ file: JobDataDisplay.jsx:9 ~ JobDataDisplay ~ props:", props, moment(props?.data?.from).format('DD/MM/YYYY'))

  
  return (
    <>
        <>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Stack>

              <div className="row p-3" >

                <div className={`${guidelines.inputclass}`} >
                  <Controls.Input id="standard-basic"
                    label="Hirer"
                    value={props?.data?.hirer_name}
                    editable={false}
                  />

                </div>
                <div className={`${guidelines.inputclass}`} >
                  <Controls.Input id="standard-basic"
                    label="Guard"
                    value={props?.data?.guard_name}
                    editable={false}
                  />

                </div>
                <div className={`${guidelines.inputclass}`} >
                  <Controls.Input id="standard-basic"
                    label="Skill"
                    value={props?.data?.skill}
                    editable={false}
                  />
                </div>

                <div className={`${guidelines.inputclass}`} >
                  <Controls.Input id="standard-basic"
                    label="From"
                    value={moment(props?.data?.from).format('DD/MM/YYYY')}
                    editable={false}
                  />
                </div>

              <div className={`${guidelines.inputclass}`} >
                <Controls.Input id="standard-basic"
                  label="To"
                  value={moment(props?.data?.to).format('DD/MM/YYYY')}
                  editable={false}
                />
              </div>
                <div className={`${guidelines.inputclass} `} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Controls.Input fullWidth
                    label="Job Status"
                    value={props?.data?.jobStatus}
                    editable={false}
                  />
                </div>

                <div className={`${guidelines.inputclass} `} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Controls.Input fullWidth
                  label="Guard Rating"
                  name='guardRating'
                    value={props?.data?.guardRating}
                    editable={false}
                  />
                </div>
              <div className={`${guidelines.inputclass} `} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Controls.Input fullWidth
                  label="Hirer Rating"
                  name='hirerRating'
                  value={props?.data?.hirerRating}
                  editable={false}
                />
              </div>
              <div className={`${guidelines.inputclass} `} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Controls.Input fullWidth
                  label="Guard Review"
                  name='guardRating'
                  value={props?.data?.guardRating}
                  editable={false}
                />
              </div>
              <div className={`${guidelines.inputclass} `} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Controls.Input fullWidth
                  label="Hirer Review"
                  name='hirerReview'
                  value={props?.data?.hirerReview}
                  editable={false}
                />
              </div>
              <div className={`${guidelines.inputclass} `} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Controls.Input fullWidth
                  label="Location"
                  name='location'
                  value={props?.data?.location}
                  editable={false}
                />
              </div>
            <div className={`${guidelines.inputclass} `} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Controls.Input fullWidth
                label="Longitude"
                name='longitude'
                value={props?.data?.longitude}
                editable={false}
              />
            </div>
        <div className={`${guidelines.inputclass} `} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Controls.Input fullWidth
            label="Latitude"
            name='latitude'
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
                      props.setJobDataOpen(false)
                    }}
                  >
                    BACK
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