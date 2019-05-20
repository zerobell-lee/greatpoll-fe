import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
    render() {
        return (
            <div>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        {
                            this.props.myId && <Link to={"/user/" + this.props.myId}>Mypage</Link>
                        }
                        {
                            !this.props.myId && <a href={"https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=1571874884&redirect_uri=https%3A%2F%2Fgreatpoll-test.herokuapp.com%2Fauth&state=12345&scope=profile%20openid%20email"}>Login</a>
                        }
                    </li>
                    {this.props.myId &&
                        <li>
                             <Link to="/write">Make a poll</Link>
                        </li>
                    }
                </ul>
            </div>
        )
    }
}

export default Header;