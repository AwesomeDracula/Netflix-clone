import React from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import { auth } from '../firebase';
import Nav from '../Nav';
import PlansScreen from './PlansScreen';
import './ProfileScreen.css';

function ProfileScreen() {
    const user = useSelector(selectUser);
    return (
        <div className="profilescreen">
            <Nav />
            <div className="profilescreen__body">
                <h1>Edit profile</h1>
                <div className="profilescreen__info">
                    <img src="https://i.pinimg.com/originals/0d/dc/ca/0ddccae723d85a703b798a5e682c23c1.png" alt=""/>
                    <div className="profilescreen__details">
                        <h2>{user.email}</h2>
                        <div className="profilescreen__plans">
                            <h3>Plans</h3>
                            <PlansScreen />
                            <button
                            onClick={() => auth.signOut()} 
                            className="profilescreen__signout">
                                Sign Out
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileScreen
