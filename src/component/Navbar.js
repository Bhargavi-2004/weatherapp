import React from "react";
import "../css/App.css";
import { FaSearch } from "react-icons/fa";
import CIcon from "@coreui/icons-react";
import { cilHamburgerMenu, cilSearch } from "@coreui/icons";

function Navbar() {
  return (
    <>
      {/* <!-- container --> */}
      <div class="container">

        {/* <!-- overview --> */}
        <div class="overview">

          {/* <!-- header --> */}
          <div class="header">
            <div class="setting">
              <CIcon icon={cilHamburgerMenu} className="large-icon" />
            </div>
            <div class="name">City, Country</div>
            <div class="search">
              <CIcon icon={cilSearch} className="large-icon" />
            </div>
          </div>
          {/* <!-- header end --> */}

          {/* <!-- current-weather --> */}
          <div class="current-weather">
            <div class="text">Mostly cloudly today</div>
            <div class="information">
              <div class="icon">icon</div>
              <div class="temp">12*C</div>
            </div>
          </div>
          {/* <!-- current-weather end --> */}

          {/* <!-- details --> */}
          <div class="details">
            <div class="i" id="i1">
              i1
            </div>
            <div class="i" id="i2">
              i2
            </div>
            <div class="i" id="i3">
              i3
            </div>
            <div class="i" id="i4">
              i4
            </div>
          </div>
          {/* <!-- details end --> */}
        </div>
        {/* <!-- overview end --> */}

        {/* <!-- display --> */}
        <div class="display"></div>
        {/* <!-- display end --> */}
      </div>
      {/* <!-- container end --> */}
    </>
  );
}

export default Navbar;
