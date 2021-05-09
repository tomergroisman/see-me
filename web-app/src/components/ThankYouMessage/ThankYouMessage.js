import { Button } from "@material-ui/core";
import Confetti from "react-confetti";
import Quote from "../Quote/Quote";
import styled from "styled-components";
import { useEffect, useState } from "react";

const ThankYouContainer = styled.div`
  margin-top: 6vh;
`;

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
      <h1> תודה רבה על הדיווח! </h1>
      <div style={{ fontSize: "64px" }}>🙏</div>{" "}
      <Button
        disabled={reportValue === 0}
        variant="contained"
        color="secondary"
        style={{ margin: "10vh 0 15vh 0", fontSize: "20px" }}
        onClick={handleBack}
      >
        חזרה
      </Button>
      <Quote reportValue={reportValue} />
    </ThankYouContainer>
  );
}
