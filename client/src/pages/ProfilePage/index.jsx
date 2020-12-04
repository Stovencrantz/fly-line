import React, { useContext } from 'react';
import { UserContext } from "../../providers/UserProvider";
import {auth} from "../../firebase";
import { Button } from "@material-ui/core";

export default function ProfilePage() {
    const user = useContext(UserContext);
    const {photoURL, displayName, email} = user;
    return(
        <div className = "mx-auto w-11/12 md:w-2/4 py-8 px-4 md:px-8">
            <div className="flex border flex-col items-center md:items-start border-blue px-3 py-4">
                <div style={{ background:`url(https://res.cloudinary.com/dqcsk8rsc/image/upload/v1577268053/avatar-1-bitmoji_upgwhc.png)  no-repeat center center`,
            backgroundSize: 'cover',
            height: '200px',
            width: '200px'
            }}
            className='border border-blue-300'

            ></div>
            <div className="md:pl-4">
                <h2 className='text-2xl font-semibold'>Faruq</h2>
                <h3 clasName='italic'>faruq123@gmail.com</h3>
            </div>
            </div>
            <Button variant="contained" className='bg-danger btn-block py-3 mt-4 text-white'
            onClick={() => {auth.signOut()}}>Sign out</Button>
        </div>
    )
}