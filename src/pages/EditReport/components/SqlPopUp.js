import React, { useEffect, useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import NestedDropDown from 'components/NestedDropDown'
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import add_grey from 'resources/icons/add_grey.svg'
export default function SqlPopUp(props) {
    const [step, setStep] = useState(1)
    const [selectComponent, setSelectComponent] = useState([])
    const [fieldAdd, setfieldAdd] = useState(["username", "id"])

    const op = ['=', "!=", ">", "<", ">=", "<="];
    const [value, setValue] = useState(op[0]);
    const [inputValue, setInputValue] = useState('');

    const [function_clause, setFunction_clause] = useState(
        [
            {
                fx: "SUM",
                field: "a"
            }
        ]
    )

    const [where_clause, setWhere_clause] = useState(
        [
            {
                field: "SUM",
                op: ">",
                value: 0
            }
        ]
    )
    const [having_clause, setHaving_clause] = useState(
        [
            {
                field: "SUM",
                op: ">",
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

    const [fieldList, setFieldList] = useState(
        ["a", "b", "c"]
    )

    const function_list = [
        'COUNT',
        'SUM',
        'MAX',
        'MIN',
        'AVG',
    ];

    const data_source = [
        'a.csv',
        'b.csv',
        'v.csv',
        'f.csv',
        'iris.csv',
    ];
    const order_by_list = [
        'ASC',
        'DESC',
    ];

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
                    {step == 1 ?
                        <div>Select table</div>
                        : <div>SQL function</div>
                    }
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {
                    step == 1 ?
                        <div>
                            <Autocomplete
                                className='ms-5 me-5'
                                multiple
                                id="tags-standard"
                                options={fieldList}
                                //getOptionLabel={(option) => option.title}
                                //defaultValue={[top100Films[13]]}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        variant="standard"
                                        // label="Multiple values"
                                        placeholder="Favorites"
                                    />
                                )}
                            />
                        </div>
                        : <div>
                            <div className='row m-auto'>
                                <div className='col-1 m-auto'>
                                    <div>From</div>
                                </div>
                                <div className='col-11 '>
                                    <Autocomplete
                                        className='ms-5 me-5'
                                        multiple
                                        id="tags-standard"
                                        options={data_source}
                                        //getOptionLabel={(option) => option.title}
                                        //defaultValue={[top100Films[13]]}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                variant="standard"
                                                // label="Multiple values"
                                                placeholder="Data sources"
                                            />
                                        )}
                                    />
                                </div>
                            </div>
                            <div className='row mt-4'>
                                <div className='row'>
                                    <div>SELECT</div>
                                </div>
                                <div className='row m-0 p-0 p-4'>
                                    <div className='col-1 m-auto p-0'>
                                        <div className='row m-0 p-0 '>
                                            <div className='col m-0 p-0 '>
                                                <input
                                                    class="form-check-input ms-3"
                                                    type="checkbox"
                                                    id="form2Example3c"
                                                    onClick={(e) => {
                                                    }}
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
                                            //getOptionLabel={(option) => option.title}
                                            //defaultValue={[top100Films[13]]}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    variant="standard"
                                                    // label="Multiple values"
                                                    placeholder="Favorites"
                                                />
                                            )}
                                        />
                                    </div>

                                </div>
                            </div>

                            <div className='row mt-5 m-0 p-0'>
                                <div className='col-4'>
                                    <div className='row'>
                                        <div className='col-1 m-0 p-0 '>
                                            <input
                                                class="form-check-input ms-3"
                                                type="checkbox"
                                                id="form2Example3c"
                                                onClick={(e) => {
                                                }}
                                            />
                                        </div>
                                        <div className='col'>Function</div>
                                        <div className='col  m-auto'>
                                            <button type="button" class="btn btn-sm ms-2 p-2" onClick={() => {
                                                setFunction_clause([...function_clause, {
                                                    fx: "",
                                                    field: ""
                                                }])
                                                console.log(function_clause)
                                            }}><img src={add_grey} height="30px" width="30px" /></button>

                                        </div>


                                    </div>
                                </div>
                            </div>

                            <div className='row m-0 p-0 mt-4'>
                                <div className='col'>
                                    {
                                        function_clause.map((e) => {
                                            return <div className='row mt-2'>
                                                <div className='col-5 m-auto'>
                                                    <Autocomplete
                                                        value={e.fx}
                                                        id="size-small-standard"
                                                        size="small"
                                                        options={function_list}
                                                        //getOptionLabel={(option) => option}
                                                        //defaultValue={top100Films[13]}
                                                        renderInput={(params) => (
                                                            <TextField
                                                                {...params}
                                                                variant="standard"
                                                                //label="Size small"
                                                                placeholder="Favorites"
                                                            />
                                                        )}
                                                    />
                                                </div>
                                                <div className='col-1 m-auto'>
                                                    <div>IN</div>
                                                </div>
                                                <div className='col-4 m-auto'>
                                                    <Autocomplete
                                                        value={e.field}
                                                        id="size-small-standard"
                                                        size="small"
                                                        options={fieldList}
                                                        //getOptionLabel={(option) => option.title}
                                                        //defaultValue={top100Films[13]}
                                                        renderInput={(params) => (
                                                            <TextField
                                                                {...params}
                                                                variant="standard"
                                                                //label="Size small"
                                                                placeholder="Favorites"
                                                            />
                                                        )}
                                                    />
                                                </div>

                                            </div>
                                        })
                                    }
                                </div>


                            </div>
                            <div className='row mt-5'>
                                <div className='col-1 m-auto p-0'>
                                    <div className='row m-0 p-0 '>
                                        <div className='col m-0 p-0 '>
                                            <input
                                                class="form-check-input ms-3"
                                                type="checkbox"
                                                id="form2Example3c"
                                                onClick={(e) => {
                                                }}
                                            />
                                        </div>
                                        <div className='col m-0 p-0'>
                                            <div className='col-1  m-auto p-0' >
                                                <div>All</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-11'>

                                </div>
                            </div>
                            <div className='row  mt-5'>
                                <div className='col-1'>
                                    <div>WHERE</div>
                                </div>
                                <div className='col-2'>
                                    <button type="button" class="btn btn-sm ms-2 p-2" onClick={() => {
                                        setWhere_clause([...where_clause, {
                                            field: "",
                                            op: "",
                                            value: 0
                                        }])
                                    }}><img src={add_grey} height="30px" width="30px" /></button>

                                </div>
                            </div>
                            <div className='row p-0 m-0 mt-3'>
                                {
                                    where_clause.map((e) => {
                                        return <div className='row p-0 m-0'>
                                            <div className='col m-auto'>
                                                <Autocomplete
                                                    value={e.field}
                                                    id="size-small-standard"
                                                    size="small"
                                                    options={fieldList}
                                                    //getOptionLabel={(option) => option.title}
                                                    //defaultValue={top100Films[13]}
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            variant="standard"
                                                            //label="Size small"
                                                            placeholder="Favorites"
                                                        />
                                                    )}
                                                />
                                            </div>
                                            <div className='col m-auto'>
                                                <Autocomplete
                                                    value={e.op}
                                                    id="size-small-standard"
                                                    size="small"
                                                    options={op}
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            variant="standard"
                                                            //label="Size small"
                                                            placeholder="Favorites"
                                                        />
                                                    )}
                                                />

                                            </div>
                                            <div className='col m-auto'>
                                                <TextField
                                                    value={e.value}
                                                    id="standard-textarea"
                                                    //label="Multiline Placeholder"
                                                    placeholder="Value"
                                                    multiline
                                                    variant="standard"
                                                />
                                            </div>

                                        </div>
                                    }
                                    )}
                            </div>
                            <div className='row  mt-5'>
                                <div className='col'>
                                    <div>GROUP BY</div>
                                </div>
                                <div className='row'>
                                    <div className='col'>
                                        <Autocomplete
                                            multiple
                                            id="tags-standard"
                                            options={fieldList}
                                            //getOptionLabel={(option) => option.title}
                                            //defaultValue={[top100Films[13]]}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    variant="standard"
                                                    label="Multiple values"
                                                    placeholder="Favorites"
                                                />
                                            )}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='row  mt-5'>
                                <div className='col-2'>
                                    <div>HAVING BY</div>
                                </div>
                                <div className='col-2'>
                                    <button type="button" class="btn btn-sm ms-2 p-2" onClick={() => {
                                        setHaving_clause([...having_clause, {
                                            field: "",
                                            op: "",
                                            value: 0
                                        }])
                                    }}><img src={add_grey} height="30px" width="30px" /></button>

                                </div>
                            </div>
                            <div className='row p-0 m-0 mt-3'>
                                {
                                    having_clause.map((e) => {
                                        return <div className='row p-0 m-0'>
                                            <div className='col m-auto'>
                                                <Autocomplete
                                                    value={e.field}
                                                    id="size-small-standard"
                                                    size="small"
                                                    options={fieldList}
                                                    //getOptionLabel={(option) => option.title}
                                                    //defaultValue={top100Films[13]}
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            variant="standard"
                                                            //label="Size small"
                                                            placeholder="Favorites"
                                                        />
                                                    )}
                                                />
                                            </div>
                                            <div className='col m-auto'>
                                                <Autocomplete
                                                    value={e.op}
                                                    id="size-small-standard"
                                                    size="small"
                                                    options={op}
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            variant="standard"
                                                            //label="Size small"
                                                            placeholder="Favorites"
                                                        />
                                                    )}
                                                />

                                            </div>
                                            <div className='col m-auto'>
                                                <TextField
                                                    value={e.value}
                                                    id="standard-textarea"
                                                    //label="Multiline Placeholder"
                                                    placeholder="Value"
                                                    multiline
                                                    variant="standard"
                                                />
                                            </div>

                                        </div>
                                    }
                                    )}
                            </div>
                            <div className='row  mt-5'>
                                <div className='col-2'>
                                    <div>ORDER BY</div>
                                </div>
                                <div className='col-2'>
                                    <button type="button" class="btn btn-sm ms-2 p-2" onClick={() => {
                                        setOrder_clause([...order_clause, {
                                            fx: "",
                                            field:""
                                        }])
                                    }}><img src={add_grey} height="30px" width="30px" /></button>

                                </div>
                            </div>
                            <div className='row p-0 m-0 mt-3'>
                                {
                                    order_clause.map((e) => {
                                        return <div className='row p-0 m-0'>
                                            <div className='col m-auto'>
                                                <Autocomplete
                                                    value={e.fx}
                                                    id="size-small-standard"
                                                    size="small"
                                                    options={fieldList}
                                                    //getOptionLabel={(option) => option.title}
                                                    //defaultValue={top100Films[13]}
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            variant="standard"
                                                            //label="Size small"
                                                            placeholder="Favorites"
                                                        />
                                                    )}
                                                />
                                            </div>
                                            <div className='col m-auto'>
                                                <Autocomplete
                                                    value={e.field}
                                                    id="size-small-standard"
                                                    size="small"
                                                    options={op}
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            variant="standard"
                                                            //label="Size small"
                                                            placeholder="Favorites"
                                                        />
                                                    )}
                                                />

                                            </div>
                                        </div>
                                    }
                                    )}
                            </div>
                            {/* <NestedDropDown setSelectComponent={setSelectComponent} fieldAdd={fieldAdd} /> */}
                        </div>
                }
            </Modal.Body>
            <Modal.Footer>
                {
                    step == 1 ?
                        null
                        :
                        <Button onClick={() => {
                            setStep(1)
                        }}>
                            Back to step 1
                        </Button>


                }
                {
                    step == 1 ?
                        <Button onClick={() => {
                            setStep(2)
                        }}>
                            Next
                        </Button>
                        :
                        <Button onClick={() => {
                            props.onComplete("query")
                        }}>
                            Done
                        </Button>


                }

            </Modal.Footer>
        </Modal>
    )
}
