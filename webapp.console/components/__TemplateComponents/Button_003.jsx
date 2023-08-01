export const Button_003 = ({ as, children, ...rest }) => {
  const styles = `
  .iep-button-21 {
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
    color: #fff;
    padding: 0 1.5rem;
    /* prevents padding from affecting height and width */
    box-sizing: border-box;
    background-color: #F15A24;
    box-shadow: 4px 4px 0px 0px #1A1A1A;
    display: inline-block;
    position: relative;
    z-index: 1;
    transition: background-color 0.3s, box-shadow 0.3s;
  }
  .iep-button-21:hover {
    background-color: #1a1a1a;
    box-shadow: 4px 4px 0px 0px var(--primary);
  }
                                  
  `
  if (as === 'link') {
    return (
      <a className="iep-button-21" {...rest}>
        {children}
        <style jsx>{styles}</style>
      </a>
    )
  }

  return (
    <button className="iep-button-21" {...rest}>
      {children}
      <style jsx>{styles}</style>
    </button>
  )
}