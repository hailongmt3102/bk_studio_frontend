import React, { useState } from 'react'
import Modal, {
    ModalBody,
    ModalFooter,
    ModalHeader,
    ModalTitle,
    ModalTransition,
} from '@atlaskit/modal-dialog';
import Button from '@atlaskit/button/standard-button';
import DropdownMenu, { DropdownItem, DropdownItemGroup } from '@atlaskit/dropdown-menu';


export default function CircleModel(props) {
    const [step, setStep] = useState(1)
    const [selectedTable, setSelectedTable] = useState([])

    const [calculateField, setCalculateField] = useState([])

    const onsubmit = () => {
        if (calculateField.length === 0) return alert("You don't have anything to compute")
        let queryFields = `SELECT `
        let tableName = calculateField[0].from.split('.')[0]
        calculateField.map((field, index) => {
            Object.keys(field).map(key => {
                if (field[key] === "") {
                    return alert("some fields must not be null")
                }
            })
            // parse field 
            let condition = field.condition.replaceAll('\'', '')
            condition = condition.replaceAll('\"', '')
            condition = condition.split(' ').map(ele => ele === "" ? "" : ele === " " ? "" : ele === "=" ? '=' : `'${ele}'`).join('')
            let query = `SUM(CASE WHEN ${field.from.split('.')[1]} ${condition} THEN 1 ELSE 0 END) AS ${field.name}`
            if (index != 0) queryFields += ', '
            queryFields += query
        })
        queryFields += ` FROM ${tableName}`
        props.addShape(queryFields)
        props.closeModal()
    }

    const body = () => {
        switch (step) {
            case 1:
                return (
                    <div className='row'>
                        <div className='col-5'>
                            <div className='fw-bold'>Available data</div>
                            <ul class="list-group">
                                {
                                    Object.keys(props.dataSource).map(table => {
                                        return (
                                            <button class="list-group-item btn btn-default border-0" onClick={() => {
                                                if (!selectedTable.includes(table))
                                                    setSelectedTable([...selectedTable, table])
                                            }}>{table}</button>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                        <div className='col-2'>
                            {/* 2 */}
                        </div>
                        <div className='col-5'>
                            <div className='fw-bold'>Selected data</div>
                            <ul class="list-group">
                                {
                                    selectedTable.map(table => {
                                        return (
                                            <button class="list-group-item btn btn-default border-0" onClick={() => {
                                                setSelectedTable(selectedTable.filter(val => val != table))
                                            }}>{table}</button>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                )
            case 2:
                return (
                    <div>
                        <div>
                            {
                                selectedTable.map(table => {
                                    return (
                                        <div className='border'>
                                            <div className='fw-bold'>{table}</div>
                                            <ul class="list-group">
                                                {
                                                    props.dataSource[table].map(field => {
                                                        return (
                                                            <li class="list-group-item border-0 m-0 p-0">{field}</li>
                                                        )
                                                    })
                                                }
                                            </ul>

                                        </div>
                                    )
                                })
                            }
                        </div>
                        <hr></hr>
                        <div>
                            {
                                <table class="table table-striped">
                                    <thead>
                                        <tr>
                                            <th scope='col'>Name</th>
                                            {
                                                calculateField.map(calc => {
                                                    return (
                                                        <th>
                                                            <input type="text" value={calc.name} onChange={(e) => {
                                                                setCalculateField(calculateField.map(field => calc === field ? { ...field, name: e.target.value } : field))
                                                            }} className='border-0 m-0 p-0' />
                                                        </th>
                                                    )
                                                })
                                            }
                                            <th scope='col'>
                                                <button className='btn btn-default border-0' onClick={() => {
                                                    setCalculateField([...calculateField, {
                                                        name: `field_${calculateField.length + 1}`,
                                                        from: `${selectedTable[0]}.${props.dataSource[selectedTable[0]][0]}`,
                                                        condition: "",
                                                        show: true
                                                    }])
                                                }}>+</button>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th scope="row">From</th>
                                            {
                                                calculateField.map((calc) => {
                                                    return (
                                                        <th scope='col'>
                                                            <DropdownMenu
                                                                trigger={calc.from} appearance="tall"
                                                            >
                                                                <DropdownItemGroup>
                                                                    {
                                                                        selectedTable.map((val) => {
                                                                            return (
                                                                                props.dataSource[val].map(field => {
                                                                                    return (
                                                                                        <DropdownItem onClick={() => {
                                                                                            setCalculateField(calculateField.map((value) =>
                                                                                                value === calc ? { ...value, from: `${val}.${field}` } : value
                                                                                            ))
                                                                                        }}>{`${val}.${field}`} </DropdownItem>
                                                                                    )
                                                                                }))
                                                                        })
                                                                    }
                                                                </DropdownItemGroup>
                                                            </DropdownMenu>
                                                        </th>
                                                    )
                                                })
                                            }
                                        </tr>
                                        <tr>
                                            <th scope="row">Count Expr</th>
                                            {
                                                calculateField.map(calc => {
                                                    return (
                                                        <th>
                                                            <input type="text" value={calc.condition} onChange={(e) => {
                                                                setCalculateField(calculateField.map(field => calc === field ? { ...field, condition: e.target.value } : field))
                                                            }} className='border border-info' />
                                                        </th>
                                                    )
                                                })
                                            }
                                        </tr>
                                        <tr>
                                            <th scope="row">Show</th>
                                            {
                                                calculateField.map(calc => {
                                                    return (
                                                        <th scope='col'>
                                                            <input type="checkbox" class="form-check-input" checked={calc.show} onClick={() => {
                                                                setCalculateField(calculateField.map(field => calc === field ? { ...field, show: !field.show } : field))
                                                            }
                                                            }></input>
                                                        </th>
                                                    )
                                                })
                                            }
                                        </tr>
                                    </tbody>
                                </table>
                            }
                        </div>
                    </div>
                )
        }
    }
    return (
        <div>
            <ModalTransition>
                {props.isOpen && (
                    <Modal width="x-large" height="x-large" onClose={props.closeModal}>
                        <ModalHeader>
                            <ModalTitle>
                                Select data source
                            </ModalTitle>
                        </ModalHeader>
                        <ModalBody>
                            {
                                body()
                            }
                        </ModalBody>
                        <ModalFooter>
                            <Button onClick={() => {
                                if (step != 1)
                                    setStep(step - 1)
                            }} autoFocus>
                                Back
                            </Button>
                            <Button onClick={() => {
                                if (step === 2) {
                                    onsubmit()
                                } else {
                                    setStep(step + 1)
                                }
                            }} autoFocus>
                                {step === 2 ? 'Finish' : 'Next'}
                            </Button>
                        </ModalFooter>
                    </Modal>
                )}
            </ModalTransition>
        </div>
    )
}
