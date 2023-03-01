import { Button, FormControl, IconButton, Input, InputAdornment, InputLabel, Typography } from '@material-ui/core';
import { Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import style from "./Newpassword.module.css"
import FormHelperText from '@mui/material/FormHelperText';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import { ApiCallPost } from '../../../../../Modules/CoreModules/ApiCall';
import Toast from '../../../../../Modules/UiModules/Core/Toast/Toast';
import Card from '../../../../../Modules/UiModules/Core/Card';

const AddNewPassword = () => {

    const [disable, setDisable] = useState(false)
    const [values, setValues] = React.useState({
        password: '',
        showPassword: false,
        showPassword2: false,
        showPassword3: false,
        currpassword: '',
        confirmpass: '',
        usererror: false,
        userhelper: null,
        curerror: false,
        curhelper: null,
        passerror: false,
        passhelper: null,
    });

    console.log(values)


    const handleChange = (prop, event) => {

        let cerror = values.confirmpass;
        let perror = values.passerror;
        let cuerror = values.curerror

        if (prop === 'confirmpass') {
            cerror = false;
        }

        if (prop === 'password') {
            perror = false;
        }


        if (prop === 'currpassword') {
            perror = false;
        }

        setValues({
            ...values, [prop]: event.target.value, usererror: cerror, passerror: perror, curerror: cuerror
        });
    };



    const handleClickShowPassword = (prevPasswordState) => {
        setValues({
            ...values,
            showPassword: !prevPasswordState,

        });
    };

    const handleClickShowPassword2 = (prevPasswordState2) => {
        setValues({
            ...values,

            showPassword2: !prevPasswordState2
        });
    };


    const handleClickShowPassword3 = (prevPasswordState3) => {
        setValues({
            ...values,

            showPassword3: !prevPasswordState3
        });
    };


    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };


    const ChangePassword = async (e) => {

        e.preventDefault();
        setDisable(true)
        if (!values.confirmpass) {
            setValues({ ...values, usererror: true, userhelper: 'Invalid Password' });
            return;
        }
        else if (!values.password) {
            setValues({ ...values, passerror: true, passhelper: 'Invalid Password' });
            return;
        }

        if (values.password === values.confirmpass) {
            console.log('Matched')
        }
        else {
            console.log('Not matched')
            Toast('password not matched', 'error')
            setDisable(false)
            return;
        }



        const result = await ApiCallPost('/change_password', { oldPassword: values.currpassword, newPassword: values.password });
        console.log(result);
        setDisable(true)
        if (result.error) {
            setValues({ ...values, usererror: true, userhelper: 'Invalid Confirm Password', passerror: true, passhelper: 'Invalid Password' });
            Toast(" Password and confirm password do not match", "error");
        } else if (result.data.status === 0) {
            Toast("Invalid Current Password", "error");
        } else {
            Toast("Password Changed Successfully", "success");

        }
        setDisable(false)




    }
    return (<>

        <Card>

            <div className={`container mb-4 `} style={{ backgroundColor: 'white', minHeight: '700px' }}>
                <div className="row justify-content-center">

                    <div className="col-lg-5 col-md-7" style={{ backgroundColor: 'white' }}>
                        <div className={`card border-0 mb-0  `} style={{ background: 'white' }}>
                            <div className={`card-body px-lg-5 py-lg-5 `} style={{ backgroundColor: "white", boxShadow: '0px 10px 10px 8px rgba(0, 0, 0, 0.2)', marginTop: '2rem' }}>

                                <Typography className={style.heading} variant="body2">
                                    <strong>Change Passowrd</strong>
                                </Typography>


                                <form onSubmit={ChangePassword}>


                                    <div className="form-floating mb-3 mt-2">


                                        <FormControl null fullWidth variant="standard">
                                            <InputLabel htmlFor="formatted-text-mask-input"> Current Password*</InputLabel>
                                            <Input fullWidth
                                                id="formatted-text-mask-input"
                                                type={values.showPassword3 ? 'text' : 'password'}
                                                value={values.currpassword}
                                                onChange={(e) => handleChange('currpassword', e)}
                                                required
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={() => handleClickShowPassword3(values.showPassword3)}
                                                            onMouseDown={handleMouseDownPassword}
                                                        >
                                                            {values.showPassword3 ? <VisibilityOff /> : <Visibility />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                }

                                            />
                                            {values.curerror ? <FormHelperText>{values.curhelper}</FormHelperText> : null}
                                        </FormControl>

                                    </div>



                                    <div className="form-floating mb-3 mt-2">


                                        <FormControl null fullWidth variant="standard">
                                            <InputLabel htmlFor="formatted-text-mask-input"> Password*</InputLabel>
                                            <Input fullWidth
                                                id="formatted-text-mask-input"
                                                type={values.showPassword ? 'text' : 'password'}
                                                value={values.password}
                                                onChange={(e) => handleChange('password', e)}
                                                required
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={() => handleClickShowPassword(values.showPassword)}
                                                            onMouseDown={handleMouseDownPassword}
                                                        >
                                                            {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                }

                                            />
                                            {values.usererror ? <FormHelperText>{values.passhelper}</FormHelperText> : null}
                                        </FormControl>

                                    </div>


                                    <div className="form-floating mb-3 mt-2">


                                        <FormControl null fullWidth variant="standard">
                                            <InputLabel htmlFor="formatted-text-mask-input">Confirm Password*</InputLabel>
                                            <Input fullWidth
                                                id="formatted-text-mask-input"

                                                type={values.showPassword2 ? 'text' : 'password'}
                                                value={values.confirmpass}
                                                onChange={(e) => handleChange('confirmpass', e)}
                                                required
                                                inputProps={{
                                                    autocomplete: 'new-password',
                                                    form: {
                                                        autocomplete: 'off',
                                                    },
                                                }}
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={() => handleClickShowPassword2(values.showPassword2)}
                                                            onMouseDown={handleMouseDownPassword}
                                                        >
                                                            {values.showPassword2 ? <VisibilityOff /> : <Visibility />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                }


                                            />
                                            {values.passerror ? <FormHelperText>{values.passhelper}</FormHelperText> : null}
                                        </FormControl>

                                    </div>
                                    <Stack direction="row" >
                                        <Button type="submit" disabled={disable} fullWidth className={` mb-3`} style={{
                                            backgroundColor: '#872b26',
                                            color: 'white'

                                        }} margin="dense" variant="contained" label="Sign In" >Change </Button>
                                    </Stack>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Card>

    </>

    );



};
export default AddNewPassword;