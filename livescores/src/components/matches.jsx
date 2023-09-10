
/* eslint-disable react/prop-types */
const Matches = (props) => {

  return (
    <div className='flex items-center justify-center'>
      <div className='flex flex-col items-center justify-center league-container  hover:bg-slate-100' id="teams">
        <div className='flex items-center' id='hometeam'>
          <img className='w-18 h-18' src={props.homeLogo}></img>
          <h2 className='pl-2 font-semibold'>{props.homeName}</h2>
        </div>
        <div className='flex items-center logo-padding pt-1' id='awayteam'>
          <img className='w-18 h-18' src={props.awayLogo}></img>
          <h2 className='pl-2 font-semibold'>{props.awayName}</h2>
        </div>
      </div>
    </div>
  )
}

export default Matches;