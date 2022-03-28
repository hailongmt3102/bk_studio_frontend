import React, { useState, useEffect } from 'react'
import '../css/TextFont.css'
import './peopleCard.css'
import { Roboto, Poppins } from "../../utils/font"
import { useLocation, useNavigate } from 'react-router-dom'
import people_default from "resources/icons/people_default.svg"
import three_dot from "resources/icons/three-dot.svg"
import ThreeDotButton from 'components/ThreeDotButton'
import delete_icon from 'resources/icons/delete.svg'
import edit from 'resources/icons/edit.svg'
import {canUpdatePermission} from "api/Project"
const textStyle = {
    fontFamily: Roboto,
}

export default function MeCard(props) {
    var location = useLocation()
    const array = location.pathname.split("/");
    var project_id = array[array.length - 1]
    const option_list = ["Edit role", "Delete People"]
    const [peopleCanEditRoleList,setPeopleCanEditRoleList]=useState(false)
    useEffect(() => {
        canUpdatePermission(project_id)
        .then(res => {
           setPeopleCanEditRoleList(true)
        })
        .catch(err => {
            setPeopleCanEditRoleList(false)
        })
    }, [])

    const icons_list = [edit, delete_icon]

    // const [pressRename, setPressRename] = useState(false)
    // const [newName, setNewName] = useState({
    //     Id: props.data.Id,
    //     Name: props.data.Name,
    // })
    return (
        <div className="m-4 peoplecard me"  onClick={props.onClick}>
            <div className='row  m-0'>
                {!props.isManager ? <div className='d-flex m-0 p-0 justify-content-end'>
                    <ThreeDotButton title={'adđ'} items={option_list} icons_list={icons_list} icon={three_dot} onClick={(val) => {
                        if (val === "Edit role")
                            props.getEmail()
                            console.log("show di")
                            if (peopleCanEditRoleList == true) {
                                console.log("dang show ne")
                                props.setshowRolePopUp();
                            }
                            else props.setdontshowRolePopUp()
                        // else {
                        //     setPressRename(true)
                        //     RenameProjectSubmit()
                        //}
                    }} />

                </div> :
                    <div className='row mt-4'>
                    </div>
                }
                <div className='row p-2 m-0 p-0'>
                    <div className='col-3 align-items-center'>
                        {props.avatar === "" ?
                            <img src={people_default} height="100px" width="100px" />
                            : <img src={props.avatar} height="100px" width="100px" style={{ "border-radius": "50%" }} />}
                    </div>


                    <div className='col-9'>
                        <div className='ms-5 mb-3'>
                            <h2 style={{ textStyle, "fontWeight": "bold", fontSize: "30px" }}>
                                {props.name}
                            </h2>
                            <div style={{ textStyle }}>
                                Email: {props.email}
                            </div>
                            <div style={{ textStyle }}>
                                Rank: {props.rank}
                            </div>
                            <div style={{ textStyle }}>
                                Online: 6 hour later
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    )
}