const FrontEndDateFormat = (currentDate) => {
    if (currentDate) {
        return (new Date(new Date(currentDate).getDate() + '-' + (parseInt(new Date(currentDate).getMonth()) + 1) + '-' + new Date(currentDate).getFullYear()));
    }
    else {
        return null;
    }

}
export default FrontEndDateFormat;
