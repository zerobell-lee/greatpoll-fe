import React, { Component } from 'react';
import Feed from '../components/Feed';
import UserHeader from '../components/UserHeader';
import config from '../global-config';
import FeedBoard from '../components/FeedBoard';
import { Switch } from 'antd';

class UserPage extends Component {

    constructor(props) {
        super(props)
        this.getUserInfo.bind(this)
        const mypage = this.props.myId === props.match.params.userId
        this.state = {
            userId: props.match.params.userId,
            userProfile: null,
            userOwnPoll: [],
            userVotedPoll: [],
            mypage: mypage,
            viewUserVoted: false
        }
    }

    toggleMode = (checked) => {
        this.setState({ viewUserVoted : checked})
    }

    render() {
        if (this.state.userProfile) {
            const { userProfile, userOwnPoll, userVotedPoll, viewUserVoted } = this.state;
            return (
                <div>
                    <UserHeader displayName={userProfile.displayName} pictureUrl={userProfile.pictureUrl} mypage={this.state.mypage} balance={userProfile.balance}/>
                    <Switch defaultChecked={viewUserVoted} onChange={this.toggleMode} />
                    {!viewUserVoted && <FeedBoard feedList={userOwnPoll} />}
                    {viewUserVoted && <FeedBoard feedList={userVotedPoll} />}
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
        const userProfile = await fetch(config.host + '/api/user/' + this.state.userId)
        .then(res => res.json())
        .catch(err => console.log(err))
        this.setState({userProfile})
    }

    getUserOwnPoll = async () => {
        const { userOwnPoll } = this.state
        let lastPollNo = 0

        if (userOwnPoll.length > 0) {
            lastPollNo = userOwnPoll[userOwnPoll.length - 1].pollNo
        }

        const fetchedData = await fetch(config.host + '/api/user/' + this.state.userId + '/own?lastPollNo=' + lastPollNo)
        .then(res => res.json())
        .catch(err => console.log(err))

        const newUserOwnPoll = fetchedData.map(e => { return {...e, canDelete: this.state.mypage, onDelete: this.deletePoll}})

        this.setState({userOwnPoll: userOwnPoll.concat(newUserOwnPoll)})
    }

    getUserVotedPoll = async () => {
        const { userVotedPoll } = this.state
        let lastPollNo = 0

        if (userVotedPoll.length > 0) {
            lastPollNo = userVotedPoll[userVotedPoll.length - 1].pollNo
        }

        const fetchedData = await fetch(config.host + '/api/user/' + this.state.userId + '/voted?lastPollNo=' + lastPollNo)
        .then(res => res.json())
        .catch(err => console.log(err))

        const newUserVotedPoll = fetchedData.map(e => { return {...e, canDelete: false, onDelete: this.deletePoll}})

        this.setState({userVotedPoll: userVotedPoll.concat(newUserVotedPoll)})
    }


    deletePoll = async (pollNo) => {
        await fetch(config.host + '/api/poll/' + pollNo, {
            method: 'DELETE'
        }).catch(err => console.log(err))
        const { userOwnPoll } = this.state;
        this.setState({userOwnPoll: userOwnPoll.filter(e => e.pollNo !== pollNo)})
    }

    componentDidMount() {
        this.getUserInfo()
        this.getUserOwnPoll()
        this.getUserVotedPoll()
        this.props.changeInfiniteScrollHandler(true, this.getUserOwnPoll)
    }
}

export default UserPage;