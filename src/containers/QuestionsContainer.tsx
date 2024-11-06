
import Flex from "../componentLibrary/Flex";
import { Question } from "../types";
import { useState } from "react";
import Scorebar from "../components/Scorebar";
import QuestionBox from "../components/QuestionBox";
import FinalScore from "../components/Finalscore";
import { useQuestionContext } from "../AppRouter";
type Props = {
  questions: Question[];
};
interface Ques_Ans{
  idx:number,
  answer:string
}
export default function QuestionsContainer() {
  const {questions} = useQuestionContext();

  const [cur_idx, setCurrentQuestion] = useState<number>(0);
  const [user_ans, setUserAnswer] = useState<string>('');
  const [score, setScore] = useState<number>(0);
  const [isAnsweredCorrectly, setisAnsweredCorrectly] = useState<boolean | null>(null);
  const [user_answers,setUserAnswers] = useState<Ques_Ans[]>([]);
  const [tries,setTries] = useState<number>(3);
  
  //Handling Score and other functions which are present while answering questions.
  //Example - letting user know if the answer they have selected is correct or not and then moving on to the next question.
  

  const handleSubmit = (answer: string) => {

    setUserAnswer(answer);
    setUserAnswers((prevAnswers) =>[...prevAnswers,{idx:cur_idx,answer}]);
    // due to asynchronous nature of state updates happening
    if (answer === questions[cur_idx].correct_answer) {
      setScore((prev_score) => prev_score + tries>0 ? tries/4 : 0); //functional state update , safer way to update state based on the previous state
      setisAnsweredCorrectly(true);
      setTries(3);
    } else {
      setisAnsweredCorrectly(false);
      setTries((prevTries) => prevTries - 1);
    }

    if (tries===1 || answer===questions[cur_idx].correct_answer){
      setTimeout(() => {
      setisAnsweredCorrectly(null);
      setCurrentQuestion((prev_idx) => prev_idx + 1);
      setTries(3);
      setUserAnswer('');
    }, 2000);}
  }

  console.log("Fetched Questions: ", questions);
  console.log(user_answers);


  return (
    <Flex
      justifyContent="center"
      height="100%"
      width="100%"
    >
      <div className="question-modal">
        
        { 
          cur_idx < questions.length ? (
            <>
              <Scorebar cur_idx={cur_idx} length={questions.length} score={score} setCurrentQuestion={setCurrentQuestion} 
              difficulty={questions[cur_idx].difficulty}/>
              <p>Tries : {tries}</p>
              <div>
                <QuestionBox question={questions[cur_idx]} isAnsweredCorrectly={isAnsweredCorrectly}
                  user_ans={user_ans} handleSubmit={handleSubmit} />
              </div>

            </>

          ) : (
            <FinalScore score={score} length={questions.length} user_answers={user_answers} />
          )
        }

      </div>


    </Flex>
  );
}
