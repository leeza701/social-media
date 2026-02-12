import { useEffect } from "react";
import usePostsStore from "../store/posts.store.js";
import Post from "../components/common/Post.jsx";
const SavedPostPage = () => {
  const { savedPosts, fetchSavedPosts } = usePostsStore();

  useEffect(() => {
    fetchSavedPosts();
  }, []);

  if (!savedPosts.length) {
    return (
      <div className="flex justify-center items-center h-40">
        <h2 className="text-gray-500 text-lg">No saved posts yet 📌</h2>
      </div>
    );
  }
  return (
    <div className="border-l border-r border-gray-700 min-h-screen">
      <div className="p-4 border-b border-gray-700">
        <h1 className="text-xl font-bold">Saved Posts</h1>
      </div>

      {savedPosts.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </div>
  );
};

export default SavedPostPage;