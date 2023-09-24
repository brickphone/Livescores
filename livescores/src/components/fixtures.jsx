import Dates from './date'
import League from './league'
import Matches from './matches'
import { useEffect, useState } from 'react'
import { fetchFixtures, saveLocal, getLocal } from '../api'
import { Button } from '@mui/material'


const Fixtures = () => {
  const [fixtures, setFixtures] = useState([]);
  const [loading, setLoading] = useState(true);
 
  
  useEffect(() => {
    const fetchData = async () => {
      const storedData = getLocal();

      if (storedData) {
        console.log("data loaded from localstorage.");

        setFixtures(storedData);
        setLoading(false);
      } else {
        try {
          const data = await fetchFixtures();
          setFixtures(data.reponse);
          setLoading(false);

          console.log("data fetched from API.")
          saveLocal(data.response); // save data in localstorage
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetchData();
  }, [])


  const fetchData = async () => {
    try {
      setLoading(true);

      const data = await fetchFixtures();
      setFixtures(data.response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };


  if (loading) {
    return (
      <div></div>
    )
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
          matchTime={match.fixture.status.elapsed}
        />
      ))}
    </div>
  ));

  console.log(League)
  

  return (
    <main>
      <Dates />
      <Button onClick={fetchData}>Refresh data</Button>
      {leagueList}
    </main>
  )
};

export default Fixtures;
