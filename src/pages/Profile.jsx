import React from 'react'
import useAuth from '../hooks/useAuth';

export default function Profile() {
    const { user } = useAuth();
    return (<>
        <div>{user?.name}</div>
        <div>{user?.email}</div>
        <div>{user?.phone}</div></>
    )
}
