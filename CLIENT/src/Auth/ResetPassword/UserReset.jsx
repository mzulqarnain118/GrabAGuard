
import React, { useState } from 'react';
import { Button, FormControl, TextField } from '@mui/material';
import styles from "./UserReset.module.css";
import Toast from "../../Modules/UiModules/Core/Toast/Toast";
import { ApiCallPost } from '../../Modules/CoreModules/ApiCall';

const UserReset = (props) => {

    const [data, updateData] = useState({
        username: '',
        email: ''
    });

    const [enabled, updateEnabled] = useState(true);

    const handleChange = (prop, event) => {
        updateData({
            ...data, [prop]: event.target.value
        });
    };

    const submit = async (e) => {
        e.preventDefault();
        if (data.username === null || data.username === '') {
            Toast("Please enter username", "error")
        }

        else if (data.email === null || data.email === '') {
            Toast("Please enter email", "error")
        }
        else {
            updateEnabled(false);
            const result = await ApiCallPost('/reset', data);
            if (result.error) {
                Toast(result.text, "error");
            } else {
                props.setOpenPopup(false);
                Toast("Email Sent With New Password", "success");
            }
            updateEnabled(true);
        }
    }

    return (

        <>
            <form onSubmit={submit}>
                <FormControl fullWidth>
                    <TextField fullWidth variant="outlined"
                        id="username"
                        type="text"
                        label="Username"
                        value={data.username}
                        onChange={(e) => handleChange("username", e)}
                        disabled={!enabled}
                    />
                    <TextField fullWidth variant="outlined"
                        id="email"
                        type="email"
                        label="Email"
                        style={{ marginTop: "10px" }}
                        value={data.email}
                        onChange={(e) => handleChange("email", e)}
                        disabled={!enabled}
                    />
                    <Button disabled={!enabled} type="submit" style={{ marginTop: "10px" }} label="Reset" fullWidth className={styles.button} variant="contained">Reset</Button>
                </FormControl>
            </form>
        </>

    );

}

export default UserReset;
