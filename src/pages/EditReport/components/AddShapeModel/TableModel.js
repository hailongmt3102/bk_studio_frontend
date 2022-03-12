import React, { useCallback, useState } from 'react'
import { Modal, Button } from 'react-bootstrap'
import CustomDropdownButton from '../CustomDropdownButton'
import WhereCondition from './WhereCondition'
import { checkVariable } from 'utils/utils'

export default function TableModel(props) {
    const [step, setStep] = useState(1)
    const [selectedTable, setSelectedTable] = useState([])
    const [calculateField, setCalculateField] = useState([])

    // method change condition of each computed field
    const setWhereCondition = useCallback((index, value) => {
        setCalculateField(calculateField.map((val, i) =>
            i === index ? { ...val, where: value } : val
        ))
    }, [calculateField])

    // when click submit button
    const onsubmit = () => {
        let err = false
        if (calculateField.length === 0) return alert("You don't have anything to compute")
        // compute query field 
        // parse some field input to string
        let listFieldQuery = calculateField.map((field) => {
            if (!field.show) return ""
            let variable = `${field.from.split('.')[1]} as ${field.name}`
            if (field.fx === "none")
                return variable
            else
                return `${field.fx}(${variable})`
        }).join(',\n')

        // check condition
        calculateField[0].where.map(condition => {
            if ((condition.exp === "between" && (condition.val1 === "" || condition.val2 === "")) || (condition.exp !== "between" && condition.val1 === "" && condition.val2 === "")) {
                err = true
                return alert("Please fill all conditions")
            }
        })
        if (err) return
        // parse conditions
        let condition = ""
        if (calculateField[0].where.length > 0) {
            condition = calculateField[0].where
                .map(ele => ele.exp === "between"
                    ?
                    `${ele.field.split('.')[1]} between ${checkVariable(ele.val1)} and ${checkVariable(ele.val2)}`
                    :
                    `${ele.field.split('.')[1]} ${ele.exp} ${checkVariable(ele.val1)}`)
                .reduce((pre, cur) => `${pre} \nand ${cur} `)
        }
        // merge all string above
        let query = `select ${listFieldQuery} \nfrom ${calculateField[0].from.split('.')[0]}`
        if (condition !== "")
            query += `\nwhere ${condition}`
        console.log(query)
        // send it to parent component
        props.addShape("Table", calculateField[0].from.split('.')[0], query)
        props.handleClose("Table")
    }
    const body = () => {
        switch (step) {
            case 1:
                return (
                    <div className='row'>
                        <div className='col-5'>
                            <ul className='list-group-item border-0 m-0 p-0'>
                                <div className='fw-bold'>Available data</div>
                            </ul>
                            <ul className="list-group">
                                {
                                    Object.keys(props.dataSource).map(table => {
                                        return (
                                            <li className='list-group-item border-0 m-0 p-0'>
                                                <button className="list-group-item btn btn-default border-0" onClick={() => {
                                                    if (!selectedTable.includes(table))
                                                        setSelectedTable([...selectedTable, table])
                                                }}>
                                                    {table}
                                                </button>
                                            </li>

                                        )
                                    })
                                }
                            </ul>
                        </div>
                        <div className='col-2'>
                            {/* 2 */}
                        </div>
                        <div className='col-5'>
                            <ul className='list-group-item border-0 m-0 p-0'>
                                <div className='fw-bold'>Selected data</div>
                            </ul>
                            <ul className="list-group">
                                {
                                    selectedTable.map(table => {
                                        return (
                                            <li className='list-group-item border-0 m-0 p-0'>

                                                <button className="list-group-item btn btn-default border-0" onClick={() => {
                                                    setSelectedTable(selectedTable.filter(val => val !== table))
                                                }}>
                                                    {table}
                                                </button>
                                            </li>
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
                                            <ul className="list-group">
                                                {
                                                    props.dataSource[table].map(field => {
                                                        return (
                                                            <li className="list-group-item border-0 m-0 p-0">{field}</li>
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
                                <div class="overflow-scroll">
                                    <table className="table table-striped">
                                        <thead>
                                            <tr>
                                                <th scope='col'>Display field</th>
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
                                                    <button className='btn btn-default border-0 fw-bold' onClick={() => {
                                                        setCalculateField([...calculateField, {
                                                            name: `field_${calculateField.length + 1}`,
                                                            from: `${selectedTable[0]}.${props.dataSource[selectedTable[0]][0]}`,
                                                            fx: "none",
                                                            where: [],
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
                                                                <CustomDropdownButton
                                                                    title={calc.from}
                                                                    items={[selectedTable.map(table => props.dataSource[table].map(val => table + "." + val))].reduce((pre, cur) => [...pre, ...cur])[0]}
                                                                    onClick={(item) => {
                                                                        setCalculateField(calculateField.map((value) =>
                                                                            value === calc ? { ...value, from: item } : value
                                                                        ))
                                                                    }}
                                                                />
                                                            </th>
                                                        )
                                                    })
                                                }
                                            </tr>
                                            <tr>
                                                <th scope="row">Fx</th>
                                                {
                                                    calculateField.map(calc => {
                                                        return (
                                                            <th>
                                                                <CustomDropdownButton
                                                                    title={calc.fx}
                                                                    items={["none", "sum", "count", "avg", "min", "max"]}
                                                                    onClick={(value) => {
                                                                        setCalculateField(calculateField.map((val) =>
                                                                            val === calc ? { ...val, fx: value } : val
                                                                        ))
                                                                    }}
                                                                />
                                                            </th>
                                                        )
                                                    })
                                                }
                                            </tr>

                                            <tr>
                                                <th scope='row'>Conditions</th>
                                                {
                                                    calculateField.map((calc, i) => {
                                                        if (i > 0) return null
                                                        return (
                                                            <th colspan={calculateField.length}>
                                                                <WhereCondition
                                                                    conditions={calc.where}
                                                                    setWhereCondition={setWhereCondition}
                                                                    index={i}
                                                                    items={[selectedTable.map(table => props.dataSource[table].map(val => table + "." + val))].reduce((pre, cur) => [...pre, ...cur])[0]}
                                                                />
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
                                                                <input type="checkbox" className="form-check-input" checked={calc.show} onClick={() => {
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
                                </div>
                            }
                        </div>
                    </div>
                )
        }
    }
    return (
        <Modal
            show={props.show}
            onHide={props.handleClose}
            // fullscreen={true}
            size="lg"
        >
            <Modal.Header closeButton>
                <Modal.Title>Data processing</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {
                    body()
                }
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => {
                    if (step !== 1)
                        setStep(step - 1)
                }}>
                    Back
                </Button>
                <Button onClick={() => {
                    if (step === 2) {
                        onsubmit()
                    } else {
                        setStep(step + 1)
                    }
                }}>
                    {step === 2 ? 'Finish' : 'Next'}
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
