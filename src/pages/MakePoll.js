import React, { Component } from 'react';
import MakeQuestion from '../components/MakeQuestion';
import { withRouter } from 'react-router-dom';

class MakePoll extends Component {

    constructor(props) {
        super(props)
        this.state = { data: 
            {
                title: "",
                questions: [
                    {
                        questionNo: 1,
                        questionLabel: "",
                        shouldSelect: 1,
                        answers: [
                            {answerNo: 1, answerLabel: ""},
                            {answerNo: 2, answerLabel: ""},
                            {answerNo: 3, answerLabel: ""}
                        ]
                    }]
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
                    q.answers = q.answers.concat({answerNo: q.answers.length + 1, answerLabel: ""})
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

    addQuestion = () => {
        this.setState(state => {
            let { data } = state
            let { questions } = data
            questions = questions.concat({questionNo: questions.length + 1, questionLabel: "New Question", shouldSelect: 1, answers: [{answerNo: 1, answerLabel: ""}]})
            data = {...data, questions}
            state = {...state, data}

            return state
        })
    }

    changeTitle = (e) => {
        const value = e.target.value
        this.setState(state => {
            state.data.title = value;
            return state
        })
    }

    sendPoll = async () => {
        const { data } = this.state;
        await fetch('https://greatpoll-test.herokuapp.com/api/poll', {
            headers: {'Content-Type': 'application/json'},
            method: 'post',
            body: JSON.stringify(data)
        })
        this.props.history.push('/')
    }

    render() {
        return (
            <div>
                <h1>Title</h1>
                <input value={this.state.data.title} onChange={this.changeTitle}/>
                {this.state.data.questions.map(q => {
                    return (
                        <MakeQuestion shouldSelect={q.shouldSelect} questionNo={q.questionNo} questionLabel={q.questionLabel} addAnswer={this.addAnswer} changeQuestionLabel={this.changeQuestionLabel} answers={q.answers} changeAnswerLabel={this.changeAnswerLabel}/>
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