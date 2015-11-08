import React, { PropTypes, Component } from 'react';

class Posts extends Component {
    
    constructor(props) {
        super(props);
    }

    render() {
        const { posts } = this.props;

        return (
            <ul>
                {
                    posts.map((post, index) => {
                        <li key={index}>{post.title}</li>
                    })
                }
            </ul>
        );
    }
};

Posts.propTypes = {
    posts: PropTypes.array.isRequired
};

export default Posts
