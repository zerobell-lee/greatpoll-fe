import React from 'react';
import { Link } from 'react-router-dom';

const Feed = ({author, userId, profileImg, pollTitle, pollNo, datetime, likes, voted}) => {
    return (
        <div className="feed-container">
            <div className="feed-header">
                <div className="column-2">
                    <img className="profile small-pic" src={profileImg} />
                </div>
                <div className="column-8">
                    <Link className="user-name" to={"/user/" + userId}>{author}</Link>
                </div>
            </div>
            <div className="feed-title">
                <Link to={"/view/" + pollNo}>{pollTitle}</Link>
            </div>
            <div className="feed-footer">
                Created at : {datetime}, {likes} likes, {voted} voted
            </div>
        </div>
    )
}

export default Feed;