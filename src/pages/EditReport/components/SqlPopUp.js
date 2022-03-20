import React, { useEffect, useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import NestedDropDown from 'components/NestedDropDown'
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

export default function SqlPopUp(props) {
    const [step, setStep] = useState(1)
    const [selectComponent, setSelectComponent] = useState([])
    const [fieldAdd, setfieldAdd] = useState(["username", "id"])
    const top100Films = [
        { title: 'The Shawshank Redemption', year: 1994 },
        { title: 'The Godfather', year: 1972 },
        { title: 'The Godfather: Part II', year: 1974 },
        { title: 'The Dark Knight', year: 2008 },
        { title: '12 Angry Men', year: 1957 },
        { title: "Schindler's List", year: 1993 },
        { title: 'Pulp Fiction', year: 1994 },
        {
            title: 'The Lord of the Rings: The Return of the King',
            year: 2003,
        },
        { title: 'The Good, the Bad and the Ugly', year: 1966 },
        { title: 'Fight Club', year: 1999 },
        {
            title: 'The Lord of the Rings: The Fellowship of the Ring',
            year: 2001,
        },
        { title: 'Monty Python and the Holy Grail', year: 1975 },
    ];
    const function_list = [
        { title: 'COUNT', year: 1994 },
        { title: 'SUM', year: 1972 },
        { title: 'MAX', year: 1974 },
        { title: 'MIN', year: 1974 },
        { title: 'AVG', year: 1974 }
    ];

    const data_source = [
        { title: 'iris.csv', year: 1994 },
        { title: 'iris.csv', year: 1972 },
        { title: 'iris.csv', year: 1974 },
        { title: 'iris.csv', year: 1974 },
        { title: 'iris.csv', year: 1974 }
    ];
    const order_by_list = [
        { title: 'ASC', year: 1994 },
        { title: 'DESC', year: 1972 },
        
    ];

    return (
        <Modal
            show={props.show}
            onHide={props.handleClose}
            backdrop="static"
            // fullscreen={true}
            size="lg"
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
                        <div>Select table</div>
                        : <div>
                            <div className='row'>
                                <div className='col'>
                                    <div>From</div>
                                </div>
                                <div className='col'>
                                    <Autocomplete
                                        multiple
                                        id="tags-standard"
                                        options={data_source}
                                        getOptionLabel={(option) => option.title}
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
                            <div className='row'>
                                <div className='col'>
                                    <div>SELECT</div>
                                </div>
                                <div className='row'>
                                    <div className='col'>
                                        <input
                                            class="form-check-input me-2"
                                            type="checkbox"
                                            id="form2Example3c"
                                            onClick={(e) => {
                                            }}
                                        />
                                    </div>
                                    <div className='col'>
                                        <div>Field</div>
                                    </div>
                                    <div className='col'>
                                        <Autocomplete
                                            multiple
                                            id="tags-standard"
                                            options={top100Films}
                                            getOptionLabel={(option) => option.title}
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
                            <div className='row'>
                                <div className='row'>
                                    <div className='col'>
                                        <input
                                            class="form-check-input me-2"
                                            type="checkbox"
                                            id="form2Example3c"
                                            onClick={(e) => {
                                            }}
                                        />
                                    </div>
                                    <div className='col'>
                                        <div>Function</div>
                                    </div>
                                    <div className='col'>
                                        <Autocomplete
                                            multiple
                                            id="tags-standard"
                                            options={function_list}
                                            getOptionLabel={(option) => option.title}
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
                                    <div className='col'>
                                        <Autocomplete
                                            multiple
                                            id="tags-standard"
                                            options={function_list}
                                            getOptionLabel={(option) => option.title}
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
                            <div className='row'>
                                <div className='row'>
                                    <div className='col'>
                                        <input
                                            class="form-check-input me-2"
                                            type="checkbox"
                                            id="form2Example3c"
                                            onClick={(e) => {
                                            }}
                                        />
                                    </div>
                                    <div className='col'>
                                        <div>All</div>
                                    </div>


                                </div>
                            </div>
                            <div className='row'>
                                <div className='col'>
                                    <div>WHERE</div>
                                </div>
                                <div className='col'>
                                    <Autocomplete
                                        multiple
                                        id="tags-standard"
                                        options={data_source}
                                        getOptionLabel={(option) => option.title}
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
                                <div className='col'>
                                    <Autocomplete
                                        multiple
                                        id="tags-standard"
                                        options={data_source}
                                        getOptionLabel={(option) => option.title}
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
                                <div className='col'>
                                    <Autocomplete
                                        multiple
                                        id="tags-standard"
                                        options={data_source}
                                        getOptionLabel={(option) => option.title}
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
                            <div className='row'>
                                <div className='col'>
                                    <div>HAVING BY</div>
                                </div>
                                <div className='col'>
                                    <Autocomplete
                                        multiple
                                        id="tags-standard"
                                        options={data_source}
                                        getOptionLabel={(option) => option.title}
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
                                <div className='col'>
                                    <Autocomplete
                                        multiple
                                        id="tags-standard"
                                        options={data_source}
                                        getOptionLabel={(option) => option.title}
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
                                <div className='col'>
                                    <Autocomplete
                                        multiple
                                        id="tags-standard"
                                        options={data_source}
                                        getOptionLabel={(option) => option.title}
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
                            <div className='row'>
                                <div className='col'>
                                    <div>GROUP BY</div>
                                </div>
                                <div className='col'>
                                    <Autocomplete
                                        multiple
                                        id="tags-standard"
                                        options={top100Films}
                                        getOptionLabel={(option) => option.title}
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
                            <div className='row'>
                                <div className='col'>
                                    <div>ORDER BY</div>
                                </div>
                                <div className='col'>
                                    <Autocomplete
                                        multiple
                                        id="tags-standard"
                                        options={order_by_list}
                                        getOptionLabel={(option) => option.title}
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
                                <div className='col'>
                                    <Autocomplete
                                        multiple
                                        id="tags-standard"
                                        options={data_source}
                                        getOptionLabel={(option) => option.title}
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



                            {/* <NestedDropDown setSelectComponent={setSelectComponent} fieldAdd={fieldAdd} /> */}



                        </div>
                }
            </Modal.Body>
            <Modal.Footer>
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
