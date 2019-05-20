import React, { Component } from 'react';
import Feed from '../components/Feed';
import UserHeader from '../components/UserHeader';

class UserPage extends Component {

    constructor(props) {
        super(props)
        this.getUserInfo.bind(this)
        this.state = {
            userId: props.match.params.userId,
            userInfo: null
        }
    }

    render() {
        if (this.state.userInfo) {
            const { userInfo: { pollList, profile, myInfo } } = this.state
            return (
                <div>
                    <UserHeader displayName={profile.displayName} pictureUrl={profile.pictureUrl} mypage={myInfo} />
                    {pollList.map(e => {
                        return <Feed 
                                    author={e.userName}
                                    userId={e.userId}
                                    profileImg={e.profileImg}
                                    pollTitle={e.pollTitle}
                                    pollNo={e.pollNo}
                                    datetime={e.datetime}
                                    likes={e.likes}
                                    voted={e.voted}/>
                    })}
                </div>
            )
        }
        else {
            return (
                <div>
                    undefined
                </div>
            )
        }
    }

    getUserInfo = async () => {
        const userInfo = await fetch("https://greatpoll-test.herokuapp.com/api/user/" + this.state.userId)
        .then(res => res.json())
        .catch(err => console.log(err))
        this.setState({userInfo})
    }

    componentDidMount() {
        if (!this.state.userInfo) {
            if (!this.state.userId) {
                window.location.href="https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=1571874884&redirect_uri=https%3A%2F%2Fgreatpoll-test.herokuapp.com%2Fauth&state=12345&scope=profile%20openid%20email"
            }
            else {
                this.getUserInfo()
            }
        }
    }
}

export default UserPage;