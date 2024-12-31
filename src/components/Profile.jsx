import { NavLink } from 'react-router-dom'
import { useState ,useContext} from "react";
import { LoginContext } from "../components/ContextProvider/Context";
import './Profile.css'
import useLeetCodeData from './useLeetCodeData';

const Profile = ({username}) => {

    const { logindata, setLoginData } = useContext(LoginContext);
    let profile = localStorage.getItem("usersprofile");
    const { data, userDetails, loading, error } = useLeetCodeData(username);
    
    if (loading) return <div className="dashboard-message">Loading...</div>;
    if (error) return <div className="dashboard-message error">Error: {error}</div>;

    return (
        <div className="dashboard-container">
            <h1 className="dashboard-title">{userDetails.name}</h1>
            <div className="user-info">
                <img src={userDetails.avatar} alt="Avatar" className="user-avatar" />
                <div className="user-details">
                    <p><strong>Username:</strong> {userDetails.username}</p>
                    <p><strong>Country:</strong> {userDetails.country}</p>
                    <p><strong>School:</strong> {userDetails.school}</p>
                    <p><strong>Ranking:</strong> {userDetails.ranking}</p>
                    <p><strong>Reputation:</strong> {userDetails.reputation}</p>
                    <p><strong>Skills:</strong> {userDetails.skillTags.join(", ")}</p>
                </div>
            </div>

            <h2>Problem Stats</h2>
            <div className="stats-grid">
                <div className="stats-card">
                    <h3>Total Problems Solved</h3>
                    <p>{data.totalSolved}</p>
                </div>
                <div className="stats-card">
                    <h3>Easy Problems</h3>
                    <p>{data.easySolved}</p>
                </div>
                <div className="stats-card">
                    <h3>Medium Problems</h3>
                    <p>{data.mediumSolved}</p>
                </div>
                <div className="stats-card">
                    <h3>Hard Problems</h3>
                    <p>{data.hardSolved}</p>
                </div>
            </div>
        </div>
    );
}

export default Profile