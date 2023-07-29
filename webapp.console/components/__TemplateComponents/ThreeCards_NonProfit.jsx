export const ThreeCards = () => (
  <>
    <section id="donations-1153">
      <div className="iep-container">
        <div className="iep-content">
          <span className="iep-topper">Donate Now</span>
          <h2 className="iep-title">Find The Cause You Want To Donate To</h2>
          <p className="iep-text">
            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
            sint. Velit officia consequat duis enim velit mollit. Amet minim mollit
            non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia
            consequat duis enim velit mollit.
          </p>
        </div>
        <ul className="iep-card-group">
          <li className="iep-item">
            <picture className="iep-picture" aria-hidden="true">
              <source
                media="(max-width: 600px)"
                srcSet="https://csimg.nyc3.cdn.digitaloceanspaces.com/Images/People/event1.jpg"
              />
              <source
                media="(min-width: 601px)"
                srcSet="https://csimg.nyc3.cdn.digitaloceanspaces.com/Images/People/event1.jpg"
              />
              <img
                loading="lazy"
                decoding="async"
                src="https://csimg.nyc3.cdn.digitaloceanspaces.com/Images/People/event1.jpg"
                alt="people"
                width={305}
                height={180}
              />
            </picture>
            <div className="iep-flex">
              <span className="iep-date">Medical</span>
              <h3 className="iep-h3">
                <a href="" className="iep-link">
                  Medical assistance for at risk children and youths
                </a>
              </h3>
              <p className="iep-item-text">
                We help companies develop powerful corporate responsibility and
                employee engagement.
              </p>
              <div className="iep-donations-flex">
                <div className="iep-bar">
                  {/*change the --progress number to match the percentage in iep-number*/}
                  {/* <div class="iep-progress" aria-hidden="true">
                          <span class="iep-progress-bar"  style="--progress: 42%"></span>
                      </div> */}
                  <span className="iep-percentage">42%</span>
                </div>
              </div>
              <div className="iep-number-group">
                <span className="iep-raised">
                  <span className="iep-number">$25,270</span>
                  <span className="iep-desc">Raised</span>
                </span>
                <span className="iep-raised">
                  <span className="iep-number">$40,000</span>
                  <span className="iep-desc">Raised</span>
                </span>
              </div>
              <a href="" className="iep-button-solid iep-donate">
                Donate Now!
              </a>
            </div>
          </li>
          <li className="iep-item">
            <picture className="iep-picture" aria-hidden="true">
              <source
                media="(max-width: 600px)"
                srcSet="https://csimg.nyc3.cdn.digitaloceanspaces.com/Images/People/event2.jpg"
              />
              <source
                media="(min-width: 601px)"
                srcSet="https://csimg.nyc3.cdn.digitaloceanspaces.com/Images/People/event2.jpg"
              />
              <img
                loading="lazy"
                decoding="async"
                src="https://csimg.nyc3.cdn.digitaloceanspaces.com/Images/People/event2.jpg"
                alt="people"
                width={305}
                height={180}
              />
            </picture>
            <div className="iep-flex">
              <span className="iep-date">Education</span>
              <h3 className="iep-h3">
                <a className="iep-link" href="">
                  School Counseling for children of refugees
                </a>
              </h3>
              <p className="iep-item-text">
                We help companies develop powerful corporate responsibility and
                employee engagement.
              </p>
              <div className="iep-donations-flex">
                <div className="iep-bar">
                  {/*change the --progress number to match the percentage in iep-number*/}
                  {/* <div class="iep-progress" aria-hidden="true">
                          <span class="iep-progress-bar"  style="--progress: 65%"></span>
                      </div> */}
                  <span className="iep-percentage">65%</span>
                </div>
              </div>
              <div className="iep-number-group">
                <span className="iep-raised">
                  <span className="iep-number">$25,270</span>
                  <span className="iep-desc">Raised</span>
                </span>
                <span className="iep-raised">
                  <span className="iep-number">$40,000</span>
                  <span className="iep-desc">Raised</span>
                </span>
              </div>
              <a href="" className="iep-button-solid iep-donate">
                Donate Now!
              </a>
            </div>
          </li>
          <li className="iep-item">
            <picture className="iep-picture" aria-hidden="true">
              <source
                media="(max-width: 600px)"
                srcSet="https://csimg.nyc3.cdn.digitaloceanspaces.com/Images/People/event3.jpg"
              />
              <source
                media="(min-width: 601px)"
                srcSet="https://csimg.nyc3.cdn.digitaloceanspaces.com/Images/People/event3.jpg"
              />
              <img
                loading="lazy"
                decoding="async"
                src="https://csimg.nyc3.cdn.digitaloceanspaces.com/Images/People/event3.jpg"
                alt="people"
                width={305}
                height={180}
              />
            </picture>
            <div className="iep-flex">
              <span className="iep-date">Food</span>
              <h3 className="iep-h3">
                <a href="" className="iep-link">
                  Provide proper education to children in remote areas
                </a>
              </h3>
              <p className="iep-item-text">
                We help companies develop powerful corporate responsibility and
                employee engagement.
              </p>
              <div className="iep-donations-flex">
                <div className="iep-bar">
                  {/*change the --progress number to match the percentage in iep-number*/}
                  {/* <div class="iep-progress" aria-hidden="true">
                          <span class="iep-progress-bar"  style="--progress: 90%"></span>
                      </div> */}
                  <span className="iep-percentage">90%</span>
                </div>
              </div>
              <div className="iep-number-group">
                <span className="iep-raised">
                  <span className="iep-number">$25,270</span>
                  <span className="iep-desc">Raised</span>
                </span>
                <span className="iep-raised">
                  <span className="iep-number">$40,000</span>
                  <span className="iep-desc">Raised</span>
                </span>
              </div>
              <a href="" className="iep-button-solid iep-donate">
                Donate Now!
              </a>
            </div>
          </li>
        </ul>
      </div>
    </section>

    <style>
      {`
      /* Mobile - 360px */
      @media only screen and (min-width: 0rem) {
        #donations-1153 {
          /* remove the font family so the Stitch inherits the fonts from your global stylesheet */
          font-family: 'Roboto', 'Arial', sans-serif;
          /* centers buttons */
          text-align: center;
          padding: var(--sectionPadding);
          position: relative;
          z-index: 1;
        }
        #donations-1153 .iep-container {
          width: 100%;
          /* changes to 1280px at tablet */
          max-width: 34.375rem;
          margin: auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          /* 48px - 64px */
          gap: clamp(3rem, 6vw, 4rem);
        }
        #donations-1153 .iep-content {
          /* set text align to left if content needs to be left aligned */
          text-align: center;
          width: 100%;
          display: flex;
          flex-direction: column;
          /* centers content horizontally, set to flex-start to left align */
          align-items: center;
        }
        #donations-1153 .iep-topper {
          font-size: var(--topperFontSize);
          line-height: 1.2em;
          text-transform: uppercase;
          text-align: inherit;
          letter-spacing: .1em;
          font-weight: 700;
          color: var(--primary);
          margin-bottom: 0.25rem;
          display: block;
        }
        #donations-1153 .iep-title {
          font-size: var(--headerFontSize);
          font-weight: 900;
          line-height: 1.2em;
          text-align: inherit;
          max-width: 43.75rem;
          margin: 0 0 1rem 0;
          color: var(--headerColor);
          position: relative;
        }
        #donations-1153 .iep-text {
          font-size: var(--bodyFontSize);
          line-height: 1.5em;
          text-align: inherit;
          width: 100%;
          max-width: 40.625rem;
          margin: 0;
          color: var(--bodyTextColor);
        }
        #donations-1153 .iep-topper {
          /* Override.  iep-topper iep-title and first iep-text should be removed and put into your global css sheet so it can control every instance of them on your site and is consistent. This selector is a section specific override that stays inside this stitch */
          color: #767676;
        }
        #donations-1153 .iep-title {
          /* Override.  iep-topper iep-title and first iep-text should be removed and put into your global css sheet so it can control every instance of them on your site and is consistent. This selector is a section specific override that stays inside this stitch */
          max-width: 20ch;
        }
        #donations-1153 .iep-card-group {
          width: 100%;
          padding: 0;
          margin: 0;
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          gap: 1.25rem;
        }
        #donations-1153 .iep-item {
          text-align: left;
          list-style: none;
          border-radius: 1rem;
          overflow: hidden;
          background-color: #f7f7f7;
          border: 1px solid #E8E8E8;
          grid-column: span 12;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          position: relative;
          z-index: 1;
          transition: box-shadow 0.3s, transform 0.3s;
        }
        #donations-1153 .iep-item:hover {
          box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
        }
        #donations-1153 .iep-item:hover .iep-picture img {
          opacity: .3;
          transform: scale(1.1);
        }
        #donations-1153 .iep-picture {
          width: 100%;
          height: 15rem;
          background-color: #1a1a1a;
          overflow: hidden;
          display: block;
          position: relative;
          z-index: 1;
        }
        #donations-1153 .iep-picture:before {
          /* green line */
          content: '';
          width: 100%;
          height: 4px;
          background: var(--primary);
          opacity: 1;
          position: absolute;
          display: block;
          bottom: 0;
          left: 0;
          z-index: 10;
        }
        #donations-1153 .iep-picture img {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          width: 100%;
          object-fit: cover;
          transition: transform .6s, opacity .3s;
        }
        #donations-1153 .iep-flex {
          height: 100%;
          padding: 1.5rem;
          /* prblog padding from affecting height and width */
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          position: relative;
          z-index: 2;
        }
        #donations-1153 .iep-date {
          font-size: 1rem;
          line-height: 1.2em;
          font-weight: 700;
          text-align: inherit;
          margin: 0;
          padding: 0.5rem 1rem;
          /* prblog padding from affecting height and width */
          box-sizing: border-box;
          background-color: var(--primary);
          border-radius: 0.5rem 0.5rem 0 0;
          color: #fff;
          display: inline-block;
          position: absolute;
          left: 1.5rem;
          bottom: 100%;
          z-index: 2;
        }
        #donations-1153 .iep-h3 {
          font-size: 1.25rem;
          text-align: inherit;
          line-height: 1.2em;
          font-weight: 700;
          color: var(--headerColor);
          margin: 0 0 0.75rem 0;
          transition: color .3s;
        }
        #donations-1153 .iep-link {
          font-size: inherit;
          line-height: inherit;
          font-weight: inherit;
          text-decoration: none;
          color: inherit;
          transition: color .3s;
        }
        #donations-1153 .iep-link:hover {
          color: var(--primary);
        }
        #donations-1153 .iep-item-text {
          /* 14px - 16px */
          font-size: clamp(0.875rem, 1.5vw, 1rem);
          line-height: 1.5em;
          text-align: inherit;
          margin: 0 0 1.5rem;
          padding: 0 0 1.5rem;
          color: var(--bodyTextColor);
          border-bottom: 1px solid #E8E8E8;
        }
        #donations-1153 .iep-donations-flex {
          width: 100%;
          margin: 0 0 0.5rem;
          display: flex;
          justify-content: center;
          align-items: flex-start;
          flex-direction: column;
          gap: 0.5rem;
        }
        #donations-1153 .iep-bar {
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          /* 4px - 8px */
          gap: clamp(0.25rem, 1vw, 0.5rem);
        }
        #donations-1153 .iep-progress {
          width: 100%;
          height: 6px;
          border-radius: 0.5rem;
          overflow: hidden;
          background-color: #E8E8E8;
        }
        #donations-1153 .iep-progress-bar {
          width: var(--progress);
          height: 100%;
          background-color: var(--secondary);
          border-radius: 0.5rem;
          display: block;
        }
        #donations-1153 .iep-percentage {
          font-size: 0.875rem;
          line-height: 1.2em;
          font-weight: 700;
          margin: 0;
          color: var(--headerColor);
          display: block;
        }
        #donations-1153 .iep-number-group {
          width: 100%;
          margin: 0 0 1rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1.5rem;
        }
        #donations-1153 .iep-raised {
          display: flex;
          justify-content: center;
          align-items: flex-end;
          gap: 0.25rem;
        }
        #donations-1153 .iep-number {
          font-size: 1.25rem;
          line-height: 1.2em;
          font-weight: 700;
          margin: 0;
          color: var(--headerColor);
        }
        #donations-1153 .iep-desc {
          font-size: 0.875rem;
          line-height: 1.2em;
          margin: 0;
          color: var(--bodyTextColor);
        }
        #donations-1153 .iep-button-solid {
          font-size: 1rem;
          /* 46px - 56px */
          line-height: clamp(2.875rem, 5.5vw, 3.5rem);
          text-decoration: none;
          font-weight: 700;
          text-align: center;
          margin: 0;
          color: #fff;
          min-width: 9.375rem;
          padding: 0 1.5rem;
          background-color: var(--primary);
          border-radius: 0.5rem;
          overflow: hidden;
          display: inline-block;
          position: relative;
          z-index: 1;
          /* prevents padding from adding to the width */
          box-sizing: border-box;
        }
        #donations-1153 .iep-button-solid:before {
          content: '';
          position: absolute;
          height: 100%;
          width: 0%;
          background: #000;
          opacity: 1;
          top: 0;
          left: 0;
          z-index: -1;
          border-radius: 0.5rem;
          transition: width .3s;
        }
        #donations-1153 .iep-button-solid:hover:before {
          width: 100%;
        }
        #donations-1153 .iep-donate {
          width: 100%;
        }
      }
      /* Tablet - 768px */
      @media only screen and (min-width: 48rem) {
        #donations-1153 .iep-container {
          max-width: 80rem;
        }
        #donations-1153 .iep-item {
          flex-direction: row;
        }
        #donations-1153 .iep-flex {
          /* remove the relative position declaration so the .iep-date can now be absolutely positioned relative to the iep-item parent, allowing it to move to the left on top of the iep-picture element */
          position: initial;
        }
        #donations-1153 .iep-date {
          bottom: 0;
          top: auto;
        }
        #donations-1153 .iep-picture {
          width: 50%;
          height: 100%;
          flex: none;
        }
      }
      /* Desktop - 1024px */
      @media only screen and (min-width: 64rem) {
        #donations-1153 .iep-item {
          flex-direction: column;
          grid-column: span 4;
        }
        #donations-1153 .iep-flex {
          position: relative;
        }
        #donations-1153 .iep-date {
          bottom: 100%;
        }
        #donations-1153 .iep-picture {
          width: 100%;
          height: 17.5rem;
        }
      }
                                      
      `}
    </style>
  </>
)