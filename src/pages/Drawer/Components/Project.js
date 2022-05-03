import React from "react";
import DrawerItem from "./Item"
import { colors } from "components/Colors";


import { ReactComponent as ReportIcon } from "resources/icons/drawerIcons/report.svg"
import { ReactComponent as GalleryIcon } from "resources/icons/drawerIcons/gallery.svg"
import { ReactComponent as ImportDataIcon } from "resources/icons/drawerIcons/importdata.svg"
import { currentFollowingDrawer } from "utils/utils";

export default function Project(props) {
	return (
		<div>
			<ul class="list-group">
				<DrawerItem
					link="/project/create"
					active={props.selectedIndex === currentFollowingDrawer.createReport ? true : false}
					child={<ReportIcon fill={props.selectedIndex === currentFollowingDrawer.createReport ? colors.drawerActive : colors.drawerToggle} />}
					title="Create report"
					onClick={props.swapDrawerVisible}
				/>
				<DrawerItem
					link="/project/gallery"
					active={props.selectedIndex === currentFollowingDrawer.gallery ? true : false}
					child={<GalleryIcon fill={props.selectedIndex === currentFollowingDrawer.gallery ? colors.drawerActive : colors.drawerToggle} />}
					title="Gallery"
					onClick={props.swapDrawerVisible}
				/>
				<DrawerItem
					link="/project/import"
					active={props.selectedIndex === currentFollowingDrawer.importData ? true : false}
					child={<ImportDataIcon fill={props.selectedIndex === currentFollowingDrawer.importData ? colors.drawerActive : colors.drawerToggle} />}
					title="Import data"
					onClick={props.swapDrawerVisible}
				/>
			</ul>
		</div>
	);
}
