import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import styles from "./Login.module.css";
import { Typography, Button, FormControl, Stack, InputLabel, Input, InputAdornment, IconButton } from '@mui/material';
import FormHelperText from '@mui/material/FormHelperText';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import ImgSlider from "./ImgSlider/ImgSlider";
import logo from "./unnamed.png"
import { ApiCallPost } from "../../Modules/CoreModules/ApiCall";
import Toast from "../../Modules/UiModules/Core/Toast/Toast";
import Popup from "../../Modules/UiModules/Core/Popup";
import UserReset from "../ResetPassword/UserReset";
import { useRouteMatch } from "react-router";


const Login = () => {

  const [values, setValues] = React.useState({
    password: '',
    showPassword: false,
    username: '',
    usererror: false,
    userhelper: null,
    passerror: false,
    passhelper: null,
  });
  const [disable, setDisable] = useState(false);
  const [openPopup, setopenPopup] = useState(false);
  const match = useRouteMatch();

  const handleChange = (prop, event) => {

    let uerror = values.usererror;
    let perror = values.passerror;

    if (prop === 'username') {
      uerror = false;
    }

    if (prop === 'password') {
      perror = false;
    }

    setValues({
      ...values, [prop]: event.target.value, usererror: uerror, passerror: perror,
    });
  };

  const history = useHistory();

  const handleClickShowPassword = (prevPasswordState) => {
    setValues({
      ...values,
      showPassword: !prevPasswordState,
    });
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const login = async (e) => {

    e.preventDefault();

    setDisable(true);

    if (values.username === '') {
      setValues({ ...values, usererror: true, userhelper: 'Invalid Username' });
      return;
    }
    else if (values.password === '') {
      setValues({ ...values, passerror: true, passhelper: 'Invalid Password' });
      return;
    }
    try {


      const result = await ApiCallPost('/auth/admin-panel-login', { email: values.username, password: values.password });
      if (result?.status === 200) {
        localStorage.setItem('token', result?.data?.tokens?.access?.token)
        localStorage.setItem('refreshToken', result?.data?.tokens?.refresh?.token)
        localStorage.setItem('loggedIn', true)
        localStorage.setItem('email', result?.data?.user?.email)
        localStorage.setItem('role', result?.data?.user?.role)
        localStorage.setItem('id', result?.data?.user?.id)
        localStorage.setItem('name', result?.data?.user?.firstName)
        localStorage.setItem('user', result?.data?.user)
        localStorage.setItem('2FA_qrCode', result?.data?.qrCode)
        localStorage.setItem('is2FAEnabled', result?.data?.user?.is2FAEnabled)
        Toast("Logged In Successfully", "success");
        // history.push('/main/users');
        history.push('/');
      }
    } catch (error) {
      console.log(error, "error")
      Toast(error.message, "error");
    }
    setDisable(false);

  }
  return (
    <>
      <div className={`${styles.container} px-1 px-md-1 px-lg-2 px-xl-4 py-4 mx-auto`}>
        <div className={`card mb-4 ${styles.card0}`} >
          <div className={`card-body ${styles.card__body}`}>
            <div className={`${styles.row} row ml-5 h-100`}>
              <div
                className="d-none d-md-flex col-md-4 col-sm-4 col-lg-6 h-100"
              >

                <ImgSlider></ImgSlider>


              </div>

              <div className="col-md-8 col-lg-6 col-sm-6 col-sm-11 col-12 h-100" >
                <div className={`login d-flex align-items-center h-100 ${styles.login} `}>
                  <div className={styles.row}>
                    <div className="col-md-11 col-lg-11 mx-auto mb-2">

                      <img className={styles.image} src={logo} alt="bgimg" />


                      <Typography className={styles.heading} variant="body2">
                        {/* <strong>   HRM System</strong> */}
                      </Typography>

                      <form onSubmit={login}>
                        <div className="form-floating mb-3 mt-2">


                          <FormControl error={values.usererror} null fullWidth variant="standard">
                            <InputLabel htmlFor="formatted-text-mask-input">Username*</InputLabel>
                            <Input fullWidth
                              id="formatted-text-mask-input"
                              type="text"
                              value={values.username}
                              disabled={disable}
                              onChange={(e) => handleChange('username', e)}
                              required/>
                            {values.usererror ? <FormHelperText>{values.userhelper}</FormHelperText> : null}
                          </FormControl>

                        </div>
                        <div className="form-floating mb-3">
                          <FormControl error={values.passerror} fullWidth variant="standard">
                            <InputLabel htmlFor="standard-adornment-password">Password*</InputLabel>
                            <Input fullWidth
                              id="standard-adornment-password"
                              type={values.showPassword ? 'text' : 'password'}
                              value={values.password}
                              disabled={disable}
                              onChange={(e) => handleChange('password', e)}
                              onKeyDown={(event) => {
                                if (event.code === "Enter" || event.code === "NumpadEnter") {
                                  event.preventDefault();
                                  login(event);
                                }
                              }}
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
                                    onClick={() => handleClickShowPassword(values.showPassword)}
                                    onMouseDown={handleMouseDownPassword}
                                  >
                                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                  </IconButton>
                                </InputAdornment>
                              }

                            />
                            {values.passerror ? <FormHelperText>{values.passhelper}</FormHelperText> : null}
                          </FormControl>
                        </div>

                        <Stack direction="row" >
                          <Button type="submit" fullWidth className={`${styles.button} mb-3`} margin="dense" variant="contained" label="Sign In" disabled={disable} >Sign In </Button>
                        </Stack>
                        <p className={`${styles.forget__link}`} onClick={() => setopenPopup(true)}>Forgot Password?</p>

                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Popup title='Forgot Password' openPopup={openPopup} setOpenPopup={setopenPopup}>
        <UserReset setOpenPopup={setopenPopup} />
      </Popup>

    </>

  );
};

export default Login;
