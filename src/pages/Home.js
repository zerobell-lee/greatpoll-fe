import React, { Component } from 'react';
import Feed from '../components/Feed';
import config from '../global-config';

class Home extends Component {

    constructor(props) {
        super(props)
        this.state = {
            userId: null,
            data: null
        }
        this.getFeeds.bind(this)
    }

    render() {
        const {userId} = this.state
        if (!this.state.data) {
            return (
                <>
                Nothing
                </>
            )
        }
        return (
            this.state.data.map(e => {
                return (
                    <Feed 
                                    author={e.author.displayName}
                                    userId={e.author.userId}
                                    profileImg={e.author.pictureUrl}
                                    pollTitle={e.title}
                                    pollNo={e.pollNo}
                                    datetime={e.createdAt}
                                    likes={e.liked}
                                    voted={e.voted}
                                    canDelete={userId === e.author.userId}
                                    description={e.description}
                                    onDelete={this.deletePoll}
                                    />
                )
            })
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
        const feedRes = await fetch(config.host + '/api/main')
        .then(res => res.json())
        .catch(err => console.log(err))

        const feedList = feedRes.feedList

        this.setState({data: feedList})
    }

    deletePoll = async (pollNo) => {
        await fetch(config.host + '/api/poll/' + pollNo, {
            method: 'DELETE'
        }).catch(err => console.log(err))
        this.getFeeds()
    }

    componentDidMount() {
        this.getFeeds();
        this.getWhoIAm();
    }
}

export default Home;