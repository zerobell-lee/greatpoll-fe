import React, { Component } from 'react'
import { HorizontalBar } from 'react-chartjs-2';

const QuestionChart = ({question, voteResult}) => {
    return (
        <HorizontalBar 
            data={
                {
                    labels: question.answers.map(a => a.answerLabel),
                    datasets: [
                        {
                            label: '응답량',
                            backgroundColor: 'rgba(255,99,132,0.2)',
                            borderColor: 'rgba(255,99,132,1)',
                            borderWidth: 1,
                            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                            hoverBorderColor: 'rgba(255,99,132,1)',
                            data: voteResult
                        }
                    ],
                }                
            }
            options={{
                title: {
                    display: true,
                    text: question.questionLabel
                },
                legend: {
                    display: false
                },
                scales: {
                    yAxes: [{
                        maxBarThickness: 50
                    }],
                    xAxes: [{
                        gridLines: {
                            display: false
                        }
                    }]
                }
            }}
            width={100}
            height={50}
        />
    )
}

export default QuestionChart;