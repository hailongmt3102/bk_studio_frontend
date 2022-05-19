import Autocomplete from '@mui/material/Autocomplete';
import { useState, useEffect, useCallback } from "react";
import { Form } from 'react-bootstrap';
import { Tab, Tabs } from 'react-bootstrap-tabs';
import align_center from "resources/icons/align_center.svg";
import align_justify from "resources/icons/align_justify.svg";
import align_left from "resources/icons/align_left.svg";
import align_right from "resources/icons/align_right.svg";
import bold from "resources/icons/bold.svg";
import italic from "resources/icons/italic.svg";
import underline from "resources/icons/underline.svg";
import MappingPopUp from "../../components/PopUp/MappingPopUp";

const selectReg = /select.*(?= from)/
const fromReg = /from.*(?= where|$)/
const whereReg = /where.*(?= group by|$)/
const groupbyReg = /group by.*(?= having|$)/
const havingReg = /having.*(?= order by|$)/
const orderbyReg = /order by.*/


export default function TabComponent(props) {
	const [key, setKey] = useState('Data');
	const fonts = ['Roboto', 'Poppins'];
	const size = ['14', '16', "32", '45'];
	const [commandData, setCommandData] = useState({
		command: "",
		data: {
			select: [],
			from: "",
			where: [],
			groupby: [],
			having: [],
			orderby: []
		}
	})


	const parseSqlCommand = useCallback(
		(command) => {
			if (command != commandData.command) {
				// parse this command
				// get select data 
				command += "\n"
				let selectArray = (selectReg.exec(command) || [""])[0].replace("select ", "").split(",").map(ele => ele.trim())
				let from = (fromReg.exec(command) || [""])[0].replace("from ", "")
				let where = (whereReg.exec(command) || [""])[0].replace("where ", "").split("and").map(ele => ele.trim())
				let groupby = (groupbyReg.exec(command) || [""])[0].replace("group by ", "").split(",").map(ele => ele.trim())
				let having = (havingReg.exec(command) || [""])[0].replace("having ", "").split("and").map(ele => ele.trim())
				let orderby = (orderbyReg.exec(command) || [""])[0].replace("order by ", "").split(",").map(ele => ele.trim())

				setCommandData({
					command: command,
					data: {
						select: selectArray,
						from: from,
						where: where[0] == "" ? [] : where,
						groupby: groupby[0] == "" ? [] : groupby, // array
						having: having[0] == "" ? [] : having, // array
						orderby: orderby[0] == "" ? [] : orderby
					}
				})
			}
		},
		[props.dataSource],
	)



	useEffect(() => {
		parseSqlCommand(props.data.data.script)
	}, [props.data])

	const [showMappingPopUp, setShowMappingPopUp] = useState(false)

	const buildQueryComplete = (query, name) => {
		// update this query to adjusting report
		props.updateQueryOfAComponent(query, name)
	}


	return <div className="col-2 ">
		<MappingPopUp
			ComponentName={props.data.data.title}
			componentType={props.data.data.type}
			show={showMappingPopUp}
			handleClose={() => {
				setShowMappingPopUp(false)
			}}
			onComplete={buildQueryComplete}
			commandData={commandData}
			dataSource={props.dataSource}


		/>

		<Tabs className="p-2" activeKey={key} onSelect={(k) => setKey(k)}>
			<Tab className="p-4" eventKey="Data" label="Data">
				<div className="mt-4"><span className=' PrimaryFontColor customFontBold size16'>Name:</span> <span className='size16'>{props.data.data.title}</span> </div>
				<div className="mt-4"><span className='  PrimaryFontColor customFontBold size16'>Type:</span> <span className='size16'>{props.data.data.type}</span></div>
				<div className="mt-4"> <span className=' PrimaryFontColor customFontBold size16'>Script </span></div>
				<div className="">{props.data.data.script}</div>
				<div className="mt-4">
					<div> <span className='PrimaryFontColor customFontBold size16'>Data sources: </span><span className='size16'>{commandData.data.from}</span></div>
				</div>
				<div className="row mt-4">
					<div className='PrimaryFontColor customFontBold size16'>Field:</div>
					{/* <div>{commandData.data.select.join('\n ')}</div> */}
					{
						commandData.data.select.map((e, index) => <div key={index}>{e}</div>)
					}
				</div>
				<div> <button className='btn-lg btn-success text-center border-0 mt-4'
					onClick={() => { if (props.data.active) setShowMappingPopUp(true) }}>
					<div>Edit data</div>
				</button></div>
			</Tab>
			<Tab className="p-4" eventKey="Format" label="Style">
				<div className="mt-2">Font</div>
				<div className="row mt-2">
					<div className="col">
						<Autocomplete
							onChange={(e, value) => {
								props.EditStyle({ ...props.data.style, font: value })
								// console.log(value)
							}}
							id="custom-input-demo"
							options={fonts}
							renderInput={(params) => (
								<div ref={params.InputProps.ref}>
									<input type="text" {...params.inputProps}
									/>
								</div>
							)}
						/>
					</div>
				</div>
				<div className="mt-2">Size</div>
				<div className="row mt-2">
					<div className="col">
						<Autocomplete
							onChange={(e, value) => {
								props.EditStyle({ ...props.data.style, size: value })
							}}
							id="custom-input-demo"
							options={size}
							renderInput={(params) => (
								<div ref={params.InputProps.ref}>
									<input type="text" {...params.inputProps} />
								</div>
							)}
						/>
					</div>
				</div>
				<div className="row m-2 m-0 p-0 mt-2  h-100  align-items-center">
					<div className="col-1 m-0 p-0 text-center" >
						<div
							className={props.data.style.decoration["font-weight"] == "bold" ? "btn btn-sm ms-2 p-2 customshine" : "btn btn-sm ms-2 p-2"}
							onClick={() => {
								if (props.data.style.decoration["font-weight"] != "bold")
									props.EditStyle({
										...props.data.style, decoration: {
											...props.data.style.decoration, "font-weight": "bold"
										}
									})
								else props.EditStyle({
									...props.data.style, decoration: {
										...props.data.style.decoration, "font-weight": "normal"
									}
								})
							}}><img src={bold} height="15px" width="15px" />
						</div>
					</div>
					<div className="col-1 m-0 p-0 ms-5"  >
						<div
							className={props.data.style.decoration["font-style"] == "italic" ? "btn btn-sm ms-2 p-2 customshine" : "btn btn-sm ms-2 p-2"}
							onClick={() => {
								if (props.data.style.decoration["font-style"] != "italic") {
									props.EditStyle({
										...props.data.style, decoration: {
											...props.data.style.decoration, "font-style": "italic"
										}
									})
								}

								else {
									props.EditStyle({
										...props.data.style, decoration: {
											...props.data.style.decoration, "font-style": "normal"
										}
									})
								}
							}}> <img src={italic} height="30px" width="30px" />
						</div>
					</div>
					<div className="col-1 m-0 p-0 ms-5" >
						<div
							className={props.data.style.decoration["text-decoration"] == "underline" ? "btn btn-sm ms-2 p-2 customshine" : "btn btn-sm ms-2 p-2"}
							onClick={() => {
								if (props.data.style.decoration["text-decoration"] != "underline") {
									props.EditStyle({
										...props.data.style, decoration: {
											...props.data.style.decoration,
											"text-decoration": "underline"
										}
									})
								}
								else {
									props.EditStyle({
										...props.data.style, decoration: {
											...props.data.style.decoration,
											"text-decoration": "normal"
										}
									})
								}

							}}> <img src={underline} height="20px" width="20px" />
						</div>
					</div>

				</div>
				<div>Alignment</div>
				<div className="row m-3">
					<div className={props.data.style.alignment == "left" ? "col p-2 customshine  text-center" : "text-center col p-2"}
						onClick={() => {
							props.EditStyle({ ...props.data.style, alignment: "left" })
						}}>
						<img src={align_left} height="20px" width="20px" />
					</div>
					<div className={props.data.style.alignment == "right" ? "col p-2 customshine  text-center" : "  text-center col p-2"}
						onClick={() => {
							props.EditStyle({ ...props.data.style, alignment: "right" })
						}}>
						<img src={align_right} height="20px" width="20px" />
					</div>
					<div className={props.data.style.alignment == "center" ? "col p-2   text-center customshine " : " text-center col p-2"}
						onClick={() => {
							props.EditStyle({ ...props.data.style, alignment: "center" })
						}}>
						<img src={align_center} height="20px" width="20px" />
					</div>
					<div className={props.data.style.alignment == "justify" ? "col p-2  text-center customshine " : " text-center col p-2"}
						onClick={() => {
							props.EditStyle({ ...props.data.style, alignment: "justify" })
						}}>
						<img src={align_justify} height="20px" width="20px" />
					</div>
				</div>
				<div>Fill</div>
				<Form.Control
					type="color"
					id="exampleColorInput"
					defaultValue="#563d7c"
					title="Choose your color"
					onChange={(e) => props.EditStyle({ ...props.data.style, fill: e.target.value })}
				/>

				<div>Stroke</div>
				<Form.Control
					type="color"
					id="exampleColorInput"
					defaultValue="#563d7c"
					title="Choose your color"
					onChange={(e) => props.EditStyle({ ...props.data.style, stroke: e.target.value })}
				/>
			</Tab>
		</Tabs>
	</div >
}
