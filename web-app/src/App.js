import "./App.css";
import { useState } from "react";
import axios from "axios";
import { Button } from "@material-ui/core";
function App() {
  const [reportValue, setReportValue] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const emojisDic = {
    "-2": "😥",
    "-1": "😔",
    0: "😐",
    1: "😊",
    2: "😄",
  };

  async function handleSubmit() {
    setSubmitted(true);
    const url = 'http://18.133.245.223:3000/report/6047c75db313be4c8829b7d7'
    await axios.post(url, { report: reportValue });
  }

  const ThankYouMessage = () => (
    <>
      <h1> תודה רבה על הדיווח! </h1>
      <div style={{ fontSize: "64px" }}>🙏</div>{" "}
    </>
  );

  const ReportForm = () => (
    <>
      <h1 style={{ marginBottom: "32px" }}> מה ברצונך לדווח?</h1>

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
      </div>

      <div style={{ fontSize: "64px", marginBottom: "64px" }}>
        {emojisDic[reportValue]}
      </div>

      <Button
        disabled={reportValue === 0}
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
