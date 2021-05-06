import "./App.css";
import { useState } from "react";
import axios from "axios";
import { Button } from "@material-ui/core";

import Confetti from "react-confetti";
import ValuesSlider from "./components/ValuesSlider/ValuesSlider";
import Quote from "./components/Quote/Quote";

function App() {
  const [reportValue, setReportValue] = useState(0);
  console.log("🚀 ~ file: App.js ~ line 12 ~ App ~ reportValue", reportValue)
  const [submitted, setSubmitted] = useState(false);

  const { height, width } = window.screen;

  const emojisDic = {
    "-2": "😥",
    "-1": "😔",
    0: "😐",
    1: "😊",
    2: "😄",
  };

  async function handleSubmit() {
    setSubmitted(true);
    const url = "http://18.133.245.223:3000/report/6047c75db313be4c8829b7d7";
    await axios.post(url, { report: reportValue });
  }

  function handleBack() {
    setSubmitted(false);
    setReportValue(0);
  }

  const ThankYouMessage = () => (
    <div className="thankYouContainer">
      <Confetti width={width} height={height} opacity={0.6} />
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
    </div>
  );

  const ReportForm = () => (
    <>
      <h1> היי!👋 </h1>
      <h1 style={{ marginBottom: "60px" }}> מה ברצונך לשתף?</h1>
      {/* <RubberSlider width={250} value={reportValue} onChange={setReportValue} /> */}
      <ValuesSlider
        reportValue={reportValue}
        setReportValue={setReportValue}
        // onInput={(e) => setReportValue(e.target.value)}
      />
      {/* 
      <div className="slidecontainer">
        <input
          dir="ltr"
          type="range"
          min="-2"
          max="2"
          value={reportValue}
          className="slider"
          onInput={(e) => setReportValue(e.target.value)}
        />
      </div> */}

      <div style={{ fontSize: "64px", marginBottom: "5vh" }}>
        {reportValue !== 0 ? (
          emojisDic[reportValue]
        ) : (
          <img
            src="https://cdn.iconscout.com/icon/premium/png-512-thumb/tree-emoji-1587568-1346171.png"
            className="tree"
          />
        )}
      </div>

      <Button
        disabled={reportValue == 0}
        variant="contained"
        color="primary"
        style={{ fontSize: "20px" }}
        onClick={handleSubmit}
      >
        שליחה
      </Button>
    </>
  );

  const RenderedComponent = submitted ? ThankYouMessage : ReportForm;

  return (
    <div
      className="App"
      dir="rtl"
      style={{ padding: "5%", paddingTop: "52px" }}
    >
      <RenderedComponent />
    </div>
  );
}

export default App;
