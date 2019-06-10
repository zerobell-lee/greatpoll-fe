import React, { Component } from 'react';
import config from '../global-config';
import FeedBoard from '../components/FeedBoard';

class SearchResult extends Component {

    constructor(props) {
        super(props)
        this.state = {searchResult: [], page: -1}
    }

    _fetchSearchResult = async () => {
        let { page } = this.state
        page += 1
        const searchResult = await fetch(config.host + '/api/search?query=' + this.props.match.params.query + '&page=' + page)
        .then(res => res.json())
        .catch(err => { console.log(err); return []})

        this.setState({searchResult: this.state.searchResult.concat(searchResult), page : page})
    }

    componentDidMount() {
        this._fetchSearchResult();
        this.props.changeInfiniteScrollHandler(true, this._fetchSearchResult)
    }

    componentDidUpdate = async (prevProps) => {
        if (this.props.match.params.query !== prevProps.match.params.query) {
            this.setState({page: 0})
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