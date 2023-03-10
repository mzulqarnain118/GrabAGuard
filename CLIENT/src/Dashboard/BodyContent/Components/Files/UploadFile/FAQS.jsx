import React, { useState, useRef } from 'react';
import { Card, CardContent, Stack, TextField, Button, Typography } from '@mui/material';
import TextArea from "../../../../../Modules/UiModules/Core/TextArea";
import Toast from '../../../../../Modules/UiModules/Core/Toast/Toast';
import { ApiCallGet, ApiCallPost } from '../../../../../Modules/CoreModules/ApiCall';
import Formheading from '../../../../../Modules/UiModules/Control/Formheading';
import Loading from '../../../../../Modules/UiModules/Core/Loading/Loading';

const FAQS = () => {

  const question = useRef('');
  const answer = useRef('');
  const [tableUpdated, setTableUpdated] = useState(0);
  const { response, error,loading } = ApiCallGet('/queries', { getUpdatedData: tableUpdated });
  console.log('====================================');
  console.log(response, "IN COMPONENT");
  console.log('====================================');

  const handleSubmit = async () => {
      try {
        const screenData = {
          question:question.current.value,
          answer:answer.current.value

        }
        console.log("==========================", screenData)
        const response = await ApiCallPost(`/queries`, screenData);

        if (response?.status === 201) {
          console.log(response, "result")
          Toast('Question Added Successfully!', 'success')
          setTableUpdated((old) => old + 1);
        }
      } catch (error) {
        console.log(error, "error")
        Toast(error.message, "error");
      }
    }

  return (
    <>
      <Formheading label="FAQS" />
      {localStorage.getItem("role") ==="hirer" && <Stack>
        <div className='row align-items-center'>
          <div className='col-6 col-lg-6 col-md-12 col-sm-12'>
            <TextArea
              required
              label="Question" name="question"
              inputRef={question}
            />
          </div>

          <div className='col-6 col-lg-6 col-md-12 col-sm-12'>
            <TextArea
              required
              label="Answer" name="answer"
              inputRef={answer}
            />
          </div>
        </div>
        <Button variant="contained" style={{
          float: 'right', backgroundColor: '#872b26', alignItems: 'right', marginTop: '1rem'
          , fontSize: '0.9rem', letterSpacing: '0.05rem'
        }}
          onClick={() => handleSubmit()}
        > Add</Button>

      
      </Stack >}
      {loading ? <Loading />
        : response?.map(item => <Card className="col-12">
          <Typography variant="body1" style={{ fontWeight: 'bold' }} display="block">{item?.question}</Typography>
          <Typography variant="body1" display="block">{item?.answer}</Typography>
        </Card>)}
    </>
  );


}

export default FAQS;