import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Avatar, Button } from 'antd';
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
                <Avatar 
                style={ {
                    width: '200px',
                    height: '200px',
                    display: 'flex'
                }} 
                src={this.props.pictureUrl}/>
            </div>
            <p className='profile-username'>{this.props.displayName}</p>
            <div className="user-header-img-container">
                {this.props.mypage && <Button onClick={this.logout} type='primary' style={{display: 'flex'}}>Logout</Button>}
            </div>
            <p>
                {`Balance : ${this.props.balance} Cony`}
            </p>
        </div>
    )
}
}

export default withRouter(UserHeader);