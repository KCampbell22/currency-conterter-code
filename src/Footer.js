import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "font-awesome/css/font-awesome.min.css";
import React from "react";
const Footer = () => {
  return (
    <React.Fragment>
      <footer
        class="text-center text-white"
        style={{ backgroundColor: "#f1f1f1" }}
      >
        <div class="container pt-4">
          <section class="mb-4">
            <a
              class="btn btn-link btn-floating btn-lg text-dark m-1"
              href="https://twitter.com/k_campbell15"
              role="button"
              data-mdb-ripple-color="dark"
            >
              <i class="fab fa-twitter"></i>
            </a>

            <a
              class="btn btn-link btn-floating btn-lg text-dark m-1"
              href="https://www.instagram.com/kcampbelldev/"
              role="button"
              data-mdb-ripple-color="dark"
            >
              <i class="fab fa-instagram"></i>
            </a>

            <a
              class="btn btn-link btn-floating btn-lg text-dark m-1"
              href="https://www.linkedin.com/in/kade-campbell-21a3601aa/"
              role="button"
              data-mdb-ripple-color="dark"
            >
              <i class="fab fa-linkedin"></i>
            </a>
            <a
              class="btn btn-link btn-floating btn-lg text-dark m-1"
              href="https://github.com/KCampbell22"
              role="button"
              data-mdb-ripple-color="dark"
            >
              <i class="fab fa-github"></i>
            </a>
          </section>
        </div>

        <div
          class="text-center text-dark p-3"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
        >
          © 2022 kadecampbell:
          <a class="text-dark" href="https://www.kadecampbelldev.com/">
            kadecampbelldev.com
          </a>
        </div>
      </footer>
    </React.Fragment>
  );
};

export default Footer;
