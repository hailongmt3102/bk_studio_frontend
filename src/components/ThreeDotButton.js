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
                        //chon giua title va icon
                        props.icon !== undefined ? <img src={props.icon} height="20px" width="20px" />  : <p className="p-0 m-auto">{props.title}</p> 
                    }
                </div>
            </Dropdown.Toggle>
            <Dropdown.Menu>
                {
                    props.items.map((item, index) => {
                        return (
                            <Dropdown.Item style={{ "width": "200" }} key={index} eventKey={index} onClick={() => { props.onClick(item, index) }}>
                                <div>
                                    {
                                        props.icons_list !== undefined ?
                                            <div className='row text-center p-1'>
                                                <div className='col-2 text-center  me-1'>
                                                    <img src={props.icons_list[index]} width="20px" height="20px" />
                                                </div>
                                                <div className='col-9 text-center '>
                                                    {item}
                                                </div>
                                            </div>
                                            : <div className='col-9'>
                                                {item}
                                            </div>
                                    }
                                    <p className="p-0 m-auto"></p>
                                </div>
                            </Dropdown.Item>
                        )
                    })
                }
            </Dropdown.Menu>
        </Dropdown>
    )
}
