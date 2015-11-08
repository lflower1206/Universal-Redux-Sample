import fetch from 'isomorphic-fetch';

export var fetchPosts = function(reddit, cb) {

    fetch(`http://localhost:3000/api/reactjs`)
        .then(response => response.json())
        .then(json => cb(json));

};
