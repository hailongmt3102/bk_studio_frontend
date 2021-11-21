import React from "react";
import Project from "./Components/Project";
import Workspace from "./Components/Workspace";

export default function Drawer(props) {

	const workspaceState = () => {
		props.setState("workspace")
	}

	const projectState = () => {
		props.setState("project")
	}

<<<<<<< HEAD
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
=======
  return props.state !== "" ? (
    <div className="col-2">
      <div className="m-2">
        <ul class="list-group">
          <a class="list-group-item border-0 p-0" onClick={workspaceState} href="">
            WORKSPACE
          </a>
          {props.state === "workspace" ? (
            <div className="m-2">
              <Workspace />
            </div>
          ) : null}
          <a class="list-group-item border-0 p-0" onClick={projectState} href="">
            PROJECT
          </a>
					{props.state === "project" ? (
            <div className="m-2">
              <Project />
            </div>
          ) : null}
					<a class="list-group-item border-0 p-0" href="">
            PERSONAL
          </a>
        </ul>
      </div>
    </div>
  ) : null;
>>>>>>> 9c9998fdc8f8da194d18947ece8e2fe3ddb4af0c
}
