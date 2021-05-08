import "./App.css";
import React, { useState } from "react";
import axios from "axios";
import { Button, TextField } from "@material-ui/core";

import ValuesSlider from "./components/ValuesSlider/ValuesSlider";
import ThankYouMessage from "./components/ThankYouMessage/ThankYouMessage";

function App() {
  const [reportValue, setReportValue] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState("");

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
    const payload = { report: reportValue, message };

    await axios.post(url, payload);
  }

  function handleBack() {
    setSubmitted(false);
    setReportValue(0);
    setMessage("")
  }

  const CHARACTER_LIMIT = 200;

  function handleTyping(event) {
    setMessage(event.target.value);
  }

  const ReportForm = () => (
    <>
      <h1>
        היי!👋
        <br />
        מה ברצונך לשתף?
      </h1>
      <ValuesSlider reportValue={reportValue} setReportValue={setReportValue} />

      <div style={{ fontSize: "32px", marginBottom: "5vh" }}>
        {reportValue !== 0 ? (
          emojisDic[reportValue]
        ) : (
          <img
            src="https://cdn.iconscout.com/icon/premium/png-512-thumb/tree-emoji-1587568-1346171.png"
            className="tree"
          />
        )}
      </div>
      {/* <h4 style={{ marginBottom: "0" }}> 
      ניתן גם להוסיף כמה מילים..
      </h4> */}

      {/* <TextField
        id="outlined-multiline-static"
        label="הודעה"
        multiline
        rows={4}
        defaultValue="ניתן גם להוסיף כמה מילים.."
        variant="outlined"
        style={{ width: "90%", direction: "rtl" }}
        max
        // dir="rtl"
      /> */}

      <TextField
        label="ניתן גם להוסיף כמה מילים.."
        inputProps={{
          maxlength: CHARACTER_LIMIT,
        }}
        value={message}
        helperText={`${message.length}/${CHARACTER_LIMIT}`}
        onChange={(e) =>handleTyping(e)}
        margin="normal"
        style={{ width: "90%", direction: "rtl" }}
        variant="outlined"
        placeholder={""}
        multiline
        rows={3}
      />

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
      <RenderedComponent reportValue={reportValue} handleBack={handleBack} />
    </div>
  );
}

export default App;
