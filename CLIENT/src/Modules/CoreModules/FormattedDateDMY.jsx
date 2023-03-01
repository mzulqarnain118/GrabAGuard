
const GetFormattedDateDMY = (date) => {
    //It converts timestamps as well as dates provided in format (Year-Month-Day) into format Day/Month/Year
    //const DateAndTimeArr=date.split("T");
    //const DateArr=DateAndTimeArr.split("-");

    //item.joining_date.split("-")[2]+"/"+item.joining_date.split("-")[1]+"/"+item.joining_date.split("-")[0]   ---- Example
    
    let datetext="";
    if(date){
        const DateAndTimeArr=date.split("T")[0];
        const DateArr=DateAndTimeArr.split("-");
         datetext=DateArr[2]+"/"+DateArr[1]+"/"+DateArr[0];
    
    }
    
    
        
      

    return datetext;

}

export default GetFormattedDateDMY;
