import React, { Component } from 'react';
import MakeQuestion from '../components/MakeQuestion';
import { withRouter } from 'react-router-dom';
import { Input, DatePicker } from 'antd';
import moment from 'moment';
import config from '../global-config';

class MakePoll extends Component {

    constructor(props) {
        super(props)
        this.state = { data: 
            {
                title: "",
                questions: [
                    {
                        questionNo: 0,
                        questionLabel: "",
                        shouldSelect: 1,
                        answers: [
                            {answerNo: 0, answerLabel: ""},
                            {answerNo: 1, answerLabel: ""},
                            {answerNo: 2, answerLabel: ""}
                        ]
                    }],
                closedAt: new Date(Date.now() + 360000000),
                description: ''
            }}
        this.addAnswer.bind(this)
        this.changeQuestionLabel.bind(this)
        this.changeAnswerLabel.bind(this)
        this.addQuestion.bind(this)
    }

    addAnswer = (questionNo) => {
        console.log("questionNo : " + questionNo)
        this.setState(state => {
            let { data } = state
            let { questions } = data
            questions = questions.map(q => {
                if (q.questionNo === questionNo) {
                    q.answers = q.answers.concat({answerNo: q.answers.length, answerLabel: ""})
                }
                return q
            })
            console.log(questions)
            data = {...data, questions}
            state = {...state, data}

            return state
        })
    }

    changeQuestionLabel = (questionNo, newLabel) => {
        this.setState(state => {
            let { data } = state
            let { questions } = data
            questions = questions.map(q => {
                if (q.questionNo === questionNo) {
                    return {...q, questionLabel: newLabel}
                }
                return q
            })
            data = {...data, questions}
            state = {...state, data}

            return state
        })
    }

    changeAnswerLabel = (questionNo, answerNo, newLabel) => {
        this.setState(state => {
            let { data } = state
            let { questions } = data
            questions = questions.map(q => {
                if (q.questionNo === questionNo) {
                    q.answers = q.answers.map(a => {
                        if (a.answerNo === answerNo) {
                            return {...a, answerLabel: newLabel}
                        }
                        return a
                    })
                }
                return q
            })
            data = {...data, questions}
            state = {...state, data}

            return state
        })
    }

    changeShouldSelect = (questionNo, newShouldSelect) => {
        this.setState(state => {
            let { data } = state
            let { questions } = data
            questions = questions.map(q => {
                if (q.questionNo === questionNo) {
                    return {...q, shouldSelect: newShouldSelect}
                }
                return q
            })
            data = {...data, questions}
            state = {...state, data}

            return state
        })
    }

    addQuestion = () => {
        this.setState(state => {
            let { data } = state
            let { questions } = data
            questions = questions.concat({questionNo: questions.length, questionLabel: "New Question", shouldSelect: 1, answers: [{answerNo: 0, answerLabel: ""}, {answerNo: 1, answerLabel: ""}]})
            data = {...data, questions}
            state = {...state, data}

            return state
        })
    }

    deleteAnswer = (qNo, aNo) => {
        console.log('qNo : ' + qNo)
        let { state } = this
        let { data } = state
        let { questions } = data
        questions = questions.map(q => {
            if (q.questionNo === qNo) {
                if (q.answers.length !== 1) {
                    q.answers.splice(aNo, 1)
                    q.answers = q.answers.map((a, i) => {
                        return {...a, answerNo: i}
                    })
                    console.log(q.answers)
                }
            }
            return q
        })
        data = {...data, questions: questions}
        state = {...state, data: data}
        console.log(state)

        this.setState(state)
    }

    changeTitle = (e) => {
        const value = e.target.value
        this.setState(state => {
            state.data.title = value;
            return state
        })
    }

    changeDescription = (e) => {
        const value = e.target.value
        this.setState(state => {
            state.data.description = value;
            return state
        })
    }

    sendPoll = async () => {
        const { data } = this.state;
        await fetch(config.host + '/api/poll', {
            headers: {'Content-Type': 'application/json'},
            method: 'post',
            body: JSON.stringify(data)
        })
        this.props.history.push('/')
    }

    handleDateTimeChanged = (value) => {
        this.setState({data: {...this.state.data, closedAt: value.toDate()}})
    }

    render() {
        return (
            <div>
                <h1>Title</h1>
                <Input size='large' value={this.state.data.title} onChange={this.changeTitle}/>
                <h2>Closed At</h2>
                <DatePicker showTime value={moment(this.state.data.closedAt)} onOk={this.handleDateTimeChanged}/>
                <h2>Description</h2>
                <Input size='large' value={this.state.data.description} onChange={this.changeDescription} />
                {this.state.data.questions.map(q => {
                    return (
                        <MakeQuestion 
                            key={q.questionNo}
                            shouldSelect={q.shouldSelect}
                            questionNo={q.questionNo}
                            questionLabel={q.questionLabel}
                            addAnswer={this.addAnswer}
                            changeQuestionLabel={this.changeQuestionLabel}
                            answers={q.answers}
                            changeAnswerLabel={this.changeAnswerLabel}
                            changeShouldSelect={this.changeShouldSelect}
                            deleteAnswer={this.deleteAnswer}
                            />
                    )
                })}

                <div onClick={this.addQuestion}>
                    Add Question
                </div>

                <div onClick={this.sendPoll}>
                    Confirm
                </div>
            </div>
        )
    }

}

export default withRouter(MakePoll);