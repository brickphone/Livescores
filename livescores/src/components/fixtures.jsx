import Dates from './date'
import champlogo from '../assets/champlogo.png' // logo placeholder
import cityLogo from '../assets/citylogo.png' // logo placeholder
import ajaxLogo from '../assets/ajaxlogo.png' // logo placeholder
import data from "../dummydata" // this data was just for testing and is not used anymore
import { useEffect, useState } from 'react'
import { fetchFixtures } from '../api'

const Fixtures = ({data}) => {
  const [fixtures, setFixtures] = useState(data)
   
  /*  const fetchInfo = async () => {
    const data = await fetchFixtures();
     setFixtures(data);
   };

   useEffect(() => {
     fetchInfo();
   }, []);

   if (!fixtures.length) {
    return <div>No data</div>;
  } */

   console.log(fixtures)
   if (!fixtures.length) {
    return <div>NO DATA</div>
   }

  return (
    <main>
      <Dates />
      {data.response.map(league => {
        return (
        <div key={league.id} className="flex items-center justify-center pt-7" id="League">
          <div className="flex league-container justify-center items-center hover:bg-slate-100">
            <img src={league.logo} className="w-10 h-10"></img>
          <div className="ml-2">
            <h1 id='compcountry' className="text-xl font-bold">{league.country}</h1>
            <h2 id='compname' className="font-light">{league.name}</h2>
          </div>
        </div>
      </div>
        )
      })}
    <div className='flex items-center justify-center'>
      <div className='flex flex-col items-center justify-center league-container  hover:bg-slate-100' id="teams">
        <div className='flex items-center' id='hometeam'>
          <img className='w-18 h-18' src={cityLogo}></img>
          <h2 className='pl-2 font-semibold'>Manchester City</h2>
        </div>
        <div className='flex items-center logo-padding pt-1' id='awayteam'>
          <img className='w-18 h-18' src={ajaxLogo}></img>
          <h2 className='pl-2 font-semibold'>Ajax</h2>
        </div>
      </div>
    </div>
    </main>
  )
}

export default Fixtures;
