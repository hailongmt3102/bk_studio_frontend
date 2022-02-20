import React from 'react'
import { Link } from "react-router-dom";

export default function Personal() {
    return (
        <div>
            <ul class="list-group">
                <Link to="/personal/profile" class="list-group-item border-0">
                    Profile
                </Link>
                <Link to="/person/setting" class="list-group-item border-0">
                    Setting
                </Link>
            </ul>
        </div>
    )
}
