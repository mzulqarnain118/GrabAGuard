
const GetFormattedDate = (date) => {

    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const d = (date.getDate() < 10) ? "0" + date.getDate() : date.getDate();
    const m = ((date.getMonth() + 1) < 10) ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1);
    let datetext =
      
      date.getFullYear() +
      "-" +
      m +
      "-" +
      d;

    return datetext;

}

export default GetFormattedDate;
