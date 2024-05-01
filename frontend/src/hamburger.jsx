

const Hamburger = ({username}) => {
    
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("username");

        window.location.reload();
    }
    return(
        <>
        <div style={{height:'6rem',width:'7rem',background:'white',zIndex:1,position:'absolute'}}>
            <div style={{height:'1rem',width:'3rem',marginLeft:'2rem'}}><p style={{}}>{username}</p></div><br/>
            <button type = "submit" style={{height:'1.5rem',width:'4rem',background: '#FF7373',marginLeft:'1.5rem',borderRadius:'1rem',marginTop:'0.2rem',color:'white',borderStyle:'none'}} onClick={() => handleLogout()}>Logout</button> 
        </div>
        </>
    );
}

export default Hamburger;
