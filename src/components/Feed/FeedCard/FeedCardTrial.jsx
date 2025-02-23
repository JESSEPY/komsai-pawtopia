import React from "react";
import { useState, useEffect } from "react";
import instagramFeed from "../FeedData/FeedData";
import { NavLink } from "react-router-dom";
import Verified from "../../../assets/icons/verifiedPaw.svg";
import Ellipse from "../../Icons/Ellipse/Ellipse";
import FeedTag from "./FeedTag/FeedTag";
import { getAuth, onAuthStateChanged } from "firebase/auth";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Hooks
import { usePosts } from "../../../hooks/usePost";
import { useUser } from "../../../hooks/useUser";
import { useLikePost } from "../../../hooks/useLikePost";
import { useUserProfile } from "../../../hooks/userProfile";
//Utils
import { formatTime } from "../../../utils/formatTime";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation"; // For navigation buttons
import "swiper/css/pagination"; // For pagination dots
import "../../../customCss/customSwiperStyles.css";
import { Navigation, Pagination } from "swiper/modules";

//Icons
import { ReactComponent as LikeIcon } from "../../../assets/icons/userActions/heart.svg";
import Like from "../../Icons/Like/Like";
import Comment from "../../Icons/Comment/Comment";
import Bookmark from "../../Icons/Bookmark/bookmark";
import AdoptPetButton from "./AdoptPetButton/AdoptPetButton";

//FeedCaption
import FeedCaption from "./FeedCaption/FeedCaption";
import FeedItemSkeleton from "./FeedItemSkeleton";

//FormPics
import FeedMediaSlider from "./FeedMediaSlider";

const FeedItem = ({ post }) => {
  const { userProfile: authUserData, isLoading: isAuthUserLoading } =
    useUserProfile();

  // Fetch additional user data using the post's userId.
  const { userData, isLoading, error } = useUser(post.userId);

  console.log("User data for post:", post.userId, userData);

  // Map Firestore fields (or local fallback values) to the UI:
  const profileImg =
    userData?.profileImg || "https://pawtopia.scarlet2.io/images/image.png";
  const username = userData?.userName || "Unknown User"; // ✅ Fallback for missing usernames
  // Use createdAt from Firestore if available; otherwise fallback to post.time
  const time = post.createdAt
    ? formatTime(post.createdAt)
    : "Time not available";
  const tags = post.tags || [];
  // Use mediaUrls if available; fallback to the original field name "postImgs"
  const postImgs = post.postImgs || post.mediaUrls || [];
  // const likeCount = post.likeCount !== undefined ? post.likeCount : 0;
  const caption = post.caption || post.description || "";
  const commentCount = post.commentCount !== undefined ? post.commentCount : 0;
  const isVerified = userData?.isVerified || false;

  const { likeCount, hasLiked, isLiking, toggleLike } = useLikePost(post.id);

  // Action handlers (customize as needed)
  const handleLikeToggle = (isLiked) => {
    console.log("Liked state:", isLiked);
  };

  const handleCommentClick = () => {
    console.log("Comment clicked");
  };

  const handleBookmarkToggle = (isBookmarked) => {
    console.log("Bookmarked:", isBookmarked);
  };

  return (
    <div key={post.id} className="w-full h-auto mb-6">
      {/* Profile Picture, Username, Time, Donate */}
      <div className="w-full h-auto flex items-center justify-between mb-2">
        <div className="flex items-center gap-x-2">
          <NavLink
            to="profile"
            className="flex items-center justify-center flex-col flex-shrink-0"
          >
            <div className="w-12 h-12 rounded-full object-cover p-[2px]">
              <img
                src={profileImg}
                alt={username}
                className="rounded-full w-full h-full object-cover p-[2.5px]"
              />
            </div>
          </NavLink>
          <div className="flex items-center gap-x-2">
            <p className="text-black text-sm font-medium">{username}</p>
            {isVerified && <img src={Verified} alt="Verified" />}
            <span className="inline-block w-1 h-1 rounded-full bg-gray-500"></span>
            <p className="text-customBlue/70 text-sm font-medium">{time}</p>
            <NavLink
              to="/"
              className="text-customBlue font-arpona font-medium text-sm"
            >
              Donate
            </NavLink>
          </div>
        </div>
        <Ellipse />
      </div>
      {/* Tags */}
      <div className="flex flex-wrap gap-2 mt-2">
        {tags.map((tag, index) => (
          <FeedTag key={index} tag={tag} />
        ))}
      </div>
      {/* Feed Image Slider */}
      <FeedMediaSlider postMedia={postImgs} onDoubleTap={toggleLike} />
      {/* <div className="w-full max-w-[614px] mx-auto mt-2 overflow-hidden rounded-2xl bg-white flex flex-col justify-start mb-2 aspect-[4/5]">
        <Swiper
          navigation={true}
          pagination={{ clickable: true }}
          modules={[Navigation, Pagination]}
          className="w-full h-full"
        >
          {postImgs.map((img, index) => (
            <SwiperSlide key={index}>
              <img
                src={img}
                alt={`Slide ${index + 1}`}
                className="w-full h-full rounded object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div> */}
      {/* Like, Comment, Share Actions */}
      <div className="w-full h-auto flex items-center justify-between">
        <div className="flex items-center gap-x-3">
          <Like liked={hasLiked} onToggle={toggleLike} />
          <Comment onClick={handleCommentClick} />
          <Bookmark initialBookmarked={false} onToggle={handleBookmarkToggle} />
        </div>
        {/* Show AdoptPetButton only if authenticated user is "Adopter" */}
        {!isAuthUserLoading && authUserData?.role === "Adopter" && (
          <AdoptPetButton />
        )}
      </div>
      {/* Like Count */}
      <div className="w-full h-auto mt-2">
        <p className="text-black text-sm font-semibold">
          {likeCount}{" "}
          <span className="text-sm font-arpona font-light">likes</span>
        </p>
      </div>
      {/* Caption */}
      <FeedCaption
        username={username}
        isVerified={isVerified}
        caption={caption}
      />
      {/* Comment Count */}
      <div className="w-full h-auto flex items-center gap-x-1 my-2">
        <div className="w-full h-auto text-sm text-gray-200 font-arpona font-medium">
          <NavLink to="/comment" className="text-black font-light my-2">
            View All {commentCount} Comments
          </NavLink>
        </div>
      </div>
      {/* Add Comment Input */}
      <div className="w-full h-auto flex items-center justify-between border-b border-b-gray-300">
        <input
          type="text"
          className="w-[90%] h-auto bg-transparent border-none outline-none text-sm placeholder:text-sm placeholder:font-light"
          placeholder="Add a comment..."
        />
      </div>
    </div>
  );
};

const FeedCard = () => {
  const { posts, loadingPosts, errorPosts } = usePosts();

  if (errorPosts) return <div>Error loading posts: {errorPosts.message}</div>;

  return (
    <div className="feed-container">
      {loadingPosts && posts.length === 0
        ? Array.from({ length: 5 }).map((_, index) => (
            <FeedItemSkeleton key={index} />
          ))
        : posts.map((post, index) => <FeedItem key={post.id} post={post} />)}
    </div>
  );
};
export default FeedCard;
