import { useTheme } from "@emotion/react";
import Flex from "./Flex";
import Instructions,{toggleModal} from "../components/Instructions";
import { Link } from "react-router-dom";
type Props = {
  children: JSX.Element;
};

export default function Layout(props: Props) {
  const theme = useTheme();

  return (
    <Flex direction="column" height="100%">
      <Flex
        color={theme.textInverted}
        backgroundColor={theme.primary}
        padding={theme.space_xxs}
        width="100%"
        justifyContent="center"
        alignItems="center"
      >
        <div className="navbar">

        <p className="app_name"><Link to="/">Trivia App</Link></p>

        <div className="inst_modal">
        <button onClick={()=>toggleModal('instructions')}>How to Play?</button>
        <Instructions label='instructions' />
        </div>
        
        </div>
        
       
          
        
      </Flex>
      {props.children}
    </Flex>
  );
}
