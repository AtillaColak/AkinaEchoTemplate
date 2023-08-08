import React from "react";

function ResultModal({ timeItTook, songName, songsData, onClose }) {
    const songAttributes = [
        'Acousticness',
        'danceabiltiy',
        'Energy',
        'Instrumentalness',
        'Liveness',
        'Loudness',
        'Speechiness',
        'Tempo',
        'Valence',
    ];

    const questionSong = songsData[0];
    const correctAnswerSong = songsData[1];

    return (
        <>
            {/* Background overlay */}
            <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-40"></div>

            <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 overflow-y-auto">
                <div className="bg-gray-900 p-4 md:p-8 rounded shadow-lg w-full max-w-2xl text-white">
                    <div className="flex flex-col md:flex-row justify-between items-center"> 
                        <h2 className="text-xl mb-4 md:mb-0">Selected song is {songName === songsData[1].name ? "correct ✅" : "incorrect ❌"}</h2>
                        <div className="text-center">
                            <p className="mb-2">Solution Time: {timeItTook / 1000} Seconds</p>
                            {/* Close button */}
                            <button onClick={onClose} className="bg-red-600 text-white rounded px-3 py-1">Close</button>
                        </div>
                    </div>
                    <h3 className="mt-4">Question and Correct Answer Comparison</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full mt-4 border border-gray-600 rounded">
                            <thead>
                                <tr>
                                    <th>Attribute</th>
                                    <th>Question: {questionSong.name}</th>
                                    <th>Correct Answer: {correctAnswerSong.name}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {songAttributes.map(attribute => (
                                    <tr key={attribute}>
                                        <td>{attribute === "danceabiltiy" ? "Danceability" : attribute}</td>
                                        <td>{questionSong[attribute.toLowerCase()]}</td>
                                        <td>{correctAnswerSong[attribute.toLowerCase()]}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ResultModal;
