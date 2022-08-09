import React, { useState, useEffect } from 'react';
import data from './data/data.json';
import JobListComponent from './components/JobListComponent';

console.log(data);

function App() {
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters]= useState([]);
  useEffect(() => setJobs(data), []);


  const filteredFunc = ({role, level, tools, languages}) =>{
    
    if (filters.length === 0){
      return true;
    }
    const tags = [role, level];
  
      if (tools) {
      tags.push(...tools);
    }
    if (languages) {
      tags.push(...languages);
    }




    return tags.some(tag => filters.includes(tag));
  };

  const handleTagClick = (tag) => {
    if(filters.includes(tag)) return;
     setFilters([...filters, tag]);
  }

  const handledFilterClick = (passedFilter) => {
    setFilters(filters.filter((f) => f !== passedFilter));
  }

  const filteredJobs = jobs.filter(filteredFunc);



  return (
    <div className="App">
      <header className="bg-teal-500">
        <img className="min-w-max" src="/images/bg-header-desktop.svg" alt="" />
      </header>
      {filters.length > 0 && (
      <div className="flex gap-3 bg-white p-3 m-5 shadow-md rounded ">
      {  filters.length > 0 && filters.map(
        (filter) => 
        <div 
        onClick={()=>
        handledFilterClick(filter)
        
        }
        className="flex  text-teal-600 text-xs bg-cyan-100 font-bold pl-2  mb-4  rounded sm:mb-0 cursor-pointer items-center ">{filter}
        <span className='flex ml-2 bg-teal-600 p-1 hover:bg-black rounded-r'><img src="./images/icon-remove.svg"/></span>
        </div>
      )}
      </div>
      )}
      {jobs.length.map === 0 ? (
        <p>No data to display</p>
      ) : (
        filteredJobs.map((job) => 
        <JobListComponent 
        job={job} 
        key={job.id}
        handleTagClick={handleTagClick}
        />)
      )}
    </div>
  );
}

export default App;


// movie pause 2:25:04