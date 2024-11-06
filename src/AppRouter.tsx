import { Route, Routes } from "react-router-dom";
import APIClient from "./api/client";
import GameContainer from "./containers/GameContainer";
import HomeContainer from "./containers/HomeContainer";
import QuestionsContainer from "./containers/QuestionsContainer";
import './App.css';
import { useState,createContext,useContext} from "react";
import { Question } from "./types";

type Props = {
  apiClient: APIClient;
};

//create a context 
const QuestionContext = createContext<{
  questions: Question[];
  setQuestions:React.Dispatch<React.SetStateAction<Question[]>>
}>({
  questions:[],
  setQuestions:()=>{},
});

// custom hook
export const useQuestionContext = () => useContext(QuestionContext);



export default function AppRouter(props: Props): JSX.Element {

  const [questions, setQuestions] = useState<Question[]>([]);
  // Define a route for the game page, passing the apiClient and setQuestions props to the GameContainer component
  // Define a route for the questions page, passing the questions state to the Questions component
  return (
    <QuestionContext.Provider value={{questions,setQuestions}}>

      <Routes>
          <Route path="/" element={<HomeContainer />} />
          <Route path="/game" element={<GameContainer apiClient={props.apiClient} />} />
          <Route path='/questions' element={<QuestionsContainer  />} />
      
      </Routes>

    </QuestionContext.Provider>
    
  );
}
