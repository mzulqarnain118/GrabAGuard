import React from 'react'
import MatTable from '../../../../../Modules/MaterialTable/MaterialTable'
import Card from '../../../../../Modules/UiModules/Core/Card'

const AllAdvertisements = () => {

    const columns = [

        {
            title: "Advertisment No",
            editable: () => false,
            field: "MessId",
            type: "numeric",
            cellStyle: { textAlign: "center" },
            headerStyle: { textAlign: "center" },
        },
        {
            title: "Advertisment Date ",
            field: "Name",
            type: "text",
            cellStyle: { textAlign: "center" },
            headerStyle: { textAlign: "center" },
        },
        {
            title: "Advertisment Last Date",
            field: "SinglePages",
            type: "text",
            cellStyle: { textAlign: "center" },
            headerStyle: { textAlign: "center" },
        },

        {
            title: "Advertisment Image",
            field: "SinglePages",
            type: "img",
            cellStyle: { textAlign: "center" },
            headerStyle: { textAlign: "center" },
        },
    ]

    return (
        <>
            <Card >
                <div className="row">

                    <div className="col">

                        <MatTable title="All Advertisments" columns={columns} />

                    </div>
                </div>
            </Card>
        </>
    )
}

export default AllAdvertisements;
