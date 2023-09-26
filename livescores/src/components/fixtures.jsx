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
        setLoading(false);
      } else {
        try {
          setLoading(true); 

          const data = await fetchFixtures();
          setFixtures(data.response);
          
          console.log('Data fetched from API.');
          saveLocal(data.response); // save data in local storage
        } catch (error) {
          console.log(error);
        }
      }

      setLoading(false);
    };
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
       setLoading(true); 

      const data = await fetchFixtures();
      setFixtures(data.response);
      saveLocal(data.response);
    } catch (error) {
      console.log(error);
    } finally {
       setLoading(false);
    }
  };

  const skeletonArray = Array.from({ length: fixtures.length }, (_, index) => index);

  return (
    <main>
      <Dates />
      <div className='flex items-center justify-center pt-4'>
        <button onClick={fetchData} type="button" 
        className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Refresh Data</button>
      </div>
     
      {loading ? (
        skeletonArray.map((index) => (
          <Stack className='items-center' key={index} spacing={1}>
            <div id="league" className='flex flex-row space-x-1 '>
              <Skeleton variant="rectangular" width={80} height={60}/>
              <div className='flex-col'>
                <Skeleton  variant='text' width={80} height={20}/>
                <Skeleton  variant='text' width={80} height={20}/>
              </div>
            </div>
            <Skeleton variant="text" sx={{ fontSize: '2rem', width: '400px', height: "200px" }} />
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
