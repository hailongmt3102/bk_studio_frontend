import React from 'react'
import DrawerItem from "./Item"
import { colors } from "components/Colors";

import { ReactComponent as ProfileIcon } from "resources/icons/drawerIcons/profile.svg"
import { ReactComponent as SettingIcon } from "resources/icons/drawerIcons/setting.svg"

export default function Personal(props) {
    return (
        <div>
            <ul class="list-group">
                <DrawerItem
                    link="/personal/profile"
                    active={props.selectedIndex === 8 ? true : false}
                    child={<ProfileIcon fill={props.selectedIndex === 8 ? colors.drawerActive : colors.drawerToggle} />}
                    title="Profile"
					onClick={props.swapDrawerVisible}
                />
                <DrawerItem
                    link="/personal/setting"
                    active={props.selectedIndex === 9 ? true : false}
                    child={<SettingIcon fill={props.selectedIndex === 9 ? colors.drawerActive : colors.drawerToggle} />}
                    title="Setting"
					onClick={props.swapDrawerVisible}
                />
            </ul>
        </div>
    )
}
