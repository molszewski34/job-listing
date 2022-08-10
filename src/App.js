import React, { useState, useEffect } from 'react';
import data from './data/data.json';
import JobListComponent from './components/JobListComponent';
import desktopImage from "./bg-images/bg-header-desktop.svg"
import mobileImage from "./bg-images/bg-header-mobile.svg"
// console.log(data);

function App() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const imageUrl = windowWidth <= 650 ? mobileImage : desktopImage;
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState([]);
  useEffect(() => setJobs(data), []);


  
  useEffect(() => {
    const handleWindowResize = () => {
        setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleWindowResize);

    return () => {
        window.removeEventListener('resize', handleWindowResize);
    }
}, []);

  //check if filters are empty and then push items
  const filterItems = ({ role, level, tools, languages }) => {
    if (filters.length === 0) {
      return true;
    }
    const tags = [role, level];

    if (tools) {
      tags.push(...tools);
    }
    if (languages) {
      tags.push(...languages);
    }

    // return tags.some((tag) => filters.includes(tag));
    return filters.every(filter => tags.includes(filter));
  };

  const filteredJobs = jobs.filter(filterItems); //filter through tags

  const handleTagClick = (tag) => {
    if (filters.includes(tag)) return; //prevent multiply the same flters
    setFilters([...filters, tag]);
  }; //adds filters to container

  const handledFilterClick = (passedFilter) => {
    setFilters(filters.filter((f) => f !== passedFilter));
  }; //removes filters from list

  const clearFilters = () => {
    setFilters([]); //empty state 
  };

  return (
    <div className="App ">
      <header className="bg-teal-600 w-screen ">
        <img className="w-screen h-52 sm:w-screen" src={imageUrl} alt="header img" />
      </header>
<div>
      {filters.length > 0 && (
        <div className="mb-20 mx-4">
          <div className="flex gap-3 bg-white p-3  m-5 -my-10 z-10 relative shadow-md rounded items-center justify-between flex-wrap">
            {' '}
            <div className="flex gap-2 flex-wrap">
              {filters.length > 0 &&
                filters.map((filter) => (
                  <div
                    onClick={() => handledFilterClick(filter)}
                    className="flex  text-teal-600 text-xs bg-cyan-100 font-bold pl-2  mb-4  rounded sm:mb-0 cursor-pointer items-center "
                  >
                    {filter}
                    <span className="flex ml-2 bg-teal-600 p-1 hover:bg-black rounded-r">
                      <img src="./images/icon-remove.svg" />
                    </span>
                  </div>
                ))}
            </div>
            <button
              className=" text-sm font-bold text-gray-400"
              onClick={clearFilters}
            >
              Clear
            </button>
          </div>
        </div>
      )}

      </div>
      {jobs.length.map === 0 ? (
        <p>No data to display</p>
      ) : (
        filteredJobs.map((job) => (
          <JobListComponent
            job={job}
            key={job.id}
            handleTagClick={handleTagClick}
            className= "mt-20"
          />
        ))
      )}
    </div>
  );
}

export default App;
