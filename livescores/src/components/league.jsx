import champlogo from "../assets/champlogo.png"

const League = () => {
  return (
    <div className="flex items-center" id="League">
          <img src={champlogo} className="w-10 h-10"></img>
          <div className="ml-2">
            <h1 className="text-xl font-bold">Qualification</h1>
            <h2 className="font-light">Champions League</h2>
          </div>
      </div>
  )
}

export default League;