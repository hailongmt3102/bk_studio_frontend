import React, { useEffect, useRef, useState } from 'react'
import { Rnd } from 'react-rnd'
import './TableComponent.css'
import {
    DataGrid, GridToolbarContainer,
    GridToolbarExport
} from '@mui/x-data-grid'
import { useDemoData } from "@mui/x-data-grid-generator";
const selectReg = /select.*(?= from)/


export default function TableComponent(props) {


    const [rows, setRows] = useState([])
    const [columns, setColumns] = useState([])
    const [visibleId, setVisibleId] = useState(true)

    const [columnList, setColumnList] = useState([])
    useEffect(() => {
        let selectArray = (selectReg.exec(props.data.QueryCommand) ?? [""])[0].replace("select ", "").split(",").map(ele => ele.trim())
        setColumnList(selectArray)

        const keys = Object.keys(props.data.data[0])
        let columns = keys.map((key) => {
            return {
                field: key,
                headerName: key,
                editable: false,
            }
        })

        setColumns(columns)
        let rows
        if (!keys.includes('id')) {
            rows = props.data.data.map((row, index) => {
                return { ...row, id: index }
            })
            setVisibleId(false)
        }
        else rows = props.data.data

        setRows(rows)
    }, [props.data.data])

    const optionRef = useRef()

    function CustomToolbar() {
        return (
            <GridToolbarContainer >
                <GridToolbarExport ref={optionRef} style={{ visibility: 'hidden' }} />
                <h4>{props.data.Title}</h4>
            </GridToolbarContainer>
        );
    }
    const { loading } = useDemoData({
        // dataSet: 'Commodity',
        rowLength: 4,
        maxColumns: 6
    });

    return (
        <div
            onClick={(e) => {
                console.log("asdf")
                console.log(optionRef.current.contains(e.target))
            }}
        >

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
                className={props.classstyle}
            >

                {
                    props.data.data !== undefined && props.data.data.length == 0 ?
                        <div>
                            <h4 className='ms-2'>{props.data.Title}</h4>
                            <table class='component-table'>
                                <thead>
                                    <tr>
                                        {
                                            columnList.map(ele => <th>{ele}</th>)
                                        }
                                    </tr>
                                </thead>
                            </table>
                        </div>
                        :
                        <div style={{ height: '100%', width: '100%' }} >
                            <div className='text-start'>
                                <button
                                    className='btn btn-default'
                                    onClick={() => {
                                        optionRef.current.click()
                                    }}
                                >
                                    Export
                                </button>
                            </div>
                            <DataGrid
                                rows={rows}
                                columns={columns}
                                columnVisibilityModel={{
                                    id: visibleId,
                                }}
                                components={{
                                    Toolbar: CustomToolbar,
                                }}
                                experimentalFeatures={{ newEditingApi: true }}
                                loading={loading}
                            />
                        </div>
                }

            </Rnd>
        </div>

    )
}
