import { useState } from "react";

import Posts from "../components/common/Posts.jsx";
import CreatePost from  "./CreatePost.jsx";

import usePostsStore from "../store/posts.store.js";
import { useEffect } from "react";

const HomePage = () => {
	const [feedType, setFeedType] = useState("forYou");
	const { posts, fetchPosts, isLoading, fetchFollowingPosts } = usePostsStore();

    useEffect(()=>{
		if(feedType==="following"){
			fetchFollowingPosts();
		}else{
			fetchPosts();
		}
	}, [feedType]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

	return (
		<>
			<div className='flex-[4_4_0] mr-auto border-r border-gray-700 min-h-screen'>
				{/* Header */}
				<div className='flex w-full border-b border-gray-700'>
					<div
						className={
							"flex justify-center flex-1 p-3 hover:bg-primary hover:text-black transition duration-300 cursor-pointer relative"
						}
						onClick={() => setFeedType("forYou")}
					>
						For you
						{feedType === "forYou" && (
							<div className='absolute bottom-0 w-10  h-1 rounded-full bg-primary'></div>
						)}
					</div>
					<div
						className='flex justify-center flex-1 p-3 hover:bg-primary hover:text-black transition duration-300 cursor-pointer relative'
						onClick={() => setFeedType("following")}
					>
						Following
						{feedType === "following" && (
							<div className='absolute bottom-0 w-10  h-1 rounded-full bg-primary'></div>
						)}
					</div>
				</div>

				{/*  CREATE POST INPUT */}
				<CreatePost />
				{/* POSTS */}
				<Posts posts={posts} feedType={feedType} isLoading={isLoading} />
			</div>
		</>
	);
};
export default HomePage;