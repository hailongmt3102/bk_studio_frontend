import React from 'react'


import '../PeopleCard/peopleCard.css'
import Avatar from '@mui/material/Avatar';
import Badge from "@mui/material/Badge";
import { styled } from '@mui/material/styles';
import people_default from "resources/icons/people_default.svg"
export default function PeopleCardMini(props) {

    const Onl = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
            width: "10px",
            height: "10px",
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
            width: "10px",
            height: "10px",
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
    const OnlineComp = (img) => {
        return < Onl
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            variant="dot"
        >
            <Avatar src={img} style={{ height: "50px", width: "50px" }} />
        </Onl>
    }

    const OfflineComp = (img) => {
        return < Off
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            variant="dot"
        >
            <Avatar src={img} style={{ height: "50px", width: "50px" }} />
        </Off>
    }

    function checkAvatar(avatar) {
        if (avatar === "") {
            return people_default
        }
        else return props.avatar
    }
    return (
        <div className='row justify-content-center m-auto level1 p-1'>
            <div className='col-2 '>
                {
                    props.Status === "online" ? OnlineComp(checkAvatar(props.avatar)) : OfflineComp(checkAvatar(props.avatar))
                }

            </div>
            <div className='col-10 overflow' >
                <h5 className=' ms-4 customFontRoboto' style={{ fontSize: "20px", fontWeight: "bold" }}>
                    {props.name}
                </h5>
                <h5 className=' ms-4 customFontRoboto ' style={{ fontSize: "16px" }}>
                    {props.email}
                </h5>
            </div>

        </div>
    )
}
