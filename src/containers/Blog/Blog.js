import React, { Component } from 'react';
import axios from 'axios';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';


class Blog extends Component {

    state = {
        posts: [],
        setSelectedPostId: null
    }

    componentDidMount() {
        axios.get("posts")
            .then(response => {
                const posts = response.data.slice(0,8);
                const updatedPosts = posts.map( post => {
                    return { 
                        ...post,
                        author: 'Babitha'
                    }
                });
                this.setState({
                    posts: updatedPosts
                })
            });
    }

    postSelectHanadler = (id) => {
        this.setState({
            setSelectedPostId: id
        });
    }



    render () {
        const posts = this.state.posts.map(post => {
            return <Post title={post.title} 
                         body={post.body}
                         key={post.id}
                         userId={post.userId}
                         author={post.author}
                         onclick={() => this.postSelectHanadler(post.id)}/>
        });
        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <section>
                    <FullPost postId={this.state.setSelectedPostId}/>
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;