import React from 'react'
import { Dropdown } from 'react-bootstrap'

export default function AdjustedDropdown(props) {
    // The forwardRef is important!!
    // Dropdown needs access to the DOM node in order to position the Menu
    const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
        <button
            className='btn'
            ref={ref}
            onClick={(e) => {
                e.preventDefault();
                onClick(e);
            }}
        >
            {children}
        </button>
    ));

    return (
        <Dropdown>
            <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                <div>
                    {
                        props.icon != null ? <img src={props.icon}></img> : null
                    }
                    <p className="p-0 m-auto">{props.title}</p>

                </div>
            </Dropdown.Toggle>
            <Dropdown.Menu>
                {
                    props.items.map((item, index) => {
                        return (
                            <div>
                                <Dropdown.Item eventKey={index} onClick={() => { props.onClick(item, index) }}>{
                                    <div className='row'>
                                        <div className='col-2 text-center me-1'>
                                            <img src={props.icons_list[index]} width="20px" height="20px" />
                                        </div>
                                        <div className='col-9' style={{fontSize: "20px"}}>
                                            {item}
                                        </div>
                                    </div>
                                }</Dropdown.Item>
                            </div>

                        )
                    })
                }
            </Dropdown.Menu>
        </Dropdown>
    )
}
