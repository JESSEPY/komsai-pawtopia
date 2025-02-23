import { useState, useEffect } from "react";
import {
  getAdoptablePost,
  updateAdoptablePost,
  updateAdoptableMedia,
  removeAdoptableMedia,
  deleteAdoptablePost,
  unlistAdoptablePost, // ✅ New Unlist Function
} from "../services/updateAdoptablePost";

const useEditAdoptable = (postId) => {
  const [postData, setPostData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!postId) return;

    const fetchPost = async () => {
      setLoading(true);
      try {
        const data = await getAdoptablePost(postId);
        setPostData(data);
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    };

    fetchPost();
  }, [postId]);

  const editAdoptable = async (updatedData) => {
    try {
      await updateAdoptablePost(postId, updatedData);
      setPostData((prev) => ({ ...prev, ...updatedData }));
    } catch (err) {
      throw err;
    }
  };

  const uploadNewMedia = async (newMediaFiles) => {
    try {
      const updatedMediaUrls = await updateAdoptableMedia(
        postId,
        newMediaFiles,
        postData.mediaUrls
      );
      setPostData((prev) => ({ ...prev, mediaUrls: updatedMediaUrls }));
    } catch (err) {
      throw err;
    }
  };

  const deleteMedia = async (mediaUrl) => {
    try {
      const updatedMediaUrls = await removeAdoptableMedia(
        postId,
        mediaUrl,
        postData.mediaUrls
      );
      setPostData((prev) => ({ ...prev, mediaUrls: updatedMediaUrls }));
    } catch (err) {
      throw err;
    }
  };

  const unlistPost = async () => {
    try {
      if (!postData) throw new Error("Post data not found.");
      await unlistAdoptablePost(postId);
      setPostData((prev) => ({ ...prev, postStatus: "unlisted" })); // ✅ Update state
    } catch (err) {
      throw err;
    }
  };

  const deletePost = async () => {
    try {
      if (!postData) throw new Error("Post data not found.");
      await deleteAdoptablePost(postId, postData.mediaUrls);
      setPostData(null);
      return true;
    } catch (err) {
      throw err;
    }
  };

  return {
    postData,
    editAdoptable,
    uploadNewMedia,
    deleteMedia,
    unlistPost, // ✅ Unlist Available
    deletePost, // ✅ Full Delete Available
    loading,
    error,
  };
};

export default useEditAdoptable;
