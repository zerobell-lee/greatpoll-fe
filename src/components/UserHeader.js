import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class UserHeader extends Component {

    constructor(props) {
        super(props)
        this.logout.bind(this)
    }

    logout = () => {
        fetch('https://greatpoll-test.herokuapp.com/api/logout');
        this.props.history.push('/');
    }

    render() {
        return (
        <div className="user-header-container">
            <div className="user-header-img-container">
                <img className="profile big-pic" src={this.props.pictureUrl}/>
            </div>
            {this.props.displayName}
            {this.props.mypage && <div onClick={this.logout}>Logout</div>}
        </div>
    )
}
}

export default withRouter(UserHeader);