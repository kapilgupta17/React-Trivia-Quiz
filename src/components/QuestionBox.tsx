import { Question } from "../types";
import { useMemo } from "react";
type Props={
    question: Question;
    isAnsweredCorrectly : boolean | null;
    user_ans : string;
    handleSubmit : (answer:string) => void;
    
    
}
//Shuffling the options for displaying purposes
const shuffle_array = ( (options: string[]) =>{
    for (let i = options.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [options[i], options[j]] = [options[j], options[i]];
        }
    return options;
});
//Displaying each question that has been passed to QuestionBox(resusable component)
export default function QuestionBox({question,isAnsweredCorrectly,user_ans,handleSubmit}:Props){
    const options = useMemo(() => shuffle_array([...question.incorrect_answers,question.correct_answer]),[question]);
    return(
        <div className="questionbox">
            <h2 dangerouslySetInnerHTML={{ __html: question.question }}></h2>
            <div className="option-container">
            <ul>
                {options.map((option,index)=>(
                    <li key={index}>
                        <input 
                        type="radio" 
                        id={`option-${index}`} 
                        name="option" 
                        value={option} 
                        checked={user_ans===option} 
                        onChange={()=>handleSubmit(option)}
                        disabled={isAnsweredCorrectly===true} />
                        <label htmlFor={`option-${index}`} dangerouslySetInnerHTML={{ __html: option }}
                        className={isAnsweredCorrectly!==null && option===question.correct_answer && option===user_ans?'correct'
                            :isAnsweredCorrectly!==null && option===user_ans ? 'incorrect' :''}>
                                
                        </label>
                    </li>
                ))}
            </ul>
            </div>
            
            
        </div>
    )
    
}