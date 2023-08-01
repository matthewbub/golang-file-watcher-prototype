export const Button_004 = ({ as, children, ...rest }) => {
  const styles = `
  .iep-button-143 {
    /* remove the font family so the Stitch inherits the fonts from your global stylesheet */
    font-family: 'Roboto', 'Arial', sans-serif;
    text-align: center;
    font-size: 1rem;
    /* 46px - 56px */
    line-height: clamp(2.875rem, 8vw, 3.5rem);
    text-decoration: none;
    font-weight: 700;
    min-width: 10.875rem;
    margin: auto;
    color: #1a1a1a;
    padding: 0 1.5rem;
    /* prevents padding from affecting height and width */
    box-sizing: border-box;
    background-color: #fff;
    border: 2px solid #1a1a1a;
    display: inline-block;
    position: relative;
    z-index: 1;
    transition: color .3s;
  }
  .iep-button-143 .iep-button-text {
    display: block;
    /* we translate it up so it looks centered in the white space. The black :before element takes up space at the bottom and makes it looks off-center */
    transform: translateY(-0.125rem);
    transition: transform .3s;
  }
  .iep-button-143:before {
    content: '';
    width: 100%;
    height: 0.375rem;
    background: #1a1a1a;
    opacity: 1;
    position: absolute;
    display: block;
    bottom: 0;
    left: 0;
    transition: height .3s;
    z-index: -1;
  }
  .iep-button-143:hover {
    color: #fff;
  }
  .iep-button-143:hover .iep-button-text {
    transform: translateY(0);
  }
  .iep-button-143:hover:before {
    height: 100%;
  }                                 
  `
  if (as === 'link') {
    return (
      <a className="iep-button-143" {...rest}>
        <span className="iep-button-text">
          {children}
        </span>
        <style jsx>{styles}</style>
      </a>
    )
  }

  return (
    <button className="iep-button-143" {...rest}>
      <span className="iep-button-text">
        {children}
      </span>
      <style jsx>{styles}</style>
    </button>
  )
}