const DateTimeGetter = today => {
    console.log('====================================');
    console.log(today, 'today');
    console.log('====================================');
    var date =  today.getDate() + '-'+ (today.getMonth() + 1)   + '-' + today.getFullYear();
    var time = today.getHours() + ":" + today.getMinutes() ;
    var dateTime = date + ' ' + time;
    return dateTime;
}
export default DateTimeGetter;

