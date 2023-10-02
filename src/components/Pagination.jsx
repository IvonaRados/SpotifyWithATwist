import React from 'react'

const Pagination = ({postPerPage, totalPosts, paginate}) => {
    const pageNumbers = [];
    for(let i =1; i<=Math.ceil(totalPosts / postPerPage); i++){
        pageNumbers.push(i);
    }

  return (
    <nav>
        <ul className='flex justify-center space-x-1 dark:text-gray-100 mt-16 mb-8 ml'>
            {pageNumbers.map(number => (
                <li key={number} className='page-item'>
                    <button onClick={()=> paginate(number)}  className='inline-flex items-center justify-center w-8 h-8 text-sm border rounded shadow-md
                    bg-purple-400 text-white hover:bg-purple-600 focus:outline-none 
                    focus:ring-2 focus:ring-blue-500 focus:ring-offset-2  '>
                        {number}
                    </button>
                </li>
            ))}
        </ul>
    </nav>
  )
}

export default Pagination
