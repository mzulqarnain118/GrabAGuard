// import React, { useState } from 'react'
// import { Table, TableBody, TableCell, TableHead, TablePagination, TableRow } from '@mui/material'
// import { makeStyles } from '@mui/styles'
// const useStyles = makeStyles(theme => ({
//     table: {
//         marginTop: theme.spacing = (3),
//         '& thead th': {
//             fontWeight: '600',
//             color: '#1976d2',
//             backgroundColor: '#8ecae6',
//         },
//         '& tbody td': {
//             fontWeight: '300',
//         },
//         '& tbody tr:hover': {
//             backgroundColor: '#fffbf2',
//             cursor: 'pointer',
//         },
//     },
// }))

// const DataTables = (headCell) => {
//     const pages = [5, 10, 25]
//     const [page, setPage] = useState(0)
//     const [rowsPerPage, setRowsPerPage] = useState(pages[page])
//     const [order, setOrder] = useState()
//     const [orderBy, setOrderBy] = useState()
//     const classes = useStyles();

//     const TblContainer = props => (
//         <Table className={classes.table}>{props.children}</Table>
//     )
//     const TblPagination = () => (<TablePagination
//         component="div"
//         page={page}
//         rowsPerPageOptions={pages}
//         rowsPerPage={rowsPerPage}
//     // count={records.length}
//     // onChangePage={handleChangePage}
//     // onChangeRowsPerPage={handleChangeRowsPerPage}
//     />)
//     const TblHead = props => {
//         return (
//             <TableHead>
//                 <TableRow>
//                     {
//                         headCell.map(headCell => (<TableCell key={headCell.id}>
//                             {headCell.label}
//                         </TableCell>))
//                     }
//                 </TableRow>
//             </TableHead>
//         )

//     }
//     return {
//         TblContainer,
//         TblHead, TblPagination
//     }
// }
// // return (
// //     <div>
// //         <Table >


// //         </Table>

// //     </div>

// // )
// // }

// export default DataTables;