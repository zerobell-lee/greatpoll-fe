import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Avatar } from 'antd';
import config from '../global-config';

class UserHeader extends Component {

    constructor(props) {
        super(props)
        this.logout.bind(this)
    }

    logout = () => {
        fetch(config.host + '/api/logout');
        this.props.history.push('/');
    }

    render() {
        return (
        <div className="user-header-container">
            <div className="user-header-img-container">
                <Avatar src={this.props.pictureUrl}/>
            </div>
            {this.props.displayName}
            {this.props.mypage && <div onClick={this.logout}>Logout</div>}
        </div>
    )
}
}

export default withRouter(UserHeader);