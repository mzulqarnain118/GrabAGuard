import React, { useState } from 'react'
import guidelines from '../../../../../Modules/Guidelines/Guidelines';
import { Button, Card, CardContent, Typography, TextField, Divider } from "@mui/material";
import Select from '../../../../../Modules/UiModules/Control/Select';
import PanelList from './PanelList';




const AddUser = () => {

    const [roletype, setroletype] = useState({});

    const hello = [
        { id: 'admin', title: 'admin' },
        { id: 'deoperator', title: 'deoperator' },
        { id: 'other', title: 'Other' },
    ];





    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100%', padding: '2rem' }}>
                <Card>
                    <CardContent>
                        <form style={{ marginTop: '2rem', marginBottom: '5rem' }}>



                            <Typography variant="h8" color="text.secondary">
                                <b> ADD NEW USER</b>
                            </Typography>


                            <div className="row w-100 justify-content-center mb-3 " >

                                <div className={`col-6 ${guidelines.inputclass}`}>
                                    <TextField fullWidth
                                        required
                                        label="User Name"
                                        variant="standard"
                                        name="username"
                                    // value={values}
                                    // error={errors.boarduni}
                                    // onChange={(e) => { setvalues(e.target.value) }}


                                    />
                                </div>
                                <div className={`col-6 ${guidelines.inputclass}`}>
                                    <TextField fullWidth
                                        required
                                        label="Password"
                                        variant="standard"
                                        name="pass"
                                    // value={values}
                                    // error={errors.boarduni}
                                    // onChange={(e) => { setvalues(e.target.value) }}


                                    />
                                </div>

                                <div className={`col-6 ${guidelines.inputclass}`}>

                                    <Select fullWidth
                                        required
                                        name="role type"
                                        label="Role Type"
                                        value={roletype}
                                        onChange={(e) => { setroletype(e.target.value) }}
                                        options={hello}

                                    />
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-10'>
                                    <Typography variant="h8" color="text.secondary" >
                                        <b> Permission / Screen</b>
                                    </Typography>
                                </div>
                                <div className='col-2' >
                                    <Button style={{ width: '150px' }}
                                        type="submit"
                                        variant="contained"
                                        color="primary"

                                    >
                                        Allow
                                    </Button>
                                </div>
                            </div>



                            <div style={{ marginTop: '2rem', marginBottom: '5rem' }}>
                                <PanelList></PanelList>
                            </div>


                        </form>
                    </CardContent>
                </Card>

            </div>

        </>


    )
}

export default AddUser;