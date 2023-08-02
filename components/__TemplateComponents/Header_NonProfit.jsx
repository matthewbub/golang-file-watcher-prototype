import React, { useState, useEffect } from 'react';

export const Header = () => {
  const [isHamburgerActive, setHamburgerActive] = useState(false);
  const [isScrolling, setScrolling] = useState(false);

  const toggleHamburgerMenu = () => {
    setHamburgerActive(!isHamburgerActive);
    ariaExpanded();
  };

  const ariaExpanded = () => {
    const csUL = document.querySelector('#iep-expanded');
    const csExpanded = csUL.getAttribute('aria-expanded');

    if (csExpanded === 'false') {
      csUL.setAttribute('aria-expanded', 'true');
    } else {
      csUL.setAttribute('aria-expanded', 'false');
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scroll = document.documentElement.scrollTop;
      setScrolling(scroll >= 100);
    };

    document.addEventListener('scroll', handleScroll);

    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <header id="iep-navigation">
        <div className="iep-top-bar">
          <div className="iep-top-container">
            <div className="iep-top-social">
              <a href="" className="iep-social-link">
                <img
                  className="iep-social-icon"
                  src="https://csimg.nyc3.cdn.digitaloceanspaces.com/Icons/facebook-dark.svg"
                  alt="logo"
                  width={12}
                  height={12}
                  aria-hidden="true"
                  decoding="async"
                />
              </a>
              <a href="" className="iep-social-link">
                <img
                  className="iep-social-icon"
                  src="https://csimg.nyc3.cdn.digitaloceanspaces.com/Icons/twitter-dark.svg"
                  alt="logo"
                  width={12}
                  height={12}
                  aria-hidden="true"
                  decoding="async"
                />
              </a>
              <a href="" className="iep-social-link">
                <img
                  className="iep-social-icon"
                  src="https://csimg.nyc3.cdn.digitaloceanspaces.com/Icons/instagram-dark.svg"
                  alt="logo"
                  width={12}
                  height={12}
                  aria-hidden="true"
                  decoding="async"
                />
              </a>
              <a href="" className="iep-social-link">
                <img
                  className="iep-social-icon"
                  src="https://csimg.nyc3.cdn.digitaloceanspaces.com/Icons/youtube-dark.svg"
                  alt="logo"
                  width={12}
                  height={12}
                  aria-hidden="true"
                  decoding="async"
                />
              </a>
            </div>
            <div className="iep-top-contact">
              <a href="" className="iep-top-link">
                <img
                  className="iep-link-icon"
                  src="https://csimg.nyc3.cdn.digitaloceanspaces.com/Icons/charity-pin-green.svg"
                  alt="logo"
                  width={16}
                  height={16}
                  aria-hidden="true"
                  decoding="async"
                />
                555 Fake Avenue - South Milwaukee, WI 53172
              </a>
              <a href="" className="iep-top-link">
                <img
                  className="iep-link-icon"
                  src="https://csimg.nyc3.cdn.digitaloceanspaces.com/Icons/charity-phone-green.svg"
                  alt="logo"
                  width={16}
                  height={16}
                  aria-hidden="true"
                  decoding="async"
                />
                (555) 678-2345
              </a>
              <a href="" className="iep-top-link">
                <img
                  className="iep-link-icon"
                  src="https://csimg.nyc3.cdn.digitaloceanspaces.com/Icons/charity-clock-green.svg"
                  alt="logo"
                  width={20}
                  height={20}
                  aria-hidden="true"
                  decoding="async"
                />
                M-F: 8:00am - 9:00pm
              </a>
            </div>
          </div>
        </div>
        <div className="iep-container">
          {/*Nav Logo*/}
          <a href="" className="iep-logo" aria-label="back to home">
            <img
              src="https://csimg.nyc3.cdn.digitaloceanspaces.com/Logos/stitch-charity.svg"
              alt="logo"
              width={197}
              height={43}
              aria-hidden="true"
              decoding="async"
            />
          </a>
          {/*Navigation List*/}
          <nav className="iep-nav" role="navigation">
            {/*Mobile Nav Toggle*/}
            <button className="iep-toggle" aria-label="mobile menu toggle" onClick={toggleHamburgerMenu}>
              <div className="iep-box" aria-hidden="true">
                <span className="iep-line iep-line1" aria-hidden="true" />
                <span className="iep-line iep-line2" aria-hidden="true" />
                <span className="iep-line iep-line3" aria-hidden="true" />
              </div>
            </button>
            {/* We need a wrapper div so we can set a fixed height on the iep-ul in case the nav list gets too long from too many dropdowns being opened and needs to have an overflow scroll. This wrapper acts as the background so it can go the full height of the screen and not cut off any overflowing nav items while the iep-ul stops short of the bottom of the screen, which keeps all nav items in view no matter how mnay there are*/}
            <div className="iep-ul-wrapper">
              <ul id="iep-expanded" className="iep-ul" aria-expanded="false">
                <li className="iep-li">
                  <a href="" className="iep-li-link iep-active">
                    Home
                  </a>
                </li>
                <li className="iep-li">
                  <a href="" className="iep-li-link">
                    About
                  </a>
                </li>
                {/*Copy and paste this iep-dropdown list item and replace any .iep-li with this iep-dropdown group to make a new dropdown and it will work*/}
                <li className="iep-li iep-dropdown" tabIndex={0}>
                  <span className="iep-li-link">
                    Services
                    <img
                      className="iep-drop-icon"
                      src="https://csimg.nyc3.cdn.digitaloceanspaces.com/Icons/down-green.svg"
                      alt="dropdown icon"
                      width={15}
                      height={15}
                      decoding="async"
                      aria-hidden="true"
                    />
                  </span>
                  <ul className="iep-drop-ul">
                    <li className="iep-drop-li">
                      <a href="" className="iep-li-link iep-drop-link">
                        Housing
                      </a>
                    </li>
                    <li className="iep-drop-li">
                      <a href="" className="iep-li-link iep-drop-link">
                        Food Banks
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="iep-li">
                  <a href="" className="iep-li-link">
                    Donations
                  </a>
                </li>
                <li className="iep-li">
                  <a href="" className="iep-li-link">
                    Events
                  </a>
                </li>
                <li className="iep-li">
                  <a href="" className="iep-li-link">
                    Blog
                  </a>
                </li>
                <li className="iep-li">
                  <a href="" className="iep-li-link">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </nav>
          <a href="" className="iep-donate">
            <img
              className="iep-donate-icon"
              src="https://csimg.nyc3.cdn.digitaloceanspaces.com/Icons/donate-icon.svg"
              alt="logo"
              width={56}
              height={56}
              aria-hidden="true"
              decoding="async"
            />
            <div className="iep-flex">
              <span className="iep-desc">Join Us Now</span>
              <span className="iep-header">Become a Volunteer</span>
            </div>
          </a>
          <a href="" className="iep-button-solid iep-nav-button">
            Donate Now
          </a>
          {/*Dark Mode toggle, uncomment button code if you want to enable a dark mode toggle*/}
          {/* <button id="dark-mode-toggle" aria-label="dark mode toggle">
      <svg class="iep-moon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 480" style="enable-background:new 0 0 480 480" xml:space="preserve"><path d="M459.782 347.328c-4.288-5.28-11.488-7.232-17.824-4.96-17.76 6.368-37.024 9.632-57.312 9.632-97.056 0-176-78.976-176-176 0-58.4 28.832-112.768 77.12-145.472 5.472-3.712 8.096-10.4 6.624-16.832S285.638 2.4 279.078 1.44C271.59.352 264.134 0 256.646 0c-132.352 0-240 107.648-240 240s107.648 240 240 240c84 0 160.416-42.688 204.352-114.176 3.552-5.792 3.04-13.184-1.216-18.496z"/></svg>
      <img class="iep-sun" aria-hidden="true" src="https://csimg.nyc3.cdn.digitaloceanspaces.com/Icons%2Fsun.svg" decoding="async" alt="moon" width="15" height="15">
  </button> */}
        </div>
      </header>
      <style jsx>
        {`
        /* Mobile - 1023px */
        @media only screen and (max-width: 63.9375rem) {
          body.iep-open {
            overflow: hidden;
          }
          body.scroll #iep-navigation .iep-top-container {
            gap: 0;
          }
          body.scroll #iep-navigation .iep-top-social {
            height: 0;
            opacity: 0;
            overflow: hidden;
            visibility: hidden;
          }
          #iep-navigation {
            /* remove the font family so the Stitch inherits the fonts from your global stylesheet */
            font-family: 'Roboto', 'Arial', sans-serif;
            width: 100%;
            /* prevents padding from affecting height and width */
            box-sizing: border-box;
            background-color: #fff;
            box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
            position: fixed;
            z-index: 10000;
          }
          #iep-navigation:before {
            content: '';
            width: 100%;
            height: 0vh;
            background: rgba(0, 0, 0, 0.6);
            -webkit-backdrop-filter: blur(10px);
            backdrop-filter: blur(10px);
            position: absolute;
            display: block;
            top: 100%;
            right: 0;
            z-index: -1100;
            opacity: 0;
            transition: height .5s, opacity .5s;
          }
          #iep-navigation.iep-active:before {
            height: 150vh;
            opacity: 1;
          }
          #iep-navigation.iep-active .iep-ul-wrapper {
            opacity: 1;
            transform: scaleY(1);
            transition-delay: .15s;
          }
          #iep-navigation.iep-active .iep-li {
            transform: translateY(0);
            opacity: 1;
          }
          #iep-navigation .iep-top-bar {
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          #iep-navigation .iep-top-container {
            width: 100%;
            padding: 1rem 1rem 0;
            /* prevents padding from affecting height and width */
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
            gap: 1rem;
          }
          #iep-navigation .iep-top-contact {
            width: 100%;
            padding-bottom: 1rem;
            /* prevents padding from affecting height and width */
            box-sizing: border-box;
            border-bottom: 1px solid #E8E8E8;
            display: flex;
            justify-content: center;
            align-items: center;
            /* 16px - 20px */
            gap: clamp(1rem, 2vw, 1.5rem);
          }
          #iep-navigation .iep-top-link {
            font-size: 0.875rem;
            line-height: 1.5em;
            text-decoration: none;
            margin: 0;
            color: var(--bodyTextColor);
            display: flex;
            justify-content: flex-start;
            align-items: center;
            gap: 0.5rem;
            position: relative;
          }
          #iep-navigation .iep-top-link:nth-of-type(1) {
            display: none;
          }
          #iep-navigation .iep-top-link:last-of-type:after {
            display: none;
          }
          #iep-navigation .iep-top-link:after {
            content: '';
            width: 1px;
            height: 1.5rem;
            /* 8px - 16px */
            margin-left: clamp(0.5rem, 1.5vw, 1rem);
            background: #BABABA;
            opacity: 1;
            position: relative;
            display: block;
          }
          #iep-navigation .iep-link-icon {
            width: 1rem;
            height: auto;
            display: block;
          }
          #iep-navigation .iep-top-social {
            height: 2rem;
            visibility: visible;
            opacity: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 0.5rem;
            transition: opacity .3s, visibility .3s, height .3s;
          }
          #iep-navigation .iep-social-link {
            text-decoration: none;
            width: 2rem;
            height: 2rem;
            background-color: #F7F7F7;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          #iep-navigation .iep-social-icon {
            width: 0.75rem;
            height: auto;
            opacity: .6;
            display: block;
          }
          #iep-navigation .iep-container {
            width: 100%;
            /* 16px - 20px */
            padding: clamp(1rem, 2.5vw, 1.25rem) 1rem;
            /* prevents padding from affecting height and width */
            box-sizing: border-box;
            display: flex;
            justify-content: flex-end;
            align-items: center;
            position: relative;
          }
          #iep-navigation .iep-logo {
            width: auto;
            /* 32px - 48px */
            height: clamp(2rem, 6.4vw, 3rem);
            margin: 0 auto 0 0;
            padding: 0;
            /* prevents padding from affecting height and width */
            box-sizing: border-box;
            display: flex;
            justify-content: center;
            align-items: center;
            order: 1;
            z-index: 10;
          }
          #iep-navigation .iep-logo img {
            width: auto;
            height: 100%;
            /* ensures the image never overflows the container. It stays contained within it's width and height and expands to fill it then stops once it reaches an edge */
            object-fit: contain;
          }
          #iep-navigation .iep-nav {
            order: 2;
          }
          #iep-navigation .iep-toggle {
            /* 48px - 56px */
            width: clamp(3rem, 7.2vw, 3.5rem);
            height: clamp(3rem, 7.2vw, 3.5rem);
            margin: 0 0 0 auto;
            background-color: var(--primary);
            border-radius: 0.25rem;
            border: none;
            display: flex;
            justify-content: center;
            align-items: center;
            transition: transform .6s;
          }
          #iep-navigation .iep-toggle.iep-active {
            transform: rotate(180deg);
          }
          #iep-navigation .iep-active .iep-line1 {
            top: 50%;
            transform: translate(-50%, -50%) rotate(225deg);
          }
          #iep-navigation .iep-active .iep-line2 {
            top: 50%;
            transform-origin: center;
            transform: translate(-50%, -50%) translateY(0) rotate(-225deg);
          }
          #iep-navigation .iep-active .iep-line3 {
            bottom: 100%;
            opacity: 0;
          }
          #iep-navigation .iep-box {
            /* 24px - 28px */
            width: clamp(1.5rem, 2vw, 1.75rem);
            height: 1rem;
            position: relative;
          }
          #iep-navigation .iep-line {
            width: 100%;
            height: 2px;
            border-radius: 2px;
            background-color: #FAFBFC;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
          }
          #iep-navigation .iep-line1 {
            top: 0;
            transform-origin: center;
            transition: transform .5s, top .3S, left .3S;
            animation-duration: .7s;
            animation-timing-function: ease;
            animation-fill-mode: forwards;
            animation-direction: normal;
          }
          #iep-navigation .iep-line2 {
            top: 50%;
            transform: translateX(-50%) translateY(-50%);
            transition: top .3s, left .3s, transform .5s;
            animation-duration: .7s;
            animation-timing-function: ease;
            animation-fill-mode: forwards;
            animation-direction: normal;
          }
          #iep-navigation .iep-line3 {
            bottom: 0;
            transition: bottom .3s, opacity .3s;
          }
          #iep-navigation .iep-ul-wrapper {
            width: 100%;
            height: auto;
            padding-bottom: 3rem;
            opacity: 0;
            background-color: #fff;
            box-shadow: inset rgba(0, 0, 0, 0.2) 0px 8px 24px;
            overflow: hidden;
            position: absolute;
            top: 100%;
            left: 0;
            z-index: -1;
            transform: scaleY(0);
            transform-origin: top;
            transition: transform .4s, opacity .3s;
          }
          #iep-navigation .iep-ul {
            margin: 0;
            padding: 3rem 0 0 0;
            width: 100%;
            height: auto;
            max-height: 65vh;
            overflow: scroll;
            display: flex;
            justify-content: flex-start;
            flex-direction: column;
            align-items: center;
            gap: 1.25rem;
          }
          #iep-navigation .iep-li {
            width: 100%;
            text-align: center;
            list-style: none;
            margin-right: 0;
            /* transition from these values */
            transform: translateY(-4.375rem);
            opacity: 0;
            transition: transform .6s, opacity .9s;
          }
          #iep-navigation .iep-li:nth-of-type(1) {
            transition-delay: .05s;
          }
          #iep-navigation .iep-li:nth-of-type(2) {
            transition-delay: .1s;
          }
          #iep-navigation .iep-li:nth-of-type(3) {
            transition-delay: .15s;
          }
          #iep-navigation .iep-li:nth-of-type(4) {
            transition-delay: .2s;
          }
          #iep-navigation .iep-li:nth-of-type(5) {
            transition-delay: .25s;
          }
          #iep-navigation .iep-li:nth-of-type(6) {
            transition-delay: .3s;
          }
          #iep-navigation .iep-li:nth-of-type(7) {
            transition-delay: .35s;
          }
          #iep-navigation .iep-li:nth-of-type(8) {
            transition-delay: .4s;
          }
          #iep-navigation .iep-li:nth-of-type(9) {
            transition-delay: .45s;
          }
          #iep-navigation .iep-li:nth-of-type(10) {
            transition-delay: .5s;
          }
          #iep-navigation .iep-li:nth-of-type(11) {
            transition-delay: .55s;
          }
          #iep-navigation .iep-li:nth-of-type(12) {
            transition-delay: .6s;
          }
          #iep-navigation .iep-li:nth-of-type(13) {
            transition-delay: .65s;
          }
          #iep-navigation .iep-li-link {
            /* 16px - 24px */
            font-size: clamp(1rem, 2.5vw, 1.5rem);
            line-height: 1.2em;
            text-decoration: none;
            margin: 0;
            color: var(--headerColor);
            display: inline-block;
            position: relative;
          }
          #iep-navigation .iep-li-link.iep-active {
            color: var(--primary);
          }
          #iep-navigation .iep-li-link:hover {
            color: var(--primary);
          }
          #iep-navigation .iep-button-solid {
            display: none;
          }
          #iep-navigation .iep-donate {
            text-decoration: none;
            margin-right: 2rem;
            display: none;
            justify-content: center;
            align-items: center;
            gap: 0.75rem;
            order: 1;
          }
          #iep-navigation .iep-flex {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
          }
          #iep-navigation .iep-donate-icon {
            width: 3.5rem;
            height: auto;
          }
          #iep-navigation .iep-desc {
            font-size: 1rem;
            line-height: 1.5em;
            margin: 0;
            color: var(--bodyTextColor);
          }
          #iep-navigation .iep-header {
            font-size: 1.25rem;
            line-height: 1.2em;
            font-weight: 700;
            margin: 0;
            color: var(--headerColor);
          }
        }
        /* Tablet - 768px */
        @media only screen and (min-width: 48rem) {
          #iep-navigation .iep-top-container {
            padding-bottom: 1rem;
            border-bottom: 1px solid #E8E8E8;
            flex-direction: row;
            justify-content: space-between;
          }
          #iep-navigation .iep-top-contact {
            width: auto;
            padding: 0;
            border: none;
          }
          #iep-navigation .iep-donate {
            display: flex;
          }
        }
        
        /*-- -------------------------- -->
        <---     Navigation Dropdown    -->
        <--- -------------------------- -*/
        
        /* Mobile - 1023px */
        @media only screen and (max-width: 63.9375rem) {
          #iep-navigation .iep-li {
            text-align: center;
            width: 100%;
            display: block;
          }
          #iep-navigation .iep-dropdown {
            position: relative;
            color: var(--bodyTextColorWhite);
          }
          #iep-navigation .iep-dropdown.iep-active .iep-drop-ul {
            height: auto;
            opacity: 1;
            visibility: visible;
            margin: 0.75rem 0 0 0;
            padding: 0.75rem 0;
          }
          #iep-navigation .iep-dropdown.iep-active .iep-drop-link {
            opacity: 1;
          }
          #iep-navigation .iep-dropdown .iep-li-link {
            position: relative;
            transition: opacity .3s;
          }
          #iep-navigation .iep-drop-icon {
            width: 0.9375rem;
            height: auto;
            position: absolute;
            top: 50%;
            right: -1.25rem;
            transform: translateY(-50%);
          }
          #iep-navigation .iep-drop-ul {
            width: 100%;
            height: 0;
            margin: 0;
            padding: 0;
            background-color: var(--primary);
            overflow: hidden;
            opacity: 0;
            visibility: hidden;
            display: flex;
            justify-content: flex-start;
            flex-direction: column;
            align-items: center;
            gap: 0.75rem;
            transition: padding .3s, margin .3s, height .3s, opacity .3s, visibility .3s;
          }
          #iep-navigation .iep-drop-li {
            list-style: none;
          }
          #iep-navigation .iep-li-link.iep-drop-link {
            /* 14px - 16px */
            font-size: clamp(0.875rem, 2vw, 1.25rem);
            color: #fff;
          }
        }
        /* Desktop - 1024px */
        @media only screen and (min-width: 64rem) {
          #iep-navigation .iep-dropdown {
            position: relative;
          }
          #iep-navigation .iep-dropdown:hover {
            cursor: pointer;
          }
          #iep-navigation .iep-dropdown:hover .iep-drop-ul {
            transform: scaleY(1);
            opacity: 1;
            visibility: visible;
          }
          #iep-navigation .iep-dropdown:hover .iep-drop-li {
            opacity: 1;
            transform: translateY(0);
          }
          #iep-navigation .iep-drop-icon {
            width: 0.9375rem;
            height: auto;
            display: inline-block;
          }
          #iep-navigation .iep-drop-ul {
            min-width: 12.5rem;
            margin: 0;
            padding: 0;
            background-color: #fff;
            overflow: hidden;
            opacity: 0;
            visibility: hidden;
            box-shadow: rgba(149, 157, 165, 0.2) 0px 10px 16px;
            border-bottom: 5px solid var(--primary);
            /* if you have 8 or more links in your dropdown nav, uncomment the columns property to make the list into 2 even columns. Change it to 3 or 4 if you need extra columns. Then remove the transition delays on the iep-drop-li so they don't have weird scattered animations */
            position: absolute;
            top: 100%;
            z-index: -100;
            transform: scaleY(0);
            transform-origin: top;
            transition: transform .3s, visibility .3s, opacity .3s;
          }
          #iep-navigation .iep-drop-li {
            list-style: none;
            font-size: 1rem;
            text-decoration: none;
            opacity: 0;
            width: 100%;
            height: auto;
            display: block;
            transform: translateY(-0.625rem);
            transition: opacity .6s, transform .6s;
          }
          #iep-navigation .iep-drop-li:nth-of-type(1) {
            transition-delay: .05s;
          }
          #iep-navigation .iep-drop-li:nth-of-type(2) {
            transition-delay: .1s;
          }
          #iep-navigation .iep-drop-li:nth-of-type(3) {
            transition-delay: .15s;
          }
          #iep-navigation .iep-drop-li:nth-of-type(4) {
            transition-delay: .2s;
          }
          #iep-navigation .iep-drop-li:nth-of-type(5) {
            transition-delay: .25s;
          }
          #iep-navigation .iep-drop-li:nth-of-type(6) {
            transition-delay: .3s;
          }
          #iep-navigation .iep-drop-li:nth-of-type(7) {
            transition-delay: .35s;
          }
          #iep-navigation .iep-drop-li:nth-of-type(8) {
            transition-delay: .4s;
          }
          #iep-navigation .iep-drop-li:nth-of-type(9) {
            transition-delay: .45s;
          }
          #iep-navigation .iep-drop-li:nth-of-type(10) {
            transition-delay: .5s;
          }
          #iep-navigation .iep-drop-li:nth-of-type(11) {
            transition-delay: .55s;
          }
          #iep-navigation .iep-drop-li:nth-of-type(12) {
            transition-delay: .6s;
          }
          #iep-navigation .iep-drop-li:nth-of-type(13) {
            transition-delay: .65s;
          }
          #iep-navigation .iep-li-link.iep-drop-link {
            font-size: 1rem;
            white-space: nowrap;
            line-height: 1.5em;
            text-decoration: none;
            width: 100%;
            padding: 0.75rem;
            /* prevents padding from affecting height and width */
            box-sizing: border-box;
            color: var(--bodyTextColor);
            display: block;
            transition: color 0.3s, background-color 0.3s;
          }
          #iep-navigation .iep-li-link.iep-drop-link:hover {
            color: var(--primary);
            background-color: #f7f7f7;
          }
          #iep-navigation .iep-li-link.iep-drop-link:before {
            display: none;
          }
        }
        
        /*-- -------------------------- -->
        <---     Desktop Navigation     -->
        <--- -------------------------- -*/
        
        /* Small Desktop - 1024px */
        @media only screen and (min-width: 64rem) {
          #iep-navigation {
            /* remove the font family so the Stitch inherits the fonts from your global stylesheet */
            font-family: 'Roboto', 'Arial', sans-serif;
            width: 100%;
            padding: 0;
            /* prevents padding from affecting height and width */
            box-sizing: border-box;
            background-color: #fff;
            box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
            position: fixed;
            z-index: 10000;
          }
          #iep-navigation .iep-top-bar {
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          #iep-navigation .iep-top-container {
            width: 100%;
            max-width: 107.5rem;
            padding: 1rem;
            /* prevents padding from affecting height and width */
            box-sizing: border-box;
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 3.125rem;
          }
          #iep-navigation .iep-top-contact {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            gap: 1.5rem;
          }
          #iep-navigation .iep-top-link {
            font-size: 0.875rem;
            line-height: 1.5em;
            text-decoration: none;
            margin: 0;
            color: var(--bodyTextColor);
            display: flex;
            justify-content: flex-start;
            align-items: center;
            gap: 0.5rem;
            position: relative;
          }
          #iep-navigation .iep-top-link:hover {
            text-decoration: underline;
          }
          #iep-navigation .iep-top-link:last-of-type:after {
            display: none;
          }
          #iep-navigation .iep-top-link:after {
            content: '';
            width: 1px;
            height: 1.5rem;
            /* 8px - 16px */
            margin-left: clamp(0.5rem, 1.5vw, 1rem);
            background: #BABABA;
            opacity: 1;
            position: relative;
            display: block;
          }
          #iep-navigation .iep-link-icon {
            width: 1rem;
            height: auto;
            display: block;
          }
          #iep-navigation .iep-top-social {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 0.5rem;
          }
          #iep-navigation .iep-social-link {
            text-decoration: none;
            width: 2rem;
            height: 2rem;
            background-color: #F7F7F7;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            transition: background-color 0.3s;
          }
          #iep-navigation .iep-social-link:hover {
            background-color: var(--secondary);
          }
          #iep-navigation .iep-social-icon {
            width: 0.75rem;
            height: auto;
            opacity: .6;
            display: block;
          }
          #iep-navigation .iep-container {
            width: 100%;
            max-width: 107.5rem;
            margin: auto;
            padding: 0 1rem;
            /* prevents padding from affectin gheight */
            box-sizing: border-box;
            display: flex;
            justify-content: flex-end;
            align-items: center;
            gap: 1.5rem;
            position: relative;
          }
          #iep-navigation .iep-toggle {
            display: none;
          }
          #iep-navigation .iep-logo {
            width: 18.4%;
            max-width: 12.3125rem;
            height: 3.75rem;
            /* margin-right auto pushes everything away from it to the right */
            margin: 0 auto 0 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 100;
          }
          #iep-navigation .iep-logo img {
            width: 100%;
            height: 100%;
            /* ensures the image never overflows the container. It stays contained within it's width and height and expands to fill it then stops once it reaches an edge */
            object-fit: contain;
          }
          #iep-navigation .iep-ul {
            width: 100%;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            gap: 2.5rem;
          }
          #iep-navigation .iep-li {
            list-style: none;
            padding: 2.25rem 0;
            /* prevent flexbox from squishing it */
            flex: none;
          }
          #iep-navigation .iep-li-link {
            /* 14px - 16px */
            font-size: clamp(0.875rem, 1.3vw, 1rem);
            line-height: 1.5em;
            text-decoration: none;
            margin: 0;
            color: var(--bodyTextColor);
            display: block;
            position: relative;
            transition: color .3s;
          }
          #iep-navigation .iep-li-link:hover {
            color: var(--primary);
          }
          #iep-navigation .iep-li-link.iep-active {
            font-weight: 700;
            color: var(--headerColor);
          }
          #iep-navigation .iep-donate {
            text-decoration: none;
            display: none;
            justify-content: center;
            align-items: center;
            gap: 0.75rem;
          }
          #iep-navigation .iep-donate:hover .iep-donate-icon {
            transform: scale(1.1);
          }
          #iep-navigation .iep-flex {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
          }
          #iep-navigation .iep-donate-icon {
            width: 3.5rem;
            height: auto;
            transition: transform .3s;
          }
          #iep-navigation .iep-desc {
            font-size: 1rem;
            line-height: 1.5em;
            margin: 0;
            color: var(--bodyTextColor);
          }
          #iep-navigation .iep-header {
            font-size: 1.25rem;
            line-height: 1.2em;
            font-weight: 700;
            margin: 0;
            color: var(--headerColor);
          }
          #iep-navigation .iep-button-solid {
            font-size: 1rem;
            /* 46px - 56px */
            line-height: clamp(2.875em, 5.5vw, 3.5em);
            text-decoration: none;
            font-weight: 700;
            text-align: center;
            margin: 0;
            color: #fff;
            min-width: 9.375rem;
            padding: 0 2rem;
            background-color: var(--primary);
            border-radius: 0.5rem;
            overflow: hidden;
            display: inline-block;
            position: relative;
            z-index: 1;
            /* prevents padding from adding to the width */
            box-sizing: border-box;
            transition: color .3s;
          }
          #iep-navigation .iep-button-solid:before {
            content: '';
            position: absolute;
            height: 100%;
            width: 0%;
            background: #1a1a1a;
            border-radius: 0.5rem;
            opacity: 1;
            top: 0;
            left: 0;
            z-index: -1;
            transition: width .3s;
          }
          #iep-navigation .iep-button-solid:hover:before {
            width: 100%;
          }
          #iep-navigation .iep-nav-button {
            padding: 0 3rem;
            display: none;
          }
        }
        /* Large Desktop - 1300px */
        @media only screen and (min-width: 81.25rem) {
          #iep-navigation .iep-container {
            justify-content: space-between;
          }
          #iep-navigation .iep-nav-button {
            margin-left: auto;
            display: block;
          }
        }
        /* Larger Desktop - 1600px */
        @media only screen and (min-width: 100rem) {
          #iep-navigation .iep-donate {
            display: flex;
            margin-left: auto;
          }
          #iep-navigation .iep-nav-button {
            margin: 0;
          }
        }
      `}
      </style>
    </>
  )
}
