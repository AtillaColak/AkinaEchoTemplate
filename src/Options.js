import React from "react";

function Options({songs, onClick}){

    let indices = [1,2,3,4]; 
    const shuffle = (array) => { 
        for (let i = array.length - 1; i > 0; i--) { 
          const j = Math.floor(Math.random() * (i + 1)); 
          [array[i], array[j]] = [array[j], array[i]]; 
        } 
        return array; 
      }; 
    const shuffled = shuffle(indices);

    const handleSubmit = (event) => {
        event.preventDefault(); // prevent the default form submission

        const formData = new FormData(event.target); // get the form data
        const selectedValue = formData.get("Radio"); // get the value of the selected radio button

        onClick(selectedValue); // pass the selected value to the onClick function
    };


    return(<div className=" flex justify-center">
                    <form onSubmit={handleSubmit}>
        <ul className="flex flex-row space-x-4 w-9/10 font-medium text-white bg-black border border-gray-400 rounded-lg dark:bg-dark dark:border-gray-600">
            <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                <div className="flex items-center pl-3">
                    <input id="options1" name="Radio" type="radio" value={songs[shuffled[0]].name} className="accent-green-700 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                    <label for="options1" className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">{songs[shuffled[0]].name}</label>
                </div>
            </li>
            <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                <div className="flex items-center pl-3">
                    <input id="options2" name="Radio" type="radio" value={songs[shuffled[1]].name} className="accent-green-700 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                    <label for="options2" className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">{songs[shuffled[1]].name}</label>
                </div>
            </li>
            <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                <div className="flex items-center pl-3">
                    <input id="options3" name="Radio" type="radio" value={songs[shuffled[2]].name} className="accent-green-700 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                    <label for="options3" className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">{songs[shuffled[2]].name}</label>
                </div>
            </li>   
            <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                <div className="flex items-center pl-3">
                    <input id="options4" name="Radio" type="radio" value={songs[shuffled[3]].name} className="accent-green-700 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                    <label for="options4" className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">{songs[shuffled[3]].name}</label>
                </div>
            </li>
            <button type="submit" className=" px-4 py-0 bg-green-600 hover:bg-green-800 text-white rounded">Submit</button>
        </ul>
        </form>
        </div>
        );
}

export default Options; 