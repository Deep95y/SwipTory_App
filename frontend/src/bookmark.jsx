import React, { useState,useEffect } from 'react';
import Hamburger from './hamburger'; 
import Modal from "react-modal";
import Create from './createstory';
import axios from "axios";
import SlideShow from './story2';
import { FaBookmark} from 'react-icons/fa';
import { useNavigate } from "react-router";

const Bookmark = () => {
 const [isClicked, setIsClicked] = useState(false);
 const [showModal, setShowModal] = useState(false);
 const [showbookstory, setShowBookStory] = useState(false);
 const [bookmark, setBookmark] = useState({});
 const [selectedBookmark, setselectedBookmark] = useState({});

 const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  const handleCreate = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleOpenBook = (story) => {
    setselectedBookmark(story);
    setShowBookStory(true);
  };

  const handleCloseBook = () => {
    setShowBookStory(false);
    BookmarkData();
  };

useEffect(() => {
  BookmarkData();  

},[])
  
  const BookmarkData = async() => {  
  try{
    const token = localStorage.getItem("token");  
    axios.defaults.headers.common["Authorization"] = token;
    const bookmarkData = await axios.get(`${import.meta.env.VITE_API_URL}/getAllbookmarks`)
      setBookmark(bookmarkData.data);

  }
  catch(error){
     console.log(error);
  }
  }
  const navigate = useNavigate();
  const GoToHomepage = () => {
      navigate("/homepage");
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
      flexDirection: "row",
      background: "white",
      borderBottomStyle: "inset",
    }}
  >
    <div style={{ marginLeft: "1rem" }}>
      <h2>SwipTory</h2>
    </div>
     
        <div style={{ marginTop: "1.5rem", marginLeft: "65%" }}>
        <FaBookmark size={13} style={{position: "absolute",marginLeft: "0.531rem",marginTop: "0.594rem",color:'white'}}/>
          <button
            type="button"
            style={{
              background: "#FF7373",
              color: "white",
              height: "2rem",
              width: "7rem",
              borderRadius: "1rem",
              borderStyle:'none'
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
              width: "6rem",
              borderRadius: "1rem",
              borderStyle:'none'
            }}
          >
            Add Story
          </button>
        </div>
        <div>
            <img onClick ={GoToHomepage}
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
          {isClicked && <Hamburger />}
        </div>
      </div>
      </div><br/>
      <div style={{marginLeft:'45%'}}><h2>Your Bookmark</h2></div>
<br/>
<div style={{ height: "30rem", display: "flex", flexDirection: "row",marginLeft:'1.5rem' }}>
  {bookmark.length > 0? (
    bookmark.map((story, index) => (
      <div data={story} key={story._id} style={{ position: "relative" }}>
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
          onClick={() => handleOpenBook(story)} 
          style={{
            height: "17rem",
            width: "10rem",
            borderRadius: "1rem",
            marginLeft:'2rem'
          }}
        />
     
      </div>
      
    ))
   ) : (
    <div style={{marginLeft:'40%'}}>
      <p>No stories available.</p>
    </div>
  )}

</div>

      <Modal
        isOpen={showModal}
        onRequestClose={handleClose}
        style={customStyles}
      >
        <Create />
      </Modal>


      <Modal
        isOpen={showbookstory}
        onRequestClose={handleCloseBook}
        style={customStyles}
      >
        <SlideShow handleCloseStory={handleCloseBook} viewStoryModal={selectedBookmark}/>
      </Modal>

    </>
    
  );
};

export default Bookmark;
