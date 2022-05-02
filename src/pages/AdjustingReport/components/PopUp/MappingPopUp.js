import React, { useEffect, useState } from 'react'
import { Modal, Button } from 'react-bootstrap'
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import change from 'resources/icons/change.svg'
import { Form } from 'react-bootstrap'
import add_grey from 'resources/icons/add_grey.svg'
import substract from 'resources/icons/substract.svg'

export default function MappingPopUp(props) {
    const [step, setStep] = useState(1)
    const [fieldList, setFieldList] = useState([])
    const [data_source, set_data_source] = useState([]);
    const [selectXAxis, setSelectXAxis] = useState(null)
    const [selectFrom, setSelectFrom] = useState([])

    const submit = () => {
        // if (selectedField.length == 0 && function_clause.length == 0) {
        //     alert("Nothing to compute")
        //     return
        // }
        // if (selectFrom.length > 1) {
        //     alert("Multi table now is not available")
        //     return
        // }
        // let query = "select"
        // if (selectXAxis != null) query += ` ${selectXAxis},`
        // // select fields component
        // if (selectedField.length > 0 && function_clause.length == 0) {
        //     query += ` ${selectedField.join(',')}`
        // } else if (selectedField.length == 0 && function_clause.length > 0) {
        //     query += ` ${function_clause.map(clause => `${clause.op}(${clause.field})`).join(',')}`
        // } else {
        //     query += ` ${selectedField.join(',')} ,${function_clause.map(clause => `${clause.op}(${clause.field})`).join(',')}`
        // }
        // // from component
        // query += ` from ${selectFrom[0]}`
        // // where
        // if (where_clause.length > 0) {
        //     query += ` where ${where_clause.map(where => `${where.field} ${where.op} ${where.value}`).join(' and ')}`
        // }
        // // group by
        // if (groupBy.length > 0) {
        //     query += ` group by ${groupBy.join(',')}`
        // }
        // // having
        // if (having_clause.length > 0) {
        //     query += ` having ${having_clause.map(having => `${having.field} ${having.op} ${having.value}`).join(' and ')}`
        // }
        // // order by
        // if (order_clause.length > 0) {
        //     query += ` order by ${order_clause.map(order => `${order.field} ${order.fx}`).join(',')}`
        // }
        // props.onComplete("example", query)
        props.handleClose()
    }
    useEffect(() => { setStep(1) }, [props.show])

    useEffect(() => {
        set_data_source(Object.keys(props.dataSource))
        Object.keys(props.dataSource).map(key => {
            setFieldList([...fieldList, ...props.dataSource[key]])
        })
    }, [props.dataSource])


    const selectTableComponent = () => {
        return <div>
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




    const titleComponent = () => {
        switch (step) {
            case 1:
                return <div className='customFontBold PrimaryFontColor size32'>Select Table</div>
            case 2:
                return <div className='customFontBold PrimaryFontColor size32'>Mapping X column</div>
            case 3:
                return <div className='customFontBold PrimaryFontColor size32'>Mapping data</div>
            default:
                return null
        }
    }
    const [showField, setShowField] = useState(true)

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
                        setSelectXAxis(val)
                    }}
                />
            </div>
            <div className='col-1'></div>
        </div>


    }
    const MappingDataComponent = () => {
        return <div>{props.commandData.data.select.map((ele, index) => (props.componentType === "Table" || index != 0) && <div className='row mt-4 m-0 p-0 pe-5'>
            <div className='col-2 text-center m-auto m-0 p-0'> {ele} </div>
            <div className='col-2 m-auto  m-0 p-0'> <img src={change} /> </div>
            <div className='col-8'>
                <div className='row'>
                    <div className='col'>
                        <Form.Check
                            onClick={(e) => {
                                setShowField(true)
                            }}
                            label="Field"
                            name={`group${index}`}
                            type='radio'
                            checked={showField}
                        />

                    </div>
                    <div className='col'>
                        {showField === true ? <div>
                            <Autocomplete
                                multiple
                                id="tags-standard"
                                options={[]}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        variant="standard"
                                        placeholder="Fields"
                                    />
                                )}
                                onChange={(e, val) => {
                                    //setSelectedField(val)
                                }}
                            />
                        </div> : <div className='col-11 m-auto'></div>}
                    </div>
                </div>
                <div className='row mt-2'>
                    <div className='col'>
                        <Form.Check
                            onClick={(e) => {
                                setShowField(false)
                            }}
                            label="Function"
                            name={`group${index}`}
                            type='radio'

                        />
                    </div>
                    {
                        showField === false ? <div className='col'>
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
                                    //updateFunctionClause(index, { ...clause, op: value ?? "" })
                                }}
                            />
                        </div> : null
                    }
                    {
                        showField === false ? <div className='col'>
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
                                    //updateFunctionClause(index, { ...clause, field: value ?? "" })
                                }}
                            />
                        </div> : null
                    }
                    {
                        showField === false ? <div className='col'>
                            <TextField
                                id="standard-textarea"
                                placeholder="As Name"
                                variant="standard"
                                onChange={e => {
                                    // updateFunctionClause(index, { ...clause, as: e.target.value ?? "" })
                                }}
                            />
                        </div> : null
                    }
                </div>
            </div>
        </div>
        )}
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