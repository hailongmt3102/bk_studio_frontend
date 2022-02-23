import React, { useState } from "react";
import { Link } from "react-router-dom";
import { colors } from "components/Colors";
import DrawerItem from "./Item"

import { ReactComponent as DashboardIcon } from "resources/icons/drawerIcons/dashboard.svg"
import { ReactComponent as DataSourceIcon } from "resources/icons/drawerIcons/dataSource.svg"
import { ReactComponent as PeopleIcon } from "resources/icons/drawerIcons/people.svg"


export default function Workspace(props) {
	const [showProject, setShowProject] = useState(false)
	return (
		<div>
			<ul class="list-group">
				<DrawerItem
					link="/"
					active={props.selectedIndex == 0 ? true : false}
					child={<DashboardIcon fill={props.selectedIndex == 0 ? colors.drawerActive : colors.drawerToggle} />}
					title="Dashboard"
				/>
				<DrawerItem	
					link="/datasources"
					active={props.selectedIndex == 1 ? true : false}
					child={<DataSourceIcon fill={props.selectedIndex == 1 ? colors.drawerActive : colors.drawerToggle} />}
					title="DataSource"
				/>
				<DrawerItem
					link="/people"
					active={props.selectedIndex == 2 ? true : false}
					child={<PeopleIcon fill={props.selectedIndex == 2 ? colors.drawerActive : colors.drawerToggle} />}
					title="People"
				/>
				
				<a className="btn d-flex flex-row"
					onClick={() => {
						setShowProject(!showProject)
					}}
				>
					Your projects
				</a>
				{
					showProject ?
						<div>
							{
								props.projectList.slice(0).reverse().map((ele, index) => {
									if (index > 2) return
									return (
										<Link to={"/pDetail/" + ele.Id} class="list-group-item border-0">
											{ele.Name}
										</Link>
									)
								}
								)
							}
							<Link to="/pList" class="list-group-item border-0 text-primary">
								See all
							</Link>
						</div>
						: null
				}
			</ul>
		</div>
	);
}
