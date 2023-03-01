const SqlDateFormat = (currentDate) => {
    if (currentDate) {
        return (new Date(currentDate).getFullYear() + '-' + (parseInt(new Date(currentDate).getMonth()) + 1) + '-' + new Date(currentDate).getDate());
    }
    else {
        return null;
    }

}
export default SqlDateFormat;