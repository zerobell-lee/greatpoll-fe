import React, { Component } from 'react';
import ViewQuestion from './ViewQuestion';
import { Button } from 'antd';

class PollContent extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        let canClick = false
        if (this.props.loggedIn && this.props.canVote) {
            canClick = true
        }
            return (
                <div>
                    {this.props.mode === 'view' && this.props.loggedIn&& this.props.canVote && <Button onClick={this.props.changeMode}>Vote</Button>}
                    {!this.props.canVote && <p>이미 종료된 설문입니다.</p>}
                    {this.props.questions.map(q => {
                            return (
                                <ViewQuestion questionNo={q.questionNo} 
                                    questionLabel={q.questionLabel} 
                                    onAnswerChanged={this.props.onAnswerChanged} 
                                    answers={q.answers}
                                    shouldSelect={q.shouldSelect}
                                    canClick={this.props.mode !== 'view' && canClick}
                                />
                            )
                        })}
                </div>
            )
        
    }
    
    
}

export default PollContent;