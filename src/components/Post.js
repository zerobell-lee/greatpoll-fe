import React from 'react';
import Link from 'react-router-dom';

const Post = ({userName, profileImg, title, pollNo}) => {
    return (
        <div>
            <p>{userName}</p>
            <img src={profileImg} />
            <h1><Link to={"/view/" + pollNo}>{title}</Link></h1>
        </div>
    )
}

export default Post;