const Dates = () => {
  const date = new Date();
  let day = date.getDate();
  let month = date.getMonth();

  const monthAbbreviations = [
    'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN',
    'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'
  ];

  // Get the month abbreviation using the month value
  let monthAbbreviation = monthAbbreviations[month];

  let today = `${day} ${monthAbbreviation}`;

  return (
    <div className="flex items-center flex-col padding-67" id="date">
      <h1 className="font-bold text-2xl">TODAY</h1>
      <span className="text-xl" id="calender">🗓️</span>
      <h2>{today}</h2>
    </div>
  )
}

export default Dates;