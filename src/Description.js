import React from "react"; 

function Description(){

    return (
        <div className="mt-10 text-white flex flex-col justify-center items-center">
            <h1 className="font-bold text-2xl mb-4">Description</h1>
            <p className="text-sm max-w-md">
                AkinaEcho is a daily similar music matching game. We use a KNN model trained on about 12,000 popular spotify songs data we scraped.
                Each song is analysed on metrics such as <span className="text-green-400">"danceability"</span>, <span className="text-green-400">"energy"</span>, <span className="text-green-400">"acousticness"</span>, and many more. Each day, there is a question
                along with the 4 most similar songs from our dataset. Your goal is to find the most similar one quickest. 
                You will get 30-seconds snippets from each of these songs. Good Luck!  
            </p>
        </div>
    );
}

export default Description; 