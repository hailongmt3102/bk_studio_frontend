import React, { useEffect, useState } from 'react'
import { Rnd } from 'react-rnd'
import './TableComponent.css'
import {
    DataGrid, GridToolbarContainer,
    GridToolbarExport
} from '@mui/x-data-grid'
import { useDemoData } from "@mui/x-data-grid-generator";
const selectReg = /select.*(?= from)/
export default function TableComponent(props) {

    // console.log("propsdatadata[0]", props.data.data[0])
    // console.log("propsdata[0]", props.data)
    const [rows, setRows] = useState([])
    const [columns, setColumns] = useState([])
    useEffect(() => {
        // let selectArray = (selectReg.exec(props.data.QueryCommand) ?? [""])[0].replace("select ", "").split(",").map(ele => ele.trim())
        // setColumns(selectArray)
        const width = 150
        const keys = Object.keys(props.data.data[0])

        let columns = keys.map((key) => {
            return {
                field: key,
                headerName: key,
                editable: false,
                width: width
            }
        })

        setColumns(columns)


        let rows = props.data.data.map((row, index) => {
            return { ...row, id: index }
        })
        console.log("row", rows)
        setRows(rows)
    }, [props.data.data])
    function CustomToolbar() {
        return (
            <GridToolbarContainer>
                <GridToolbarExport />
            </GridToolbarContainer>
        );
    }
    const { loading } = useDemoData({
        // dataSet: 'Commodity',
        rowLength: 4,
        maxColumns: 6
    });

    return (
        <Rnd
            disableDragging={props.disableDragging}
            enableResizing={props.enableResizing}
            size={{ width: props.data.Width, height: props.data.Height }}
            position={{ x: props.data.Position.x, y: props.data.Position.y }}
            onDragStop={(e, d) => {
                props.updateDataTable({
                    ...props.data, Position: {
                        x: d.x,
                        y: d.y
                    }
                })
            }}
            onResizeStop={(e, direction, ref, delta, position) => {
                props.updateDataTable({ ...props.data, Width: ref.style.width, Height: ref.style.height })
            }}
            className={`${props.classstyle} component-container`}
        >
            {
                props.data.data !== undefined && props.data.data.length == 0 &&
                <div>
                    <h4 className='ms-2'>{props.data.Title}</h4>
                    <table class='component-table'>
                        <thead>
                            <tr>
                                {
                                    columns.map(ele => <th>{ele}</th>)
                                }
                            </tr>
                        </thead>
                    </table>
                </div>
            }
            {
                props.data.data !== undefined && props.data.data.length > 0 ?
                    <div>
                        <h4 className='ms-2'>{props.data.Title}</h4>
                        {/* <table class='component-table'>
                            <thead>
                                <tr>
                                    {
                                        Object.keys(props.data.data[0]).map(ele => <th>{ele}</th>)
                                    }
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    props.data.data.map((ele, index) =>
                                        <tr key={index}>
                                            {
                                                Object.values(ele).map((value, i) =>
                                                    <td>{value}</td>
                                                )
                                            }
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table> */}
                        <DataGrid
                            loading={loading}
                            components={{
                                Toolbar: CustomToolbar
                            }}
                            rows={rows}
                            columns={columns}
                            columnVisibilityModel={{
                                id: true,
                            }}
                            experimentalFeatures={{ newEditingApi: true }}
                        // editMode="cell"
                        // onCellEditStop={handleRowEditStop}
                        />
                    </div>
                    : null
            }
        </Rnd>
    )
}
