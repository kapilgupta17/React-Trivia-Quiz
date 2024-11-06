import React from "react";
import Timer from "./Timer";

type Props={
    cur_idx: number;
    length: number;
    score:number;
    setCurrentQuestion :(cur_idx:number) =>void;
    difficulty:string;
}
export default function Scorebar({cur_idx,length,score,setCurrentQuestion,difficulty}:Props){

    return(
        <div className="scorebar">
            
            <div className="progress">
                <p>Question: <span>{cur_idx+1}/{length}</span></p>
            </div>
            <div className="timer">
                <Timer difficulty={difficulty}cur_idx={cur_idx} setCurrentQuestion={setCurrentQuestion} />
            </div>
            <div className="score">
                <p>Score: <span>{score}</span></p>
            </div>
        </div>
    )

}