import Dates from './date'
import League from './league'
import Matches from './matches'
import data from '../dummydata'
import champlogo from '../assets/champlogo.png' // logo placeholder
import cityLogo from '../assets/citylogo.png' // logo placeholder
import ajaxLogo from '../assets/ajaxlogo.png' // logo placeholder
import { useEffect, useState } from 'react'
import { fetchFixtures } from '../api'


const Fixtures = () => {
 /*  const [fixtures, setFixtures] = useState(data) */
   
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

  const leagueList = data.response.map(league => {
    return (
      <League 
        key={league.fixture.id}
        name={league.league.name}
        country={league.league.country}
        flag={league.league.logo}
      />
    )
  })

  const matchList = data.response.map(match => {
    return (
      <Matches 
        key={match.fixture.id}
        homeName={match.teams.home.name}
        homeLogo={match.teams.home.logo}
        awayName={match.teams.away.name}
        awayLogo={match.teams.away.logo}
      />
    )
  })

  console.log(League)

  return (
    <main>
      <Dates />
      {leagueList}
      {matchList}
    </main>
  )
};

export default Fixtures;
