import React, { Component } from 'react';
import './Thread.css';


const url = 'http://localhost:3001/comment';

class CreateComment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: "",
            // comments: []
        }
    }

    onFormChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        })
    }

    onFormSubmit = async event => {
        event.preventDefault();
        let data = {
            content: this.state.content,
            threadId: this.props.threadId

        }
        await fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            return response.json();
        })
        const commentArray = []
        commentArray.push(data)
        this.setState({
            content: "",
            // comments: commentArray
        })

    }

    render() {
        return (
            <div className='createCommentPage'>
                <h3 className="comment_form_title">Respond To This Post</h3>
                <form onSubmit={(event) => {
                    this.onFormSubmit(event)
                }} id="comment_form">
                    <textarea rows='4' cols='40' className='comment_input_box' value={this.state.content} onChange={this.onFormChange} name='content' placeholder='Enter comments here'></textarea>
                    <button className="comment_submit_button">Comment</button>

                </form>


            </div>
        )
    }
}

export default CreateComment;
