import React, { useEffect, useState, } from "react";
import { useLocation, useNavigate } from 'react-router-dom'
import Project from "./Components/Project";
import Workspace from "./Components/Workspace";
import { getListProject } from 'api/Project'
import Personal from "./Components/Personal";


export default function Drawer(props) {

	var location = useLocation()
	var navigate = useNavigate()

	const [projectList, setProjectList] = useState([])
	const [selectedIndex, setSelectedIndex] = useState(0)

	useEffect(() => {
		// get all project
		getListProject()
			.then(res => {
				setProjectList(res.data)
			})
			.catch(err => {
				try {
					if (err.response.status == 403 || err.response.status == 401) navigate("/account/login")
				} catch {
					// navigate("/account/login")
				}
			})
	}, [location])

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
			}
		} else if (personalExp.test(url)) {
			// launch personal state
			props.setDrawerState("personal")
		} else if (accountExp.test(url)) {
			// launch login, signup, forgot password
			props.setDrawerState("")
		} else {
			// launch workspace state
			props.setDrawerState("workspace")
		}
	}, [location])

	const workspaceState = () => {
		props.setDrawerState("workspace")
		navigate("/")
	}

	const projectState = () => {
		props.setDrawerState("project")
		navigate("project/create")
	}

	const personalState = () => {
		props.setDrawerState("personal")
		navigate("personal/profile")
	}

	return props.state !== "" ? (
		<div className="col-2 ps-3">
			<ul class="list-group">
				<a class="list-group-item border-0 p-0" onClick={workspaceState}>
					<h6 className="p-3 m-0">WORKSPACE</h6>
				</a>
				{props.state === "workspace" ? (
					<Workspace projectList={projectList} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} />
				) : null}
				<a class="list-group-item border-0 p-0" onClick={projectState}>
					<h6 className="p-3 m-0">PROJECT</h6>
				</a>
				{props.state === "project" ? (
					<Project selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} />
				) : null}
				<a class="list-group-item border-0 p-0" onClick={personalState}>
					<h6 className="p-3 m-0">PERSONAL</h6>
				</a>
				{
					props.state === "personal" ? (
						<Personal selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} />
					)
						: null
				}
			</ul>
		</div>
	) : null;
}
