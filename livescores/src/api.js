export const fetchFixtures = async () => {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "644845e4cdmsh728a499c500c5cep16f80fjsn555d0dedc495", // replace later
      "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
    },
  };

  const result = await fetch(
    "https://api-football-v1.p.rapidapi.com/v3/fixtures?live=all",
    options
  )
    .then((response) => response.json())
    .then((response) => {
      return response;
    })
    .catch((err) => console.error(err));

  return result;
};