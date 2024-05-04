import React, { useEffect, useState } from "react";
import Hamburger from "./hamburger";
// import { Carousel } from 'react-responsive-carousel';
// import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Carousel from "react-multi-carousel";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// import "react-multi-carousel/lib/styles.css";

import Register from "./register";
import Modal from "react-modal";
import Login from "./login";
import Create from "./createstory";
import axios from "axios";
import Edit from "./editstory";
import { useNavigate } from "react-router";
import SlideShow from "./story2";
import AllStoryListing from "./storylisting";
import { FaBookmark} from 'react-icons/fa';
import './index.css';

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
    slidesToSlide: 4 // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 768 },
    items: 3,
    slidesToSlide: 3 // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 767, min: 464 },
    items: 2,
    slidesToSlide: 1 // optional, default to 1.
  }
};

const Homepage = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showMoreMyStories, setshowMoreMyStories] = useState(3);
  const [editstory, setEditStory] = useState({});
  const [showstory, setShowStory] = useState(false);
  const [viewStories, setviewStories] = useState({});
  const [viewMyStories, setviewMyStories] = useState([]);
  const [viewStoryModal, setViewStoryModal] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("");
  const [token] = useState(localStorage.getItem("token"));
  const [username] = useState(localStorage.getItem("username"));
  const [showMoreCatStories, setShowMoreCatStories] = useState(4);

  const categoryListing = [
    "Health",
    "Food",
    "Education",
    "Travel",
    "Movies",
    "Flower",
    "Environment",
    "Makeup",
    "Painting",
    "News",
    "Yoga",
  ];

  const customStyles = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.90)',
    },
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      transform: "translate(-50%, -50%)",
      background: "transparent",
      margin: 0,
      padding: 0,
      border: "none",
      outline: "none",
      position: "fixed",
      boxSizing: "border-box",
      overflow: "hidden",
    },
  };

  Modal.setAppElement("#root");

  useEffect(() => {
    if (token) {
      handleGetMyStories();
    }
    handleGetAll();
  }, []);

  const handleopenEdit = (story) => {
    setShowEdit(true);
    setEditStory(story);
  };

  const handleCloseEdit = () => {
    setShowEdit(false);
  };

  const handleopenStory = () => {
    setShowStory(true);
  };

  const handleCloseStory = () => {
    setShowStory(false);
  };

  const handleOpen = () => {
    setShowRegister(true);
  };

  const handleClose = () => {
    setShowRegister(false);
  };

  const handleLogin = () => {
    setShowLogin(true);
  };

  const handleCloseLogin = () => {
    setShowLogin(false);
  };

  const handleCreate = () => {
    setShowCreate(true);
  };

  const handleCloseCreate = () => {
    setShowCreate(false);
  };

  const handleClick = () => {
    setIsClicked((prevState) => !prevState);
  };

  const handleGetMyStories = () => {
    const token = localStorage.getItem("token");
   // console.log(import.meta.env.VITE_API_URL);
    axios
      .get(`${import.meta.env.VITE_API_URL}/getAllByUserId`, { 
        headers: { Authorization: token },
      })

      .then((res) => {
        setviewMyStories(res.data);
      })

      .catch((error) => {
        console.log(error);
      });
  };

  const handleGetAll = () => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/getAllStories`)

      .then((res) => {
        setSelectedCategory("All");
        setviewStories(res.data);
      })

      .catch((error) => {
        console.log(error);
      });
  };

  const handleCategoryListing = (category) => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/getByCategory?Category=${category}`)
      .then((res) => {
        setSelectedCategory(category);
        setviewStories(res.data);
      })

      .catch((error) => {
        console.log(error);
      });
  };

  const handleStoryModal = (story) => {
    setViewStoryModal(story);
  };
  const navigate = useNavigate();

  const handleBookmark = () => {
    navigate("/bookmark");
  };

  const handleshowMoreMyStories = () => {
    setshowMoreMyStories(viewMyStories.length);
  };

  const handleShowMoreCatStories = () => {
    setShowMoreCatStories(viewStories.length);
  }

  return (
    <>
      <div
        style={{
          height: "100%",
          width: "100vw",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            height: "5rem",
            display: "flex",
            alignItems:"center",
            flexDirection: "row",
            background: "white",
            borderBottomStyle: "inset",
          }}
        >
          <div style={{ marginLeft: "1rem" }}>
            <h2>SwipTory</h2>
          </div>

          {!!token ? (
            <>
              <div style={{ marginTop: "1.5rem", marginLeft: "65%" }}>

           <FaBookmark size={13} style={{position: "absolute",marginLeft: "0.531rem",marginTop: "0.594rem",color:'white'}}/>
                <button
                  type="button"
                  onClick={handleBookmark}
                  style={{
                    background: "#FF7373",
                    color: "white",
                    height: "2rem",
                    width: "6.5rem",
                    borderRadius: "1rem",
                    borderStyle: "none",
                    marginLeft:'0.375rem'
                  }}
                >
                  Bookmarks
                </button>
              </div>
              <div style={{ marginTop: "1.5rem", marginLeft: "1rem" }}>
                <button
                  type="button"
                  onClick={handleCreate}
                  style={{
                    background: "#FF7373",
                    color: "white",
                    height: "2rem",
                    width: "5rem",
                    borderRadius: "1rem",
                    borderStyle: "none",
                  }}
                >
                  Add Story
                </button>
              </div>
              <div>
                <img
                  src="snow.jpeg"
                  style={{
                    height: "2rem",
                    width: "2rem",
                    borderRadius: "1rem",
                    display: "flex",
                    marginTop: "1.5rem",
                    marginLeft: "1rem",
                  }}
                />
              </div>
              <div style={{ marginTop: "0.2rem", marginLeft: "1rem" }}>
                <img
                  src="hamburger.webp"
                  style={{
                    height: "1.5rem",
                    width: "1.5rem",
                    marginLeft: "1rem",
                    marginTop: "1.5rem",
                  }}
                  onClick={handleClick}
                />
                {isClicked && <Hamburger username={username}/>}
              </div>
            </>
          ) : (
            ""
          )}
          {!token ? (
            <div style={{display:"flex", position:"absolute", right:10}}>
              <div style={{ marginRight:"1rem" }}>
                <button
                  type="button"
                  onClick={handleOpen}
                  style={{
                    background: "#FF7373",
                    color: "white",
                    height: "2rem",
                    width: "6rem",
                    borderRadius: "1rem",
                    borderStyle: "none",
                  }}
                >
                  Register Now
                </button>
              </div>
              <div style={{  }}>
                <button
                  type="button"
                  onClick={handleLogin}
                  style={{
                    background: "#73ABFF",
                    color: "white",
                    height: "2rem",
                    width: "5rem",
                    borderRadius: "1rem",
                    borderStyle: "none",
                  }}
                >
                  Sign In
                </button>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
        <br />

        <Carousel
          responsive={responsive}
          autoPlay={false}
          swipeable={true}
          draggable={true}
          showDots={false}
          infinite={false}
          partialVisible={false}
          dotListClass="custom-dot-list-style"
        >
          <div 
            style={{ height: "12rem", display: "flex", flexDirection: "row" }}
          >
            <div className="boxStyle" style={{ marginLeft: "1rem" }} onClick={(e) => handleGetAll()}>
              <div
                style={{
                  position: "absolute",
                  color: "white",
                  marginLeft: "4rem",
                  marginTop: "4rem",
                }}
              >
                All
              </div>
              <img className="category-image"
                src="All.jpg"
                style={{
                  height: "10.5rem",
                  width: "10.5rem",
                  borderRadius: "1rem",
               
                }}
              />
            </div>
          </div>
          {categoryListing.map((category, index) => {
            return (
              <div
              key={index}
              style={{ marginLeft: "2rem" }}
              onClick={(e) => handleCategoryListing(category)}
            >
              <div
                style={{
                  position: "absolute",
                  color: "white",
                  marginLeft: "3rem",
                  marginTop: "4rem",
                  fontWeight: "bold"
                }}
              >
                {category}
              </div>
              <img className="category-image"
                src={category + ".jpg"}
                style={{
                  height: "10.5rem",
                  width: "10.5rem",
                  borderRadius: "1rem"
                }}
              />
             </div>
            );
          })}
        </Carousel>

        
        {!!token ? (
          <div>
            <div style={{ marginLeft: "45%" }}>
              <h2>Your Stories</h2>
            </div>

            {viewMyStories.length ? (
              <>

                <div className="story-grid"
                 style={{}}
                >
                  {viewMyStories
                    .slice(0, showMoreMyStories)
                    .map((story, index) => (
                      <div
                        data={story}
                        key={story._id}
                        style={{ position: "relative" }}
                        onClick={() => handleStoryModal(story)}
                      >
                        <div
                          style={{
                            position: "absolute",
                            color: "white",
                            marginLeft: "3rem",
                            marginTop: "110%",
                          }}
                        >
                          {story.Slides[0].Heading}
                          <br />
                          {story.Slides[0].Description}
                        </div>
                        <img
                          src={story.Slides[0].Image}
                          onClick={handleopenStory}
                          style={{
                            height: "19rem",
                            width: "12rem",
                            borderRadius: "1rem",
                            marginLeft: "2rem",
                            marginTop:'1.875rem'
                       
                          }}
                        />
                        <div
                          style={{
                            position: "absolute",
                            top: "0.2rem",
                            left: "2rem",
                            display: "flex",
                            alignItems: "center",
                            marginTop: "97%",
                            marginLeft: "2.5rem",
                          }}
                        >
                          <img
                            src="edit.jpg"
                            style={{
                              height: "1.3rem",
                              width: "1.3rem",
                              position: "absolute",
                              marginLeft: "0.7rem",
                            }}
                          />
                          <button
                            onClick={() => handleopenEdit(story)}
                            type="button"
                            style={{
                              height: "2rem",
                              width: "4rem",
                              borderRadius: "1rem",
                              marginLeft: "1rem",
                              borderStyle:'none'

                            }}
                          >
                            Edit
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
                <br></br>
                <br></br>
                {viewMyStories.length > showMoreMyStories && ( 
                <div style={{ marginLeft: "50%" }}>
                  <button
                    onClick={() => handleshowMoreMyStories()}
                    type="button"
                    style={{
                      background: '#FF7373',
                      color: 'white',
                      border: 'none',
                      padding: '0.625',
                      borderRadius: '0.958rem',
                      cursor: 'pointer'

                    }}
                  >
                    Show More
                  </button>
                </div>
                )}
              </>
            ) : (
              <div style={{marginLeft:'45%'}}>
                <p>No stories available.</p>
              </div>
            )}
          </div>
        ) : (
          ""
        )}
        {selectedCategory === "All" ? (
          <AllStoryListing
            viewStories={viewStories}
            handleStoryModal={handleStoryModal}
            handleopenStory={handleopenStory}
          />
        ) : (
          <div className="story-listing-container">

            {viewStories.length > 0 ? (
              <div className="story-category">
                <h2 className="category-title">Top Stories on {selectedCategory}</h2>
              </div>
            ) : (
              ""
            )}

              {viewStories.length > 0 ? (
                <>
                <div className="story-grid"
                style={{}}
                >
                {viewStories.slice(0, showMoreCatStories).map((story) => (
                  <div
                    key={story._id}
                    className="story-item"
                    onClick={() => handleStoryModal(story)}
                  >
                    <div className="story-info">
                      {story.Slides[0].Heading}
                      <br />
                      {story.Slides[0].Description}
                    </div>
                    <img
                      src={story.Slides[0].Image}
                      onClick={handleopenStory}
                      className="story-image"
                    />
                  </div>
                ))}
                </div>
                {viewStories.length > showMoreCatStories && (
                  <div className="show-more-button-container">
                    <button
                      onClick={handleShowMoreCatStories}
                      className="show-more-button"
                    >
                      Show More
                    </button>
                  </div>
                )}
                </>
              ) : (
                <div className="no-stories">
                  <h2>Top Stories on {selectedCategory}</h2>
                  <p>No stories available.</p> 
                </div>
              )}
          </div>
        )}
      </div>
      <Modal
        isOpen={showRegister}
        onRequestClose={handleClose}
        style={customStyles}
      >
        <Register handleClose={handleClose} setShowRegister={setShowRegister} />
      </Modal>

      <Modal
        isOpen={showLogin}
        onRequestClose={handleCloseLogin}
        style={customStyles}
      >
        <Login handleCloseLogin={handleCloseLogin} />
      </Modal>

      <Modal
        isOpen={showCreate}
        onRequestClose={handleCloseCreate}
        style={customStyles}
      >
        <Create
          handleCloseCreate={handleCloseCreate}
          handleGetAll={handleGetAll}
        />
      </Modal>

      <Modal
        isOpen={showstory}
        onRequestClose={handleCloseStory}
        style={customStyles}
      >
        <SlideShow
          handleCloseStory={handleCloseStory}
          viewStoryModal={viewStoryModal}
          handleLogin={handleLogin}
        />
      </Modal>

      <Modal
        isOpen={showEdit}
        onRequestClose={handleCloseEdit}
        style={customStyles}
      >
        <Edit
          editstory={editstory}
          handleCloseEdit={handleCloseEdit}
          handleGetMyStories={handleGetMyStories}
        />
      </Modal>
    </>
  );
};

export default Homepage;
