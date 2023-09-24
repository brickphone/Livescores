import React, { useEffect, useState } from 'react';
import Dates from './date';
import League from './league';
import Matches from './matches';
import { fetchFixtures, saveLocal, getLocal } from '../api';
import { Button } from '@mui/material';
import Stack from '@mui/material/Stack';
import Skeleton from '@mui/material/Skeleton';

const Fixtures = () => {
  const [fixtures, setFixtures] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const storedData = getLocal();

      if (storedData) {
        console.log('Data loaded from local storage.');
        setFixtures(storedData);
        /* setLoading(false) */;
      } else {
        try {
          const data = await fetchFixtures();
          setFixtures(data.response);
          /* setLoading(false); */

          console.log('Data fetched from API.');
          saveLocal(data.response); // save data in local storage
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      /* setLoading(true); */

      const data = await fetchFixtures();
      setFixtures(data.response);
    } catch (error) {
      console.log(error);
    } finally {
      /* setLoading(false); */
    }
  };

  const skeletonArray = Array.from({ length: fixtures.length }, (_, index) => index);

  return (
    <main>
      <Dates />
      <Button onClick={fetchData}>Refresh data</Button>
      {loading ? (
        skeletonArray.map((index) => (
          <Stack className='items-center' key={index} spacing={1}>
            <Skeleton variant="text" sx={{ fontSize: '2rem', width: "400px" }} />
          </Stack>
        ))
      ) : (
        fixtures.map((match) => (
          <div key={match.fixture.id}>
            <League
              name={match.league.name}
              country={match.league.country}
              flag={match.league.flag}
            />
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
          </div>
        ))
      )}
    </main>
  );
};

export default Fixtures;
