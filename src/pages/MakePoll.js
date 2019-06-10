import React, { Component } from 'react';
import MakeQuestion from '../components/MakeQuestion';
import { withRouter } from 'react-router-dom';
import { Input, DatePicker, Button } from 'antd';
import moment from 'moment';
import config from '../global-config';
import uuidv4 from 'uuid/v4';
import './MakePoll.css';
import TextArea from 'antd/lib/input/TextArea';

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
                        uuid: uuidv4(),
                        answers: [
                            {answerNo: 0, answerLabel: "", uuid: uuidv4()},
                            {answerNo: 1, answerLabel: "", uuid: uuidv4()},
                            {answerNo: 2, answerLabel: "", uuid: uuidv4()}
                        ]
                    }],
                closedAt: new Date(Date.now() + 3600000),
                description: ''
            }}
        this.addAnswer.bind(this)
        this.changeQuestionLabel.bind(this)
        this.changeAnswerLabel.bind(this)
        this.addQuestion.bind(this)

        console.log(this.state.data.closedAt)
    }

    addAnswer = (questionNo) => {
        console.log("questionNo : " + questionNo)
        this.setState(state => {
            let { data } = state
            let { questions } = data
            questions = questions.map(q => {
                if (q.questionNo === questionNo) {
                    q.answers = q.answers.concat({answerNo: q.answers.length, answerLabel: "", uuid: uuidv4()})
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
            questions = questions.concat({
                questionNo: questions.length,
                questionLabel: "New Question",
                shouldSelect: 1,
                uuid: uuidv4(),
                answers: [{answerNo: 0, answerLabel: "", uuid: uuidv4()}, {answerNo: 1, answerLabel: "", uuid: uuidv4()}]})
            data = {...data, questions}
            state = {...state, data}

            return state
        })
    }

    deleteAnswer = (qNo, aNo) => {
        console.log('qNo : ' + qNo)
        const { data } = this.state
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

        this.setState({data: {...data, questions}})
    }

    deleteQuestion = (qNo) => {
        if (this.state.data.questions.length === 1) return;

        this.setState(state => {
            let { data } = state
            let { questions } = data
            questions.splice(qNo, 1)
            questions = questions.map((q, i) => { return {...q, questionNo: i}})
            data = {...data, questions: questions}
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

    changeDescription = (e) => {
        const value = e.target.value
        this.setState(state => {
            state.data.description = value;
            return state
        })
    }

    sendPoll = async () => {
        const { data } = this.state;
        const result = await fetch(config.host + '/api/poll', {
            headers: {'Content-Type': 'application/json'},
            method: 'post',
            body: JSON.stringify(data)
        }).then(res => {
            if (res.status!==200) {
                return {success: false, msg: res.text()}
            }
            return {success: true, msg: 'Successed'}
        }).catch(err => {
            console.log(err)
        })

        if (result.success === false) {
            alert(result.msg)
        }
        else {
            this.props.history.push('/')
        }

        
    }

    handleDateTimeChanged = (value) => {
        console.log(value)
        console.log(value.toDate())
        this.setState({data: {...this.state.data, closedAt: value.toDate()}})
    }

    render() {
        const { data : {title, questions, description, closedAt}} = this.state;
        return (
            <div>
                <div className='make-poll-header'>
                    <Input id={'poll-title'} placeholder='Input a title of poll.' value={title} onChange={this.changeTitle}/>
                    <h2>Closed At</h2>
                    <DatePicker showTime value={moment(closedAt)} onChange={this.handleDateTimeChanged} onOk={this.handleDateTimeChanged}/>
                    <h2>Description</h2>
                    <TextArea size='large' value={description} onChange={this.changeDescription} />
                </div>
                <div className='make-poll-content'>
                {questions.map(q => {
                    return (
                        <MakeQuestion 
                            key={q.uuid}
                            shouldSelect={q.shouldSelect}
                            questionNo={q.questionNo}
                            questionLabel={q.questionLabel}
                            addAnswer={this.addAnswer}
                            changeQuestionLabel={this.changeQuestionLabel}
                            answers={q.answers}
                            changeAnswerLabel={this.changeAnswerLabel}
                            changeShouldSelect={this.changeShouldSelect}
                            deleteAnswer={this.deleteAnswer}
                            deleteQuestion={this.deleteQuestion}
                            />
                    )
                })}

                <Button type='primary' onClick={this.addQuestion} className='add-question'>
                    Add Question
                </Button>

                <Button onClick={this.sendPoll}>
                    Confirm
                </Button>
                </div>
            </div>
        )
    }

}

export default withRouter(MakePoll);