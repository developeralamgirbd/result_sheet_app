import React from 'react';
import {Link, NavLink, Outlet} from "react-router-dom";

const MasterLayout = () => {
    return (
       <div className='container'>
           <nav className="navbar navbar-expand-lg bg-body-tertiary">
               <div className="container-fluid">
                   <Link className="navbar-brand" to="/">Result Sheet App</Link>
                   <div className="">
                       <ul className="navbar-nav mb-2 mb-lg-0">
                           <li className="nav-item">
                               <NavLink className="nav-link" aria-current="page" to='/'>Result List</NavLink>
                           </li>
                           <li className="nav-item">
                               <NavLink className="nav-link" aria-current="page" to='/create'>Create</NavLink>
                           </li>
                       </ul>
                   </div>
               </div>
           </nav>

           <div className='mt-4'>
               <Outlet/>
           </div>

       </div>
    );
};

export default MasterLayout;