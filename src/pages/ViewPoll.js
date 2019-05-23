import React, { Component } from 'react';
import ViewQuestion from '../components/ViewQuestion';

class ViewPoll extends Component {
    constructor(props) {
        super(props)
        this.state = { pollNo: props.match.params.pollNo, data: null }
        this._callApi.bind(this)
    }

    _callApi = async () => {
        let fetchedData = await fetch('https://greatpoll-test.herokuapp.com/api/poll/' + this.state.pollNo)
        .then(res => res.json())
        .catch(err => console.log(err))

        fetchedData.poll.questions = fetchedData.poll.questions.map(q => {
            return ({...q, answers: q.answers.map(a => {
                    return (
                        {...a, checked : false}
                    )
            })})
        })

        console.log(fetchedData)
        this.setState({data: fetchedData})
    }

    handleChangedAnswer = (questionNo, answerNo, newState) => {
        this.setState(state => {
            state.data.poll.questions = state.data.poll.questions.map(q => {
                if (q.questionNo === questionNo) {
                    q.answers = q.answers.map(a => {
                        if (a.answerNo === answerNo) {
                            a.checked = newState
                        }
                        return a
                    })
                }
                return q
            })
            return state
        })
    }

    submitVote = (e) => {
        const vote = this.state.data.poll.questions.map(q => {
            return (
                q.answers.filter(a => a.checked).map(a => a.answerNo)
            )
        })

        console.log(vote)
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
                {this.state.data.poll.questions.map(q => {
                    return (
                        <>
                        <ViewQuestion questionNo={q.questionNo} 
                        questionLabel={q.questionLabel} 
                        onAnswerChanged={this.handleChangedAnswer} 
                        answers={q.answers}/>
                        </>
                    )
                })}
                <div onClick={this.submitVote}>
                    Confirm
                </div>
            </div>
        )
    }

    componentDidMount() {
        console.log(this.state)
        this._callApi()
    }
}

export default ViewPoll;