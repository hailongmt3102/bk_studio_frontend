import React, { useEffect, useState } from 'react'
import TableComponent from './table/TableComponent'
import { QueryData as QueryDataApi } from 'api/DataSources'

export default function Content(props) {

    const [tables, setTables] = useState({})

    // setInterval(() => {
    //     console.log(tables)
    // }, 2000);

    const fetchData = async () => {
        let table = {}
        for (let i = 0; i < props.components.length; i++) {
            let component = props.components[i]
            switch (component.Type) {
                case "Table":
                    try {
                        let res = await QueryDataApi(component.QueryCommand)
                        let result = component
                        result.data = res.data
                        let positionString = result.Position.split(";")
                        result.Position = {
                            x: positionString[0].substring(2),
                            y: positionString[1].substring(2)
                        }
                        let TextThemeArray = result.TextTheme.split(";")
                        result.TextTheme = {}
                        TextThemeArray.map(style => result.TextTheme[style.split(':')[0]] = style.split(':')[1])
                        table[result.Id] = result
                        console.log("step")
                    }
                    catch (err) {
                        console.log(err.response.data)
                    }
                    break
                default:
                    break
            }
            setTables({ ...tables, ...table })
        }
    }

    useEffect(() => {
        fetchData()
    }, [props.components])

    const updateDataTable = (key, data) => {
        setTables({ ...tables, [key]: data })
    }
    return (
        <div>
            {
                Object.keys(tables).map((key, index) =>
                    <div style={{
                        fontSize: tables[key].TextTheme.size,
                        fontFamily: tables[key].TextTheme.font,
                        textAlign: "center"
                    }}
                    >
                        <TableComponent
                            key={key}
                            data={tables[key]}
                            updateDataTable={(data) => { updateDataTable(key, data) }}
                        />
                    </div>
                )
            }
        </div>
    )
}
