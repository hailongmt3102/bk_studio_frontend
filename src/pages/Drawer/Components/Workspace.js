import React, { useState } from "react";
import { Link } from "react-router-dom";
import { colors } from "components/Colors";
import DrawerItem from "./Item"

import { ReactComponent as DashboardIcon } from "resources/icons/drawerIcons/dashboard.svg"
import { ReactComponent as DataSourceIcon } from "resources/icons/drawerIcons/dataSource.svg"
import { ReactComponent as PeopleIcon } from "resources/icons/drawerIcons/people.svg"
import { ReactComponent as YourProjectIcon } from 'resources/icons/drawerIcons/cart.svg'

import SwitchSvg from 'resources/icons/drawerIcons/switch.svg'
import CheckedSvg from 'resources/icons/drawerIcons/checked.svg'


export default function Workspace(props) {
	const [showProject, setShowProject] = useState(false)
	return (
		<div>
			<ul class="list-group">
				<DrawerItem
					link="/"
					active={props.selectedIndex === 0 ? true : false}
					child={<DashboardIcon fill={props.selectedIndex === 0 ? colors.drawerActive : colors.drawerToggle} />}
					title="Dashboard"
					onClick={props.swapDrawerVisible}
				/>
				<DrawerItem
					link="/datasources"
					active={props.selectedIndex === 1 ? true : false}
					child={<DataSourceIcon fill={props.selectedIndex === 1 ? colors.drawerActive : colors.drawerToggle} />}
					title="DataSource"
					onClick={props.swapDrawerVisible}
				/>
				<DrawerItem
					link="/people"
					active={props.selectedIndex === 2 ? true : false}
					child={<PeopleIcon fill={props.selectedIndex === 2 ? colors.drawerActive : colors.drawerToggle} />}
					title="People"
					onClick={props.swapDrawerVisible}
				/>

				<div className="d-flex justify-content-start p-2 ps-4" style={{ textDecoration: "none", backgroundColor: props.selectedIndex === 3 ? colors.drawerBackgroundActive : colors.drawerBackgroundToggle }}
					onClick={() => {
						setShowProject(!showProject)
						props.setSelectedIndex(3)
					}}
				>
					<YourProjectIcon fill={props.selectedIndex == 3 ? colors.drawerActive : colors.drawerToggle} />
					<p className="ms-2 mb-0" style={{ color: props.selectedIndex === 3 ? colors.drawerActive : colors.drawerToggle }}>
						Your projects
					</p>
				</div>
				{
					showProject ?
						<div >
							{
								props.projectList.reverse().map((ele, index) => {
									if (index > 2) return
									return (
										<div className="row" key={index} onClick={() => {
											props.setSelectedProject(ele.Id)
										}}>
											<div className="col-10">
											<DrawerItem
												link={"/pDetail/" + ele.Id}
												active={false}
												title={ele.Name}
												customBackgroundColor={props.selectedProject === ele.Id ? "#e5e5e5" : false}
												onClick={props.swapDrawerVisible}
											/>
											</div>
											<div className="col-2 m-auto" onClick={() => {
												if (props.currentProject != ele.Id) props.setCurrentProject(ele.Id)
											}}>
												<img width="20px" height="20px" src={props.currentProject == ele.Id ? CheckedSvg : SwitchSvg}/>	
											</div>
										</div>
									)
								}
								)
							}
							<Link to="/pList" class="list-group-item border-0 text-primary ms-3" onClick={props.swapDrawerVisible}>
								See all
							</Link>
						</div>
						: null
				}
			</ul>
		</div>
	);
}
