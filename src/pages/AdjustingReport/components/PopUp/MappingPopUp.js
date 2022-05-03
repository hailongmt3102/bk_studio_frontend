import React, { useEffect, useState } from 'react'
import { Modal, Button } from 'react-bootstrap'
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import change from 'resources/icons/change.svg'
import { Form } from 'react-bootstrap'
import add_grey from 'resources/icons/add_grey.svg'
import substract from 'resources/icons/substract.svg'
import edit_right from 'resources/icons/edit_right.svg'
export default function MappingPopUp(props) {
    const [step, setStep] = useState(1)
    const [fieldList, setFieldList] = useState([])
    const [data_source, set_data_source] = useState([]);
    const [selectFrom, setSelectFrom] = useState([])

    const op = ['=', "!=", ">", "<", ">=", "<="];
    const [groupBy, setGroupBy] = useState([])

    const [select_clause, setSelect_clause] = useState([])
    const [where_clause, setWhere_clause] = useState([])
    const [having_clause, setHaving_clause] = useState([])
    const [order_clause, setOrder_clause] = useState([])
    const [typeChartName, setTypeChartName] = useState("")



    const submit = () => {
        let selectclause = select_clause.filter(ele => {
            if (!ele.active) return false
            if (ele.isField && ele.field != "") return true
            if (!ele.isField && ele.op != "" && ele.field != "") return true
            return false
        })
        let whereclause = where_clause.filter(ele => ele.active && ele.op != "" && ele.value != "" && ele.field != "")
        let havingclause = having_clause.filter(ele => ele.active && ele.fx != "" && ele.field != "")
        let orderclause = order_clause.filter(ele => ele.active && ele.fx != "" && ele.field != "")

        if (selectclause.length == 0) {
            alert("Nothing to compute")
            return
        }

        if (selectFrom.length > 1) {
            alert("Multi table now is not available")
            return
        }
        let query = "select "

        query += selectclause.map(s => s.isField ? `${s.field}` : `${s.op}(${s.field})${s.as != "" ? ` as ${s.as}` : ""}`).join(',')
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
        props.onComplete(query, typeChartName)
        props.handleClose()
    }
    useEffect(() => {
        setStep(1)
    }, [props.show])

    useEffect(() => {
        set_data_source(Object.keys(props.dataSource))
        Object.keys(props.dataSource).map(key => {
            setFieldList([...fieldList, ...props.dataSource[key]])
        })
    }, [props.dataSource])

    useEffect(() => {

        let selectMap = props.commandData.data.select.map(s => {
            return {
                isField: true,
                field: "",
                op: "",
                as: "",
                active: true
            }
        })
        setSelect_clause(selectMap)

        let whereClauseMap = props.commandData.data.where.map(w => {
            return {
                field: "",
                op: "",
                value: 0,
                active: true
            }
        })

        setWhere_clause(whereClauseMap)

        let HavingClauseMap = props.commandData.data.having.map(w => {
            return {
                field: "",
                op: "",
                value: 0,
                active: true
            }
        })

        setHaving_clause(HavingClauseMap)

        let OrderByClauseMap = props.commandData.data.having.map(w => {
            return {
                fx: "",
                field: "",
                active: true
            }
        })

        setOrder_clause(OrderByClauseMap)
    }, [props.commandData])


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

    useEffect(() => {
        setTypeChartName(props.ComponentName)
    }, [props.ComponentName])




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
                return <div className='customFontBold PrimaryFontColor size32'>Edit Axis</div>
            case 3:
                return <div className='customFontBold PrimaryFontColor size32'>Edit data</div>
            default:
                return null
        }
    }

    const MappingXColumComponent = () => {
        return <div className='row m-0 p-0 pe-5'>
            <div className='col-5 text-center m-auto m-0 p-0'>{props.commandData.data.select[0]} </div>
            <div className='col-2  m-0 p-0'> <img src={change} /> </div>
            <div className='col-4  m-0 p-0'>
                <Autocomplete
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
                        if (select_clause.length > 0) {
                            setSelect_clause([{...select_clause[0], field: val}, ...select_clause.slice(1)])
                        }
                    }}
                />
            </div>
            <div className='col-1'></div>
        </div>


    }
    {/* <div className='col-2 m-auto  m-0 p-0'> <img src={change} /> </div> */ }
    const MappingDataComponent = () => {
        return <div className='p-2'>
            <div className='row '>
                <div className='col-1 m-auto size20 SecondFontColor customFontBold' >
                    SELECT
                </div>
                <div className='col m-auto '>
                    <button type="button" class="btn btn-sm ms-2 p-2" onClick={() => {
                        setSelect_clause([...select_clause, {
                            isField: true,
                            field: "",
                            op: "",
                            as: "",
                            active: true
                        }])
                    }}><img src={add_grey} height="30px" width="30px" /></button>
                </div>
            </div>
            {
                select_clause.map((ele, index) =>
                    (props.componentType === "Table" || index != 0) && ele.active &&
                    < div className='row m-0 p-0'>
                        <div className='col m-auto m-0 p-0'>{props.commandData.data.select[index]}</div>
                        <div className='col-8 m-0 p-0'>
                            {fieldClause(index, ele.isField, ele)}
                            {functionClause(index, !ele.isField, ele)}
                        </div>
                        <div className='col m-0 p-0'>
                            <button type="button" class="btn btn-sm "
                                onClick={() => {
                                    setSelect_clause([...select_clause.slice(0, index), { ...select_clause[index], active: false }, ...select_clause.slice(index + 1)])
                                }}
                            >
                                <img src={substract} height="30px" width="30px" />
                            </button>
                        </div>
                    </div>
                )
            }

            <div className='row '>
                <div className='col-1 m-auto size20 SecondFontColor customFontBold' >
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
            {whereClause()}
            <div className='row m-0 p-0 mt-3 size20 SecondFontColor customFontBold' >
                GROUP BY
            </div>
            {groupByClause()}
            <div className='row '>
                <div className='col-1 m-auto size20 SecondFontColor customFontBold ' >
                    HAVING
                </div>
                <div className='col m-auto '>
                    <button type="button" class="btn btn-sm ms-2 p-2" onClick={() => {
                        setHaving_clause([...having_clause, {
                            field: "",
                            op: "",
                            value: 0,
                            active: true
                        }])
                    }}><img src={add_grey} height="30px" width="30px" /></button>
                </div>
            </div>
            {havingByClause()}
            <div className='row mt-3'>
                <div className='col-4'>
                    <div className='row  m-auto m-0 p-0'>
                        <div className='col-5  m-auto m-0 p-0 size20 SecondFontColor customFontBold'>
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
            {orderByClause()}

        </div>
    }
    const bodyComponent = () => {
        switch (step) {
            case 1:
                return selectTableComponent()
            case 2:
                return MappingXColumComponent()
            case 3:
                return MappingDataComponent()
            default:
                return null
        }
    }
    const footerComponent = () => {
        switch (step) {
            case 1:
                return <Button onClick={() => {
                    if (props.componentType === "Table")
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
                        if (props.componentType === "Table")
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

    const updateSelectClause = (index, value) => {
        setSelect_clause([...select_clause.slice(0, index), value, ...select_clause.slice(index + 1)])
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

    const fieldClause = (index, show, ele) => {
        return <div>
            <div className='row m-0 p-0 mt-3'>
                <div className='col m-0 p-0'>
                    <Form.Check
                        onClick={(e) => {
                            updateSelectClause(index, {
                                ...ele,
                                isField: true
                            })
                        }}
                        label="Field"
                        name={`group${index}`}
                        type='radio'
                        checked={show}
                    />
                </div>
                <div className='col m-0 p-0'>
                    {show && <div>
                        <Autocomplete
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
                                updateSelectClause(index, {
                                    ...ele,
                                    field: val
                                })
                            }}
                        />
                    </div>}
                </div>
            </div>
        </div>
    }

    const functionClause = (index, show, ele) => {
        return <div className='row mt-2'>
            <div className='col'>
                <Form.Check
                    onClick={(e) => {
                        updateSelectClause(index, {
                            ...ele,
                            isField: false
                        })
                    }}
                    label="Function"
                    name={`group${index}`}
                    type='radio'

                />
            </div>
            {
                show && <div className='col'>
                    <Autocomplete
                        id="size-small-standard"
                        size="small"
                        options={[
                            'COUNT',
                            'SUM',
                            'MAX',
                            'MIN',
                            'AVG',
                        ]}
                        renderInput={(params) =>
                            <TextField
                                {...params}
                                variant="standard"
                                placeholder="Fx"
                            />
                        }
                        onChange={(e, value) => {
                            updateSelectClause(index, {
                                ...ele,
                                op: value
                            })
                        }}
                    />
                </div>
            }
            {
                show && <div className='col'>
                    <Autocomplete
                        id="function"
                        size="small"
                        options={selectFrom.reduce((pre, cur) => [...pre, ...props.dataSource[cur]], [])}
                        renderInput={(params) =>
                            <TextField
                                {...params}
                                variant="standard"
                                placeholder="Field"
                            />
                        }
                        onChange={(e, value) => {
                            updateSelectClause(index, {
                                ...ele,
                                field: value
                            })
                        }}
                    />
                </div>
            }
            {
                show && <div className='col'>
                    <TextField
                        id="standard-textarea"
                        placeholder="As Name"
                        variant="standard"
                        onChange={e => {
                            updateSelectClause(index, {
                                ...ele,
                                as: e.target.value
                            })
                        }}
                    />
                </div>
            }
        </div>
    }


    const whereClause = () => {
        return <div>
            {
                where_clause.map((clause, index) => clause.active &&
                    <div className='row m-0 p-0'>
                        <div className='col-2 m-auto'> {props.commandData.data.where[index]}</div>
                        <div className='col-4 m-auto'>
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
                                    updateWhereClause(index, { ...clause, field: value ?? "" })
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
                                    updateWhereClause(index, { ...clause, op: value ?? "" })
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
                                    updateWhereClause(index, { ...clause, value: e.target.value ?? "" })
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
        return <div className='row m-0 p-0'>
            <div className='col-4 text-end m-auto'>{props.commandData.data.groupby.join(", ")}</div>
            <div className='col-8'>
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
    }
    const havingByClause = () => {
        return <div className='mt-3'>
            {
                having_clause.map((clause, index) => clause.active &&
                    <div className='row m-0 p-0'>
                        <div className='col-2 m-auto'>
                            {props.commandData.data.having[index]}
                        </div>
                        <div className='col-3  m-auto'>
                            <div className='ms-5'>
                                <Autocomplete
                                    id="size-small-standard"
                                    size="small"
                                    options={select_clause.map(s => {
                                        if (!s.active || s.field == "") return null
                                        if (s.isField) return s.field
                                        else if (s.op != "" && s.field != "") return `${s.op}(${s.field})`
                                        return null
                                    }).filter(ele => ele != null)}
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
                                setHaving_clause([...having_clause.slice(0, index), { ...having_clause[index], active: false }, ...having_clause.slice(index + 1)])
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
            <div className='row p-0 m-0 mt-3'>
                {
                    order_clause.map((clause, index) => clause.active &&
                        <div className='row'>
                            <div className='col-2 m-auto'>{props.commandData.data.orderby[index]}</div>
                            <div className='col-3 m-auto'>
                                <div className='ms-3'>
                                    <Autocomplete
                                        className='ms-5'
                                        id="size-small-standard"
                                        size="small"
                                        options={[
                                            'ASC',
                                            'DESC',
                                        ]}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                variant="standard"
                                                placeholder="Fx"
                                            />
                                        )}
                                        onChange={(e, value) => {
                                            updateOrderClause(index, { ...clause, fx: value ?? "" })
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
                                        updateOrderClause(index, { ...clause, field: value ?? "" })
                                    }}
                                />
                            </div>
                            <div className='col-2 m-auto'>
                                <button type="button" class="btn btn-sm ms-2 p-2" onClick={() => {
                                    setOrder_clause([...order_clause.slice(0, index), { ...order_clause[index], active: false }, ...order_clause.slice(index + 1)])
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