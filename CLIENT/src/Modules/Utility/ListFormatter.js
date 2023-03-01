const listformatter = (arr, index, type) => {
    let newData = arr.map((item) => {
        return { id: item[index], title: item[type] }
    })
    return newData;
}

export default listformatter;