import React, { useState } from "react";
import { Link } from "react-router-dom";

const data = require('../models/post');

function Posts() {
    const [, setPostsData] = useState([]);
    const [textTitle, setTextTitle] = useState("");
    const [textContent, setTextContent] = useState("");

    const addPost = (e) => {
        e.preventDefault();
        if (textTitle.length === 0 || textContent.length === 0) return;
        const newPost = {
            id: data.posts.length ? data.posts[data.posts.length - 1].id + 1 : 1,
            title: textTitle,
            content: textContent
        };
        data.posts.push(newPost);
        setPostsData(data.posts);
        setTextTitle("");
        setTextContent("");
    }



    const removePost = (index) => {
        const newPosts = data.posts.filter(position => position.id !== parseInt(index));
        data.posts = newPosts;
        setPostsData(data.posts);
    }

    const editPost = (index) => {
        if (textTitle.length === 0 || textContent.length === 0) return;
        const post = data.posts.find(position => position.id === parseInt(index));
        post.title = textTitle;
        post.content = textContent;
        const newPosts = data.posts.filter(position => position.id !== parseInt(index));
        newPosts.push(post);
        newPosts.sort((a, b) => a.id > b.id ? 1 : a.id < b.id ? -1 : 0);
        data.posts = newPosts;
        setPostsData(data.posts);
        setTextTitle("");
        setTextContent("");
    }
    return (
        <div className="posts">
            <h1>Blog</h1>
            <form onSubmit={addPost}>
                <p>Title: <input id="title" type="text" maxlength="100" required value={textTitle} onChange={(e) => setTextTitle(e.target.value)} /></p>
                <p>Content: <input id="content" type="text" maxlength="5000" required value={textContent} onChange={(e) => setTextContent(e.target.value)} /></p>
                <input id="post" type="submit" value="Submit" />
            </form>

            <ul>
                {
                    data.posts.map((item, index) => {
                        return (
                            <li key={index}>
                                <div className="texts">
                                    <h4>Title: {item.title}</h4>
                                    <p id="content">Content: {item.content}</p>
                                </div>
                                <div className="buttons">
                                    <div><button id="edit" onClick={() => editPost(item.id)}>Update</button></div>
                                    <div><button id="delete" onClick={() => removePost(item.id)}>Remove</button></div>
                                </div>
                                <Link to={`/post/${item.id}`}>See Details</Link>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default Posts;