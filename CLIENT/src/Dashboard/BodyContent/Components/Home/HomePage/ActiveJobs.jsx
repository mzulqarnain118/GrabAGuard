import React from 'react';
import MatTable from '../../../../../Modules/MaterialTable/MaterialTable';
import jsPDF from "jspdf";
import GetAppOutlinedIcon from "@mui/icons-material/GetAppOutlined";
import moment from "moment";
import Logo from "./GrabAGuard-Logo.png";
const ActiveJobs = ({ data }) => {

    const generatePDF = (rowData) => {
      const date1 = new Date(rowData?.to);
      const date2 = new Date(rowData?.from);
      const timeDifference = Math.abs(date2 - date1); // Get the time difference in milliseconds
      const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60)); // Convert milliseconds to hours
      const pdf = new jsPDF();
      pdf.addImage(Logo, "PNG", 160, 10, 30, 30);
      pdf.setFontSize(38);
      pdf.setTextColor("#003366"); // Set text color to black
      pdf.setFont("Roboto-Bold", "bold");
      pdf.text("THANK YOU", 40, 210); // Adjusted position
      pdf.text("INVOICE", 20, 20); // Adjusted position
      pdf.setFontSize(12);
      pdf.setTextColor(0, 0, 0); // Set text color to black
      pdf.text(`Grab A Guard`, 20, 35); // Adjusted position
      pdf.setFontSize(18);
      pdf.setTextColor("#003366"); // Set text color to black
      pdf.setFont("Roboto-Bold", "bold");
      pdf.text("BILL TO", 20, 50); // Adjusted position
      pdf.text("INVOICE #", 100, 50); // Adjusted position
      pdf.text("INVOICE DATE", 100, 55); // Adjusted position
      pdf.text("DESCRIPTION", 20, 85); // Adjusted position
      pdf.text("HOURS", 100, 85); // Adjusted position
      pdf.text(`${hoursDifference}`, 110, 95); // Adjusted position
      pdf.text("AMOUNT", 170, 85); // Adjusted position
      pdf.text("TOTAL", 100, 125); // Adjusted position
      pdf.text(`£${Number(rowData?.payment).toFixed(2)}`, 170, 125); // Adjusted position

      pdf.setFontSize(12);
      pdf.setFont("Roboto-Regular", "normal");
      pdf.setTextColor(0, 0, 0); // Set text color to black
      pdf.text(
        `${
          rowData?.role === "guard" ? rowData?.guard_name : rowData?.hirer_name
        }`,
        20,
        55
      ); // Adjusted position

      pdf.text(`${rowData?._id}`, 155, 50); // Adjusted position
      pdf.text(`${moment(rowData?.to).format("DD/MM/YYYY")}`, 185, 55); // Adjusted position
      pdf.text(`${rowData?.skill}`, 20, 95); // Adjusted position
      //!HOURS
      pdf.text(`Subtotal`, 100, 105); // Adjusted position
      pdf.text(`Service Fee`, 100, 115); // Adjusted position
      pdf.text(`Payment is due within 15 days.`, 130, 210); // Adjusted position
      //!AMOUNT
      pdf.text(`${rowData?.totalPayment.toFixed(2)}`, 175, 95); // Adjusted position
      pdf.text(`${rowData?.totalPayment.toFixed(2)}`, 175, 105); // Adjusted position
      pdf.text(`-${rowData?.fee.toFixed(2)}`, 175, 115); // Adjusted position

      pdf.setTextColor("red"); // Set text color to black
      pdf.text(
        "______________________________________________________________________________________",
        20,
        78
      );
      pdf.text(
        "______________________________________________________________________________________",
        20,
        87
      );
      pdf.setFontSize(18);
      pdf.setFont("Roboto-Bold", "bold");
      pdf.text("Terms & Condition", 130, 205); // Adjusted position
      pdf.setTextColor("#003366"); // Set text color to black
      //LINES B/W PAGES
      // Calculate the y-coordinate for the vertical line
      var startY = pdf.internal.pageSize.getHeight(); // Start from the bottom of the page
      var endY = startY - 3 * pdf.internal.scaleFactor; // Subtract 3 inches

      // Draw the vertical line
      pdf.line(125, 200, 125, 220);//left, top, right, bottom
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
