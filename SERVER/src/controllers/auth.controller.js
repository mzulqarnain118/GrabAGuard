const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { authService, userService, tokenService, emailService, phoneNumberService, } = require('../services');
const { TWO_FACTOR_SECRET } = require('../config/config')
const qrcode = require('qrcode');
const speakeasy = require('speakeasy');

const sendOtpToPhone = catchAsync(async (req, res) => {
  const phone = req.body.phone;
  const otp = await phoneNumberService.sendOtpToPhoneByAwsSNS(phone);
  res.send({ otp });
});

const register = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  const tokens = await tokenService.generateAuthTokens(user);
  res.status(httpStatus.CREATED).send({ user, tokens });
});

const isEmailAlreadyTaken = catchAsync(async (req, res) => {
  const user = await userService.isEmailAlreadyTaken(req.body);
  res.status(200).send("Not Exist");
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
    await userService.updateUserById(user.id, { is2FAEnabled: true })
    const tokens = await tokenService.generateAuthTokens(user);
    res.status(200).send({ user, tokens });
  } else {
    res.status(500).send({ message: "Invalid 2FA Token" });
  }
});

const socialLogin = catchAsync(async (req, res) => {
  const { email } = req.body;
  const user = await authService.loginUserWithSocialAuth(email);
  const tokens = await tokenService.generateAuthTokens(user);
  res.send({ user, tokens });
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

const forgotPasswordWithPhone = catchAsync(async (req, res) => {
  const resetPasswordToken = await tokenService.generateResetPasswordTokenWithPhone(req.body.phone);
  const ResetPasswordScreenLink =await phoneNumberService.sendResetPasswordPhoneNumber(req.body.phone, resetPasswordToken);
  res.send({ ResetPasswordScreenLink });
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
  facebookLogin,
  appleLogin,
  forgotPasswordWithPhone,
  verify2FAToken,
  socialRegister,
  socialLogin,
  isEmailAlreadyTaken
};
