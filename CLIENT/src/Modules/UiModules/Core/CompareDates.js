const CompareDates = (start, end) => {
    if (start && end) {
        if (new Date(start) <= new Date(end))
            return false;
        else
            return true;
    }
    else return null;
}
export default CompareDates;
