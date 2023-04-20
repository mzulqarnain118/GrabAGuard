
import React, { useState } from 'react';
import { ApiCallPatch, ApiCallPost } from '../../Modules/CoreModules/ApiCall';
import Toast from '../../Modules/UiModules/Core/Toast/Toast';

const TwoFactorAuthentication = () => {
  const [step, setStep] = useState(1);
  const [code, setCode] = useState('');
  const [enable2Fa, setEnable2Fa] = useState(localStorage.getItem("is2FAEnabled"));

  const handleCheckbox = (e) => {
    setEnable2Fa(e.target.checked);
    if (step === 1) {
      setStep(2);
    } else {
      setStep(1);
    }
  };

  const handleCodeChange = (event) => {
    setCode(event.target.value);
  };

  const handleActivate = React.useCallback(

    async () => {
      try {
        const screenData = {
          "email": localStorage.getItem("email"),
          "password": "password1",
          "token2FA": code
        }
        console.log("==========================", screenData)

        const result = await ApiCallPost(`/auth/login/verify2FAToken`, screenData);
        if (response?.status === 200) {
          console.log("🚀 ~ file: TwoFactorAuthentication.jsx:38 ~ response:", result)
          localStorage.setItem('token', result?.data?.tokens?.access?.token)
          localStorage.setItem('refreshToken', result?.data?.tokens?.refresh?.token)
          localStorage.setItem('is2FAEnabled', result?.data?.user?.is2FAEnabled)
          Toast('2FA Authentication Enabled!', 'success')
        }
      } catch (error) {
        console.log(error, "error")
        Toast(error.message, "error");
      }
    },
    [code]
  );
  const handleCancel = () => {
    setEnable2Fa(false);
  };

  return (
    <div className="container">
      <h2 className="title">Enable Two Factor Authentication</h2>
      <div className="form">
        <div className="form-group">
          <input type="checkbox" id="enable-2fa" onChange={!enable2Fa && handleCheckbox} checked={enable2Fa} />
          <label htmlFor="enable-2fa">Enable Two Factor Authentication</label>
        </div>
        {!enable2Fa && <>
        {step === 2 && (
          <div className="form-group">
            <img src={localStorage.getItem("2FA_qrCode")} alt="QR code" />
            <p>Scan this QR code with your authentication app.</p>
          </div>
        )}
        {step === 3 && (
          <div className="form-group">
            <label htmlFor="code">Enter the 6-digit code:</label>
            <input type="text" id="code" maxLength={6} value={code} onChange={handleCodeChange} />
          </div>
        )}
        <div className="form-actions">
          {step === 2 && (
            <button className="btn" onClick={() => setStep(3)}>Next</button>
          )}
          {step === 3 && (
            <>
              <button className="btn" onClick={handleActivate}>Activate</button>
              <button className="btn" onClick={() => setStep(1)}>Cancel</button>
            </>
          )}
          </div>
        </>}
      </div>
    </div>
  );
};

export default TwoFactorAuthentication;
