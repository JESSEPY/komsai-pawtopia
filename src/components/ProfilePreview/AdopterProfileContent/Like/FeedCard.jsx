import React from "react";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Verified from "../../../../assets/icons/verifiedPaw.svg";
import Ellipse from "../../../Icons/Ellipse/Ellipse";
import FeedTag from "./FeedTag";
import { useParams } from "react-router-dom"; // Extract userId from URL

// Hooks
import { usePosts } from "../../../../hooks/usePost";
import { useUserLikedPostsById } from "../../../../hooks/useUserLikedPosts"; // ✅ Use the ID-based hook
import { useUser } from "../../../../hooks/useUser";
import { useLikePost } from "../../../../hooks/useLikePost";
import { useUserProfile } from "../../../../hooks/userProfile";
import { useComments } from "../../../../hooks/useComments"; // ✅ Import comments hook
import { addComment } from "../../../../services/commentService"; // ✅ Import comment service
//Utils
import { formatTime } from "../../../../utils/formatTime";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation"; // For navigation buttons
import "swiper/css/pagination"; // For pagination dots
import "../../../../customCss/customSwiperStyles.css";

//Icons
import Like from "../../../Icons/Like/Like";
import Comment from "../../../Icons/Comment/Comment";
import BookMark from "../../../Icons/Bookmark/Bookmark";

//FeedCaption
import FeedCaption from "../../../Feed/FeedCard/FeedCaption/FeedCaption";
import FeedItemSkeleton from "../../../Feed/FeedCard/FeedItemSkeleton";

//FormPics
import FeedMediaSlider from "../../../Feed/FeedCard/FeedMediaSlider";

//Comment Modal
import CommentModal from "../../../Feed/FeedCard/CommentModal";

//PostTags
import Tag from "../../../Feed/FeedCard/TagStyles";

import AdoptableModal from "../../../Feed/FeedCard/AdoptableModal";

const FeedItem = ({ post, openAdoptModal }) => {
  const { userProfile } = useUserProfile();

  const userIsVerified = userProfile?.isVerified;

  console.log("User Profile:", userProfile);
  console.log("User is verified:", userIsVerified);

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
  const isVerified = userData?.isVerified || false;
  const postType = post.postType || "ADOPT";

  const [inputText, setInputText] = useState("");

  const { comments } = useComments(post.id); // ✅ Fetch comments

  const [latestUserComment, setLatestUserComment] = useState(null); // ✅ Store only user’s latest comment

  const commentCount = comments.length; // ✅ Use actual comments length

  const { likeCount, hasLiked, isLiking, toggleLike } = useLikePost(post.id);

  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);

  const toggleCommentModal = () => setIsCommentModalOpen(!isCommentModalOpen);

  const handleAddComment = async () => {
    if (!inputText.trim()) return;

    // Add comment to Firestore
    await addComment(post.id, inputText.trim());

    // Store latest comment in state (✅ Like Instagram)
    setLatestUserComment({
      author: username,
      text: inputText.trim(),
    });

    setInputText("");
  };

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
      <Tag type={postType} />
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

      {/* Like, Comment, Share Actions */}
      <div className="w-full h-auto flex items-center justify-between">
        <div className="flex items-center gap-x-3">
          <Like liked={hasLiked} onToggle={toggleLike} />
          <Comment onClick={toggleCommentModal} />
          <BookMark initialBookmarked={false} onToggle={handleBookmarkToggle} />
        </div>

        {/* Comment Modal */}
        <CommentModal
          isOpen={isCommentModalOpen}
          onClose={toggleCommentModal}
          comments={comments}
          onAddComment={handleAddComment}
          postMedia={postImgs} // ✅ Pass media URLs
          profileImg={profileImg} // ✅ Pass profile image
          username={username} // ✅ Pass username
          postId={post.id} // ✅ Pass post ID for functional likes
        />
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
        <div className="w-full h-auto text-sm font-light">
          {/* "View All Comments" Button */}
          {commentCount > 0 && (
            <button
              onClick={toggleCommentModal}
              className="text-black font-light text-sm mt-1"
            >
              View all {commentCount} comments
            </button>
          )}
        </div>
      </div>
      {/* Add Comment Input */}
      <div className="flex items-center border-b border-gray-300 mt-2 pb-2 ">
        <input
          type="text"
          className="w-full text-sm outline-none border-none bg-transparent"
          placeholder="Add a comment..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <button
          onClick={handleAddComment}
          className="text-black text-sm font-medium"
        >
          Post
        </button>
      </div>
      {/* Show ONLY User's Latest Comment */}
      {latestUserComment && (
        <div className="text-sm font-500 mt-2">
          <p>
            <span className="font-semibold">{latestUserComment.author}:</span>{" "}
            {latestUserComment.text}
          </p>
        </div>
      )}
    </div>
  );
};

const FeedCard = () => {
  const { userId } = useParams(); // ✅ Extract userId from URL

  // ✅ Fetch liked posts for a specific user by ID
  const { likedPosts, loadingLikedPosts, errorLikedPosts } =
    useUserLikedPostsById(userId);

  console.log(`Liked Posts for User ${userId}:`, likedPosts); // Debugging

  const [selectedPost, setSelectedPost] = useState(null);

  // Function to open modal & pass post data
  const openAdoptModal = (post) => {
    setSelectedPost(post);
  };

  // Function to close the modal
  const closeAdoptModal = () => {
    setSelectedPost(null);
  };

  // Handle errors
  if (errorLikedPosts) {
    return <div>Error loading liked posts: {errorLikedPosts.message}</div>;
  }

  return (
    <div className="feed-container">
      {/* ✅ Show skeleton loader if posts are still loading */}
      {loadingLikedPosts && likedPosts.length === 0
        ? Array.from({ length: 5 }).map((_, index) => (
            <FeedItemSkeleton key={index} />
          ))
        : likedPosts.length > 0
        ? likedPosts.map((post) => (
            <FeedItem
              key={post.id}
              post={post}
              openAdoptModal={openAdoptModal}
            />
          ))
        : // ✅ Show fallback message when no liked posts exist
          !loadingLikedPosts && <p>No liked posts yet.</p>}

      {/* ✅ Render Modal if `selectedPost` is set */}
      {selectedPost && (
        <AdoptableModal
          isOpen={!!selectedPost}
          onClose={closeAdoptModal}
          adoptable={selectedPost}
          tags={selectedPost.tags} // Pass tags to modal
        />
      )}
    </div>
  );
};

export default FeedCard;
