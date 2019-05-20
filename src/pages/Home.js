import React, { Component } from 'react';
import Feed from '../components/Feed';

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
                                    author={e.userName}
                                    userId={e.userId}
                                    profileImg={e.profileImg}
                                    pollTitle={e.pollTitle}
                                    pollNo={e.pollNo}
                                    datetime={e.datetime}
                                    likes={e.likes}
                                    voted={e.voted}/>
                )
            })
        )
        
    }

    getFeeds = async () => {
        const feedRes = await fetch('https://greatpoll-test.herokuapp.com/api/main')
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