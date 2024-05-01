import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { FaBookmark, FaShare, FaHeart } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import "./index.css";
import { FiX } from "react-icons/fi";
import axios from "axios";
import Share from "./share";

const SlideShow = ({
  handleCloseStory,
  viewStoryModal,
  handleLogin,
  slideDuration = 5000,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progressWidth, setProgressWidth] = useState(0);
  const [like, setLike] = useState(viewStoryModal.Likes);
  const [isRed, setIsRed] = useState(false);
  const [isblue, setIsBlue] = useState(false);
  const [token] = useState(localStorage.getItem("token"));
  const [showShare, setShowShare] = useState(false);

  const handleShare = () => {

    const url = window.location.href; 
    navigator.clipboard.writeText(url) 
      .then(() => {
        console.log("Link copied to clipboard");
        setShowShare(true); 
        setTimeout(() => setShowShare(false), 2000); 
      })
      .catch((err) => {
        console.error("Error copying to clipboard: ", err);
      });
  };

  useEffect(() => {
    getUseractions();
  }, []);

  const getUseractions = async () => {
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = token;
    const response = await axios
      .get(
        `${import.meta.env.VITE_API_URL}/getuseractions?storyId=${
          viewStoryModal._id
        }`
      )
      .then((res) => {
        setIsRed(res.data.Like);
        setIsBlue(res.data.Bookmark);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const toggleLikes = async () => {
    if (!token) {
      handleCloseStory();
      handleLogin();
      return;
    }

    setIsRed((prev) => !prev);
    let set_status;

    if (isRed == false) {
      set_status = "like";
      const token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = token;

      const updateUserLikesResponse = await axios.post(
        `${import.meta.env.VITE_API_URL}/updateuserlikes`,
        {
          storyId: viewStoryModal._id,
        }
      );
    } else {
      set_status = "unlike";
      const token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = token;

      const updateUserLikesResponse = await axios.post(
        `${import.meta.env.VITE_API_URL}/removeuserlikes`,
        {
          storyId: viewStoryModal._id,
        }
      );
    }

    axios
      .post(`${import.meta.env.VITE_API_URL}/updatelike`, {
        id: viewStoryModal._id,
        status: set_status,
      })

      .then((res) => {
        if (isRed === false) {
          setLike(like + 1);
        } else {
          setLike(like - 1);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const toggleBookmark = async () => {
    if (!token) {
      handleCloseStory();
      handleLogin();
      return;
    }

    setIsBlue((prev) => !prev);
    try {
      if (isblue === false) {
        const token = localStorage.getItem("token");
        axios.defaults.headers.common["Authorization"] = token;
        const Response = await axios.post(
          `${import.meta.env.VITE_API_URL}/updateuserbookmarks`,
          {
            storyId: viewStoryModal._id,
          }
        );
      } else {
        const token = localStorage.getItem("token");
        axios.defaults.headers.common["Authorization"] = token;

        const updateUserLikesResponse = await axios.post(
          `${import.meta.env.VITE_API_URL}/removeuserbookmarks`,
          {
            storyId: viewStoryModal._id,
          }
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const slides = viewStoryModal?.Slides || [];

  useEffect(() => {
    setProgressWidth(0);
    const interval = setInterval(() => {
      setProgressWidth((prevWidth) => {
        const newWidth = prevWidth + 100 / (slideDuration / 100);
        if (newWidth >= 100) {
          handleNext();
          clearInterval(interval);
          return 0;
        }
        return newWidth;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [currentIndex, slideDuration]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const handlePrevious = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + slides.length) % slides.length
    );
  };

  const handleClose = () => {
    handleCloseStory();
  };

  return (
    <>
    
    <div style={{ position: "relative", textAlign: "center", marginTop: "8%" }}>
      <div
        style={{
          position: "absolute",
          top: "1.25rem",
          marginLeft: "0.625",
          cursor: "pointer",
          zIndex: "1",
          fontSize: "1.875",
        }}
        onClick={handleClose}
      >
        <FiX className="cancel-icon" />
      </div>
      <div>
        <FiSend className="share-icon" onClick={handleShare} />
        {showShare && (
          <div
            style={{ zIndex: "99", position: "absolute", marginTop: "120%" }}
          >
            <Share />
          </div>
        )}
      </div>
      <FaBookmark
        size={24}
        color={isblue ? "blue" : "white"}
        onClick={() => toggleBookmark()}
        style={{
          zIndex: "1",
          position: "absolute",
          marginTop: "160%",
          left: "1.375rem",
        }}
      />
      <div
        style={{
          position: "absolute",
          height: "1.875rem",
          width: "1.875rem",
          zIndex: "99",
          marginLeft: "80%",
          marginTop: "165%",
        }}
      >
        {like}
      </div>

      <div
        style={{
          position: "absolute",
          top: "0.625rem",
          left: "0.625rem",
          right: "0.625rem",
          height: "0.188rem",
          display: "flex",
          gap: "0.188rem",
        }}
      >
        {slides.map((_, index) => (
          <div
            key={index}
            style={{
              zIndex: "1",
              flex: 1,
              height: "100%",
              background: index === currentIndex ? "white" : "lightgray",
              width: index === currentIndex ? `${progressWidth}%` : "100%",
              transition: index === currentIndex ? "width 0.1s linear" : "none",
            }}
          />
        ))}
      </div>

      <FaHeart
        size={24}
        color={isRed ? "red" : "white"}
        onClick={() => toggleLikes()}
        style={{
          zIndex: "1",
          position: "absolute",
          marginTop: "160%",
          marginLeft: "21%",
        }}
      />

      <div
        style={{ position: "relative", margin: "0 auto", maxWidth: "12.5rem" }}
      >
        <img
          src={slides[currentIndex].Image}
          style={{
            height: "21rem",
            width: "12rem",
          }}
          alt="Slide"
        />

        <div
          style={{
            position: "absolute",
            top: "60%",
            left: "10%",
            color: "white",
            zIndex: "1",
          }}
        >
          <h3>{slides[currentIndex].Heading}</h3>
          <p>{slides[currentIndex].Description}</p>
        </div>
      </div>

      <div
        style={{ position: "absolute", top: "50%", cursor: "pointer" }}
        onClick={handlePrevious}
      >
        <FaChevronLeft />
      </div>

      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "93%",
          cursor: "pointer",
        }}
        onClick={handleNext}
      >
        <FaChevronRight />
      </div>
    </div>
    </>
  );
};

export default SlideShow;
