import axios from 'axios';
import './App.css';
import OdakGrid from './components/OdakGrid';
import { useEffect, useState } from 'react';

function App() {
  const [gridData, setGridData] = useState([]);

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/comments", {})
      .then(res => {
        //console.log(res.data)
        setGridData(res.data)
      })
      .catch(err => {
        console.error(err)
      })
  }, [])

  return (
    <div className="App">
      <OdakGrid dataSource={gridData} />
    </div>
  );
}

export default App;
