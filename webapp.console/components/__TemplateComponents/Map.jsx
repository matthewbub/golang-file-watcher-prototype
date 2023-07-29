export const Map = () => (
  <>
    <section id="map-720">
      {/*Download the pin icon, in Figma create a 1920x600 rectangle and make its background a screenshot of the Google Maps location of your clients business location, make sure their actual location is at the center. Doesn't have to be EXACT. Then add the pin in Figma and absolutely position it where its location is in the map.  Highlight everything and hit CTRL G to group it, then export that section as a png.  Now you have your map graphic made for your client. Make an 800X1000 center crop of the image to load on mobile. Then remove this img tag for the icon. */}
      <img
        className="cs-icon"
        src="https://csimg.nyc3.cdn.digitaloceanspaces.com/Icons%2Fred-pin.svg"
        alt="icon"
        decoding="async"
        width={80}
        height={80}
        aria-hidden="true"
      />
      <picture className="cs-background">
        {/*Mobile Image*/}
        <source
          media="(max-width: 600px)"
          srcSet="https://csimg.nyc3.cdn.digitaloceanspaces.com/Images%2FMISC%2Fmap.png"
        />
        {/*Tablet and above Image*/}
        <source
          media="(min-width: 601px)"
          srcSet="https://csimg.nyc3.cdn.digitaloceanspaces.com/Images%2FMISC%2Fmap.png"
        />
        <img
          loading="lazy"
          decoding="async"
          src="https://csimg.nyc3.cdn.digitaloceanspaces.com/Images%2FMISC%2Fmap.png"
          alt="map"
          width={1280}
          height={600}
        />
      </picture>
    </section>

    <style>
      {`
        @media only screen and (min-width: 0rem) {
          #map-720 {
            /* remove the font family so the Stitch inherits the fonts from your global stylesheet */
            font-family: 'Roboto', 'Arial', sans-serif;
            min-height: 33.75rem;
            padding: var(--sectionPadding);
            /* prevents padding from affecting height and width */
            box-sizing: border-box;
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
          }
          #map-720 .cs-background {
            width: 100%;
            height: 100%;
            display: block;
            position: absolute;
            top: 0;
            left: 0;
            z-index: -1;
          }
          #map-720 .cs-background img {
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            width: 100%;
            /* Makes img tag act as a background image */
            object-fit: cover;
          }
        }                                
      `}
    </style>
  </>
)