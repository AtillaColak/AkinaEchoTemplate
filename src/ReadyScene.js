import React from "react"; 

function ReadyScene({handleClick}){

    return(<div>
        <button onClick={handleClick} class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-green-800 group-hover:from-green-900 group-hover:to-blue-900 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
        <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            Are You Ready?
        </span>
        </button>
    </div>
    ); 
}

export default ReadyScene; 