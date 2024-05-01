import './index.css';
import Register from './register';
import Login from './login';
import Homepage from './homepage';
import Hamburger from './hamburger';
import Edit from './editstory';
import Create from './createstory';
import Bookmark from './bookmark';
import SlideShow from './story2';
import Share from './share';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import './App.css';

const App = () => {

  return(
    <>
      <main>
  <BrowserRouter>
  <Routes>
    <Route path ="/" element ={<Homepage/>}/>
    <Route path ="/register" element ={<Register/>}/>
    <Route path ="/login" element ={<Login/>}/>
    <Route path ="/hamburger" element ={<Hamburger/>}/>
    <Route path ="/editstory" element ={<Edit/>}/>
    <Route path ="/bookmark" element ={<Bookmark/>}/>
    <Route path ="/createstory" element ={<Create/>}/>
    <Route path ="/story2" element ={<SlideShow/>}/>
    <Route path ="/share" element ={<Share/>}/>
    <Route path ="/homepage" element ={<Homepage/>}/>
    <Route path ="." element ={<h1>404 Route not found</h1>}/>
  </Routes> 
  </BrowserRouter>
  </main>

 
    </>
  );
}

export default App;
