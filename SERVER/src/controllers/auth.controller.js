const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { authService, userService, tokenService, emailService, } = require('../services');
const { getAuth, signInWithCredential, GoogleAuthProvider } = require('firebase/auth');
const { TWO_FACTOR_SECRET } = require('../config/config')
const qrcode = require('qrcode');

const sendOtpToPhone = catchAsync(async (req, res) => {
  const phone = req.body.phone;
  const otp = await authService.sendOtpToPhoneByAwsSNS(phone);
  res.send({ otp });
});

const register = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  const tokens = await tokenService.generateAuthTokens(user);
  res.status(httpStatus.CREATED).send({ user, tokens });
});

const socialRegister = catchAsync(async (req, res) => {
    const { accessToken, refreshToken,expires } = req.body;
    delete req.body.accessToken;
    delete req.body.refreshToken;
    const user = await userService.createUser(req.body);
  const tokens = await tokenService.saveSocialAuthToken(user.id, accessToken, refreshToken ?? "facebookRegister", expires ?? "01/01/1980");
    res.status(httpStatus.CREATED).send({ user, tokens });
});
const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.loginUserWithEmailAndPassword(email, password);
  const tokens = await tokenService.generateAuthTokens(user);
  res.send({ user, tokens });
});

const adminPanelLogin = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.adminPanelLoginUserWithEmailAndPassword(email, password);
  const tokens = await tokenService.generateAuthTokens(user);
  const qrCode = await qrcode.toDataURL(TWO_FACTOR_SECRET.otpauth_url);// Generate a QR code image
  res.send({ user, tokens, qrCode});
});

const verify2FAToken = catchAsync(async (req, res) => {
  const { email, password, token2FA } = req.body;
  const user = await authService.adminPanelLoginUserWithEmailAndPassword(email, password);
  const verified = speakeasy.totp.verify({
    secret:TWO_FACTOR_SECRET.ascii,
    encoding: 'ascii',
    token: token2FA
  });
  if (verified) {
    const tokens = await tokenService.generateAuthTokens(user);
    res.send({ user, tokens });
  } else {
    res.send({ message: "Invalid 2FA Token" });
  }
});

const googleLogin = catchAsync(async (req, res) => {
  const id_token = req.body.id_token;
  // Build Firebase credential with the Google ID token.
  const credential = GoogleAuthProvider.credential(id_token);
  // Sign in with credential from the Google user.
  const auth = getAuth();
  signInWithCredential(auth, credential).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;

    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);

    console.log("🚀 ~ file: auth.controller.js:47 ~ googleLogin ~ credential:", credential)
    
    // ...
  });
  // const { email, name, googleId } = req.body;
  // const user = await authService.googleLoginUser(email, name, googleId);
  // const tokens = await tokenService.generateAuthTokens(user);
  // res.send({ user, tokens });
});

const facebookLogin = catchAsync(async (req, res) => {
  const { email, name, facebookId } = req.body;
  const user = await authService.facebookLoginUser(email, name, facebookId);
  const tokens = await tokenService.generateAuthTokens(user);
  res.send({ user, tokens });
});

const appleLogin = catchAsync(async (req, res) => {
  const { email, name, appleId } = req.body;
  const user = await authService.appleLoginUser(email, name, appleId);
  const tokens = await tokenService.generateAuthTokens(user);
  res.send({ user, tokens });
});

const logout = catchAsync(async (req, res) => {
  await authService.logout(req.body.refreshToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const refreshTokens = catchAsync(async (req, res) => {
  const tokens = await authService.refreshAuth(req.body.refreshToken);
  res.send({ ...tokens });
});

const forgotPassword = catchAsync(async (req, res) => {
  const resetPasswordToken = await tokenService.generateResetPasswordToken(req.body.email);
  await emailService.sendResetPasswordEmail(req.body.email, resetPasswordToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const resetPassword = catchAsync(async (req, res) => {
  await authService.resetPassword(req.query.token, req.body.password);
  res.status(httpStatus.NO_CONTENT).send();
});

const sendVerificationEmail = catchAsync(async (req, res) => {
  const verifyEmailToken = await tokenService.generateVerifyEmailToken(req.user);
  await emailService.sendVerificationEmail(req.user.email, verifyEmailToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const verifyEmail = catchAsync(async (req, res) => {
  await authService.verifyEmail(req.query.token);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  register,
  login,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword,
  sendVerificationEmail,
  verifyEmail,
  sendOtpToPhone,
  adminPanelLogin,
  googleLogin,
  facebookLogin,
  appleLogin,
  verify2FAToken,
  socialRegister
};
