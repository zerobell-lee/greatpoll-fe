import React, {Component} from 'react';
import MakeAnswer from './MakeAnswer';
import { Input, InputNumber } from 'antd';

class MakeQuestion extends Component {

    constructor(props) {
        super(props)
        console.log(props)
        this.handleChange.bind(this)
        this.addAnswer.bind(this)
    }

    handleChange = (e) => {
        this.props.changeQuestionLabel(this.props.questionNo, e.target.value)
    }

    addAnswer = (e) => {
        this.props.addAnswer(this.props.questionNo)
    }

    handleShouldSelectChange = (value) => {
        this.props.changeShouldSelect(this.props.questionNo, value)
    }

    render() {
        return (
            <div>
                <h3>Question {this.props.questionNo + 1}</h3>
                Should Select
                <InputNumber size='large' min={1} max={this.props.answers.length - 1} defaultValue={this.props.shouldSelect} onChange={this.handleShouldSelectChange} />
                <Input size='large' defaultValue={this.props.questionLabel} onChange={this.handleChange}/>
                {this.props.answers.map(e => {
                    return (
                        <MakeAnswer questionNo={this.props.questionNo} answerNo={e.answerNo} label={e.label} changeAnswerLabel={this.props.changeAnswerLabel}/>
                    )
                })}
                <div onClick={this.addAnswer}>
                    Add answer
                </div>
            </div>
            
        )
    }

}

export default MakeQuestion;