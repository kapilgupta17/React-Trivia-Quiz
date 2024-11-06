
import Flex from "../componentLibrary/Flex";
import { Link } from "react-router-dom";

const HomeContainer = () =>{
    return (
        <>
        <Flex
            justifyContent="center"
            alignItems="center"
            height="100%"
            width="100%"
        >

        <button className="startButton"><Link to="/game">START GAME</Link></button>
        
        </Flex>
        </>
    )
}

export default HomeContainer;