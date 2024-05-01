import "./index.css";
import React, { useState } from "react";
import EditStoryApi from "./editstoryapi";

const Edit = ({ editstory, handleCloseEdit, handleGetMyStories }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [slides, setSlides] = useState({
    id: editstory._id,
    Category: editstory.Category,
    SlideData: editstory.Slides,
  });

  const handleSlideClick = (index) => {
    setCurrentSlideIndex(index);
  };

  const handleAddSlide = () => {
    if (slides.SlideData.length >= 6) {
      alert("You can only add up to 6 slides");
      return;
    }
    const addon = [
      ...slides.SlideData,
      { Heading: "", Description: "", Image: "" },
    ];
    setSlides({ ...slides, SlideData: addon });
  };

  const handleInputChange = (field, value) => {
    const updatedSlides = slides.SlideData.map((slide, index) => {
      if (index === currentSlideIndex) {
        return { ...slide, [field]: value };
      }
      return slide;
    });

    setSlides({ ...slides, SlideData: updatedSlides });
  };

  const handleDeleteSlide = (index, e) => {
    e.stopPropagation();

    if (slides.SlideData.length > 1) {
      const dummy = slides.SlideData.filter((_, i) => i !== index);
      setSlides({ ...slides, SlideData: dummy });
      setCurrentSlideIndex(
        currentSlideIndex > index ? currentSlideIndex - 1 : 0
      );
    }
  };

  const handlePost = () => {
    const currentSlide = slides.SlideData[currentSlideIndex];
    if (
      !currentSlide.Heading ||
      !currentSlide.Description ||
      !currentSlide.Image
    ) {
      alert("Please fill in all fields");
      return;
    }
    EditStoryApi({ slides });
    handleCloseEdit();
    handleGetMyStories();
  };
  const handleCross = () => {
    handleCloseEdit();
  };

  const handleNext = () => {
    if (currentSlideIndex < slides.SlideData.length - 1) {
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(currentSlideIndex - 1);
    }
  };

  return (
    <div
      style={{
        height: '27rem',
        width: '28rem',
        borderRadius: '1rem',
        background: 'white',
        display: 'flex',
        flexDirection: 'column',
        margin: 'auto',
        marginTop: '5%',
      }}
    >
      <img
        src="cross.webp"
        style={{ height: '1.5rem', width: '1.5rem', marginLeft: '90%', marginTop: '1rem' }}
        onClick={handleCross}
      />

      <p style={{ marginLeft: "70%" }}>add up to 6 slides</p>

      <div
        style={{ display: 'flex', flexDirection: 'row', height: '2rem', marginLeft: '0.5rem' }}>
      
        {slides.SlideData.map((slide, index) => (
          <button
            key={index}
            type="button"
            className="slides"
            style={{
              borderColor: index === currentSlideIndex ? 'lightblue' : 'white',
              borderRadius: '0.5rem',
              fontWeight: 'bold',
              fontFamily: 'sans-serif',
              width: '4rem',
              height:'2.5rem',
              borderStyle:'inset',
              marginLeft:'0.313rem'
            }}
            onClick={() => handleSlideClick(index)}
          >
            Slide {index + 1}
            {index > 2 && (
              <img
                src="cross.webp"
               style={{ height: '1rem', width: '1rem' }}
                onClick={(e) => handleDeleteSlide(index, e)}
              />
            )}
          </button>
        ))}
        {slides.SlideData.length < 6 && (
          <button
            type="button"
            className="slides"
            style={{ marginLeft: '1rem', background: 'white', borderRadius: '1rem', fontWeight: 'bold', fontFamily: 'sans-serif',  width: '4rem', width: '4rem',height:'2.5rem',borderStyle:'initial' }}
            onClick={handleAddSlide}
          >
            Add+
          </button>
        )}
      </div>

      
      <div style={{ display: 'flex', flexDirection: 'column', padding: '1rem 1rem' }}>
        <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '1rem' }}>
          <label htmlFor="Heading" style={{ fontWeight: "bold" }}>
            Heading:
          </label>

          <input
            type="text"
            placeholder="Your heading"
            style={{ width: '9rem', height: '1rem', marginLeft: '1.8rem' }}
            onChange={(e) => handleInputChange("Heading", e.target.value)}
            value={slides.SlideData[currentSlideIndex].Heading}
          />
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            marginBottom: "0.1333rem",
          }}
        >
          <label htmlFor="Description" style={{ fontWeight: "bold" }}>
            Description:
          </label>
          <input
            type="text"
            placeholder="Story Description"
            style={{  width: '10rem', height: '7rem', marginLeft: '0.4rem' }}
            onChange={(e) => handleInputChange("Description", e.target.value)}
            value={slides.SlideData[currentSlideIndex]?.Description}
          />
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            marginBottom: "0.1333rem",
          }}
        >
          <label htmlFor="Image" style={{ fontWeight: "bold" }}>
            Image:
          </label>
          <input
            type="text"
            placeholder="Add image Url"
            style={{  width: '9rem', height: '1rem', marginLeft: '2.8rem' }}
            onChange={(e) => handleInputChange("Image", e.target.value)}
            value={slides.SlideData[currentSlideIndex]?.Image}
          />
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            marginBottom: "0.1333rem",
          }}
        >
          <label htmlFor="Category" style={{ fontWeight: "bold" }}>
            Category:
          </label>
          <select
            placeholder="Select Category"
            style={{  width: '9rem', height: '1.5rem', marginLeft: '1.6rem' }}
            onChange={(e) => setSlides({ ...slides, Category: e.target.value })}
            value={slides.Category}
          >
            <option>Food</option>
            <option>Health and fitness</option>
            <option>Travel</option>
            <option>Movies</option>
            <option>Education</option>
            <option>Environment</option>
            <option>News</option>
            <option>Flower</option>
            <option>Makeup</option>
            <option>Yoga</option>
          </select>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'row', marginTop: '0.5rem', marginLeft: '2rem' }}>
        <button type="button" style={{ background: '#7EFF73', color: 'white' ,height: '1.7rem', width: '4.5rem',borderStyle:'none', borderRadius: '1rem' }}
          onClick={handlePrevious}
          disabled={currentSlideIndex === 0}
        >
          Previous
        </button>
        <button type="button" style={{ background: '#73ABFF', color: 'white',height: '1.7rem', width: '4.5rem',borderStyle:'none', borderRadius: '1rem', marginLeft: '1rem' }}
          onClick={handleNext}
          disabled={currentSlideIndex === slides.SlideData.length - 1}
        >
          Next
        </button>
        <button type="button" style={{ background: ' #FF7373', color: 'white',height: '1.7rem', width: '4.5rem', borderRadius: '1rem', marginLeft: '10rem',borderStyle:'none'}} 
          onClick={() => handlePost()}
        >
          Post
        </button>
      </div>
    </div>
  );
};

export default Edit;
