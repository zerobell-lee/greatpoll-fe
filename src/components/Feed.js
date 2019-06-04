import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Row, Col, Button } from 'antd';
import ta from 'time-ago';

const Feed = ({author, userId, profileImg, pollTitle, pollNo, datetime, likes, voted, description, canDelete, onDelete}) => {
    return (
        <div className="feed-container">
            <div className="feed-header">
                <Row justify='center' align='middle'>
                    <Col span={6}>
                        <Avatar size='large' src={profileImg} />
                    </Col>
                    <Col span={12}>
                        <Link className="user-name" to={"/user/" + userId}>{author}</Link>
                    </Col>
                    <Col span={6}>
                        {canDelete && <Button onClick={(value) => {onDelete(pollNo)}}>delete</Button>}
                    </Col>
                </Row>
            </div>
            <div className="feed-title">
                <Link to={"/view/" + pollNo}>{pollTitle}</Link>
            </div>
            <div className='feed-description'>
                {description}
            </div>
            <div className="feed-footer">
                {ta.ago(datetime)}, {likes} likes, {voted} voted
            </div>
        </div>
    )
}

export default Feed;