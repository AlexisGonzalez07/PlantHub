import React, { useState, useEffect } from "react";
import BlogForum from "../components/BlogForum";
import AddBlog from "../components/AddBlog";
import { useQuery } from "@apollo/client";
import { QUERY_POSTS } from "../utils/queries";

const Forum = () => {
  const { loading, data } = useQuery(QUERY_POSTS);
  const allPosts = data?.allPosts || [];
  const [allPost, setAllPost] = useState(allPosts);

  useEffect(() => {
    if (data) {
      setAllPost(data.allPosts);
    }
    console.log(data);
  }, [data]);

  console.log(allPosts);
  return (
    <main>
      <BlogForum allPost={allPost} />
      <AddBlog setAllPost={setAllPost} allPost={allPost} />
    </main>
  );
};

export default Forum;
