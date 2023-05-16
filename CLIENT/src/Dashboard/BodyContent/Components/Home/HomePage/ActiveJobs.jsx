import React from 'react';
import MatTable from '../../../../../Modules/MaterialTable/MaterialTable';
import jsPDF from "jspdf";
import GetAppOutlinedIcon from "@mui/icons-material/GetAppOutlined";

const ActiveJobs = ({ data }) => {

const generatePDF = (rowData) => {
  const pdf = new jsPDF();

  pdf.setFillColor(255, 193, 7); // Set fill color to yellow
  pdf.rect(10, 20, 190, 130, "F"); // Adjusted position and height

  pdf.setFontSize(18);
  pdf.setTextColor(0, 0, 0); // Set text color to black
  pdf.setFont("Arial", "bold");
  pdf.text("Job Details", 20, 30); // Adjusted position
  pdf.setFontSize(12);
  pdf.setTextColor(0, 0, 0); // Set text color to black
  pdf.text(`Invoice No: ${rowData._id}`, 20, 45); // Adjusted position
  pdf.setFont("Arial", "normal");
  pdf.text(`Job Status: ${rowData.jobStatus}`, 20, 55); // Adjusted position
  pdf.text(`Hirer Name: ${rowData.hirer_name}`, 20, 65); // Adjusted position
  pdf.text(`Hirer Phone: ${rowData.hirer_phone}`, 20, 75); // Adjusted position
  pdf.text(`Guard Name: ${rowData.guard_name}`, 20, 85); // Adjusted position
  pdf.text(`Guard Phone: ${rowData.guard_phone}`, 20, 95); // Adjusted position
  pdf.text(`Location: ${rowData.location}`, 20, 105); // Adjusted position
  pdf.text(`Payment: ${rowData.payment}`, 20, 115); // Adjusted position
  pdf.text(`Fee: ${rowData.fee}`, 20, 125); // Adjusted position
  pdf.text(`Total Payment: ${rowData.totalPayment}`, 20, 135); // Adjusted position

  pdf.save("job-details.pdf");
};


    const columns = [
      {
        title: "Download",
        render: (row) => (
          <button onClick={async () => generatePDF(row)}>
            <GetAppOutlinedIcon fontSize="large" />{" "}
          </button>
        ),
        cellStyle: { textAlign: "center" },
        headerStyle: { textAlign: "center" },
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
        dateSetting: { locale: "en-GB" },
        editable: () => false,
        cellStyle: { textAlign: "left" },
        headerStyle: { textAlign: "left" },
      },
      {
        title: "Fee",
        field: "fee",
        type: "string",
        editable: () => false,
        cellStyle: { textAlign: "left" },
        headerStyle: { textAlign: "left" },
      },
      {
        title: "Payment",
        field: "payment",
        type: "string",
        editable: () => false,
        cellStyle: { textAlign: "left" },
        headerStyle: { textAlign: "left" },
      },
      {
        title: "TotalPayment",
        field: "totalPayment",
        type: "string",
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
        field: "guardRating",
        type: "string",
        dateSetting: { locale: "en-GB" },
        editable: () => false,
        cellStyle: { textAlign: "left" },
        headerStyle: { textAlign: "left" },
      },
      {
        title: "Hirer Review",
        field: "hirerRating",
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
            <MatTable title="Active Jobs" columns={columns} style={{ margin: '1rem' }}
                data={data}
                bodyHeight="75.5vh" />
        </div>
    );
}


export default ActiveJobs;
