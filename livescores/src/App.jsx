import './index.css'
import Fixtures from './components/fixtures';
import Navbar from '../src/components/navbar'
import data from './dummydata';

const App = () => {
  return (
    <div>
      <Navbar/>
      <Fixtures data={data}/>
    </div>
  )
}

export default App;