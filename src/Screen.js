import React,{useState, useRef} from "react";
import ReadyScene from "./ReadyScene";
import Question from "./Question";
import Description from "./Description";
import ResultModal from "./resultModal";

function Screen() {
    const [changeScene, setChangeScene] = useState(false); 
    const [resultScreen, setResultScreen] = useState(false); 
    const [songName, setSongName] = useState("UNAVAILABLE"); 
    const [songsData, setSongsData] = useState([]); 
    const timerRef = useRef(null);


    function onclick(){
        setChangeScene(true);
        timerRef.current = Date.now();
    }

    function onClose(){
        setChangeScene(false); 
        setResultScreen(false);     
    }

    function handleResult(songName, songsData){
        setResultScreen(true); 
        setSongName(songName); 
        setSongsData(songsData); 
        // Calculate time it took. 
    }

    if(!changeScene){
    return(
        <div className="font-serif bg-black text-green-600 w-screen h-screen flex flex-col justify-start">
        <div className="h-1/5 flex flex-row justify-center">
            <div className="text-xl flex flex-col items-start justify-start mt-10 mr-4">
                <h1>あ</h1>
                <h1>き</h1>
                <h1>な</h1>     
            </div>
            <div>
                <h1 className="text-3xl mt-16">AkinaEcho</h1>
            </div>
        </div>
        <div className="h-4/5">
        <Description/>
        <div className="mt-10 flex justify-center">
            <ReadyScene handleClick={onclick}/> 
            </div>
            </div>
        </div>
    ); }
    else{
        return (       
        <div className="font-serif bg-black text-green-600 w-screen h-screen flex flex-col justify-start">
        <div className="h-1/5 flex flex-row justify-center">
            <div className="text-xl flex flex-col items-start justify-start mt-10 mr-4">
                <h1>あ</h1>
                <h1>き</h1>
                <h1>な</h1>     
            </div>
            <div>
                <h1 className="text-3xl mt-16">AkinaEcho</h1>
            </div>
        </div>
        <div className="h-4/5 flex justify-center">
            <Question onClick={handleResult}/> 
            </div>
            {resultScreen && <ResultModal timeItTook={Date.now() - timerRef.current} onClose={onClose} songName={songName} songsData={songsData} />}
        </div>
    ); 
    }
}

export default Screen;  
