import React, { Component } from 'react';
import ViewAnswer from './ViewAnswer';

class ViewQuestion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            answers: props.answers
        }
    }

    handleSelected = (answerNo, newState) => {
        this.props.onAnswerChanged(this.props.questionNo, answerNo, newState)
    }

    render() {
        return (
            <div>
                <h2>
                    {"Q" + (this.props.questionNo + 1) + ". " + this.props.questionLabel} ({this.props.shouldSelect}개 선택)
                </h2>
                {this.state.answers.map(a => {
                    return (
                        <ViewAnswer 
                        answerNo={a.answerNo}
                        answerLabel={a.answerLabel}
                        onSelected={this.handleSelected}
                        checked={a.checked}
                        canClick={this.props.canClick}
                        />
                    )
                })}
                
            </div>
        )
    }
}

export default ViewQuestion;