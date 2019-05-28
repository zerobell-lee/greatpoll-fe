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
                                    voted={e.voted}/>
                )
            })
        )
        
    }

    getFeeds = async () => {
        const feedRes = await fetch(config.host + '/api/main')
        .then(res => res.json())
        .catch(err => console.log(err))

        const feedList = feedRes.feedList
        let myId = ""
        if (feedRes.profile) {
            myId = feedRes.profile.userId
        }

        this.setState({data: feedList, userId: myId})
        this.props.onAuthed(myId)
    }

    componentDidMount() {
        this.getFeeds();
    }
}

export default Home;