/* eslint-disable react/prop-types */
const Matches = (props) => {

  return (
    <div className='flex items-center justify-center'>
      <div className='flex flex-col items-start justify-center league-container px-16 hover:bg-slate-100' id="teams">
        <div className='w-full flex justify-between items-center' id='hometeam'>
          <img className='w-18 h-18 flex-none' src={props.homeLogo}></img>
          <h2 className='pl-2 font-semibold'>{props.homeName}</h2>
          <h2 className="font-bold pl-16" id="homescore">1</h2>
        </div>
     <div className='flex justify-between items-center pt-1 ' id='awayteam'>
      <img className='w-18 h-18 flex-none' src={props.awayLogo}></img>
      <h2 className='pl-2 font-semibold'>{props.awayName}</h2>
    </div>
  </div>
</div>
  )
}

export default Matches;