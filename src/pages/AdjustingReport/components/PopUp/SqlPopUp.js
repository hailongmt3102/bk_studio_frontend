import React, { useEffect, useState } from 'react'
import { Modal, Button } from 'react-bootstrap'
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import add_grey from 'resources/icons/add_grey.svg'
import substract from 'resources/icons/substract.svg'
import edit_right from 'resources/icons/edit_right.svg'
import { blue_cloud } from "utils/color"
import { Form } from 'react-bootstrap'
export default function SqlPopUp(props) {
    const [step, setStep] = useState(1)

    const op = ['=', "!=", ">", "<", ">=", "<="];

    const [groupBy, setGroupBy] = useState([])

    const [function_clause, setFunction_clause] = useState([])

    const [where_clause, setWhere_clause] = useState([])

    const [having_clause, setHaving_clause] = useState([])

    const [order_clause, setOrder_clause] = useState([])

    const [fieldList, setFieldList] = useState([])

    const function_list = [
        'COUNT',
        'SUM',
        'MAX',
        'MIN',
        'AVG',
    ];

    const [data_source, set_data_source] = useState([]);
    const order_by_list = [
        'ASC',
        'DESC',
    ];

    const [selectXAxis, setSelectXAxis] = useState(null)

    const [selectedField, setSelectedField] = useState([])
    const [selectFrom, setSelectFrom] = useState([])

    const updateFunctionClause = (index, value) => {
        setFunction_clause([...function_clause.slice(0, index), value, ...function_clause.slice(index + 1)])
    }

    const updateWhereClause = (index, value) => {
        setWhere_clause([...where_clause.slice(0, index), value, ...where_clause.slice(index + 1)])
    }

    const updateHavingClause = (index, value) => {
        setHaving_clause([...having_clause.slice(0, index), value, ...having_clause.slice(index + 1)])
    }

    const updateOrderClause = (index, value) => {
        setOrder_clause([...order_clause.slice(0, index), value, ...order_clause.slice(index + 1)])
    }

    const submit = () => {
        let functionclause = function_clause.filter(ele => ele.active && ele.op != "" && ele.field != "")
        let whereclause = where_clause.filter(ele => ele.active && ele.op != "" && ele.value != "" && ele.field != "")
        let havingclause = having_clause.filter(ele => ele.active && ele.fx != "" && ele.field != "")
        let orderclause = order_clause.filter(ele => ele.active && ele.fx != "" && ele.field != "")


        if (selectedField.length == 0 && functionclause.length == 0) {
            alert("Nothing to compute")
            return
        }
        if (selectFrom.length > 1) {
            alert("Multi table now is not available")
            return
        }
        let query = "select"
        if (selectXAxis != null) query += ` ${selectXAxis},`
        // select fields component
        if (selectedField.length > 0 && functionclause.length == 0) {
            query += ` ${selectedField.join(',')}`
        } else if (selectedField.length == 0 && functionclause.length > 0) {
            query += ` ${functionclause.map(clause => `${clause.op}(${clause.field})${clause.as != "" ? ` as ${clause.as}` : ""}`).join(',')}`
        } else {
            query += ` ${selectedField.join(',')} ,${functionclause.map(clause => `${clause.op}(${clause.field})${clause.as != "" ? ` as ${clause.as}` : ""}`).join(',')}`
        }
        // from component
        query += ` from ${selectFrom[0]}`
        // where
        if (whereclause.length > 0) {
            query += ` where ${whereclause.map(where => `${where.field} ${where.op} ${where.value}`).join(' and ')}`
        }
        // group by
        if (groupBy.length > 0) {
            query += ` group by ${groupBy.join(',')}`
        }
        // having
        if (havingclause.length > 0) {
            query += ` having ${havingclause.map(having => `${having.field} ${having.op} ${having.value}`).join(' and ')}`
        }
        // order by
        if (orderclause.length > 0) {
            query += ` order by ${orderclause.map(order => `${order.field} ${order.fx}`).join(',')}`
        }
        props.onComplete(typeChartName, query)
        props.handleClose()
    }

    useEffect(() => {
        set_data_source(Object.keys(props.dataSource))
        Object.keys(props.dataSource).map(key => {
            setFieldList([...fieldList, ...props.dataSource[key]])
        })
    }, [props.dataSource])

    useEffect(() => {
        setStep(1)
        // const [groupBy, setGroupBy] = useState([])

        // const [function_clause, setFunction_clause] = useState([])

        // const [where_clause, setWhere_clause] = useState([])

        // const [having_clause, setHaving_clause] = useState([])

        // const [order_clause, setOrder_clause] = useState([])

        // const [fieldList, setFieldList] = useState([])

        // const function_list = [
        //     'COUNT',
        //     'SUM',
        //     'MAX',
        //     'MIN',
        //     'AVG',
        // ];

        // // const [data_source, set_data_source] = useState([]);
        // const order_by_list = [
        //     'ASC',
        //     'DESC',
        // ];

        // const [selectXAxis, setSelectXAxis] = useState(null)

        // const [selectedField, setSelectedField] = useState([])
        // const [selectFrom, setSelectFrom] = useState([])

        // setGroupBy([])
        // setFunction_clause([])
        // setWhere_clause([])
        // setHaving_clause([])
        // setOrder_clause([])
        // setFieldList([])
    }, [props.show])


    const selectTableComponent = () => {
        return <div>
            <div className='customFontBold ms-5 mb-3 size22' >Select a datasource</div>
            <Autocomplete
                className='ms-5 me-5'
                id="tags-standard"
                options={data_source}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        variant="standard"
                        // label="Multiple values"
                        placeholder="Data sources"
                    />
                )}
                onChange={(e, val) => {
                    setSelectFrom([val])
                }}
            />
        </div>
    }

    const [showField, setShowField] = useState(true)




    const selectClauseTypeLineAndBar = () => {
        return <div>
            <div className='row m-0 p-0'>
                <div style={{ color: blue_cloud, fontWeight: "bold", fontSize: "20px" }}>
                    SELECT
                </div>
                <div className='row mt-3 m-0 p-0'>
                    <div className='col-1 m-auto p-0'>
                        <div className='row m-0 p-0 '>
                            <div className='col m-0 p-0 '>
                            </div>
                            <div className='col m-0 p-0'>
                                <div className='col-1  m-auto p-0' >
                                    <div>Field</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-11 m-auto'>
                        <Autocomplete
                            className='ms-5 me-5'
                            multiple
                            id="tags-standard"
                            options={selectFrom.reduce((pre, cur) => [...pre, ...props.dataSource[cur]], [])}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="standard"
                                    placeholder="Fields"
                                />
                            )}
                            onChange={(e, val) => {
                                setSelectedField(val)
                            }}
                        />
                    </div>
                </div>
            </div>
            <div className='row mt-5 m-auto m-0 p-0'>
                <div className='col-3 p-0'>
                    <div className='row '>
                        <div className='col-1  m-auto'>
                        </div>
                        <div className='col m-auto p-0' >
                            <div className='ms-5'>Function</div>
                        </div>
                        <div className='col  m-auto'>
                            <button type="button" class="btn btn-sm ms-2 p-2 m-auto" onClick={() => {
                                setFunction_clause([...function_clause, {
                                    active: true,
                                    field: "",
                                    op: "",
                                    as: ""
                                }])
                            }}>
                                <img src={add_grey} height="30px" width="30px" />
                            </button>
                        </div>
                    </div>

                </div>
                <div className='col-10'></div>

            </div>
            {
                function_clause.map((clause, index) => clause.active &&
                    <div className='row'>
                        <div className='col-4 m-auto'>
                            <Autocomplete
                                className='ms-5'
                                id="size-small-standard"
                                size="small"
                                options={function_list}
                                renderInput={(params) =>
                                    <TextField
                                        {...params}
                                        variant="standard"
                                        placeholder="Fx"
                                    />
                                }
                                onChange={(e, value) => {
                                    updateFunctionClause(index, { ...clause, op: value || "" })
                                }}
                            />
                        </div>
                        <div className='col-4 m-auto'>
                            <Autocomplete
                                id="function"
                                size="small"
                                options={selectFrom.reduce((pre, cur) => [...pre, ...props.dataSource[cur]], [])}
                                renderInput={(params) =>
                                    <TextField
                                        {...params}
                                        variant="standard"
                                        placeholder="Field "
                                    />
                                }
                                onChange={(e, value) => {
                                    updateFunctionClause(index, { ...clause, field: value || "" })
                                }}
                            />
                        </div>
                        <div className='col-2 m-auto'>
                            <TextField
                                id="standard-textarea"
                                placeholder="Name"
                                variant="standard"
                                onChange={e => {
                                    updateFunctionClause(index, { ...clause, as: e.target.value || "" })
                                }}
                            />
                        </div>
                        <div className='col-2 m-auto'>
                            <button type="button" class="btn btn-sm ms-2 p-2" onClick={() => {
                                setFunction_clause([...function_clause.slice(0, index), { ...function_clause[index], active: false }, ...function_clause.slice(index + 1)])
                            }}><img src={substract} height="30px" width="30px" /></button>
                        </div>
                    </div>
                )
            }
        </div>
    }

    const selectClauseTypePieandDonut = () => {
        return <div>
            <div className='row m-0 p-0'>
                <div className='size20 SecondFontColor customFontBold'>
                    SELECT
                </div>
                <div className='row mt-3 m-0 p-0'>
                    <div className='col-12 m-auto p-0'>
                        <div className='row m-0 p-0 '>
                            <div className='col m-0 p-0 '>
                                <Form.Check
                                    onClick={(e) => {
                                        setShowField(true)
                                    }}
                                    label="Field"
                                    name="group1"
                                    type='radio'
                                    id="MaleGender"
                                    checked={showField}
                                />
                                {/* <div className='col m-0 p-0'>
                                <div className='col-1  m-auto p-0' >
                                    <div>Field</div>
                                </div>
                            </div> */}
                            </div>
                        </div>
                        {showField === true ? <div className='col-11 m-auto'>
                            <Autocomplete
                                className='ms-4 me-5'
                                multiple
                                id="tags-standard"
                                options={selectFrom.reduce((pre, cur) => [...pre, ...props.dataSource[cur]], [])}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        variant="standard"
                                        placeholder="Fields"
                                    />
                                )}
                                onChange={(e, val) => {
                                    setSelectedField(val)
                                }}
                            />
                        </div> : <div className='col-11 m-auto'></div>}
                    </div>
                </div>
                <div className='row mt-5 m-auto m-0 p-0'>
                    <div className='col p-0'>
                        <div className='row '>
                            <div className='col-1  m-auto'>
                                <Form.Check
                                    onClick={(e) => {
                                        setShowField(false)
                                    }}
                                    label="Function"
                                    name="group1"
                                    type='radio'
                                    id="MaleGender"
                                />
                            </div>
                            <div className='col-11 m-auto p-0' >
                                {showField === false ?
                                    <button type="button" class="btn btn-sm ms-2 p-2" onClick={() => {
                                        setFunction_clause([...function_clause, {
                                            active: true,
                                            field: "",
                                            op: "",
                                            value: 0
                                        }])
                                    }}><img src={add_grey} height="30px" width="30px" /></button>
                                    : <div className='col m-auto'></div>
                                }
                            </div>

                        </div>

                    </div>


                </div>
                {
                    showField === false ? function_clause.map((clause, index) => clause.active &&
                        <div className='row'>
                            <div className='col-5 m-auto'>
                                <div className='ms-3'>
                                    <Autocomplete
                                        className='ms-5'
                                        id="size-small-standard"
                                        size="small"
                                        options={function_list}
                                        renderInput={(params) =>
                                            <TextField
                                                {...params}
                                                variant="standard"
                                                placeholder="Fx"
                                            />
                                        }
                                        onChange={(e, value) => {
                                            updateFunctionClause(index, { ...clause, op: value || "" })
                                        }}
                                    />
                                </div>
                            </div>
                            <div className='col-5 m-auto'>
                                <Autocomplete
                                    id="function"
                                    size="small"
                                    options={selectFrom.reduce((pre, cur) => [...pre, ...props.dataSource[cur]], [])}
                                    renderInput={(params) =>
                                        <TextField
                                            {...params}
                                            variant="standard"
                                            placeholder="Field "
                                        />
                                    }
                                    onChange={(e, value) => {
                                        updateFunctionClause(index, { ...clause, field: value || "" })
                                    }}
                                />
                            </div>
                            <div className='col-2 m-auto'>
                                <button type="button" class="btn btn-sm ms-2 p-2" onClick={() => {
                                    setFunction_clause([...function_clause.slice(0, index), { ...function_clause, active: false }, ...function_clause.slice(index + 1)])
                                }}><img src={substract} height="30px" width="30px" /></button>
                            </div>
                        </div>
                    ) : null
                }
            </div>
        </div>
    }
    const whereClause = () => {
        return <div>
            <div className='row mt-4'>
                <div className='col-1 m-auto ms-3' style={{ color: blue_cloud, fontWeight: "bold", fontSize: "20px" }}>
                    WHERE
                </div>
                <div className='col m-auto '>
                    <button type="button" class="btn btn-sm ms-2 p-2" onClick={() => {
                        setWhere_clause([...where_clause, {
                            field: "",
                            op: "",
                            value: 0,
                            active: true
                        }])
                    }}><img src={add_grey} height="30px" width="30px" /></button>
                </div>
            </div>

            {
                where_clause.map((clause, index) =>
                    <div className='row m-0 p-0'>
                        <div className='col-5  ms-1 m-auto'>
                            <Autocomplete
                                className='ms-5'
                                id="size-small-standard"
                                size="small"
                                options={selectFrom.reduce((pre, cur) => [...pre, ...props.dataSource[cur]], [])}
                                renderInput={(params) =>
                                    <TextField
                                        {...params}
                                        variant="standard"
                                        placeholder="Field "
                                    />
                                }
                                onChange={(e, value) => {
                                    updateWhereClause(index, { ...clause, field: value || "" })
                                }}
                            />

                        </div>
                        <div className='col-2 m-auto'>
                            <Autocomplete
                                id="size-small-standard"
                                size="small"
                                options={op}
                                renderInput={(params) =>
                                    <TextField
                                        {...params}
                                        variant="standard"
                                        placeholder="Fx"
                                    />
                                }
                                onChange={(e, value) => {
                                    updateWhereClause(index, { ...clause, op: value || "" })
                                }}
                            />
                        </div>
                        <div className='col-2 m-auto'>
                            <TextField
                                id="standard-textarea"
                                placeholder="Value"
                                multiline
                                variant="standard"
                                onChange={(e) => {
                                    updateWhereClause(index, { ...clause, value: e.target.value || "" })
                                }}
                            />
                        </div>
                        <div className='col-2'>
                            <button type="button" class="btn btn-sm p-2"
                                onClick={() => {
                                    setWhere_clause([...where_clause.slice(0, index), { ...where_clause[index], active: false }, ...where_clause.slice(index + 1)])
                                }}
                            >
                                <img src={substract} height="30px" width="30px" />
                            </button>
                        </div>
                    </div>
                )
            }
        </div>
    }
    const groupByClause = () => {
        return <div className='row  mt-5'>
            <div className='ms-3' style={{ color: blue_cloud, fontWeight: "bold", fontSize: "20px" }}>
                GROUP BY
            </div>
            <div className='row p-4 ms-2 mb-2'>
                <div className='col'>
                    <Autocomplete
                        className='ms-5 me-5'
                        multiple
                        id="tags-standard"
                        options={selectFrom.reduce((pre, cur) => [...pre, ...props.dataSource[cur]], [])}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                variant="standard"
                                placeholder="Fields"
                            />
                        )}
                        onChange={(e, val) => {
                            setGroupBy(val)
                        }}
                    />
                </div>
            </div>
        </div>
    }
    const havingByClause = () => {
        return <div>

            <div className='row mt-4'>
                <div className='col-1 m-auto ms-3' style={{ color: blue_cloud, fontWeight: "bold", fontSize: "20px" }}>
                    HAVING
                </div>
                <div className='col m-auto '>
                    <button type="button" class="btn btn-sm ms-2 p-2" onClick={() => {
                        setHaving_clause([...having_clause, {
                            field: "",
                            op: "",
                            value: 0,
                            active: true,
                        }])
                    }}><img src={add_grey} height="30px" width="30px" /></button>
                </div>
            </div>
            {
                having_clause.map((clause, index) =>
                    <div className='row m-0 p-0'>
                        <div className='col-5  m-auto'>
                            <div className='ms-5'>
                                <Autocomplete
                                    id="size-small-standard"
                                    size="small"
                                    options={selectedField}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            variant="standard"
                                            placeholder="Field"
                                        />
                                    )}
                                    onChange={(_, value) => {
                                        updateHavingClause(index, { ...clause, field: value })
                                    }}
                                />
                            </div>
                        </div>
                        <div className='col-2 m-auto'>
                            <Autocomplete
                                id="size-small-standard"
                                size="small"
                                options={op}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        variant="standard"
                                        placeholder="Fx"
                                    />
                                )}
                                onChange={(_, value) => {
                                    updateHavingClause(index, { ...clause, op: value })
                                }}
                            />
                        </div>
                        <div className='col-2 m-auto'>
                            <TextField
                                id="standard-textarea"
                                placeholder="Value"
                                multiline
                                variant="standard"
                                onChange={e => {
                                    updateHavingClause(index, { ...clause, value: e.target.value })
                                }}
                            />
                        </div>
                        <div className='col-2'>
                            <button type="button" class="btn btn-sm ms-2 p-2" onClick={() => {
                                setHaving_clause([...having_clause.slice(0, index), { ...having_clause, active: false }, ...having_clause.slice(index + 1)])
                            }}
                            >
                                <img src={substract} height="30px" width="30px" />
                            </button>
                        </div>
                    </div>
                )
            }
        </div>




    }
    const orderByClause = () => {
        return <div>
            <div className='row mt-4'>
                <div className='col-3 ms-3 '>
                    <div className='row  m-auto m-0 p-0'>
                        <div className='col-5  m-auto m-0 p-0' style={{ color: blue_cloud, fontWeight: "bold", fontSize: "20px" }}>
                            ORDER BY
                        </div>
                        <div className='col m-auto m-0 p-0 '>
                            <button type="button" class="btn btn-sm ms-2 p-2" onClick={() => {
                                setOrder_clause([...order_clause, {
                                    fx: "",
                                    field: "",
                                    active: true
                                }])
                            }}><img src={add_grey} height="30px" width="30px" /></button>
                        </div>
                    </div>
                </div>
            </div>

            <div className='row p-0 m-0 mt-3'>
                {
                    order_clause.map((clause, index) =>
                        <div className='row'>
                            <div className='col-5 m-auto'>
                                <div className='ms-3'>
                                    <Autocomplete
                                        className='ms-5'
                                        id="size-small-standard"
                                        size="small"
                                        options={order_by_list}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                variant="standard"
                                                placeholder="Fx"
                                            />
                                        )}
                                        onChange={(e, value) => {
                                            updateOrderClause(index, { ...clause, fx: value || "" })
                                        }}
                                    />
                                </div>
                            </div>
                            <div className='col-5 m-auto'>
                                <Autocomplete
                                    id="size-small-standard"
                                    size="small"
                                    options={selectFrom.reduce((pre, cur) => [...pre, ...props.dataSource[cur]], [])}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            variant="standard"
                                            //label="Size small"
                                            placeholder="Field"
                                        />
                                    )}
                                    onChange={(e, value) => {
                                        updateOrderClause(index, { ...clause, field: value || "" })
                                    }}
                                />
                            </div>
                            <div className='col-2 m-auto'>
                                <button type="button" class="btn btn-sm ms-2 p-2" onClick={() => {
                                    setOrder_clause([...order_clause.slice(0, index), { ...order_clause, active: false }, ...order_clause.slice(index + 1)])
                                }}
                                >
                                    <img src={substract} height="30px" width="30px" />
                                </button>
                            </div>
                        </div>
                    )
                }


            </div>
        </div>
    }

    const selectWayShow = () => {
        switch (props.type) {
            case "Table":
                return selectClauseTypeLineAndBar()
            case "Bar Chart":
                return selectClauseTypeLineAndBar()
            case "Line Chart":
                return selectClauseTypeLineAndBar()
            case "Pie Chart":
                return selectClauseTypePieandDonut()
            case "Doughnut Chart":
                return selectClauseTypePieandDonut()
            default:
                return null;

        }
    }
    const buildSQLComponent = () => {
        return <div>
            {/* {fromClause()} */}
            {selectWayShow()}
            {whereClause()}
            {groupByClause()}
            {havingByClause()}
            {orderByClause()}
        </div>
    }
    const [typeChartName, setTypeChartName] = useState(props.type)
    useEffect(() => {
        setTypeChartName(props.type + " Name")
    }, [props.type])

    const titleComponent = () => {
        switch (step) {
            case 1:
                return <div className='row m-auto'>
                    <div className='col-1 '> <img src={edit_right} height="33px" width="33px" /></div>
                    <div className='col-10 ms-2'>
                        <Form.Control type="text" value={typeChartName} onChange={(event) => {
                            setTypeChartName(event.target.value)
                        }}
                            className="border-0 mb-2 m-0 p-0 PrimaryFontColor size32 customFontBold"
                        />
                    </div>

                </div>
            case 2:
                return <div className='customFontBold PrimaryFontColor size32'>Select Axis</div>
            case 3:
                return <div className='customFontBold PrimaryFontColor size32'>SQL function</div>
            default:
                return null
        }
    }

    const selectXColumnCoponent = () => {
        return <Autocomplete
            className='ms-5 me-5'
            id="tags-standard"
            options={selectFrom.reduce((pre, cur) => [...pre, ...props.dataSource[cur]], [])}
            renderInput={(params) => (
                <TextField
                    {...params}
                    variant="standard"
                    placeholder="Fields"
                />
            )}
            onChange={(e, val) => {
                setSelectXAxis(val)
            }}
        />
    }
    const bodyComponent = () => {
        switch (step) {
            case 1:
                return selectTableComponent()
            case 2:
                return selectXColumnCoponent()
            case 3:
                return buildSQLComponent()
            default:
                return null
        }
    }
    const footerComponent = () => {
        switch (step) {
            case 1:
                return <Button onClick={() => {
                    if (props.type === "Table")
                        setStep(3)
                    else setStep(2)
                }} >Next
                </Button>
            case 2:
                return <div>
                    <Button onClick={() => {
                        setStep(1)
                    }} >Back
                    </Button>
                    <Button className='ms-2' onClick={() => {
                        setStep(3)
                    }} >Next
                    </Button>
                </div>
            case 3:
                return <div>
                    <Button onClick={() => {
                        if (props.type === "Table")
                            setStep(1)
                        else setStep(2)
                    }} >Back
                    </Button>
                    <Button className='ms-2' onClick={() => {
                        submit()
                    }} >Done
                    </Button></div>
            default:
                return null
        }
    }
    return (
        <Modal
            show={props.show}
            onHide={props.handleClose}
            backdrop="static"
            //fullscreen={true} 
            size="xl"
            aria-labelledby="example-modal-sizes-title-lg"
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    {
                        titleComponent()
                    }
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {
                    bodyComponent()
                }
            </Modal.Body >
            <Modal.Footer>
                {footerComponent()}
            </Modal.Footer>
        </Modal >
    )
}