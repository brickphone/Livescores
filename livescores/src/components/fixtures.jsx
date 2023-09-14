import Dates from './date'
import League from './league'
import Matches from './matches'
import data from '../dummydata'
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
   */

  const fixtures = data.response;

  if (!fixtures.length) {
    return <div>No data</div>;
  }

  const matchesByLeague = {};

  fixtures.forEach((match) => {
    const leagueName = match.league.name;
    if (!matchesByLeague[leagueName]) {
      matchesByLeague[leagueName] = [];
    }
    matchesByLeague[leagueName].push(match);
  });

  const leagueList = Object.keys(matchesByLeague).map((leagueName) => (
    <div key={leagueName}>
      <League
        name={leagueName}
        country={matchesByLeague[leagueName][0].league.country}
        flag={matchesByLeague[leagueName][0].league.flag}
      />
      {matchesByLeague[leagueName].map((match) => (
        <Matches
          key={match.fixture.id}
          homeName={match.teams.home.name}
          homeLogo={match.teams.home.logo}
          awayName={match.teams.away.name}
          awayLogo={match.teams.away.logo}
          homeScore={match.goals.home}
          awayScore={match.goals.away}
          matchTime={match.status.elapsed}
        />
      ))}
    </div>
  ));

  console.log(League)

  return (
    <main>
      <Dates />
      {leagueList}
    </main>
  )
};

export default Fixtures;
