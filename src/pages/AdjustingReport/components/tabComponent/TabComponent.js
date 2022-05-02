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

				let selectArray = (selectReg.exec(command) ?? [""])[0].replace("select ", "").split(",").map(ele => ele.trim())
				let from = (fromReg.exec(command) ?? [""])[0].replace("from ", "")
				let where = (whereReg.exec(command) ?? [""])[0].replace("where ", "").split(",").map(ele => ele.trim())
				let groupby = (groupbyReg.exec(command) ?? [""])[0].replace("where ", "").split(",").map(ele => ele.trim())
				let having = (havingReg.exec(command) ?? [""])[0].replace("where ", "").split(",").map(ele => ele.trim())
				let orderby = (orderbyReg.exec(command) ?? [""])[0].replace("where ", "").split(",").map(ele => ele.trim())

				setCommandData({
					command: command,
					data: {
						select: selectArray,
						from: from,
						where: where,
						groupby: groupby, // array
						having: having, // array
						orderby: orderby
					}
				})
			}
		},
		[props.dataSource],
	)

	

	useEffect(() => {
		parseSqlCommand(props.data.data.script)
	}, [props.data])


	return <div className="col-2 ">

		<Tabs className="p-2" activeKey={key} onSelect={(k) => setKey(k)}>
			<Tab className="p-4" eventKey="Data" label="Data">
				<h4>Title: {props.data.data.title}</h4>
				<h5>Type: {props.data.data.type}</h5>
				<h4>Script</h4>
				<div className="m-4">{props.data.data.script}</div>
				<div className="mt-3">
					<h4>Data sources: {commandData.data.from}</h4>
				</div>
				<div className="row mt-5">
					<div className="col">
						<h4>Field: {commandData.data.select.join(', ')}</h4>
					</div>
					<div className="col">
						<h4>Type</h4>
					</div>
				</div>
				<div> <button className='btn-lg btn-success text-center border-0'
					onClick={() => { props.showMappingPopUpHandle() }}>
					<div>Edit data</div>
				</button></div>
			</Tab>
			<Tab className="p-4" eventKey="Format" label="Style">
				<div className="mt-2">Text</div>
				<div className="row mt-2">
					<div className="col">
						<Autocomplete
							id="custom-input-demo"
							options={fonts}
							renderInput={(params) => (
								<div ref={params.InputProps.ref}>
									<input type="text" {...params.inputProps} />
								</div>
							)}
						/>
					</div>
				</div>
				<div className="mt-2">Size</div>
				<div className="row mt-2">
					<div className="col">
						<Autocomplete
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
						<button type="button" class="btn btn-sm ms-2 p-2" onClick={() => { }}><img src={bold} height="15px" width="15px" /></button>
					</div>
					<div className="col-1 m-0 p-0 ms-5" onClick={() => { }}>
						<button type="button" class="btn m-0 p-0 btn-sm ms-2" onClick={() => { }}> <img src={italic} height="30px" width="30px" /></button>
					</div>
					<div className="col-1 m-0 p-0 ms-5" onClick={() => { }}>
						<button type="button" class="btn m-0 p-0 btn-sm ms-2" onClick={() => { }}> <img src={underline} height="20px" width="20px" /></button>
					</div>

				</div>
				<div>Alignment</div>
				<div className="row m-3">
					<div className="col">
						<img src={align_left} height="20px" width="20px" />
					</div>
					<div className="col">
						<img src={align_right} height="20px" width="20px" />
					</div>
					<div className="col">
						<img src={align_center} height="20px" width="20px" />
					</div>
					<div className="col">
						<img src={align_justify} height="20px" width="20px" />
					</div>

				</div>
				<div>Fill</div>
				<Form.Control
					type="color"
					id="exampleColorInput"
					defaultValue="#563d7c"
					title="Choose your color"
				/>

				<div>Stroke</div>
				<Form.Control
					type="color"
					id="exampleColorInput"
					defaultValue="#563d7c"
					title="Choose your color"
				/>
			</Tab>
		</Tabs>
	</div>
}
