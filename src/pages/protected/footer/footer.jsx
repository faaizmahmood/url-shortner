/* eslint-disable no-unused-vars */
import React from "react";
import styles from "./Footer.module.scss";
import "bootstrap/dist/css/bootstrap.min.css";

const Footer = () => {
  return (
    <footer className={`${styles.footer}`}>
      <div className="container">
        <div className="row">
          {/* Column 1 */}
          <div className="col-sm-3">
            <h5>Company</h5>
            <ul className="list-unstyled">
              <li><a href="#">About Us</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Blog</a></li>
            </ul>
          </div>

          {/* Column 2 */}
          <div className="col-sm-3">
            <h5>Services</h5>
            <ul className="list-unstyled">
              <li><a href="#">URL Shortening</a></li>
              <li><a href="#">Analytics</a></li>
              <li><a href="#">API</a></li>
            </ul>
          </div>

          {/* Column 3 */}
          <div className="col-sm-3">
            <h5>Support</h5>
            <ul className="list-unstyled">
              <li><a href="#">Help Center</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Use</a></li>
            </ul>
          </div>

          {/* Column 4 */}
          <div className="col-sm-3">
            <h5>Contact</h5>
            <ul className="list-unstyled">
              <li><a href="#">Email</a></li>
              <li><a href="#">Social Media</a></li>
              <li><a href="#">Support</a></li>
            </ul>
          </div>
        </div>

        <hr />
        <p className="mb-2 text-center">
          &copy; {new Date().getFullYear()} URL Shortener. All rights reserved.
        </p>
        <p className="text-center">
          Made with <span className={styles.heart}>&#10084;</span> by Faaiz.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
