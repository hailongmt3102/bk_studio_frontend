import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {getListPeopleByProjectID} from '../../api/People'
import { Roboto, Poppins } from "../../utils/font"
import { blue_cloud } from "../../utils/color"
import { deep_blue_primary } from "../../utils/color"
import avt_people from "resources/icons/avt_people.svg"


import PeopleCard from "components/PeopleCard/PeopleCard"

export default function ProjectDetail() {

  var location = useLocation()
  var navigate = useNavigate()

  const [people, setPeopleList] = useState([])
  useEffect(() => {
    
    const array = location.pathname.split("/");
    var id = array[array.length - 1]

    getListPeopleByProjectID(id)
      .then(response => {
        console.log(response.data)
        setPeopleList(response.data)
      })
      .catch(
        error => {
        }
      )
  }, [])


  return <div>
    <div>
            <h2 class="ms-4" style={{ fontFamily: Poppins, color: deep_blue_primary, "font-weight": "bold", fontSize: "40px" }}> People:</h2>
            <div className='rounded-5 bg-white'>
                <div className='row bg-light'>
                    <div className='col m-4 bg-white'>
                        <h1 className='m-2' style={{ fontFamily: Poppins, color: blue_cloud, "font-weight": "bold" }}>Manager</h1>
                        {
                            people.map((ele, index) => {
                                if (ele.Position !== "Manager") return null
                                return <PeopleCard
                                    onClick={() => {

                                    }}
                                    name={ele.UserName}
                                    avatar={avt_people}
                                    birthday={ele.Birthday.substring(0,10).split('-').reverse().join('-')}
                                    gender={ele.Gender}
                                    isManager={true}
                                />
                            })
                        }
                    </div>
                    <div className='col m-4 bg-white'>
                        <h1 className='m-2' style={{ fontFamily: Poppins, color: blue_cloud, "font-weight": "bold" }}>Member</h1>
                        {
                            people.map((ele, index) => {
                                if (ele.Position !== "Member") return null
                                return <PeopleCard
                                    onClick={() => {

                                    }}
                                    name={ele.UserName}
                                    avatar={avt_people}
                                    birthday={ele.Birthday.substring(0,10).split('-').reverse().join('-')}
                                    gender={ele.Gender}
                                    isManager={false}
                                />
                            })
                        }
                    </div>

                </div>
            </div>
        </div>

  </div>;
}
