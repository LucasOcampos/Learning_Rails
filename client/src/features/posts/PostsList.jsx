import React, { useState, useEffect } from 'react';
import { API_URL } from "../../constants.js";

function PostsList() {
    const [posts, setPosts] = useState([]);
    const [, setLoading] = useState(true);
    const [, setError] = useState(null);

    useEffect(() => {
        async function loadPosts() {
            try {
                const response = await fetch(API_URL);
                if (!response.ok) {
                    throw response;
                }

                const data = await response.json();
                setPosts(data);
            } catch (error) {
                setError(error);
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        loadPosts()
    }, [])

    return (
        <div>Posts List
            {posts.map(post => (
                <div key={post.id} className="post-container">
                    <h2>{post.title}</h2>
                    <p>{post.body}</p>
                </div>
            ))}
        </div>
    );
}

export default PostsList;