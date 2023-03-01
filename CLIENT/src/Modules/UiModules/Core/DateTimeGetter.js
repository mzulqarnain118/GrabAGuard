const DateTimeGetter = today => {
    var date =  today.getDate() + '-'+ (today.getMonth() + 1)   + '-' + today.getFullYear();
    var time = today.getHours() + ":" + today.getMinutes() ;
    var dateTime = date + ' ' + time;
    return dateTime;
}
export default DateTimeGetter;

