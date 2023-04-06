
import {React, useEffect, useState } from "react";
import './App.css'


function App() {
  const [name, setNames] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(" https://restcountries.com/v3.1/all?fields=name,flags,language")
      const res = await data.json()
      setNames(res)
    }
    fetchData()
  }, [])
   console.log(name)
  return (
    <div className="App">
      {
        name?.map((x , i) => (
          <div key={i} className="container">
          
              <ul className="country-names">
                <li>{x.name.common}</li>
                <li>{x.name.official}</li>
              </ul>
            <div className="flag-container">
            <img className="flags" src={x.flags.png} alt={x.flags.png} />
            <p className="flags-text">{x.flags.alt}</p> 
            </div>
          </div>
        ))
      }

    </div>
  );
}

export default App







