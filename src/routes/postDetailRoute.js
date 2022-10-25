import React, { useState } from "react"
import { Link, useParams } from "react-router-dom";

const data = require('../models/post');
const detail = require('../models/comment');

function Detail() {
    const [, setCommentsDetail] = useState([]);
    const [textComment, setTextComment] = useState("");
    
    const { id } = useParams();

    const post = data.posts.find(position => position.id === parseInt(id));
    var comment = [];
    for (const findComment of detail.comments) {
        if (findComment.id === id) {
            comment.push(findComment);
        }
    }

    const addComment = (e) => {
        e.preventDefault();
        if (textComment.length === 0) return;
        const newComment = {
            id: id,
            context: textComment
        };
        detail.comments.push(newComment);
        setCommentsDetail(detail.comments);
        setTextComment("");
    }

    return (
        <div className="details">
            <h1>Detail Post</h1>
            <h2><u>Title:</u> {post.title}</h2>
            <p><u>Content:</u> {post.content}</p>
            <ul>
            {
                comment.map((item, index) => {
                    return (
                        <li key={index}>
                            <p id="comment">+ Comment: {item.context}</p>
                        </li>
                    )
                })
            }
            </ul>
            <form onSubmit={addComment}>
                <span>
                    <input type="text" maxlength="500" required value={textComment} onChange={(e) => setTextComment(e.target.value)} />
                    <input type="submit" value="Submit" />
                </span>
            </form>
            <Link to="/index">See All Posts</Link>
        </div>
    )
}

export default Detail;