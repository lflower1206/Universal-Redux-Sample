import React, {Component, PropTypes} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { selectReddit, fetchPostsIfNeeded, invalidateReddit } from '../actions/redditPosts';
import Posts from '../components/redditPosts/Posts';
import * as redditPostsActions from '../actions/redditPosts';

class App extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { dispatch, selectedReddit } = this.props;
        dispatch(fetchPostsIfNeeded(selectedReddit));
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.selectedReddit !== this.props.selectedReddit) {
            const { dispatch, selectedReddit } = nextProps;
            dispatch(fetchPostsIfNeeded(selectedReddit));
        }
    }

    render() {
        const { selectedReddit, posts, isFetching, lastUpdated } = this.props;
        return (
            <div>
                <p>Selected Reddit is : {selectedReddit}</p>
                <p>
                    {
                        lastUpdated &&
                        <span>
                            Last updated at {new Date(lastUpdated).toLocaleTimeString()}
                            {' '}
                        </span>
                    }
                </p>
                {
                    posts.length > 0 &&
                    <div style={{ opacity: isFetching? 0.5 : 1 }}>
                        <Posts posts={posts} />
                    </div>
                }
            </div>
        );
    }
}

App.propTypes = {
    selectedReddit: PropTypes.string.isRequired,
    posts: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number,
    dispatch: PropTypes.func.isRequired
}

var mapStateToProps = function(state) {
    const { selectedReddit, postsByReddit } = state;
    const { isFetching, lastUpdated, items: posts } = postsByReddit[selectedReddit] || {
        isFetching: true,
        items: []
    };

    return {
        selectedReddit,
        posts,
        isFetching,
        lastUpdated
    };
};

export default connect(mapStateToProps)(App);
