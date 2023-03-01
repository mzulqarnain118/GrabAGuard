import React, { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import MatTable from '../../../../../../Modules/MaterialTable/MaterialTable';
import Toast from '../../../../../../Modules/UiModules/Core/Toast/Toast';
import { Box, Stack, Tab, Tabs } from "@mui/material";
import Popup from '../../../../../../Modules/UiModules/Core/Popup';
import { ApiCallPost } from '../../../../../../Modules/CoreModules/ApiCall';
import DesignationForm from './DesignationForm';
//import DateTimeGetter from '../../../../../../Modules/UiModules/Core/DateTimeGetter';
//import DesigTabTas from './DesigTabs';
import SelectionForm from './SelectionForm';
import DateTimeGetter from '../../../../../../Modules/UiModules/Core/DateTimeGetter';
import Typography from '@mui/material/Typography';
import { SanctionDasigContext } from './DesigContext';
import OrderDetailTable from './OrderDetailTable';

const DesignationTable = (props) => {

    const emp_id = props.id

    const { userData, setUserData } = useContext(SanctionDasigContext);
    const [openPopup, setopenPopup] = useState(false);
    const [updation, setUpdation] = useState(false);
    const [addition, setAddition] = useState(false);
    const [tableUpdate, setTableUpdate] = useState(0);
    const [row, setRow] = useState({});
    const [Data, setData] = useState([]);
    props.setData(Data);

    const rowData = {
        form_no: '',
        job_nature: '',
        order_no: '',
        order_date: null,
        wef_date: null,
        desig_id: '',
        order_type: '',
        adv_no: '',
        emp_scale: '',
        package_type: '',
        package_amount: null,
        is_primary: 0,
        contract_startdate: null,
        contract_enddate: null,
        joining_date: null,
        leaving_date: null,
        leaving_status: '',
        leave_remarks: '',
        sub_dept_id: '',
        campus_id: '',
        dept_id: '',
        order_pic: '',
        asNewRecord: false,
    }

    useEffect(() => {
        const fetchData = async () => {
            var result = await ApiCallPost('/get_emp_designation', { emp_id: emp_id });
            console.log('desigData', result.data);

            if (result.error) {
                Toast('Data Could Not be Fetched', 'error')
            }
            else {
                // Toast('Data Fetched Successfully!', 'success')
                setData(result.data);
            }
        }
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tableUpdate]);


    const columns = [
        { title: "Designation", field: 'desig_name', type: 'string', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "center" } },
        { title: "OrderType", field: 'type_desc', type: 'string', cellStyle: { textAlign: "center" }, headerStyle: { textAlign: "center" } },
        { title: "Nature", field: 'nature_desc', type: 'string', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
        { title: "serial_no", field: 'serial_no', type: 'numeric', cellStyle: { textAlign: "center" }, headerStyle: { textAlign: "center" }, hidden: true },
        { title: "Advertisement No", field: 'adv_no', type: 'string', cellStyle: (e, rowData) => { return { textAlign: "center" } }, headerStyle: { textAlign: "center" } },
        { title: "Form", hidden: true, field: 'form_no', type: 'numeric', cellStyle: { textAlign: "center" }, headerStyle: { textAlign: "center" } },
        { title: "OrderNo", field: 'order_no', type: 'string', cellStyle: (e, rowData) => { return { textAlign: "center" } }, headerStyle: { textAlign: "center" } },
        { title: "OrderDate", field: 'order_date', type: 'date', dateSetting: { locale: "en-GB" }, cellStyle: { textAlign: "center" }, headerStyle: { textAlign: "center" } },
        { title: "DesigEffectiveDate", field: 'wef_date', type: 'date', dateSetting: { locale: "en-GB" }, cellStyle: { textAlign: "center" }, headerStyle: { textAlign: "center" } },
        { title: "OrderFile", field: 'order_pic', type: 'string', cellStyle: { textAlign: "center" }, headerStyle: { textAlign: "center" }, hidden: true },
        { title: "Campus", field: 'campus_desc', type: 'string', cellStyle: { textAlign: "center" }, headerStyle: { textAlign: "center" } },
        { title: "Department", field: 'dept_name', type: 'string', cellStyle: { textAlign: "center" }, headerStyle: { textAlign: "center" } },
        { title: "SubDepartment", field: 'sub_dept_name', type: 'string', cellStyle: { textAlign: "center" }, headerStyle: { textAlign: "center" } },
        { title: "Primary", field: 'is_primary', type: 'boolean', cellStyle: (e, rowData) => { return { textAlign: "center" } }, headerStyle: { textAlign: "center" } },
        { title: "Scale", field: 'emp_scale', type: 'date', cellStyle: (e, rowData) => { return { textAlign: "center" } }, headerStyle: { textAlign: "center" } },
        { title: "PackageType", field: 'package_desc', type: 'string', cellStyle: { textAlign: "center" }, headerStyle: { textAlign: "center" } },
        { title: "PackageAmount", field: 'package_amount', type: 'string', cellStyle: { textAlign: "center" }, headerStyle: { textAlign: "center" } },
        // { title: "Selection Type", field: 'selection_type', type: 'string', cellStyle: { textAlign: "center" }, headerStyle: { textAlign: "center" } },
        { title: "ContractStart", field: 'contract_startdate', type: 'date', dateSetting: { locale: "en-GB" }, cellStyle: { textAlign: "center" }, headerStyle: { textAlign: "center" } },
        { title: "ContractEnd", field: 'contract_enddate', type: 'date', dateSetting: { locale: "en-GB" }, cellStyle: { textAlign: "center" }, headerStyle: { textAlign: "center" } },
        { title: "EmpJoiningDate", field: 'joining_date', type: 'date', dateSetting: { locale: "en-GB" }, cellStyle: { textAlign: "center" }, headerStyle: { textAlign: "center" } },
        { title: "DesigLeavingDate", field: 'leaving_date', type: 'date', dateSetting: { locale: "en-GB" }, cellStyle: (e, rowData) => { return { textAlign: "center" } }, headerStyle: { textAlign: "center" } },
        { title: "DesigLeaveStatus", field: 'leaving_desc', type: 'string', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
        { title: "Designation Remarks", field: 'leave_remarks', type: 'string', cellStyle: { textAlign: "center" }, headerStyle: { textAlign: "center" } },
        { title: "Entered By", editable: () => true, field: 'emp_name_log', type: 'string', cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },
        { title: "Entry Date/Time",editable: () => true, field: 'entry_datetime', type: 'date', render: (row) => DateTimeGetter(new Date(row.entry_datetime)), cellStyle: { textAlign: "left" }, headerStyle: { textAlign: "left" } },

    
    ];


    const handlePopup = (value) => {
        setopenPopup(value);
        setAddition(value);
        setUpdation(value);
        setUserData(value)
    }

    const onDelete = async (row) => {
        var result = await ApiCallPost("/delete_emp_designation", { serial_no: row.serial_no });
        if (result.error) {
            Toast('Data Could Not be Deleted', 'error')
        }
        else {
            if (result.data[0].status === 0) {
                setTableUpdate(old => old + 1);
                Toast('Data Deleted Successfully!', 'success')
            } else {
                Toast('Cannot delete primary designation! Please mark another designation as primary!', 'error')
            }
        }
    };
    function TabPanel(props) {
        const { children, value, index, ...other } = props;

        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                {value === index && (
                    <Box sx={{ p: 3 }}>
                        <Typography>{children}</Typography>
                    </Box>
                )}
            </div>
        );
    }
    TabPanel.propTypes = {
        children: PropTypes.node,
        index: PropTypes.number.isRequired,
        value: PropTypes.number.isRequired,
    };

    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    return (<>
        <form>
            <Stack>
                <Popup title='' openPopup={openPopup} setOpenPopup={handlePopup} onClose={() => { setUserData({}) }}>

                    <Box sx={{ width: '100%' }}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                <Tab label="Designation Details" {...a11yProps(0)} />
                                <Tab disabled label="Selection Details" {...a11yProps(1)} />
                                <Tab disabled={(updation) ? false : true} label="Desig Files" {...a11yProps(2)} />

                            </Tabs>



                        </Box>
                        <TabPanel value={value} index={0}>
                            {addition ? <DesignationForm id={emp_id} setTableUpdate={setTableUpdate} setopenPopup={handlePopup} setValue={setValue} label={'Add'} submitAction={'Insert'} /> : null}
                            {updation ? <DesignationForm id={emp_id} data={userData} setTableUpdate={setTableUpdate} setopenPopup={handlePopup} setValue={setValue} label={'Update'} submitAction={'Update'} /> : null}
                        </TabPanel>

                        <TabPanel value={value} index={1}>
                            {addition ? <SelectionForm id={emp_id} setTableUpdate={setTableUpdate} setopenPopup={handlePopup} setValue={setValue} label={'Add'} submitAction={'Insert'} /> : null}
                            {updation ? <SelectionForm id={emp_id} data={row} setTableUpdate={setTableUpdate} setopenPopup={handlePopup} setValue={setValue} label={'Update'} submitAction={'Update'} /> : null}


                        </TabPanel>
                        <TabPanel value={value} index={2}>
                            {addition ? <OrderDetailTable id={emp_id} setTableUpdate={setTableUpdate} setopenPopup={handlePopup} setValue={setValue} label={'Add'} submitAction={'Insert'} /> : null}
                            {updation ? <OrderDetailTable id={emp_id} sr={row.serial_no} data={row} setTableUpdate={setTableUpdate} setopenPopup={handlePopup} label={'Update'} submitAction={'Update'} /> : null}

                        </TabPanel>


                    </Box>

                </Popup>
                <MatTable
                    actionsAtStart={true}
                    title="Employee Designation"
                    columns={columns}
                    data={Data}
                    onDelete={onDelete}
                    bodyHeight="45vh"
                    // onUpdate={update}
                    customAdd={() => { setAddition(true); setopenPopup(true); setUserData(() => ({ rowData: rowData, selection: [] })); setValue(0) }}
                    onRowClick={(event, rowData) => {
                        setUserData(() => ({ 'rowData': rowData, selection: [] }))
                        setRow(rowData);
                        setUpdation(true);
                        setopenPopup(true);
                        setValue(0)
                    }}

                />

            </Stack>
        </form>
    </>);
}

export default DesignationTable;