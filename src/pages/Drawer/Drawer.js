import React, { useEffect, useState, } from "react";
import { useLocation, useNavigate } from 'react-router-dom'
import Project from "./Components/Project";
import Workspace from "./Components/Workspace";
import { getListProject } from 'api/Project'
import Personal from "./Components/Personal";
import MenuIcon from 'resources/icons/menu.svg'
import threeLine from "resources/icons/threeLine.svg"
import './Drawer.css'
import { currentFollowingDrawer } from "utils/utils";
import { checkPermission as checkAdminPermissionAPI } from 'api/Admin'
import SwitchSvg from 'resources/icons/drawerIcons/switch.svg'
import ProjectListPopUp from "./Components/ProjectListPopUp"

export default function Drawer(props) {

	var location = useLocation()
	var navigate = useNavigate()

	const [projectList, setProjectList] = useState([])
	const [selectedIndex, setSelectedIndex] = useState(currentFollowingDrawer.dashboard)

	const [selectedProject, setSelectedProject] = useState("")

	const [toggle, setToggle] = useState(false)

	const [currentProject, setCurrentProject] = useState(null)

	const [isAdmin, setIsAdmin] = useState(false)

	useEffect(() => {
		let cProject = localStorage.getItem("currentProject")
		if (cProject != null) setCurrentProject(cProject)
		if (props.currentUser.Email === "" || props.currentUser.UserName === "") return

		checkAdminPermissionAPI()
			.then(res => {
				setIsAdmin(true)
			})
			.catch(err => {
				setIsAdmin(false)
			})
		// get all project
		getListProject()
			.then(res => {
				setProjectList(res.data)
				if (cProject == null && res.data.length > 0) {
					setProjectToWork(res.data[0].Id)
					localStorage.setItem("currentProjectName", res.data[0].Name)
				} else if (res.data.length == 0) {
					setProjectToWork(-1)
				}
			})
			.catch(err => {
			})
	}, [props.currentUser])

	useEffect(() => {
		// this function call when the url changed
		let url = location.pathname
		// declare some regular expression
		let projectExp = /project/
		let personalExp = /personal/
		let accountExp = /account\/[a-zA-Z]/
		if (projectExp.test(url)) {
			// launch project state
			let reportExp = /project\/gallery\/[0-9a-zA-z]+/
			if (reportExp.test(url)) {
				// launch report , no drawer
				props.setDrawerState("")
			} else {
				props.setDrawerState("project")
				if (/create/.test(url)) {
					setSelectedIndex(currentFollowingDrawer.createReport)
				} else if (/gallery/.test(url)) {
					setSelectedIndex(currentFollowingDrawer.gallery)
				} else if (/import/.test(url)) {
					setSelectedIndex(currentFollowingDrawer.importData)
				}
			}
		} else if (personalExp.test(url)) {
			// launch personal state
			props.setDrawerState("personal")
			if (/profile/.test(url)) {
				setSelectedIndex(currentFollowingDrawer.profile)
			} else {
				setSelectedIndex(currentFollowingDrawer.setting)
			}

		} else if (accountExp.test(url)) {
			// launch login, signup, forgot password
			props.setDrawerState("")
		} else {
			// launch workspace state
			props.setDrawerState("workspace")
			if (/datasources/.test(url)) {
				setSelectedIndex(currentFollowingDrawer.dataSource)
				setSelectedProject(-1)
			} else if (/templates/.test(url)) {
				setSelectedIndex(currentFollowingDrawer.template)
			} else if (/people/.test(url)) {
				setSelectedIndex(currentFollowingDrawer.people)
				setSelectedProject(-1)
			} else if (/machinelearning/.test(url)) {
				setSelectedIndex(currentFollowingDrawer.machineLearning)
				setSelectedProject(-1)
			}
			else if (url.length === 1) {
				setSelectedIndex(currentFollowingDrawer.dashboard)
				setSelectedProject(-1)
			} else {
				setSelectedIndex(currentFollowingDrawer.yourProject)
			}
		}
	}, [location])

	const swapDrawerVisible = () => {
		setToggle(!toggle)
	}

	const setProjectToWork = (Id) => {
		setCurrentProject(Id)
		localStorage.setItem("currentProject", Id)
	}
	const [showPopUp, setShowPopUp] = useState(false)

	const handleCloseNo = () => {
		setShowPopUp(false)
	}
	return props.state !== "" ? (
		<div>
			<ProjectListPopUp
				title="Switch Project"
				showPopUp={showPopUp}
				handleCloseNo={handleCloseNo}
				projectList={projectList}
				curProject={localStorage.getItem("currentProject")}
				setCurrentProject={setCurrentProject}
			// haveOK={true}
			// haveContent={true}
			// content={"To complete the signup proccess, please check your mail " + `(${information.Email})` + " and click on the provided activation link"}
			// confirmDialog={confirmDialog}
			// title="Account successfully created ?"
			// // handleCloseYes={() => handleCloseYes()}
			// handleCloseNo={() => handleCloseNo()}
			/>
			<button className="m-2  text-center drawer-button shine" style={{ width: "40px", height: "40px" }}
				onClick={() => {
					setToggle(!toggle)
				}}>
				<div className="mt-1 m-auto"><img src={threeLine} width="28px" height="28px" /></div>
			</button>
			<div className={`drawer ${toggle ? "enter" : "exit"}`}>
				<ul className="list-group">
					{isAdmin ? <a className="list-group-item border-0 p-0" onClick={() => {
						navigate("/admin")
						// setSelectedIndex(0)
					}}>
						<h6 className="p-3 m-0">GO TO ADMIN PAGE</h6>
					</a>
						: null
					}
					<a className="list-group-item border-0 p-0" onClick={() => {
						navigate("/")
						// setSelectedIndex(0)
					}}>
						<h6 className="p-3 m-0">WORKSPACE</h6>
					</a>
					{props.state === "workspace" ? (
						<Workspace
							projectList={projectList}
							selectedIndex={selectedIndex}
							setSelectedIndex={setSelectedIndex}
							selectedProject={selectedProject}
							setSelectedProject={setSelectedProject}
							swapDrawerVisible={swapDrawerVisible}
							currentProject={currentProject}
							setCurrentProject={setProjectToWork}
						/>
					) : null}
					<a className="list-group-item border-0 p-0" >
						<div className="row">
							<div className="col">
								<h6 className="p-3 m-0"
									onClick={() => {
										navigate("project/create")
										// setSelectedIndex(4)
									}}>
									PROJECT :
									{
										projectList.filter(ele => ele.Id == currentProject ? true : false).length > 0 ? projectList.filter(ele => ele.Id == currentProject ? true : false)[0].Name : ""
									}
								</h6>
							</div>
							<div className="col-3 "
								onClick={() => {
									setShowPopUp(true)
								}}>
								<h6 className="p-3 m-auto">
									<img width="20px" height="20px" src={SwitchSvg} />
								</h6>

							</div >
						</div>

					</a>
					{props.state === "project" ? (
						<Project selectedIndex={selectedIndex} swapDrawerVisible={swapDrawerVisible} />
					) : null}
					<a className="list-group-item border-0 p-0" onClick={() => {
						navigate("personal/profile")
						// setSelectedIndex(8)
					}}>
						<h6 className="p-3 m-0">PERSONAL</h6>
					</a>
					{
						props.state === "personal" ? (
							<Personal selectedIndex={selectedIndex} swapDrawerVisible={swapDrawerVisible} />
						)
							: null
					}
				</ul>
			</div>
		</div>
	) : null;
}
