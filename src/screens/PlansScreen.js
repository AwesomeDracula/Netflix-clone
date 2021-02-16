import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, selectUserPlan, setUserPlan } from '../features/userSlice';
import './PlansScreen.css';
import {database} from '../firebase'; 

function PlansScreen() {
    const user = useSelector(selectUser);
    const currentPlan = useSelector(selectUserPlan)?.plan;
    console.log("Current plan",currentPlan);
    const dispatch = useDispatch();
    // const [currentPlan, setCurrentPlan] = useState("Basic");

    const writeUserData = (userId, plan) => {
        database.ref('users/' + userId).set({
            plan: plan
        })
    }

    return (
        <div className="plansscreen">
            <div className="plansscreen__plan">
                <div className="plansscreen__info">
                    <h5 className={currentPlan === "Premium" && 'plansscreen__current'}>Premium </h5>
                    <h6>4K + HDR</h6>
                </div>
                <button onClick={() => {
                        writeUserData(user?.uid,'Premium');
                        dispatch(setUserPlan({plan: 'Premium'}))}}
                        className={currentPlan === "Premium" && 'plansscreen__currentbtn'}>
                    {currentPlan === "Premium" && 'Current package' || 'Subcribe'}
                </button>
            </div>
            <div className="plansscreen__plan">
                <div className="plansscreen__info">
                    <h5 className={currentPlan === "Standard" && 'plansscreen__current'}>Standard </h5>
                    <h6>1080p</h6>
                </div>
                <button onClick={() => {
                        writeUserData(user?.uid,'Standard');
                        dispatch(setUserPlan({plan: 'Standard'}))}} className={currentPlan === "Standard" && 'plansscreen__currentbtn'}>
                    {currentPlan === "Standard" && 'Current package' || 'Subcribe'}
                </button>
            </div>
            <div className="plansscreen__plan">
                <div className="plansscreen__info">
                    <h5 className={currentPlan === "Basic" && 'plansscreen__current'}>Basic </h5>
                    <h6>480p</h6>
                </div>
                <button onClick={() => {
                        writeUserData(user?.uid,'Basic');
                        dispatch(setUserPlan({plan: 'Basic'}))}} className={currentPlan === "Basic" && 'plansscreen__currentbtn'}>
                    {currentPlan === "Basic" && 'Current package' || 'Subcribe'}
                </button>
            </div>
        </div>
    )
}

export default PlansScreen
