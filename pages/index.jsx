import React from 'react';

import Hero from '../components/Hero';
import Content from '../components/Content';

fetch('https://api.openweathermap.org/data/3.0/onecall?lat=34.0336&lon=-117.0431&appid=b070101097c336ed338a554cd1dc0b03')
  .then(response => response.json())
  .then(data => console.log(data));

export default function Index() {

  return (
    <div className=''>
      <Hero />
      <hr />
      <Content />
    </div>
  );
}
