/* eslint-disable react/prop-types */
const Matches = (props) => {
  return (
    <div className="flex items-center justify-center">
      <div
        className="flex flex-col items-start justify-center league-container px-16 hover:bg-slate-100"
        id="teams">
        <div className=" flex justify-between items-center" id="hometeam">
          <img className="w-18 h-18 flex-none" src={props.homeLogo}></img>
          <h2 className="pl-2 font-semibold w-32 text-left">{props.homeName}</h2>
          <h2 className="font-bold w-8 text-right text-green-600" id="homescore">{props.homeScore}</h2>
        </div>
        <div className="flex justify-between items-center pt-1 " id="awayteam">
          <img className="w-18 h-18 flex-none" src={props.awayLogo}></img>
          <h2 className="pl-2 font-semibold w-32 text-left">{props.awayName}</h2>
          <h2 className="font-bold w-8 text-right text-green-600" id="awayscore">{props.awayScore}</h2>
        </div>
      </div>
    </div>
  );
};

export default Matches;
