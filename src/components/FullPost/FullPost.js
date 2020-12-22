import React, { Component } from 'react';
import axios from 'axios';

import './FullPost.css';


class FullPost extends Component { 
     state = {
         singlePost: null
     }

    componentDidUpdate(){ 
      
        if(this.props.postId) { 
            if ( this.state.singlePost === null ||
                 (this.state.singlePost !== null && this.state.singlePost.id !== this.props.postId) )
            axios.get("posts/" + this.props.postId)
            .then( response => {
                
                this.setState({ 
                    singlePost: response.data
                });
                
            });
        }
        
    }

    deletePostHandler = () => {
        axios.delete("posts/" + this.props.postId)
        .then( response => {
            console.log(response);
        });
    }


    render () {
        let post = <div className="FullPost"><h1>Please select a Post!</h1></div>;
        if(this.state.singlePost != null){
            
            post = (
                <div className="FullPost">
                    <h1>{this.state.singlePost.title}</h1>
                    <p>{this.state.singlePost.body}</p>
                    <div className="Edit">
                        <button className="Delete" onClick={this.deletePostHandler}>Delete</button>
                    </div>
                </div>    
            );

        }
        
        return post;
    }
}

export default FullPost;