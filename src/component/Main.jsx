import { React, useEffect, useState } from "react";



function Main() {
  const [name, setNames] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [countriesPerPage] = useState(10);
  

 

  const indexOfLastCountry = currentPage * countriesPerPage;
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
  const currentCountries = name.slice(indexOfFirstCountry, indexOfLastCountry);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(name.length / countriesPerPage); i++) {
    pageNumbers.push(i);
  }


  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };
  const filteredCountries = currentCountries.filter((country) =>
    country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderPageNumbers = pageNumbers.map((number) => {
    return (
      <li key={number} className={currentPage === number ? 'active' : null}>
        <button onClick={() => setCurrentPage(number)}>{number}</button>
      </li>
    );
  });

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(
        " https://restcountries.com/v3.1/all?fields=name,flags,language"
      );
      const res = await data.json();
      setNames(res);
    };
    fetchData();
  }, []);
  console.log(name);


  return (
    <div className="Main">
      <input

        className="search-input"
        type="text"
        placeholder='search....'
        value={searchTerm}
        onChange={handleSearch}
      />

      <ul className="pageNumbers">
      {renderPageNumbers}
    </ul>

      {filteredCountries.map((x, i) => (
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
      ))}
    </div>
  );
}

export default Main;