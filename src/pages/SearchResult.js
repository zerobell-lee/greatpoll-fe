import React, { Component } from 'react';
import config from '../global-config';
import FeedBoard from '../components/FeedBoard';

class SearchResult extends Component {

    constructor(props) {
        super(props)
        this.state = {searchResult: []}
    }

    _fetchSearchResult = async () => {
        const searchResult = await fetch(config.host + '/api/search?query=' + this.props.match.params.query)
        .then(res => res.json())
        .catch(err => { console.log(err); return []})

        this.setState({searchResult})
    }

    componentDidMount() {
        this._fetchSearchResult();
    }

    componentDidUpdate = async (prevProps) => {
        if (this.props.match.params.query !== prevProps.match.params.query) {
            this._fetchSearchResult()
        }
    }

    render() {
        return (
            <>
            {this.state.searchResult && <FeedBoard feedList={this.state.searchResult} />}
            {!this.state.searchResult && "검색 결과가 아리마셍"}
            </>
            
        )
    }
}

export default SearchResult;