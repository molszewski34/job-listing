import React, { useState, useEffect } from 'react';
import data from './data/data.json';
import JobListComponent from './components/JobListComponent';

console.log(data);

function App() {
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters]= useState(['CSS']);
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
     setFilters([...filters, tag]);
  }

  const filteredJobs = jobs.filter(filteredFunc);


  // const filterFunc = (job) =>{
  //   const tags = [role, level, tools, languages];
  //   if (tools) {
  //     tags.push(...tools);
  //   }
  //   if (tools) {
  //     tags.push(...languages);
  //   }
  //   return job
  // }

  return (
    <div className="App">
      <div className="bg-teal-500">
        <img className="min-w-max" src="/images/bg-header-desktop.svg" alt="" />
      </div>
      <div className="flex bg-white p-3 m-5 shadow-md rounded">
      {  filters.length > 0 && filters.map(
        (filter) => <div className="flex text-teal-600 text-sm bg-cyan-100 font-bold  mb-4 px-2 py-1 rounded sm:mb-0 cursor-pointer">{filter}</div>
      )}
      </div>
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
