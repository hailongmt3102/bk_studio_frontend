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
}
