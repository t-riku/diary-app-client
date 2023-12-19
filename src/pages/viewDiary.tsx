import React, { useEffect, useState } from "react";
import Post from "../components/Post";
import { PostType } from "../types";
import apiClient from "../lib/apiClient";

const viewDiary = () => {
  const [latestPosts, setLatestPosts] = useState<PostType[]>([]);

  useEffect(() => {
    const fetchLatestPosts = async () => {
      try {
        const response = await apiClient.get("/posts/get_latest_post");
        setLatestPosts(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchLatestPosts();
  }, []);
  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto py-4">
        <div className="mt-10">
          {latestPosts.map((post: PostType) => (
            <Post key={post.id} post={post} setLatestPosts={setLatestPosts} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default viewDiary;
