import React from "react";

function Footer() {
  return (
    <div className="mt-2">
      {/* <!-- Footer --> */}
      {/* <!-- social media --> */}
      <div className="container-fluid social-media">
        <div class="row">
          <div class="row-cols-sm-5 icons  d-flex justify-content-around text-center">
            <i class="fab fa-linkedin pt-1 pb-1"></i>
            <i class="fab fa-twitter ps-3 pt-1 pb-1 ms-2"></i>
            <i class="fab fa-facebook-f ps-3 pt-1 pb-1 ms-2"></i>
            <i class="fab fa-instagram ps-3 pt-1 pb-1 ms-2"></i>
            <i class="fab fa-youtube ps-3 pt-1 pb-1 ms-2"></i>
          </div>
        </div>
      </div>
      <footer class="page-footer font-small blue pt-4">
        {/* <!-- Footer Links --> */}
        <div class="container-fluid text-center text-md-left">
          {/* <!-- Grid row --> */}
          <div class="row justify-content-evenly">
            {/* <!-- Grid column --> */}

            {/* <!-- Grid column --> */}

            <hr class="clearfix w-100 d-md-none pb-3" />

            {/* <!-- Grid column --> */}
            <div class="col-md-3 mb-md-0 mb-3">
              {/* <!-- Links --> */}

              <ul class="list-unstyled">
                <li class="nav-item">
                  <h3 class="text-uppercase">COMPANY</h3>
                  <a href="#" class="nav-link text-dark ">
                    Who We Are
                  </a>
                </li>
                <li class="nav-item">
                  <a href="#" class="nav-link text-dark">
                    Blog
                  </a>
                </li>
                <li class="nav-item">
                  <a href="#" class="nav-link text-dark">
                    Careers
                  </a>
                </li>
                <li class="nav-item">
                  <a href="#" class="nav-link text-dark ">
                    Report Fraud
                  </a>
                </li>
                <li class="nav-item">
                  <a href="#" class="nav-link text-dark">
                    Investors Relation
                  </a>
                </li>
              </ul>
            </div>
            {/* <!-- Grid column --> */}

            {/* <!-- Grid column --> */}
            <div class="col-md-3 mb-md-0 mb-3">
              {/* <!-- Links --> */}
              <ul class="list-unstyled">
                <li class="nav-item">
                  <h3 class="text-uppercase">FOODIES</h3>
                  <a href="#" class="nav-link text-dark ">
                    Code of conduct
                  </a>
                </li>
                <li class="nav-item">
                  <a href="#" class="nav-link text-dark">
                    Community
                  </a>
                </li>
                <li class="nav-item">
                  <a href="#" class="nav-link text-dark">
                    Blogger Helps
                  </a>
                </li>
              </ul>
            </div>
            {/* <!-- Grid column --> */}
            <div class="col-md-3 mb-md-0 mb-3">
              <ul class="list-unstyled">
                <li class="nav-item">
                  <h3 class="text-uppercase">RESTAURANTS</h3>
                  <a href="#" class="nav-link text-dark ">
                    Add Restaurant
                  </a>
                </li>
                <li class="nav-item">
                  <a href="#" class="nav-link text-dark">
                    Buisness App
                  </a>
                </li>
                <li class="nav-item">
                  <a href="#" class="nav-link text-dark">
                    App Widgets
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* <!-- Copyright --> */}
        <div class="footer-copyright text-center py-3">
          By continuing past this page, you agree to our Terms of Service,
          Cookie Policy, <a href="#"> Privacy Policy</a> and
          <a href="#">Content Policies</a>. All trademarks are properties of
          their respective owners. 2009-2021 © foodlab™ Ltd. All rights
          reserved.
          <a href="https://mdbootstrap.com/"> foodlab.com</a>
          
        </div>
        {/* <!-- Copyright --> */}
      </footer>
    </div>
  );
}

export default Footer;