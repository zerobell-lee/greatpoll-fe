import React from 'react';
import QuestionChart from './QuestionChart';

const VoteResult = ({ questions, totalResult }) => {
    return (
        questions.map((q, i) => {
            return (
                <QuestionChart question={q} voteResult={totalResult[i]} />
            )
        })
    )
}

export default VoteResult;