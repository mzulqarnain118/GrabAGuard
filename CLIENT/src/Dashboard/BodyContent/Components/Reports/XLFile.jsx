import XLSX from 'xlsx'
const XLFile = (Data, Filename) => {
    const worksheet = XLSX.utils.json_to_sheet(Data);
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, "SheetJS");
    XLSX.writeFile(workbook, Filename + '.xlsx');
}

export default XLFile;