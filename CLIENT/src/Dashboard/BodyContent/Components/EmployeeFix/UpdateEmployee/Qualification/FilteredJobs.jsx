import React from 'react';
import MatTable from '../../../../../../Modules/MaterialTable/MaterialTable';
const FilteredJobs = ({ data, setRow, setJobDataOpen }) => {
    const columns = [
      {
        title: "Hirer Receipt No",
        editable: () => true,
        field: "hirerReceiptNo",
        type: "string",
        cellStyle: { textAlign: "left" },
        headerStyle: { textAlign: "left" },
      },
      {
        title: "Hirer",
        editable: () => true,
        field: "hirer_name",
        type: "string",
        cellStyle: { textAlign: "left" },
        headerStyle: { textAlign: "left" },
      },
      {
        title: "Guard Receipt No",
        editable: () => true,
        field: "guardReceiptNo",
        type: "string",
        cellStyle: { textAlign: "left" },
        headerStyle: { textAlign: "left" },
      },
      {
        title: "Guard",
        field: "guard_name",
        type: "string",
        editable: () => false,
        cellStyle: { textAlign: "left" },
        headerStyle: { textAlign: "left" },
      },

      {
        title: "Skill",
        field: "skill",
        type: "string",
        editable: () => false,
        cellStyle: { textAlign: "left" },
        headerStyle: { textAlign: "left" },
      },
      {
        title: "From",
        field: "from",
        type: "date",
        editable: () => false,
        cellStyle: { textAlign: "left" },
        headerStyle: { textAlign: "left" },
      },
      {
        title: "To",
        field: "to",
        type: "date",
        dateSetting: { locale: "en-GB" },
        editable: () => false,
        cellStyle: { textAlign: "left" },
        headerStyle: { textAlign: "left" },
      },
      {
        title: "Job Status",
        field: "jobStatus",
        type: "string",
        // lookup: ['Pending', 'Accepted', 'CheckedIn', 'CheckedOut', 'Completed', "Rejected", "Cancelled"],
        dateSetting: { locale: "en-GB" },
        editable: () => false,
        cellStyle: { textAlign: "left" },
        headerStyle: { textAlign: "left" },
      },
      {
        title: "Guard Rating",
        field: "guardRating",
        type: "string",
        dateSetting: { locale: "en-GB" },
        editable: () => false,
        cellStyle: { textAlign: "left" },
        headerStyle: { textAlign: "left" },
      },
      {
        title: "Hirer Rating",
        field: "hirerRating",
        type: "string",
        dateSetting: { locale: "en-GB" },
        editable: () => false,
        cellStyle: { textAlign: "left" },
        headerStyle: { textAlign: "left" },
      },
      {
        title: "Guard Review",
        field: "guardReview",
        type: "string",
        dateSetting: { locale: "en-GB" },
        editable: () => false,
        cellStyle: { textAlign: "left" },
        headerStyle: { textAlign: "left" },
      },
      {
        title: "Hirer Review",
        field: "hirerReview",
        type: "string",
        dateSetting: { locale: "en-GB" },
        editable: () => false,
        cellStyle: { textAlign: "left" },
        headerStyle: { textAlign: "left" },
      },
      {
        title: "Location",
        field: "location",
        type: "string",
        dateSetting: { locale: "en-GB" },
        editable: () => false,
        cellStyle: { textAlign: "left" },
        headerStyle: { textAlign: "left" },
      },
      {
        title: "Longitude",
        field: "longitude",
        type: "string",
        dateSetting: { locale: "en-GB" },
        editable: () => false,
        cellStyle: { textAlign: "left" },
        headerStyle: { textAlign: "left" },
      },
      {
        title: "Latitude",
        field: "latitude",
        type: "string",
        dateSetting: { locale: "en-GB" },
        editable: () => false,
        cellStyle: { textAlign: "left" },
        headerStyle: { textAlign: "left" },
      },
    ];

    return (
        <div className="w-100" style={{ display: 'flex', flexDirection: 'column' }}>
            <MatTable title="All Jobs" columns={columns} style={{ margin: '1rem' }}
                data={data}
                onRowClick={(event, rowData) => {
                    setRow(rowData);
                    setJobDataOpen(true);
                }}
                bodyHeight="75.5vh" />
        </div>
    );
}
export default FilteredJobs;
