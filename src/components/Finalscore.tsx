import { Link } from "react-router-dom";
import { Question } from "../types";
import { useQuestionContext } from "../AppRouter";
interface Ques_Ans{
    idx:number,
    answer:string
}

type Props={
    score:number;
    length: number;
    //questions: Question[];
    user_answers:Ques_Ans[];
}

export default function FinalScore({score,length,user_answers}:Props){
    console.log(user_answers);
    const {questions} = useQuestionContext();
    return(
        <>
        
        <div className="final-score">
            <h1>The Final Score is {score}/{length}</h1>
            <p>Thanks for playing!</p>

            <div className="quest_list">
            {questions.map((question,i)=>{
                const user_answer= user_answers.find(user_ans => user_ans.idx===i);
                return(
                    <div key={i}>
                    <>
                    <p>Question {i+1}: {question.question}</p>
                    <p>Correct Answer: {question.correct_answer}</p>
                    <p>Your Answer: {user_answer?.answer}</p>
                    {user_answer?.answer===question.correct_answer? <p style={{color:"green"}}>Correct!</p> : <p style={{color:"red"}}>Incorrect!</p>}
                    </>   
                    </div>
                )
            }
                
            )
            }
            </div>
            
            <button className="finalbutton"><Link to="/game">START NEW GAME</Link></button><br/>
            <button className="finalbutton"><Link to="/">EXIT</Link></button>
        </div>
        </>
        
    );
    
}