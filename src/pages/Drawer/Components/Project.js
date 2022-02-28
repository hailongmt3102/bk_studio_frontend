import React from "react";
import DrawerItem from "./Item"
import { colors } from "components/Colors";


import { ReactComponent as ReportIcon } from "resources/icons/drawerIcons/report.svg"
import { ReactComponent as GalleryIcon } from "resources/icons/drawerIcons/gallery.svg"
import { ReactComponent as ImportDataIcon } from "resources/icons/drawerIcons/importdata.svg"
import { ReactComponent as TemplateIcon } from "resources/icons/drawerIcons/template.svg"

export default function Project(props) {
	return (
		<div>
			<ul class="list-group">
				<DrawerItem
					link="/project/create"
					active={props.selectedIndex == 4 ? true : false}
					child={<ReportIcon fill={props.selectedIndex == 4 ? colors.drawerActive : colors.drawerToggle} />}
					title="Create report"
				/>
				<DrawerItem
					link="/project/gallery"
					active={props.selectedIndex == 5 ? true : false}
					child={<GalleryIcon fill={props.selectedIndex == 5 ? colors.drawerActive : colors.drawerToggle} />}
					title="Gallery"
				/>
				<DrawerItem
					link="/project/import"
					active={props.selectedIndex == 6 ? true : false}
					child={<ImportDataIcon fill={props.selectedIndex == 6 ? colors.drawerActive : colors.drawerToggle} />}
					title="Import data"
				/>
				<DrawerItem
					link="/project/templates"
					active={props.selectedIndex == 7 ? true : false}
					child={<TemplateIcon fill={props.selectedIndex == 7 ? colors.drawerActive : colors.drawerToggle} />}
					title="Templates"
				/>
			</ul>
		</div>
	);
}
