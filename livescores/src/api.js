const axios = require("axios");

const date = new Date();

let day = date.getDate();
let month = date.getMonth();
let year = date.getFullYear();

let currentDate = `${year}-${month}-${day}`;


const fetchByDate = {
  method: "GET",
  url: "https://api-football-v1.p.rapidapi.com/v3/fixtures",
  params: {date: `${currentDate}`},
  headers: {
    'X-RapidAPI-Key': '43761a1118mshbb3f5bf8201e93cp1966e5jsn616ca759a594',
    'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
  }
};

try {
	const response = await axios.request(fetchByDate);
	console.log(response.data);
} catch (error) {
	console.error(error);
}