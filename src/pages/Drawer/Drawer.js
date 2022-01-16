import React, { useEffect } from "react";
import { useLocation } from 'react-router-dom'

import Project from "./Components/Project";
import Workspace from "./Components/Workspace";


export default function Drawer(props) {

	var location = useLocation()

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
	}

	const projectState = () => {
		props.setDrawerState("project")
	}

	return props.state !== "" ? (
		<div className="col-2">
			<div className="m-2">
				<ul class="list-group">
					<a class="list-group-item border-0 p-0" onClick={workspaceState}>
						<h6>WORKSPACE</h6>
					</a>
					{props.state === "workspace" ? (
						<div className="m-2">
							<Workspace />
						</div>
					) : null}
					<a class="list-group-item border-0 p-0" onClick={projectState}>
						<h6>PROJECT</h6>
					</a>
					{props.state === "project" ? (
						<div className="m-2">
							<Project />
						</div>
					) : null}
					<a class="list-group-item border-0 p-0">
						<h6>PERSONAL</h6>
					</a>
				</ul>
			</div>
		</div>
	) : null;
}
