export const Button_001 = ({ as, children, ...rest }) => {
  const styles = `
    .iep-button-2 {
      font-family: 'Roboto', 'Arial', sans-serif;
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
      transition: background-color 0.3s;
    }
    .iep-button-2:hover {
      background-color: #000;
    }
  `
  if (as === 'link') {
    return (
      <a className="iep-button-2" {...rest}>
        {children}
        <style jsx>{styles}</style>
      </a>
    )
  }

  return (
    <button className="iep-button-2" {...rest}>
      {children}
      <style jsx>{styles}</style>
    </button>
  )
}