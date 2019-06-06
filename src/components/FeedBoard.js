import React from 'react'
import Feed from './Feed';

const FeedBoard = ({feedList}) => {
    return (
        feedList.map(e => {
            return (
                <Feed 
                                    author={e.author.displayName}
                                    userId={e.author.userId}
                                    profileImg={e.author.pictureUrl}
                                    pollTitle={e.title}
                                    pollNo={e.pollNo}
                                    datetime={e.createdAt}
                                    likes={e.liked}
                                    voted={e.voted}/>
            )
        })
    )
}

export default FeedBoard;