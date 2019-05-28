import React from 'react';
import ViewQuestion from './ViewQuestion';

const PollContent = ({questions, onAnswerChanged}) => {
    return (
        <div>
            {questions.map(q => {
                    return (
                        <ViewQuestion questionNo={q.questionNo} 
                            questionLabel={q.questionLabel} 
                            onAnswerChanged={onAnswerChanged} 
                            answers={q.answers}
                            shouldSelect={q.shouldSelect}
                        />
                    )
                })}
        </div>
    )
}

export default PollContent;