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
import { useComments } from "../../../hooks/useComments"; // ✅ Import comments hook
import { addComment } from "../../../services/commentService"; // ✅ Import comment service
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
import BookMark from "../../Icons/Bookmark/Bookmark";
import AdoptPetButton from "./AdoptPetButton/AdoptPetButton";

//FeedCaption
import FeedCaption from "./FeedCaption/FeedCaption";
import FeedItemSkeleton from "./FeedItemSkeleton";

//FormPics
import FeedMediaSlider from "./FeedMediaSlider";

//Comment Modal
import CommentModal from "./CommentModal";

//PostTags
import Tag from "./TagStyles";

import AdoptableModal from "./AdoptableModal";

import InfiniteScroll from "react-infinite-scroll-component";

const FeedItem = ({ post, openAdoptModal }) => {
  const { userProfile } = useUserProfile();

  const userIsVerified = userProfile?.isVerified;

  console.log("User Profile:", userProfile);
  console.log("User is verified:", userIsVerified);

  const { userProfile: authUserData, isLoading: isAuthUserLoading } =
    useUserProfile();

  // Fetch additional user data using the post's userId.
  const { userData, isLoading, error } = useUser(post.userId);

  const role = userData?.role;

  console.log("User Role", role);

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

  const title = post.title || "Title not available";

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
            to={`/home/profile/${post.userId}`} // ✅ Navigate to dynamic profile preview
            className="flex items-center justify-center flex-col flex-shrink-0"
          >
            <div className="w-12 h-12 rounded-full object-cover p-[2px]">
              <img
                src={profileImg || "/default-profile.png"}
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
        {/* Show "Rehomed" badge if the pet has been adopted */}
        {post.adoptionStatus === "approved" && (
          <span className="bg-green-200 text-green-500 px-3 py-1 rounded-full text-sm font-semibold border border-green-500">
            #REHOMED
          </span>
        )}

        {/* Show AdoptPetButton only if post is "List a Pet" and not yet adopted */}
        {!isAuthUserLoading &&
          userIsVerified &&
          authUserData?.role === "Adopter" &&
          post.postType === "List a Pet" &&
          post.adoptionStatus !== "approved" && (
            <AdoptPetButton onClick={() => openAdoptModal(post, tags)} />
          )}

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
        title={title}
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
  const {
    posts,
    loadingPosts,
    errorPosts,
    hasMore,
    fetchMorePosts,
    loadingMore,
  } = usePosts();
  const [selectedPost, setSelectedPost] = useState(null);
  const [initialLoad, setInitialLoad] = useState(true);

  // ✅ Track first load to prevent "No posts available" from showing too soon
  useEffect(() => {
    if (!loadingPosts) {
      setInitialLoad(false);
    }
  }, [loadingPosts]);

  const openAdoptModal = (post) => setSelectedPost(post);
  const closeAdoptModal = () => setSelectedPost(null);

  if (errorPosts) return <div>Error loading posts: {errorPosts.message}</div>;

  return (
    <div className="feed-container">
      {initialLoad ? (
        // ✅ Show Skeletons only on first load
        Array.from({ length: 5 }).map((_, index) => (
          <FeedItemSkeleton key={index} />
        ))
      ) : posts.length === 0 ? (
        // ✅ Show "No Posts Available" after first load if there are no posts
        <p className="text-center text-gray-500 my-4">No posts available.</p>
      ) : (
        // ✅ Use Infinite Scroll for posts
        <InfiniteScroll
          dataLength={posts.length}
          next={fetchMorePosts} // Fetch more posts on scroll
          hasMore={hasMore} // Stop when no more posts exist
          loader={loadingMore ? <FeedItemSkeleton /> : null} // Show skeleton when loading more posts
          endMessage={
            <p className="text-center my-4">🎉 No more posts available!</p>
          }
        >
          {posts.map((post) => (
            <FeedItem
              key={post.id}
              post={post}
              openAdoptModal={openAdoptModal}
            />
          ))}
        </InfiniteScroll>
      )}

      {/* ✅ Render Modal if `selectedPost` is set */}
      {selectedPost && (
        <AdoptableModal
          isOpen={!!selectedPost}
          onClose={closeAdoptModal}
          adoptable={selectedPost}
          tags={selectedPost.tags}
        />
      )}
    </div>
  );
};

export default FeedCard;
