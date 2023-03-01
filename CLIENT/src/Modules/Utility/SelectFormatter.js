const selectformatter = (arr,type) =>{
    let newData = arr.map((item,index)=>{
        return {id: index,title: item[type]}
    })
    return newData;
}

export default selectformatter;