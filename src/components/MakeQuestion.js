import React, {Component} from 'react';
import MakeAnswer from './MakeAnswer';

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

    render() {
        return (
            <div>
                Question
                <input type="text" defaultValue={this.props.questionLabel} onChange={this.handleChange}/>
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