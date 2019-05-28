import React from 'react';

const PollHeader = ({title, description, author, createdAt, closedAt, voted, liked}) => {
    return (
        <div className="poll-header">
            <h1>{title}</h1>
                <h2>Description</h2>
                <p>{description}</p>
                <p>created by {author.displayName}</p>
                <p>created at {createdAt}</p>
                <p>closed at {closedAt}</p>
                {voted} Voted, {liked} Liked.
        </div>    
    )
}

export default PollHeader;