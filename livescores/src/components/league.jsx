
/* eslint-disable react/prop-types */
const League = (props) => {
  console.log(props)

  return (
    <div key={props.id} className="flex items-center justify-center pt-7" id="League">
      <div className="flex league-container justify-center items-center hover:bg-slate-100">
        <img src={props.flag} className="w-10 h-10"></img>
      <div className="ml-2">
        <h1 id='compcountry' className="text-xl font-bold">{props.country}</h1>
        <h2 id='compname' className="font-light">{props.name}</h2>
      </div>
      </div>
    </div>
  )
}

export default League;