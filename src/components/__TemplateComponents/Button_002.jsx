export const Button_002 = ({ as, children, ...rest }) => {
  const styles = `
  .iep-button-34 {
    font-size: 1rem;

    /* 46px - 56px */
    line-height: clamp(2.875rem, 8vw, 3.5rem);
    text-decoration: none;
    font-weight: 700;
    margin: auto;
    color: #fff;
    padding: 0 1.5rem;
    background-color: #9A6509;
    display: inline-block;
    position: relative;
    z-index: 1;
  }

  .iep-button-34:hover:before {
    width: 100%;
  }

  .iep-button-34:before {
    /* hover box */
    content: '';
    position: absolute;
    display: block;
    height: 100%;
    width: 0%;
    background: #000;
    opacity: 1;
    top: 0;
    left: 0;
    z-index: -1;
    transition: width .3s;
  }                                
  `

  if (as === 'link') {
    return (
      <a className="iep-button-34" {...rest}>
        {children}
        <style jsx>{styles}</style>
      </a>
    )
  }

  return (
    <button className="iep-button-34" {...rest}>
      {children}
      <style jsx>{styles}</style>
    </button>
  )
}