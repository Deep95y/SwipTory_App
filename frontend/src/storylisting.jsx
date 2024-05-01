import React, { useState } from 'react';
// import './AllStoryListing.css'; 
import './index.css';

const AllStoryListing = ({
  viewStories,
  handleStoryModal,
  handleopenStory,
}) => {
  const [showMoreStories, setShowMoreStories] = useState(4);

  const handleShowMoreStories = () => {
    setShowMoreStories(viewStories.reduce((acc, category) => acc + category.items.length, 0));
  };

  return (
    <div className="story-listing-container">
      {viewStories.map((category, index) => (
        <div key={index} className="story-category">
          <h2 className="category-title">Top Stories on {category._id}</h2>

          <div className="story-grid">
            {category.items.length > 0 ? (
              category.items.slice(0, showMoreStories).map((story) => (
                <div
                  key={story._id}
                  className="story-item"
                  onClick={() => handleStoryModal(story)}
                >
                  <div className="story-info">
                    <h3>{story.Slides[0].Heading}</h3>
                    <p>{story.Slides[0].Description}</p>
                  </div>
                  <img
                    src={story.Slides[0].Image}
                    alt={story.Slides[0].Heading}
                    className="story-image"
                    onClick={handleopenStory}
                  />
                </div>
              ))
            ) : (
              <div className="no-stories">
                <p>No stories available.</p>
              </div>
            )}
          </div>

          {category.items.length > showMoreStories && (
            <div className="show-more-button-container">
              <button
                onClick={handleShowMoreStories}
                className="show-more-button"
              >
                Show More
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default AllStoryListing;
