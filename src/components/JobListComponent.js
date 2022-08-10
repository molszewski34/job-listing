import React from 'react';

//destructure data
const JobListComponent = ({
  job: {
    company,
    logo,
    isNew,
    featured,
    position,
    role,
    level,
    postedAt,
    contract,
    location,
    languages,
    tools,
  },
  handleTagClick,
}) => {
  //combine few items
  const tags = [role, level];

  if (tools) {
    tags.push(...languages);

    if (languages) {
      tags.push(...tools);
    }
  }

  return (
    
    <article
      className={`flex flex-col bg-white p-4 my-10 shadow-md rounded  gap-3 mx-10 sm:flex-row sm:justify-between  sm:px-8 ${
        featured ? 'border-l-4 border-teal-600' : ''
      }`} //if article is featured add style to left border
    >
      <div className="flex justify-center flex-col gap-3 border-b-2 border-gray-200 sm:border-b-0 sm:flex-row">
        <div className="flex gap-1 ">
          <img
            src={logo}
            alt={company}
            className="-my-8 w-10 h-10 sm:my-0 sm:w-24 sm:h-24"
          />
        </div>
        <div className="flex flex-col gap-3 sm:justify-center sm:gap-3">
          <div className="flex items-center gap-2 ">
            <div className="text-teal-600 font-bold text-xs">{company}</div>
            {isNew && (
              <div className="rounded-full px-2 text-sm text-white font-bold uppercase bg-teal-600">
                New!
              </div>
            )}
            {featured && (
              <div className="rounded-full px-2 text-sm text-white font-bold uppercase bg-black">
                Featured
              </div>
            )}
          </div>
          <h2 className="text-black font-bold text-xs hover:text-teal-600 cursor-pointer sm:text-base">
            {position}
          </h2>
          <div className="text-xs text-gray-500 font-semibold mb-3 font-bold flex gap-3">
            {postedAt} · {contract} · {location}{' '}
          </div>
        </div>
      </div>
      <div className="flex gap-2 my-1 flex-wrap sm:items-center">
       
       {/* map over tags */}
        {tags
          ? tags.map((tag) => (
              <div
                onClick={() => handleTagClick(tag)}
                className="text-teal-600 text-sm bg-cyan-50 font-bold  mb-4 px-2 py-1 rounded sm:mb-0 cursor-pointer"
              >
                {tag}
              </div>
            ))
          : ''}
      </div>
    </article>
  
  );
};

export default JobListComponent;
