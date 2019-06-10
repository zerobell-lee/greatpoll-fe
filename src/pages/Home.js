import React, { Component } from 'react';
import Feed from '../components/Feed';
import config from '../global-config';
import FeedBoard from '../components/FeedBoard';

class Home extends Component {

    constructor(props) {
        super(props)
        this.state = {
            userId: null,
            data: []
        }
        this.getFeeds.bind(this)
    }

    render() {
        if (!this.state.data) {
            return (
                <>
                Nothing
                </>
            )
        }
        return (
            <FeedBoard feedList={this.state.data} />
            )
    }

    getWhoIAm = async() => {
        const myInfo = await fetch(config.host + '/api/user')
            .then(res => res.json())
            .catch(err => false)

        if (!myInfo) return

        const myId = myInfo.userId
        console.log(myInfo)
        this.setState({userId: myId})
        this.props.onAuthed(myId)
    }

    getFeeds = async () => {
        let lastPollNo = 0;
        const { data } = this.state;

        if (data.length > 0) {
            lastPollNo = data[data.length - 1].pollNo
        }

        const feedRes = await fetch(config.host + '/api/main?lastPollNo=' + lastPollNo)
        .then(res => res.json())
        .catch(err => console.log(err))

        const feedList = feedRes.feedList.map(e => {
            if (e.author.userId === this.state.userId) {
                return {...e, canDelete: true, onDelete: this.deletePoll}
            }
            return {...e, canDelete: false, onDelete: this.deletePoll}
        })
        this.setState({data: data.concat(feedList)})
    }

    deletePoll = async (pollNo) => {
        await fetch(config.host + '/api/poll/' + pollNo, {
            method: 'DELETE'
        }).catch(err => console.log(err))
        const { data } = this.state;
        this.setState({data: data.filter(e => e.pollNo !== pollNo)})
    }

    fetchData = async () => {
        await this.getWhoIAm();
        this.getFeeds();
    }

    componentDidMount() {
        this.fetchData()
        this.props.changeInfiniteScrollHandler(true, this.getFeeds)
    }

}

export default Home;