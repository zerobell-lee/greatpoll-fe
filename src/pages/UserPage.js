import React, { Component } from 'react';
import Feed from '../components/Feed';
import UserHeader from '../components/UserHeader';
import config from '../global-config';

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
            const { userInfo: { myPollList, profile, myPage } } = this.state
            return (
                <div>
                    <UserHeader displayName={profile.displayName} pictureUrl={profile.pictureUrl} mypage={myPage} />
                    {myPollList.map(e => {
                        return <Feed 
                                    author={e.author.displayName}
                                    userId={e.author.userId}
                                    profileImg={e.author.pictureUrl}
                                    pollTitle={e.title}
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
        const userInfo = await fetch(config.host + '/api/user/' + this.state.userId)
        .then(res => res.json())
        .catch(err => console.log(err))
        this.setState({userInfo})
    }

    componentDidMount() {
        if (!this.state.userInfo) {
            if (!this.state.userId) {
                window.location.href=config.authServer
            }
            else {
                this.getUserInfo()
            }
        }
    }
}

export default UserPage;