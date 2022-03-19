import React from 'react';
import { colors } from 'components/Colors'
import { Link } from "react-router-dom";


function DrawerItem(props) {
    return (
        <Link to={props.link} class="border-0 text-decoration-none" onClick={props.onClick}>
            <div className="d-flex justify-content-start p-2 ps-4" style={{ textDecoration: "none", backgroundColor: props.customBackgroundColor ? props.customBackgroundColor :  (props.active ? colors.drawerBackgroundActive : colors.drawerBackgroundToggle) }}>
                {props.child}
                <p className="ms-2 mb-0" style={{ color: props.active ? colors.drawerActive : colors.drawerToggle }}>
                    {props.title}
                </p>
            </div>
        </Link>
    )
}

export default DrawerItem;