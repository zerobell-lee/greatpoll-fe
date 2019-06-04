import React, { Component } from 'react';
import { Button, Switch } from 'antd';
import PollHeader from '../components/PollHeader';
import PollContent from '../components/PollContent';
import VoteResult from '../components/VoteResult';
import config from '../global-config';

class ViewPoll extends Component {
    constructor(props) {
        super(props)
        this.state = { pollNo: props.match.params.pollNo, data: null, viewResult: false, loggedIn: false, viewPollMode: 'view'}
        this._callApi.bind(this)
    }

    _callApi = async () => {
        let fetchedData = await fetch(config.host + '/api/poll/' + this.state.pollNo)
        .then(res => res.json())
        .catch(err => console.log(err))

        let existMyVote = false
        if (fetchedData.myVoteResult) {
            if (fetchedData.myVoteResult.vote.length) {
                existMyVote = true
            }
        }

        if (existMyVote) {
            fetchedData.content.questions = fetchedData.content.questions.map((q, i) => {
                return ({...q, answers: q.answers.map(a => {
                        if (fetchedData.myVoteResult.vote[i].includes(a.answerNo)) {
                            return (
                                {...a, checked: true}
                            )
                        }
                        return (
                            {...a, checked : false}
                        )
                })})
            })
        }
        else {
            fetchedData.content.questions = fetchedData.content.questions.map((q, i) => {
                return ({...q, answers: q.answers.map(a => {
                        return (
                            {...a, checked : false}
                        )
                })})
            })
        }

        

        console.log(fetchedData)
        this.setState({data: fetchedData})
    }

    _checkLogin = async() => {
        const profile = await fetch(config.host + '/api/user')
        .then(res => res.json())
        .catch(err => false)

        if (!profile) {
            return
        }

        this.setState({loggedIn: true})
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
        .catch(err => alert('전송에 실패했다능...'))
        console.log(vote)
        this.changeViewPollMode()
        this._callApi()
    }

    toggleMode = (checked) => {
        this.setState({viewResult: checked})
    }

    changeViewPollMode = (value) => {
        if (this.state.viewPollMode === 'view') {
            this.setState({viewPollMode: 'vote'})
        }
        else {
            this.setState({viewPollMode: 'view'})
        }
    }

    render() {
        if (!this.state.data) {
            return <p>Loading...</p>
        }
        return (
            <div className="poll-container">
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
                    loggedIn={this.state.loggedIn}
                    myResult={this.state.myResult}
                    mode={this.state.viewPollMode}
                    changeMode={this.changeViewPollMode}
                />}
                {this.state.viewResult && <VoteResult 
                    questions={this.state.data.content.questions}
                    totalResult={this.state.data.totalResult.vote}
                />}
                {
                    this.state.viewPollMode==='vote'&&!this.state.viewResult&&
                        <Button type='primary' onClick={this.submitVote}>
                            Confirm
                        </Button>
                }
                {
                    this.state.viewPollMode==='vote'&&
                    <Button onClick={this.changeViewPollMode}>
                        Cancel
                    </Button>
                }
                
            </div>
        )
    }

    componentDidMount() {
        console.log(this.state)
        this._callApi()
        this._checkLogin()
    }
}

export default ViewPoll;