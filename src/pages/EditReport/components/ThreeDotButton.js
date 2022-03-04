import React from 'react'
import { Dropdown } from 'react-bootstrap'
import three_dot from "resources/icons/three-dot.svg"
export default function ThreeDotButton(props) {
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
            <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components-Secondary">
                <div>
                    {
                        props.icon != null ? <img src={props.icon}></img> : null
                    }
                    <p className="p-0 m-auto"></p>
                </div>
            </Dropdown.Toggle>
            <Dropdown.Menu>
                {
                    props.items.map((item, index) => {
                        return (
                            <Dropdown.Item eventKey={index}  onClick={() => { props.onClick(item, index) }}>{item}</Dropdown.Item>
                        )
                    })
                }
            </Dropdown.Menu>
        </Dropdown>
    )
}