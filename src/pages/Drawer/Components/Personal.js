import React from 'react'
import DrawerItem from "./Item"
import { colors } from "components/Colors";

import { ReactComponent as ProfileIcon } from "resources/icons/drawerIcons/profile.svg"
import { ReactComponent as SettingIcon } from "resources/icons/drawerIcons/setting.svg"
import { currentFollowingDrawer } from 'utils/utils';

export default function Personal(props) {
    return (
        <div>
            <ul class="list-group">
                <DrawerItem
                    link="/personal/profile"
                    active={props.selectedIndex === currentFollowingDrawer.profile ? true : false}
                    child={<ProfileIcon fill={props.selectedIndex === currentFollowingDrawer.profile ? colors.drawerActive : colors.drawerToggle} />}
                    title="Profile"
					onClick={props.swapDrawerVisible}
                />
                <DrawerItem
                    link="/personal/setting"
                    active={props.selectedIndex === currentFollowingDrawer.setting ? true : false}
                    child={<SettingIcon fill={props.selectedIndex === currentFollowingDrawer.setting ? colors.drawerActive : colors.drawerToggle} />}
                    title="Setting"
					onClick={props.swapDrawerVisible}
                />
            </ul>
        </div>
    )
}
