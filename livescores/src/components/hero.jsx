import axios from "axios";
import { useState, useEffect } from "react";
import champlogo from "../assets/champlogo.png"

const Hero = () => {
  /* const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async() => {
      const date = new Date();
      let day = date.getDate();
      let month = date.getMonth();
      let year = date.getFullYear();

      let currentDate = `${year}-${month}-${day}`;

      const fetchByDate = {
        method: "GET",
        url: "https://api-football-v1.p.rapidapi.com/v3/fixtures",
        params: {
          date: `${currentDate}`,
          league:"39",
          season:"2023",
          current:"true",
        },
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
    }
    fetchData();
  }) */

  return (
    <main className="flex justify-center">
      <div id="date">
        <h2></h2> 
      </div>
      <div className="flex space-x-4" id="League">
        <img src={champlogo} className="w-16 h-16"></img>
        <h1 className="text-xl font-bold">Qualification</h1>
        <h2 className="font-light pt-0">Champions League</h2>
      </div>
    </main>
  )
}

export default Hero;