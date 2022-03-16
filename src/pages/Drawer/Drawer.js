import React, { useCallback, useEffect, useState, } from "react";
import { useLocation, useNavigate } from 'react-router-dom'
import Project from "./Components/Project";
import Workspace from "./Components/Workspace";
import { getListProject } from 'api/Project'
import Personal from "./Components/Personal";
import MenuIcon from 'resources/icons/menu.svg'
import './Drawer.css'

export default function Drawer(props) {

	var location = useLocation()
	var navigate = useNavigate()

	const [projectList, setProjectList] = useState([])
	const [selectedIndex, setSelectedIndex] = useState(0)

	const [selectedProject, setSelectedProject] = useState("")

	const [toggle, setToggle] = useState(false)

	useEffect(() => {
		// get all project
		getListProject()
			.then(res => {
				setProjectList(res.data)
			})
			.catch(err => {
				try {
					if (err.response.status === 403 || err.response.status === 401) navigate("/account/login")
				} catch {
					navigate("/account/login")
				}
			})
	}, [])

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

	return props.state !== "" ? (
		<div className="">
			<div className="m-2 drawer-button" onClick={() => {
				setToggle(!toggle)
			}}>
				<img src={MenuIcon} width="40px" height="40px" />
			</div>
			<div className={`drawer ${toggle ? "enter" : "exit"}`}>
				<ul class="list-group">
					<a class="list-group-item border-0 p-0" onClick={() => {
						navigate("/")
						// setSelectedIndex(0)
					}}>
						<h6 className="p-3 m-0">WORKSPACE</h6>
					</a>
					{props.state === "workspace" ? (
						<Workspace projectList={projectList} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} selectedProject={selectedProject} setSelectedProject={setSelectedProject} />
					) : null}
					<a class="list-group-item border-0 p-0" onClick={() => {
						navigate("project/create")
						// setSelectedIndex(4)
					}}>
						<h6 className="p-3 m-0">PROJECT
						</h6>
					</a>
					{props.state === "project" ? (
						<Project selectedIndex={selectedIndex} />
					) : null}
					<a class="list-group-item border-0 p-0" onClick={() => {
						navigate("personal/profile")
						// setSelectedIndex(8)
					}}>
						<h6 className="p-3 m-0">PERSONAL</h6>
					</a>
					{
						props.state === "personal" ? (
							<Personal selectedIndex={selectedIndex} />
						)
							: null
					}
				</ul>
			</div>
		</div>
	) : null;
}
