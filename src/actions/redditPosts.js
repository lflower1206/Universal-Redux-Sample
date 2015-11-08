import fetch from 'isomorphic-fetch';
import { fetchPosts as fetchPostsFromAPI } from '../api/redditPosts';

export const REQUEST_POSTS = 'REQUEST_POSTS';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const SELECT_REDDIT = 'SELECT_REDDIT';
export const INVALIDATE_REDDIT = 'INVALIDATE_REDDIT';

export var selectReddit = function(reddit) {
    return {
        type: SELECT_REDDIT,
        reddit
    };
};

export var invalidateReddit = function(reddit) {
    return {
        type: INVALIDATE_REDDIT,
        reddit
    };
};

export var fetchPostsIfNeeded = function(reddit) {
    return (dispatch, getState) => {
        if (shouldFetchPosts(getState(), reddit)) {
            return dispatch(fetchPosts(reddit));
        }
    };
};

var fetchPosts = function(reddit) {
    return dispatch => {
        dispatch(requestPosts(reddit));

        return fetchPostsFromAPI(reddit, json => {
            console.log(json);
            dispatch(receivePosts(reddit, json))
        });

        /*return fetch(`http://www.reddit.com/r/${reddit}.json`)
                .then(response => response.json())
                .then(json => dispatch(receivePosts(reddit, json)));*/
    };
};

var requestPosts = function(reddit) {
    return {
        type: REQUEST_POSTS,
        reddit
    };
};

var receivePosts = function(reddit, json) {
    return {
        type: RECEIVE_POSTS,
        reddit: reddit,
        posts: json.data.children.map(child => child.data),
        receivedAt: Date.now()
    };
};

var shouldFetchPosts = function(state, reddit) {
    const posts = state.postsByReddit[reddit];

    if (!posts) {
        return true;
    }

    if (posts.isFetching) {
        return false;
    }

    return posts.didInvalidate;
};
