import React, { Component } from 'react';

class ViewPoll extends Component {
    constructor(props) {
        super(props)
        this.state = { pollNo: props.match.params.pollNo, data: null }
        this._callApi.bind(this)
    }

    _callApi = async () => {
        const fetchedData = await fetch('https://greatpoll-test.herokuapp.com/api/poll/' + this.state.pollNo)
        .then(res => res.json())
        .catch(err => console.log(err))

        this.setState({data: fetchedData})
    }

    render() {
        if (!this.state.data) {
            return <p>Loading...</p>
        }
        return (
            <div className="poll-container">
                rendered.
                <h1>{this.state.data.poll.title}</h1>
                created by {this.state.data.userName}
                created at {this.state.data.datetime}
                {this.state.data.voted} Voted, {this.state.data.likes} Liked.
            </div>
        )
    }

    componentDidMount() {
        console.log(this.state)
        this._callApi()
    }
}

export default ViewPoll;