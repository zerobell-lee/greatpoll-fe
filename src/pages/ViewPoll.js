import React, { Component } from 'react';
import { Button, Switch } from 'antd';
import PollHeader from '../components/PollHeader';
import PollContent from '../components/PollContent';
import VoteResult from '../components/VoteResult';
import config from '../global-config';

class ViewPoll extends Component {
    constructor(props) {
        super(props)
        this.state = { pollNo: props.match.params.pollNo, data: null, viewResult: false }
        this._callApi.bind(this)
    }

    _callApi = async () => {
        let fetchedData = await fetch(config.host + '/api/poll/' + this.state.pollNo)
        .then(res => res.json())
        .catch(err => console.log(err))

        fetchedData.content.questions = fetchedData.content.questions.map(q => {
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
            state.data.content.questions = state.data.content.questions.map(q => {
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

    submitVote = async (e) => {
        const vote = this.state.data.content.questions.map(q => {
            return (
                q.answers.filter(a => a.checked).map(a => a.answerNo)
            )
        })

        await fetch(config.host + '/api/vote/' + this.state.pollNo, {headers: {'Content-Type': 'application/json'},
        method: 'post',
        body: JSON.stringify({pollNo: this.state.pollNo, vote: vote})})
        .then(res => res.json())
        .catch(err => console.log(err))
        console.log(vote)
        this._callApi()
    }

    toggleMode = (checked) => {
        this.setState({viewResult: checked})
    }

    render() {
        if (!this.state.data) {
            return <p>Loading...</p>
        }
        return (
            <div className="poll-container">
                rendered.
                <PollHeader 
                    title={this.state.data.content.title}
                    description={this.state.data.content.description}
                    author={this.state.data.author}
                    createdAt={this.state.data.createdAt}
                    closedAt={this.state.data.content.closedAt}
                    voted={this.state.data.voted}
                    liked={this.state.data.liked}
                />
                <Switch defaultChecked={this.state.viewResult} onChange={this.toggleMode} />
                {!this.state.viewResult && <PollContent 
                    questions={this.state.data.content.questions}
                    onAnswerChanged={this.handleChangedAnswer}
                />}
                {this.state.viewResult && <VoteResult 
                    questions={this.state.data.content.questions}
                    totalResult={this.state.data.totalResult.vote}
                />}
                <Button type='primary' onClick={this.submitVote}>
                    Confirm
                </Button>
            </div>
        )
    }

    componentDidMount() {
        console.log(this.state)
        this._callApi()
    }
}

export default ViewPoll;