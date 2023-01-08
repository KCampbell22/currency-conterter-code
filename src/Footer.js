import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "font-awesome/css/font-awesome.min.css";
import React from "react";
const Footer = () => {
  return (
    <React.Fragment>
      <footer className="text-center bg-dark text-white">
        <div className="container pt-4">
          <section className="mb-4"></section>
        </div>

        {/* Github */}

        <div
          className="text-center text-light p-3 d-flex w-100 align-items-center m-auto"
          id="footer"
        >
          © Kade Campbell 2022:
          <a
            href="https://github.com/KCampbell22"
            className="text-light ms-2"
            style={{ textDecoration: "none" }}
            role="button"
          >
            Github
          </a>
        </div>
      </footer>
    </React.Fragment>
  );
};

export default Footer;
