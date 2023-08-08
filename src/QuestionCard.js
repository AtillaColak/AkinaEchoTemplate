import React from "react";
import "./QuestionCard.css"; 

function QuestionCard({ song }) {

    let indices = [1,2,3,4]
    let questionSong = (
        <div className="flex flex-col items-center mb-10">
            <h2 className="text-white mb-2">Question: {song[0].name}</h2>
            <audio controls className="mb-3 green-audio">
                <source src={song[0].preview_url} type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio>
        </div>
    );

    // Construct otherQuestions from the rest of the song array
    let otherQuestions = []; 
    for(let i = 1; i < 5; i++){
        var tempindex = Math.floor(Math.random() * indices.length) 
        let tempPosition = indices.splice(tempindex, 1)[0];

        otherQuestions.push(<div key={tempPosition} className="shadow-[0_20px_50px_rgba(8,_184,_112,_0.7)]  flex flex-col items-center mb-4">
            <h2 className="text-white mb-2">{song[tempPosition].name}</h2>
            <audio controls className="mb-2">
                <source src={song[tempPosition].preview_url} type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio>
        </div>);
    }
    return (
        <div className="container mx-auto px-4 md:px-0">
            {questionSong}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 justify-center items-center w-full max-w-screen-lg mx-auto">
                {otherQuestions}
            </div>
        </div>
    );
}

export default QuestionCard;
