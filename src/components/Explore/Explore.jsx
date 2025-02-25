// src/components/Explore/Explore.jsx
import React, { useState, useEffect } from "react";
import TopNav from "../TopNav/TopNav";
import TagSelector from "./TagSelector";
import ExploreCard from "./ExploreCard";
import AdoptableModal from "./AdoptableModal";
import useListAPetPosts from "../../hooks/useExplore";
import SkeletonCard from "./SkeletonCard";
import { subscribeToListAPetPosts } from "../../services/exploreService";

const Explore = () => {
  const { posts, isLoading, mutate } = useListAPetPosts();

  console.log("Explore Post", posts);

  const [selectedTags, setSelectedTags] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState(posts);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // This flag ensures the initial random selection runs only once.
  const [hasInitialRandomSelection, setHasInitialRandomSelection] =
    useState(false);

  // Subscribe to real-time updates once when component mounts
  useEffect(() => {
    const unsubscribe = subscribeToListAPetPosts((newPosts) => {
      mutate(() => newPosts, false);
    });
    return () => unsubscribe();
  }, [mutate]);

  // On posts load, if no tags are selected and initial selection hasn't been done, randomly choose up to 5 tags
  useEffect(() => {
    if (
      posts.length > 0 &&
      selectedTags.length === 0 &&
      !hasInitialRandomSelection
    ) {
      const allTags = [...new Set(posts.flatMap((post) => post.tags || []))];
      const randomizedTags = [];
      const tagPool = [...allTags];
      while (randomizedTags.length < 5 && tagPool.length > 0) {
        const randomIndex = Math.floor(Math.random() * tagPool.length);
        randomizedTags.push(tagPool[randomIndex]);
        tagPool.splice(randomIndex, 1);
      }
      setSelectedTags(randomizedTags);
      setHasInitialRandomSelection(true);
    }
  }, [posts, selectedTags, hasInitialRandomSelection]);

  // Filter posts when posts or selectedTags change
  useEffect(() => {
    if (selectedTags.length > 0) {
      setFilteredPosts(
        posts.filter((post) =>
          (post.tags || []).some((tag) => selectedTags.includes(tag))
        )
      );
    } else {
      setFilteredPosts(posts);
    }
  }, [posts, selectedTags]);

  return (
    <>
      <div className="container p-4">
        <TopNav />

        {/* Tag Selector */}
        <div className="mb-4">
          <TagSelector
            availableTags={[
              ...new Set(posts.flatMap((post) => post.tags || [])),
            ]}
            selectedTags={selectedTags}
            onChange={setSelectedTags}
          />
        </div>

        {/* Explore Posts */}
        <div className="grid grid-cols-3 gap-1">
          {isLoading ? (
            Array.from({ length: 9 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))
          ) : filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <div
                key={post.id}
                onClick={() => {
                  setSelectedPost(post);
                  setIsModalOpen(true);
                }}
              >
                <ExploreCard {...post} />
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-3">
              No posts found.
            </p>
          )}
        </div>
      </div>

      {selectedPost && (
        <AdoptableModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          adoptable={selectedPost}
          tags={selectedPost.tags}
        />
      )}
    </>
  );
};

export default Explore;
