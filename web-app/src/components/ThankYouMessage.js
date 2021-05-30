import { Button } from "@material-ui/core";
import Confetti from "react-confetti";
import Quote from "./Quote";
import styled from "styled-components";
import { useEffect, useState } from "react";
import Claps from "../assets/claps.png";
import Hands from "../assets/hands.png";

export default function ThankYouMessage({ reportValue, handleBack }) {
  const { height, width } = window.screen;
  const positiveReport = reportValue > 0;

  const [showConffeti, setShowConffeti] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShowConffeti(false);
    }, 5000);
  }, []);

  return (
    <ThankYouContainer>
      {positiveReport && showConffeti && (
        <Confetti
          width={width}
          height={height}
          opacity={0.6}
          numberOfPieces={50}
        />
      )}
      <Quote reportValue={reportValue} />

      <ClapsImage src={reportValue > 0 ? Claps : Hands} />
      <Text> תודה רבה על השיתוף! </Text>
      {/* <Button
        disabled={reportValue === 0}
        variant="contained"
        color="secondary"
        style={{ margin: "10vh 0 15vh 0", fontSize: "20px" }}
        onClick={handleBack}
      >
        חזרה
      </Button> */}
    </ThankYouContainer>
  );
}


const ThankYouContainer = styled.div`
  margin-top: 6vh;
`;

const ClapsImage = styled.img`
  height: 20vh;
  border-radius: 10px;
  margin-top: 10vh;
`;
const Text = styled.h2`
  margin-top: 7vh;
  font-weight: 400;
`;
