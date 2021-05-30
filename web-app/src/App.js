import "./App.css";
import React, { useState } from "react";

import ThankYouMessage from "./components/ThankYouMessage";
import Logo from "./components/Logo";

import styled from "styled-components";
import ReportForm from "./components/ReportForm";

const AppDiv = styled.div`
  direction: rtl;
  text-align: center;
  margin: auto;
  font-family: "Calibri";

  padding: 52px 5% 5%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function App() {
  const [reportValue, setReportValue] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState("");

  function handleBack() {
    setSubmitted(false);
    setReportValue(0);
    setMessage("");
  }

  function handleTyping(event) {
    setMessage(event.target.value);
  }

  return (
    <AppDiv>
      <Logo />
      {submitted ? (
        <ThankYouMessage reportValue={reportValue} handleBack={handleBack} />
      ) : (
        <ReportForm
          reportValue={reportValue}
          handleTyping={handleTyping}
          message={message}
          setSubmitted={setSubmitted}
          setReportValue={setReportValue}
        />
      )}
    </AppDiv>
  );
}

export default App;
