import React from 'react'
import {Link, withRouter} from "react-router-dom"



const Menu= ()=>{
    return (

    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-0 py-3">
  <div className="container-xl">
   
    <Link className="navbar-brand" to="/">
      <h4 className="text-white">WORK_FORCE</h4>
    </Link>
  <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
   
    <div className="collapse navbar-collapse" id="navbarCollapse">
     
      <div className="navbar-nav mx-lg-auto">
        <Link className="nav-item nav-link active" to="/" aria-current="page">Home</Link>
        <Link className="nav-item nav-link" to="#">Product</Link>
        <Link className="nav-item nav-link" to="#">Features</Link>
        <Link className="nav-item nav-link" to="#">Pricing</Link>
      </div>
         <div className="navbar-nav ms-lg-4">
        <Link className="nav-item nav-link" to="/signin">Sign in</Link>
        <Link className="nav-item nav-link" to="#">Sign Out</Link>
      </div>
     
      <div className="d-flex align-items-lg-center mt-3 mt-lg-0">
        <Link to="/signup" className="btn btn-sm btn-primary w-full w-lg-auto">
          Sign-UP
        </Link>
      </div>
    </div>
  </div>
</nav>
    )
}

export default withRouter(Menu);
