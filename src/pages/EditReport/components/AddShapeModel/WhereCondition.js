import React, { useState , useEffect} from 'react'
import CustomDropdownButton from '../CustomDropdownButton'
import { InputGroup } from 'react-bootstrap'

export default function WhereCondition(props) {
    const [criteria, setCriteria] = useState([])
    const addCriteria = () => {
        setCriteria([...criteria,
        {
            field: props.items[0],
            exp: "=",
            val1: "",
            val2: "",
        }
        ])
    }
    const subCriteria = (value) => {
        setCriteria(criteria.filter(val => val != value))
    }
    // trigger when criteria changed
    useEffect(() => {
        props.setWhereCondition(props.index, criteria)
    }, [criteria])
    return (
        <div>
            <ul class="list-group p-0 m-0">
                {
                    criteria.map((c, i) => {
                        return (
                            <li key={i} class="list-group-item p-0 m-0">
                                <InputGroup>
                                    <div className='col'>
                                        <CustomDropdownButton
                                            title={c.field}
                                            items={props.items}
                                            onClick={(val) => {
                                                setCriteria(criteria.map(value =>
                                                    value === c ? { ...value, field: val } : value)
                                                )
                                            }}
                                        />
                                    </div>
                                    <button className='btn btn-default border-0 fw-bold' onClick={() => { subCriteria(c) }}>
                                        -
                                    </button>
                                </InputGroup>

                                {
                                    c.exp === "between" ?
                                        <InputGroup>
                                            <input className='p-1 m-1 border border-info' type="text" value={c.val1}
                                                onChange={(e) => {
                                                    setCriteria(criteria.map(val => val === c ? { ...val, val1: e.target.value } : val))
                                                }} />
                                            <CustomDropdownButton
                                                title={c.exp}
                                                items={["=", "<", ">", "between"]}
                                                onClick={(value) => {
                                                    setCriteria(criteria.map(val => val === c ? { ...val, exp: value } : val))
                                                }}
                                            />
                                            <input className='p-1 m-1 border border-info' type="text" value={c.val2}
                                                onChange={(e) => {
                                                    setCriteria(criteria.map(val => val === c ? { ...val, val2: e.target.value } : val))
                                                }} />
                                        </InputGroup>
                                        :
                                        <InputGroup>
                                            <CustomDropdownButton
                                                title={c.exp}
                                                items={["=", "<", ">", "between"]}
                                                onClick={(value) => {
                                                    setCriteria(criteria.map(val => val === c ? { ...val, exp: value } : val))

                                                }}
                                            />
                                            <input className='m-1 p-1 border border-info' type="text" value={c.val1}
                                                onChange={(e) => {
                                                    setCriteria(criteria.map(val => val === c ? { ...val, val1: e.target.value } : val))
                                                }}
                                            />
                                        </InputGroup>
                                }
                            </li>
                        )
                    })
                }
            </ul>
            <button className='btn btn-default p-0 m-0 border-0 fw-bold' onClick={addCriteria}>+</button>
        </div>
    )
}
