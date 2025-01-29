/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import styles from './header.module.scss'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie';

const Header = () => {
  const { profile } = useSelector((state) => state.user)
  const [dropdownVisible, setDropdownVisible] = useState(false)
  const navigate = useNavigate()

  // Function to handle logout
  const handleLogout = () => {
    // Delete the auth token cookie (assuming it's named "authToken")
    Cookies.remove('authToken')
    window.location.reload()
    navigate("/auth/signin")
  }

  return (
    <header className={`${styles.header}`}>
      <div className='container'>
        <div className='row align-items-center'>
          <div className='col-4'>
            <h4>URL Shortener</h4>
          </div>
          <div className='col-4'>
            <nav>
              <ul>
                <a href='#'><li>Dashboard</li></a>
                <a href='#'><li>About</li></a>
                <a href='#'><li>Contact</li></a>
              </ul>
            </nav>
          </div>
          <div className='col-4 text-end d-flex align-items-center justify-content-end position-relative'>
            <h5
              style={{ textTransform: 'capitalize', cursor: 'pointer' }}
              onClick={() => setDropdownVisible(!dropdownVisible)}
            >
              {profile?.user?.name} <i className="fa-sharp fa-solid fa-caret-down"></i>
            </h5>

            {/* Dropdown Menu */}
            {dropdownVisible && (
              <div className={`${styles.dropdownMenu}`}>
                {/* <button onClick={() => {  }}>
                  Dummy Button 1
                </button>
                <button onClick={() => {  }}>
                  Dummy Button 2
                </button> */}
                <button onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
