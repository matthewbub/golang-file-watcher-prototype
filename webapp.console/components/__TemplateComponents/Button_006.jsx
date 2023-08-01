export const Button_006 = ({ as, children, ...rest }) => {
  const styles = `
  .iep-button-44 {
    text-align: center;
    font-size: 1rem;

    /* 46px - 56px */
    line-height: clamp(2.875rem, 8vw, 3.5rem);
    text-decoration: none;
    font-weight: 700;
    min-width: 10.875rem;
    margin: auto;
    overflow: hidden;
    color: #fff;
    padding: 0 3rem;
    
    /* prevents padding from affecting height and width */
    box-sizing: border-box;
    background-color: #1a1a1a;
    display: inline-block;
    position: relative;
    z-index: 1;
  }

  .iep-button-44:before {
    content: '';
    width: 150%;
    height: 100%;
    background: #F15A24;
    opacity: 1;
    position: absolute;
    display: block;
    top: 0;
    left: -143%;
    z-index: -2;
    transform: skew(45deg);
    transition: left .3s;
  }
  
  .iep-button-44:hover:before {
    left: -20%;
  }                 
  `
  if (as === 'link') {
    return (
      <a className="iep-button-44" {...rest}>
        {children}
        <style jsx>{styles}</style>
      </a>
    )
  }

  return (
    <button className="iep-button-44" {...rest}>
      {children}
      <style jsx>{styles}</style>
    </button>
  )
}