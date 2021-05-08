import { Button, TextField } from "@material-ui/core";
import styled from "styled-components";
import axios from "axios";
import ValuesSlider from "../ValuesSlider/ValuesSlider";

const SliderContainer = styled.div`
  fontsize: 32px;
  marginbottom: 5vh;
`;
const TreeImage = styled.img`
  height: 22vh;
`;

const emojisDic = {
  "-2": "😥",
  "-1": "😔",
  0: "😐",
  1: "😊",
  2: "😄",
};

export default function ReportForm({ reportValue, handleTyping, message,setSubmitted,setReportValue }) {
  async function handleSubmit() {
    setSubmitted(true);
    const url = "http://18.133.245.223:3000/report/6047c75db313be4c8829b7d7";
    const payload = { report: reportValue, message };

    await axios.post(url, payload);
  }

  const CHARACTER_LIMIT = 200;

  return (
    <>
      <h1>
        היי!👋
        <br />
        מה ברצונך לשתף?
      </h1>
      <ValuesSlider reportValue={reportValue} setReportValue={setReportValue} />

      <SliderContainer>
        {reportValue !== 0 ? (
          emojisDic[reportValue]
        ) : (
          <TreeImage src="https://cdn.iconscout.com/icon/premium/png-512-thumb/tree-emoji-1587568-1346171.png" />
        )}
      </SliderContainer>

      <TextField
        label="ניתן גם להוסיף כמה מילים.."
        inputProps={{
          maxlength: CHARACTER_LIMIT,
        }}
        value={message}
        helperText={`${message.length}/${CHARACTER_LIMIT}`}
        onChange={(e) => handleTyping(e)}
        margin="normal"
        style={{ width: "90%" }}
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
}
