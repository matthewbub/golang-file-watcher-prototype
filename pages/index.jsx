import React from 'react';
import PublicLandingPage from '../components/PublicLandingPage';
import Footer from '../components/Footer';

fetch('https://api.openweathermap.org/data/3.0/onecall?lat=34.0336&lon=-117.0431&appid=b070101097c336ed338a554cd1dc0b03')
  .then(response => response.json())
  .then(data => console.log(data));

export default function Index() {

  return (
    <div className=''>
      <PublicLandingPage />
      <Footer />
    </div>
  );
}
