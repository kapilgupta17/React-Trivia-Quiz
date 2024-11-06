import APIClient from "../api/client";
import { Question } from "../types";
import { useQuery } from "react-query";
import Flex from "../componentLibrary/Flex";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useQuestionContext } from "../AppRouter";


type Props = {
  apiClient: APIClient;
  //setQuestions: (questions: Question[]) => void;
};

interface Category {
  id: number;
  name: string;
}

export default function GameContainer({apiClient}:Props) {

  
  const [categories, setCategories] = useState<Category[]>([]);
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [numbers,setNumbers] = useState<number[]>([]);
  const [isButtonDisabled,setisDisabled]= useState(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const {setQuestions} = useQuestionContext();
  //Getting categories from the API
  useEffect(() => {
    const loadCategories = async () => {
      const response = await axios.get('https://opentdb.com/api_category.php');
      const categories: Category[] = response.data.trivia_categories;
      setCategories(categories);
    };

    loadCategories();
  }, [])

  useEffect(() =>{
    const nums=Array.from({length:20},(_,i)=>i+1);
    setNumbers(nums);  
  },[])

  //Getting questions using useQuery and handling all the potential transient errors state.
  const { data: questions = [], isLoading: isLoadingQuestions, isError } = useQuery({
    queryKey: ["questions", amount, category, difficulty],
    queryFn: async () => {
      try {
        return await apiClient.getQuestions(amount, category, difficulty);
      } catch (error) {
        console.error("Error fetching questions: ", error);
        throw error;
      }
    },
    enabled: isGameStarted, //Query runs only when the quiz is started
    onSuccess: (data) => {
      setQuestions(data);
      navigate('/questions');
    },
    onError: (error) => {
      console.error("Error fetching questions: ", error);
      setError("Failed to load questions. Please try once more.");
    },
  });

  if (isLoadingQuestions) {
    return <h1 className="notif">Loading...</h1>;
  }

  if (isError) {
    return <h1 className="notif">Failed to load questions. Please try once more.</h1>;
  }
  
  function handleStartGame() {
    
    if (amount!=='' && category!=='' && difficulty!==''){
      setisDisabled(false);
      setIsGameStarted(true);
      }else{
        alert("Please select all options");
      }
    }
  
  
  return (
    <>
      <Flex
        direction="column"
        justifyContent="center"
        alignItems="center"
        height="100%"
        width="100%"
      >        
          <select className={`filter-option ${amount==='' ?'amount':'amount-filled'}`} value={amount} onChange={e => setAmount(e.target.value) } >
            <option value="">Number of Questions</option>
          {numbers.map((num) => (
            <option key={num} value={num}>{num}</option>
          ))}
          </select>

          <select className={`filter-option ${category==='' ?'category':'category-filled'}`} value={category} onChange={e => setCategory(e.target.value)}>
            <option value="">Category</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>

          <select className={`filter-option ${difficulty==='' ?'difficulty':'difficulty-filled'}`} value={difficulty} onChange={e => setDifficulty(e.target.value)}>
            <option value="">Difficulty</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>

           <button className="filter-option startgame" onClick={handleStartGame} disabled={!isButtonDisabled}>START QUIZ</button> 

      </Flex>
  </>

  );
}
