import { combineReducers } from 'redux';
import { selectedReddit, postsByReddit } from './redditPosts';

const rootReducer = combineReducers({
    selectedReddit, 
    postsByReddit
});

export default rootReducer;
