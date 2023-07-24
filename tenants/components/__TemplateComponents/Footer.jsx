export const Footer = () => (
  <>
    <section id="footer-1154">
      <div className="cs-container">
        <div className="cs-top">
          <a aria-label="go back to home" className="cs-logo" href="">
            <img
              className="cs-logo-img"
              loading="lazy"
              decoding="async"
              src="https://csimg.nyc3.cdn.digitaloceanspaces.com/Logos/stitch-charity.svg"
              alt="logo"
              width={168}
              height={48}
            />
          </a>
          <ul className="cs-ul">
            <li className="cs-li">
              <a href="" className="cs-link">
                Home
              </a>
            </li>
            <li className="cs-li">
              <a href="" className="cs-link">
                About
              </a>
            </li>
            <li className="cs-li">
              <a href="" className="cs-link">
                Services
              </a>
            </li>
            <li className="cs-li">
              <a href="" className="cs-link">
                Donations
              </a>
            </li>
            <li className="cs-li">
              <a href="" className="cs-link">
                Events
              </a>
            </li>
            <li className="cs-li">
              <a href="" className="cs-link">
                Blog
              </a>
            </li>
            <li className="cs-li">
              <a href="" className="cs-link">
                Contact
              </a>
            </li>
          </ul>
        </div>
        <div className="cs-bottom">
          {/*Social*/}
          <ul className="cs-social">
            <li className="cs-social-li">
              <a
                href=""
                className="cs-social-link"
                aria-label="facebook"
                target="_blank"
                rel="noopener"
              >
                <img
                  className="cs-social-icon cs-default"
                  src="https://csimg.nyc3.cdn.digitaloceanspaces.com/Icons/facebook-1a.svg"
                  alt="icon"
                  loading="lazy"
                  decoding="async"
                  width={12}
                  height={12}
                  aria-hidden="true"
                />
              </a>
            </li>
            <li className="cs-social-li">
              <a
                href=""
                className="cs-social-link"
                aria-label="twitter"
                target="_blank"
                rel="noopener"
              >
                <img
                  className="cs-social-icon cs-default"
                  src="https://csimg.nyc3.cdn.digitaloceanspaces.com/Icons/twitter-1a.svg"
                  alt="icon"
                  loading="lazy"
                  decoding="async"
                  width={12}
                  height={12}
                  aria-hidden="true"
                />
              </a>
            </li>
            <li className="cs-social-li">
              <a
                href=""
                className="cs-social-link"
                aria-label="instagram"
                target="_blank"
                rel="noopener"
              >
                <img
                  className="cs-social-icon cs-default"
                  src="https://csimg.nyc3.cdn.digitaloceanspaces.com/Icons/instagram-1a.svg"
                  alt="icon"
                  loading="lazy"
                  decoding="async"
                  width={12}
                  height={12}
                  aria-hidden="true"
                />
              </a>
            </li>
            <li className="cs-social-li">
              <a
                href=""
                className="cs-social-link"
                aria-label="twitter"
                target="_blank"
                rel="noopener"
              >
                <img
                  className="cs-social-icon cs-default"
                  src="https://csimg.nyc3.cdn.digitaloceanspaces.com/Icons/youtube-1a.svg"
                  alt="icon"
                  loading="lazy"
                  decoding="async"
                  width={12}
                  height={12}
                  aria-hidden="true"
                />
              </a>
            </li>
          </ul>
          <span className="cs-copyright">
            © Copyright 2023 -{" "}
            <a href="" className="cs-copyright-link">
              Stitch Non-profit Charity
            </a>
          </span>
        </div>
      </div>
    </section>


    <style>
      {`
        /* Mobile - 360px */
        @media only screen and (min-width: 0rem) {
          #footer-1154 {
            /* remove the font family so the Stitch inherits the fonts from your global stylesheet */
            font-family: 'Roboto', 'Arial', sans-serif;
            padding: var(--sectionPadding);
            position: relative;
            z-index: 1;
          }
          #footer-1154 .cs-container {
            width: 100%;
            max-width: 80rem;
            margin: auto;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          #footer-1154 .cs-top {
            width: 100%;
            /* 32px - 40px */
            margin-bottom: clamp(2rem, 4vw, 2.5rem);
            padding-bottom: clamp(2rem, 4vw, 2.5rem);
            border-bottom: 1px solid #e8e8e8;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 2rem;
          }
          #footer-1154 .cs-ul {
            margin: 0;
            padding: 0;
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            justify-content: center;
            row-gap: 0.5rem;
            /* 28px - 40px */
            column-gap: clamp(1.75rem, 4vw, 2.5rem);
          }
          #footer-1154 .cs-li {
            list-style: none;
          }
          #footer-1154 .cs-link {
            /* 14px - 16px */
            font-size: clamp(0.875rem, 1.5vw, 1rem);
            line-height: 1.5em;
            text-decoration: none;
            margin: 0;
            color: var(--bodyTextColor);
            display: block;
            transition: color .3s;
          }
          #footer-1154 .cs-link:hover {
            color: var(--primary);
          }
          #footer-1154 .cs-logo {
            width: 10.5rem;
            height: auto;
            display: block;
          }
          #footer-1154 .cs-logo-img {
            width: 100%;
            height: auto;
            display: block;
          }
          #footer-1154 .cs-bottom {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 1.5rem;
          }
          #footer-1154 .cs-social {
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 0.5rem;
          }
          #footer-1154 .cs-social-li {
            list-style: none;
          }
          #footer-1154 .cs-social-link {
            width: 2rem;
            height: 2rem;
            background-color: #e8e8e8;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            transition: background-color 0.3s;
          }
          #footer-1154 .cs-social-link:hover {
            background-color: var(--primary);
          }
          #footer-1154 .cs-social-link:hover .cs-social-icon {
            filter: grayscale(1) brightness(1000%);
            opacity: 1;
          }
          #footer-1154 .cs-social-icon {
            width: 0.75rem;
            height: auto;
            display: block;
            opacity: .6;
            transition: opacity .3s;
          }
          #footer-1154 .cs-copyright {
            font-size: 1rem;
            line-height: 1.5em;
            margin: 0;
            color: var(--bodyTextColor);
            display: block;
          }
          #footer-1154 .cs-copyright-link {
            font-size: inherit;
            text-decoration: none;
            color: inherit;
            transition: color .3s;
          }
          #footer-1154 .cs-copyright-link:hover {
            color: var(--primary);
          }
        }
        /* Tablet - 768px */
        @media only screen and (min-width: 48rem) {
          #footer-1154 .cs-top {
            flex-direction: row;
            justify-content: space-between;
          }
          #footer-1154 .cs-bottom {
            flex-direction: row;
            justify-content: space-between;
          }
        }
                                        
      `}
    </style>
  </>
)