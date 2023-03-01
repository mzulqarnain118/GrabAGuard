
import React, { useState } from 'react'
import { CardContent, Card, Typography, Button } from '@mui/material'
import Select from '../../../../../Modules/UiModules/Control/Select';
import PanelList from '../AddUser/PanelList';

const ChangePermissions = () => {

    const [role, setrole] = useState("");
    const [user, setuser] = useState("");
    const [uservalue, setuservalue] = useState([])
    const [rolevalue, setrolevalue] = useState([]);


    return (
        <>

            <div style={{ display: 'flex', flexDirection: 'column', width: '100%', padding: '2rem' }}>
                <Card>
                    <CardContent>
                        <form style={{ marginTop: '2rem', marginBottom: '5rem' }}>



                            <Typography variant="h8" color="text.secondary">
                                <b>Change Permission </b>
                            </Typography>


                            <div className="row mt-3 mr-0 ml-0" >

                                <div className="col-6">


                                    <Select fullWidth
                                        required
                                        name="role"
                                        label="Role"

                                        value={role}
                                        onChange={(e) => {
                                            setrole(e.target.value)
                                        }}
                                        options={rolevalue}

                                    />
                                </div>


                                <div className="col-6">


                                    <Select fullWidth
                                        required
                                        name="user"
                                        label="User"
                                        value={user}

                                        onChange={(e) => { setuser(e.target.value) }}
                                        options={uservalue}


                                    />
                                </div>


                            </div>
                            <div className='row mt-4'>
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
    );
}

export default ChangePermissions;