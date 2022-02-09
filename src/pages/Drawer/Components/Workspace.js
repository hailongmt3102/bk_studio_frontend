import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Workspace(props) {
	const [showProject, setShowProject] = useState(false)
	return (
		<div>
			<ul class="list-group">
				<Link to="/" class="list-group-item border-0">
					Dashboard
				</Link>
				<Link to="/datasources" class="list-group-item border-0">
					Data Sources
				</Link>
				<Link to="/people" class="list-group-item border-0">
					People
				</Link>
				<a className="btn d-flex flex-row" onClick={() => {
					setShowProject(!showProject)
				}}>
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
