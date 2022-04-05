import React, { useEffect, useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import NestedDropDown from 'components/NestedDropDown'
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import add_grey from 'resources/icons/add_grey.svg'
import substract from 'resources/icons/substract.svg'
import { Roboto, Poppins } from "utils/font"
import { blue_cloud } from "utils/color"
import { deep_blue_primary } from "utils/color"
import Divider from '@mui/material/Divider';
export default function SqlPopUp(props) {
    const [step, setStep] = useState(1)
    const [selectComponent, setSelectComponent] = useState([])
    const [fieldAdd, setfieldAdd] = useState(["username", "id"])

    const op = ['=', "!=", ">", "<", ">=", "<="];
    const [value, setValue] = useState(op[0]);
    const [inputValue, setInputValue] = useState('');

    const [groupBy, setGroupBy] = useState([])

    const [function_clause, setFunction_clause] = useState(
        [
            {
                field: "",
                op: "",
            },
        ]
    )

    const [where_clause, setWhere_clause] = useState(
        [
            {
                field: "",
                op: "",
                value: 0
            }
        ]
    )
    const [having_clause, setHaving_clause] = useState(
        [
            {
                field: "",
                op: "",
                value: 0
            }
        ]
    )

    const [order_clause, setOrder_clause] = useState(
        [
            {
                fx: "ASC",
                field: "a",
            }
        ]
    )

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

    const [selectTable, setSelectTable] = useState([])

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
        let query = `
            select 
                ${selectedField.join(',')},
                ${function_clause.map(clause => `${clause.op}(${clause.field})`).join(',')}
            from ${selectFrom}
            where ${where_clause.map(where => `${where.field} ${where.op} ${where.value}`).join(' and ')}
            group by ${groupBy.join(',')}
            having ${having_clause.map(having => `${having.field} ${having.op} ${having.value}`).join(' and ')}
            order by ${order_clause.map(order => `${order.field} ${order.fx}`).join(',')} 
            ;
        `
        props.onComplete(query)
        props.handleClose()
    }

    useEffect(() => {
        console.log("datasource trong popup", props.dataSource)
        set_data_source(Object.keys(props.dataSource))

        Object.keys(props.dataSource).map(key => {
            // let arr = props.dataSource[key].map(field => )
            setFieldList([...fieldList, ...props.dataSource[key]])
        })
    }, [props.dataSource])


    const selectTableComponent = () => {
        return <div>
            <Autocomplete
                className='ms-5 me-5'
                multiple
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
                    setSelectFrom(val)
                }}
            />
        </div>
    }

    const fromClause = () => {
        return <div className='row m-auto'>
            <div className='col-1 m-auto'>
                <div>From</div>
            </div>
            <div className='col-11 '>
                <Autocomplete
                    className='ms-5 me-5'
                    multiple
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
                        setSelectFrom(val)
                    }}
                />
            </div>
        </div>
    }
    const selectClause = () => {
        return <div>
            <div className='row m-0 p-0'>
                <div style={{ fontFamily: Poppins, color: blue_cloud, fontWeight: "bold", fontSize: "20px" }}>
                    SELECT
                </div>
                <div className='row mt-3 m-0 p-0'>
                    <div className='col-1 m-auto p-0'>
                        <div className='row m-0 p-0 '>
                            <div className='col m-0 p-0 '>
                                <input
                                    class="form-check-input ms-3"
                                    type="checkbox"
                                    id="form2Example3c"
                                    onClick={(e) => {
                                    }}
                                    checked={true}
                                />
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
                            options={fieldList}
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
                            <input
                                class="form-check-input ms-3"
                                type="checkbox"
                                id="form2Example3c"
                                onClick={(e) => {
                                }}
                                checked={true}
                            />
                        </div>
                        <div className='col m-auto p-0' >
                            <div className='ms-5'>Function</div>
                        </div>
                        <div className='col  m-auto'>
                            <button type="button" class="btn btn-sm ms-2 p-2 m-auto" onClick={() => {
                                setFunction_clause([...function_clause, {
                                    field: "",
                                    op: "",
                                    value: 0
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
                function_clause.map((clause, index) =>
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
                                        updateFunctionClause(index, { ...clause, op: value ?? "" })
                                    }}
                                />
                            </div>
                        </div>
                        <div className='col-5 m-auto'>
                            <Autocomplete
                                id="function"
                                size="small"
                                options={fieldList}
                                renderInput={(params) =>
                                    <TextField
                                        {...params}
                                        variant="standard"
                                        placeholder="Field "
                                    />
                                }
                                onChange={(e, value) => {
                                    updateFunctionClause(index, { ...clause, field: value ?? "" })
                                }}
                            />
                        </div>
                        <div className='col-2 m-auto'>
                            <button type="button" class="btn btn-sm ms-2 p-2" onClick={() => {
                                setFunction_clause([...function_clause.slice(0, index), ...function_clause.slice(index + 1)])
                            }}><img src={substract} height="30px" width="30px" /></button>
                        </div>
                    </div>
                )
            }

        </div>
    }
    const whereClause = () => {
        return <div>
            <div className='row mt-4'>
                <div className='col-1 m-auto ms-3' style={{ fontFamily: Poppins, color: blue_cloud, fontWeight: "bold", fontSize: "20px" }}>
                    WHERE
                </div>
                <div className='col m-auto '>
                    <button type="button" class="btn btn-sm ms-2 p-2" onClick={() => {
                        setWhere_clause([...where_clause, {
                            field: "",
                            op: "",
                            value: 0
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
                                options={fieldList}
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
                                    setWhere_clause([...where_clause.slice(0, index), ...where_clause.slice(index + 1)])
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
            <div className='ms-3' style={{ fontFamily: Poppins, color: blue_cloud, fontWeight: "bold", fontSize: "20px" }}>
                GROUP BY
            </div>
            <div className='row p-4 ms-2 mb-2'>
                <div className='col'>
                    <Autocomplete
                        className='ms-5 me-5'
                        multiple
                        id="tags-standard"
                        options={fieldList}
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
                <div className='col-1 m-auto ms-3' style={{ fontFamily: Poppins, color: blue_cloud, fontWeight: "bold", fontSize: "20px" }}>
                    HAVING
                </div>
                <div className='col m-auto '>
                    <button type="button" class="btn btn-sm ms-2 p-2" onClick={() => {
                        setHaving_clause([...having_clause, {
                            field: "",
                            op: "",
                            value: 0
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
                                    options={fieldList}
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
                                setHaving_clause([...having_clause.slice(0, index), ...having_clause.slice(index + 1)])
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
                        <div className='col-5  m-auto m-0 p-0' style={{ fontFamily: Poppins, color: blue_cloud, fontWeight: "bold", fontSize: "20px" }}>
                            ORDER BY
                        </div>
                        <div className='col m-auto m-0 p-0 '>
                            <button type="button" class="btn btn-sm ms-2 p-2" onClick={() => {
                                setOrder_clause([...order_clause, {
                                    fx: "",
                                    field: ""
                                }])
                            }}><img src={add_grey} height="30px" width="30px" /></button>
                        </div>
                    </div>
                </div>
            </div>

            <div className='row p-0 m-0 mt-3'>
                {
                    function_clause.map((clause, index) =>
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
                                            updateOrderClause(index, { ...clause, fx: value ?? "" })
                                        }}
                                    />
                                </div>
                            </div>
                            <div className='col-5 m-auto'>
                                <Autocomplete
                                    id="size-small-standard"
                                    size="small"
                                    options={fieldList}
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
                                    setOrder_clause([...order_clause.slice(0, index), ...order_clause.slice(index + 1)])
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
    const buildSQLComponent = () => {
        return <div>
            {/* {fromClause()} */}
            {selectClause()}
            {whereClause()}
            {groupByClause()}
            {havingByClause()}
            {orderByClause()}
        </div>
    }
    const titleComponent = () => {
        switch (step) {
            case 1:
                return <div>Select table</div>
            case 2:
                return <div>Select X column</div>
            case 3:
                return <div>SQL function</div>
        }
    }

    const selectXColumnCoponent = () => {
        return <Autocomplete
            className='ms-5 me-5'
            id="size-small-standard"
            size="small"
            options={fieldList}
            renderInput={(params) =>
                <TextField
                    {...params}
                    variant="standard"
                    placeholder="Select X column"
                />
            }
            onChange={(e, value) => {
                // updateFunctionClause(index, { ...clause, op: value ?? "" })
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
                return  buildSQLComponent()
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
                        window.location.reload()
                    }} >Done
                    </Button></div>
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
