import { useRef, useState } from "react";
import { Link } from "react-router-dom";

import Posts from "../../components/common/Posts";
import {POSTS} from "../../utils/db/dummy.js"

import { FaArrowLeft } from "react-icons/fa6";
import { IoCalendarOutline } from "react-icons/io5";
import { FaLink } from "react-icons/fa";
import { MdEdit } from "react-icons/md";

// ✅ Dummy user data
const USER = {
	_id: "1",
	fullname: "leeza",
	username: "leeza",
	bio: "Full Stack Developer | MERN",
	profileImg: "/avatar-placeholder.png",
	coverImg: "/cover.png",
	link: "https://github.com/leeza",
	followers: [1, 2, 3],
	following: [1, 2],
	createdAt: "2023-01-01",
};

const ProfilePage = () => {
	const [coverImg, setCoverImg] = useState(null);
	const [profileImg, setProfileImg] = useState(null);
	const [feedType, setFeedType] = useState("posts");

	const coverImgRef = useRef(null);
	const profileImgRef = useRef(null);

	const isLoading = false;
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

	return (
		<div className="flex-[4_4_0] border-r border-gray-700 min-h-screen">
			{!isLoading && (
				<>
					{/* TOP HEADER */}
					<div className="flex gap-8 px-4 py-2 items-center">
						<Link to="/">
							<FaArrowLeft />
						</Link>
						<div>
							<p className="font-bold text-lg">{USER.fullname}</p>
							<span className="text-sm text-slate-500">
								{POSTS.length} posts
							</span>
						</div>
					</div>

					{/* COVER IMAGE */}
					<div className="relative">
						<img
							src={coverImg || USER.coverImg}
							className="h-52 w-full object-cover"
							alt="cover"
						/>

						{isMyProfile && (
							<button
								className="absolute top-2 right-2 bg-gray-800 bg-opacity-80 p-2 rounded-full"
								onClick={() => coverImgRef.current.click()}
							>
								<MdEdit className="text-white" />
							</button>
						)}

						<input
							type="file"
							hidden
							ref={coverImgRef}
							accept="image/*"
							onChange={(e) => handleImgChange(e, "cover")}
						/>

						{/* PROFILE IMAGE */}
						<div className="absolute -bottom-16 left-4">
							<div className="relative">
								<img
									src={profileImg || USER.profileImg}
									className="w-32 h-32 rounded-full border-4 border-gray-900 object-cover"
									alt="avatar"
								/>
								{isMyProfile && (
									<MdEdit
										className="absolute bottom-1 right-1 bg-primary p-1 rounded-full text-white cursor-pointer"
										onClick={() => profileImgRef.current.click()}
									/>
								)}
							</div>

							<input
								type="file"
								hidden
								ref={profileImgRef}
								accept="image/*"
								onChange={(e) => handleImgChange(e, "profile")}
							/>
						</div>
					</div>

					{/* USER INFO (IMPORTANT FIX HERE) */}
					<div className="px-4 pt-20">
						<p className="font-bold text-lg">{USER.fullname}</p>
						<p className="text-slate-500">@{USER.username}</p>
						<p className="my-2">{USER.bio}</p>

						<div className="flex gap-4 text-sm text-slate-500">
							<a
								href={USER.link}
								target="_blank"
								rel="noreferrer"
								className="flex items-center gap-1 hover:underline"
							>
								<FaLink /> Website
							</a>
							<div className="flex items-center gap-1">
								<IoCalendarOutline /> Joined 2023
							</div>
						</div>

						<div className="flex gap-6 mt-2">
							<span>
								<b>{USER.following.length}</b>{" "}
								<span className="text-slate-500">Following</span>
							</span>
							<span>
								<b>{USER.followers.length}</b>{" "}
								<span className="text-slate-500">Followers</span>
							</span>
						</div>
					</div>

					{/* FEED TABS */}
					<div className="flex border-b border-gray-700 mt-4">
						<button
							className={`flex-1 p-3 ${
								feedType === "posts"
									? "border-b-4 border-primary font-semibold"
									: "text-slate-500"
							}`}
							onClick={() => setFeedType("posts")}
						>
							Posts
						</button>
						<button
							className={`flex-1 p-3 ${
								feedType === "likes"
									? "border-b-4 border-primary font-semibold"
									: "text-slate-500"
							}`}
							onClick={() => setFeedType("likes")}
						>
							Likes
						</button>
					</div>

					{/* POSTS */}
					<Posts feedType={feedType} username={USER.username} />
				</>
			)}
		</div>
	);
};

export default ProfilePage;