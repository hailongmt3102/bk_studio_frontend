import { useState } from 'react'
import './peopleCard.css'

import { deleteMemberInAProject } from "api/Project"
import ThreeDotButton from 'components/ThreeDotButton'
import delete_icon from 'resources/icons/delete.svg'
import edit from 'resources/icons/edit.svg'
import people_default from "resources/icons/people_default.svg"
import three_dot from "resources/icons/three-dot.svg"

import { Store } from 'react-notifications-component'
import { content } from "../../utils/notification"
import ConfirmDialog from "../ConfirmDialog"

import Badge from "@mui/material/Badge";
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';

export default function PeopleCard(props) {
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })
    const handleCloseYes = () => {
        deleteSubmit()
        console.log("close ne")
    }
    const handleCloseNo = () => {
        setConfirmDialog({ ...ConfirmDialog, isOpen: false })
    }
    const handleOpen = () => {
        setConfirmDialog({ ...ConfirmDialog, isOpen: true })
    }
    const option_list = ["Edit role", "Delete People"]



    const deleteSubmit = () => {
        deleteMemberInAProject(props.project_id, { Email: props.email })
            .then(res => {
                Store.addNotification(content("Success", "Deleted Member", "success"))
                setTimeout(() => window.location.reload(), 2000);
            })
            .catch(err => {
                Store.addNotification(content("Fail", "You can't delete member because you also are member position", "danger"))
            })
    }
    const icons_list = [edit, delete_icon]

    // const [pressRename, setPressRename] = useState(false)
    // const [newName, setNewName] = useState({
    //     Id: props.data.Id,
    //     Name: props.data.Name,
    // })

    const ThreeDotComponent = () => {
        return <div>
            {!props.isManager ? <div >
                {props.showThreeDotButton ? <ThreeDotButton title={'adđ'} items={option_list} icons_list={icons_list} icon={three_dot} onClick={(val) => {
                    if (val === "Edit role") {
                        if (props.peopleCanEditRoleList === true) {
                            props.getEmail()
                            props.setshowRolePopUp();
                        }
                        else {
                            props.setdontshowRolePopUp()
                        }
                    }
                    else if (val === "Delete People") {
                        handleOpen()
                    }
                }} /> : <div className='row mt-3'></div>
                }
            </div> :
                <div className='row mt-3'>
                </div>
            }
        </div>
    }

    const OnlineComp = (img) => {
        return < Onl
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            variant="dot"
        >
            <Avatar src={img} style={{ height: "80px", width: "80px" }} />
        </Onl>
    }

    const OfflineComp = (img) => {
        return < Off
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            variant="dot"
        >
            <Avatar src={img} style={{ height: "80px", width: "80px" }} />
        </Off>
    }

    function checkAvatar(avatar) {
        if (avatar === "") {
            return people_default
        }
        else return props.avatar
    }

    const AvtComponent = () => {
        return <div className='ms-2' >
            {
                props.Status === "online" ? OnlineComp(checkAvatar(props.avatar)) : OfflineComp(checkAvatar(props.avatar))
            }

        </div >
    }

    const Onl = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
            width: "20px",
            height: "20px",
            borderRadius: '50%',
            backgroundColor: '#44b700',
            color: '#44b700',
            boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
            '&::after': {
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                animation: 'ripple 1.2s infinite ease-in-out',
                border: '1px solid currentColor',
                content: '""',
            },
        },
        '@keyframes ripple': {
            '0%': {
                transform: 'scale(.8)',
                opacity: 1,
            },
            '100%': {
                transform: 'scale(1.8)',
                opacity: 0,
            },
        },
    }));


    const Off = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
            width: "20px",
            height: "20px",
            borderRadius: '50%',
            backgroundColor: 'red',
            color: 'red',
            boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
            '&::after': {
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                animation: 'ripple 1.2s infinite ease-in-out',
                border: '1px solid currentColor',
                content: '""',
            },
        },
        '@keyframes ripple': {
            '0%': {
                transform: 'scale(.8)',
                opacity: 1,
            },
            '100%': {
                transform: 'scale(1.8)',
                opacity: 0,
            },
        },
    }));

    const ContentComponent = () => {
        return <div className='ms-4 mb-4'>
            <h2 className='ms-2 customFontRoboto size30 customFontBold' >
                {props.name.substring(0, 12)}
            </h2>
            <div className='ms-2  customFontRoboto' >
                Email: {props.email.substring(0, 18) + "..."}
            </div>
            <div className='ms-2  customFontRoboto' >
                Rank: {props.rank}
            </div>
            <div className='ms-2 customFontRoboto' >
                Status: {props.Status}
            </div>
        </div>
    }
    const component = () => {
        return <div className='row m-0 p-0'>
            <div className='col-2  m-0 p-0  m-auto text-center'>
                {AvtComponent()}

            </div>
            <div className='col-9  m-0 p-0'>
                <div style={{ textAlign: "right" }}>{ThreeDotComponent()}</div>
                <div className='pt-3 pb-3'>{ContentComponent()}</div>
            </div>

        </div>
    }
    return (

        <div>
            <ConfirmDialog
                confirmDialog={confirmDialog}
                title="Are you sure you want to delete this member?"
                handleCloseYes={() => handleCloseYes()}
                handleCloseNo={() => handleCloseNo()}
            />
            {
                props.isMe ?
                    <div className="peoplecard me" onClick={props.onClick}>
                        {component()}
                    </div>
                    :
                    <div className={props.isManager ? "peoplecard manager" : "peoplecard member"} onClick={props.onClick}>
                        {component()}
                    </div>
            }

        </div>
    )
}
