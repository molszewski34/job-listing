import React, { useState, useEffect } from 'react';
import data from './data/data.json';
import JobListComponent from './components/JobListComponent';

console.log(data);

function App() {
  const [jobs, setJobs] = useState([]);
  // const [filters, setFilters]= useState[[]];
  useEffect(() => setJobs(data), []);

  // const filteredJobs = jobs.filter(filteredByTags);

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
      {jobs.length.map == 0 ? (
        <p>No data to display</p>
      ) : (
        jobs.map((job) => <JobListComponent job={job} key={job.id} />)
      )}
    </div>
  );
}

export default App;
