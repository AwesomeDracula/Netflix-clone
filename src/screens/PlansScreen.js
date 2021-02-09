import React, { useState } from 'react';
import './PlansScreen.css';

function PlansScreen() {
    const [currentPlan, setCurrentPlan] = useState("Basic");

    return (
        <div className="plansscreen">
            <div className="plansscreen__plan">
                <div className="plansscreen__info">
                    <h5 className={currentPlan === "Premium" && 'plansscreen__current'}>Premium </h5>
                    <h6>4K + HDR</h6>
                </div>
                <button onClick={() => setCurrentPlan("Premium")} className={currentPlan === "Premium" && 'plansscreen__currentbtn'}>
                    {currentPlan === "Premium" && 'Current package' || 'Subcribe'}
                </button>
            </div>
            <div className="plansscreen__plan">
                <div className="plansscreen__info">
                    <h5 className={currentPlan === "Standard" && 'plansscreen__current'}>Standard </h5>
                    <h6>1080p</h6>
                </div>
                <button onClick={() => setCurrentPlan("Standard")} className={currentPlan === "Standard" && 'plansscreen__currentbtn'}>
                    {currentPlan === "Standard" && 'Current package' || 'Subcribe'}
                </button>
            </div>
            <div className="plansscreen__plan">
                <div className="plansscreen__info">
                    <h5 className={currentPlan === "Basic" && 'plansscreen__current'}>Basic </h5>
                    <h6>480p</h6>
                </div>
                <button onClick={() => setCurrentPlan("Basic")} className={currentPlan === "Basic" && 'plansscreen__currentbtn'}>
                    {currentPlan === "Basic" && 'Current package' || 'Subcribe'}
                </button>
            </div>
        </div>
    )
}

export default PlansScreen
