import { useState,useEffect } from "react";
type Props={
    difficulty:string,
    cur_idx:number,
    setCurrentQuestion :(cur_idx:number) =>void;
}
export default function Timer({difficulty,cur_idx,setCurrentQuestion}:Props){

    const diff_time:{[key:string]:number}= {
        'easy':30,
        'medium':45,
        'hard':60
    };
    console.log(difficulty)
    console.log(diff_time[difficulty])

    const [time,setTime] = useState<number>(diff_time[difficulty]);

    useEffect(()=>{
        const interval = setInterval(()=>{
            setTime((prevTime)=>{
                if(prevTime <=1){
                    clearInterval(interval);
                    setCurrentQuestion(cur_idx+1);
                    return 0;
                }
                return prevTime - 1;
            });
        },1000);
        return ()=>{clearInterval(interval)};

    },[cur_idx,setCurrentQuestion])


    // useEffect(() => {
    //     setTime(diff_time[difficulty] || 30); // Update time when difficulty changes
    //   }, [difficulty]);

    const timer=(time:number)=>{
        return `00:${time<10?`0${time}`:time}`;

    }
    return <h2>{timer(time)}</h2>;
}