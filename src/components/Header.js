import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import config from '../global-config';

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
                            !this.props.myId && <a href={config.authServer}>Login</a>
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