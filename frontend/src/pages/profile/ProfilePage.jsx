import { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import Posts from "../../components/common/Posts";
import ProfileHeaderSkeleton from "../../components/skeletons/ProfileHeaderSkeleton.jsx";
import EditProfileModal from "./EditProfileModal.jsx"
import usePostsStore from "../../store/posts.store.js";
import useAuthStore from "../../store/auth.store.js";

import { FaArrowLeft } from "react-icons/fa6";
import { IoCalendarOutline } from "react-icons/io5";
import { FaLink } from "react-icons/fa";
import { MdEdit } from "react-icons/md";

const ProfilePage = () => {
  const { authUser, isLoading } = useAuthStore();
  const { posts, createPost, isPending } = usePostsStore();
  const navigate = useNavigate();

  const [coverImg, setCoverImg] = useState(null);
  const [profileImg, setProfileImg] = useState(null);
  const [feedType, setFeedType] = useState("posts");

  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  const coverImgRef = useRef(null);
  const profileImgRef = useRef(null);
  const imgRef = useRef(null);
   

  useEffect(() => {
    if (!isLoading && !authUser) {
      navigate("/login");
    }
  }, [isLoading, authUser, navigate]);

  if (isLoading || !authUser) {
    return <ProfileHeaderSkeleton />;
  }

  const isMyProfile = true;

  const handleImgChange = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (type === "cover") setCoverImg(reader.result);
      if (type === "profile") setProfileImg(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handlePostImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => setImg(reader.result);
    reader.readAsDataURL(file);
  };

  const handleCreatePost = async () => {
    if (!text && !img) return;

    await createPost({ text, img });

    setText("");
    setImg(null);
  };

  return (
    <div className="flex-[4_4_0] border-r border-gray-700 min-h-screen">
      <div className="flex gap-10 px-4 py-2 items-center">
        <Link to="/">
          <FaArrowLeft />
        </Link>
        <div>
          <p className="font-bold">{authUser.fullname}</p>
          <span className="text-sm text-slate-500">{posts.length} posts</span>
        </div>
      </div>
      <div className="relative group">
        <img
          src={coverImg || authUser.coverImg || "/cover.png"}
          className="h-52 w-full object-cover"
        />

        {isMyProfile && (
          <button
            className="absolute top-2 right-2 bg-gray-800 p-2 rounded-full"
            onClick={() => coverImgRef.current.click()}
          >
            <MdEdit />
          </button>
        )}

        <input
          type="file"
          hidden
          ref={coverImgRef}
          onChange={(e) => handleImgChange(e, "cover")}
        />
        <div className="absolute -bottom-16 left-4">
          <img
            src={profileImg || authUser.profileImg || "/avatar-placeholder.png"}
            className="w-32 rounded-full border-4 border-black"
          />
          {isMyProfile && (
            <MdEdit
              className="absolute bottom-2 right-2 cursor-pointer"
              onClick={() => profileImgRef.current.click()}
            />
          )}
          <input
            type="file"
            hidden
            ref={profileImgRef}
            onChange={(e) => handleImgChange(e, "profile")}
          />
        </div>
      </div>

      <div className="flex justify-end px-4 mt-6">
        <EditProfileModal authUser={authUser} />
      </div>

      <div className="px-4 mt-20">
        <p className="font-bold">{authUser.fullname}</p>
        <p className="text-slate-500">@{authUser.username}</p>
        <p>{authUser.bio}</p>

        <div className="flex gap-4 mt-2 text-sm text-slate-500">
          {authUser.link && (
            <a href={authUser.link} target="_blank">
              <FaLink /> Website
            </a>
          )}
          <div>
            <IoCalendarOutline /> Joined{" "}
            {new Date(authUser.createdAt).getFullYear()}
          </div>
        </div>

        <div className="flex gap-4 mt-2">
          <span>
            <b>{authUser.following.length}</b> Following
          </span>
          <span>
            <b>{authUser.followers.length}</b> Followers
          </span>
        </div>
      </div>
      <div className="px-4 mt-6">
        <textarea
          className="textarea textarea-bordered w-full"
          placeholder="What's happening?"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        {img && (
          <div className="relative mt-2">
            <img src={img} className="rounded-lg max-h-60" />
            <button
              className="absolute top-1 right-1 btn btn-xs btn-circle"
              onClick={() => setImg(null)}
            >
              ✕
            </button>
          </div>
        )}

        <div className="flex justify-between mt-2">
          <input type="file" hidden ref={imgRef} onChange={handlePostImage} />
          <button
            className="btn btn-sm btn-outline"
            onClick={() => imgRef.current.click()}
          >
            Image
          </button>

          <button
            className="btn btn-primary btn-sm rounded-full"
            disabled={isPending}
            onClick={handleCreatePost}
          >
            {isPending ? "Posting..." : "Post"}
          </button>
        </div>
      </div>
      <div className="flex border-b border-gray-700 mt-4">
        <button
          className={`flex-1 p-3 ${
            feedType === "posts" && "border-b-4 border-primary"
          }`}
          onClick={() => setFeedType("posts")}
        >
          Posts
        </button>
        <button
          className={`flex-1 p-3 ${
            feedType === "likes" && "border-b-4 border-primary"
          }`}
          onClick={() => setFeedType("likes")}
        >
          Likes
        </button>
      </div>
      <Posts feedType={feedType} username={authUser.username} posts={posts} />
    </div>
  );
};

export default ProfilePage;