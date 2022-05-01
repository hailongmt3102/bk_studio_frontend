import React, { useEffect, useState, } from "react";
import { useLocation, useNavigate } from 'react-router-dom'
import Project from "./Components/Project";
import Workspace from "./Components/Workspace";
import { getListProject } from 'api/Project'
import Personal from "./Components/Personal";
import MenuIcon from 'resources/icons/menu.svg'
import threeLine from "resources/icons/threeLine.svg"
import './Drawer.css'

export default function Drawer(props) {

	var location = useLocation()
	var navigate = useNavigate()

	const [projectList, setProjectList] = useState([])
	const [selectedIndex, setSelectedIndex] = useState(0)

	const [selectedProject, setSelectedProject] = useState("")

	const [toggle, setToggle] = useState(false)

	const [currentProject, setCurrentProject] = useState(null)

	useEffect(() => {
		let cProject = localStorage.getItem("currentProject")
		if (cProject != null) setCurrentProject(cProject)
		// get all project
		getListProject()
			.then(res => {
				setProjectList(res.data)
				if (cProject == null && res.data.length > 0) {
					setProjectToWork(res.data[0].Id)
				} else if (res.data.length == 0) {
					setProjectToWork(-1)
				}
			})
			.catch(err => {
			})
	}, [localStorage.getItem("username")])

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
					setSelectedIndex(4)
				} else if (/gallery/.test(url)) {
					setSelectedIndex(5)
				} else if (/import/.test(url)) {
					setSelectedIndex(6)
				} else if (/templates/.test(url)) {
					setSelectedIndex(7)
				}
			}
		} else if (personalExp.test(url)) {
			// launch personal state
			props.setDrawerState("personal")
			if (/profile/.test(url)) {
				setSelectedIndex(8)
			} else {
				setSelectedIndex(9)
			}

		} else if (accountExp.test(url)) {
			// launch login, signup, forgot password
			props.setDrawerState("")
		} else {
			// launch workspace state
			props.setDrawerState("workspace")
			if (/datasources/.test(url)) {
				setSelectedIndex(1)
				setSelectedProject(-1)
			} else if (/people/.test(url)) {
				setSelectedIndex(2)
				setSelectedProject(-1)
			} else if (url.length === 1) {
				setSelectedIndex(0)
				setSelectedProject(-1)
			} else {
				setSelectedIndex(3)
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

	return props.state !== "" ? (
		<div>
			<div className="m-2  text-center drawer-button" style={{ width: "40px", height: "40px" }} onClick={() => {
				setToggle(!toggle)
			}}>
				<div className="mt-1 m-auto"><img src={threeLine} width="28px" height="28px" /></div>
			</div>
			<div className={`drawer ${toggle ? "enter" : "exit"}`}>
				<ul className="list-group">
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
					<a className="list-group-item border-0 p-0" onClick={() => {
						navigate("project/create")
						// setSelectedIndex(4)
					}}>
						<h6 className="p-3 m-0">PROJECT : {
							projectList.filter(ele => ele.Id == currentProject ? true : false).length > 0 ? projectList.filter(ele => ele.Id == currentProject ? true : false)[0].Name : ""
						}
						</h6>
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
