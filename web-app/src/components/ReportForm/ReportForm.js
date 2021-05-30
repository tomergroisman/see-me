import { Button, TextField } from "@material-ui/core";
import styled from "styled-components";
import ValuesSlider from "../ValuesSlider/ValuesSlider";
import { getSchool, submitReport } from "../../service/calls";
import { mapValues } from "../../service/shared";

const SliderContainer = styled.h1`
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

export default function ReportForm({
  reportValue,
  handleTyping,
  message,
  setSubmitted,
  setReportValue,
}) {
  function handleSubmit() {
    setSubmitted(true);
    submitReport(reportValue, message);
  }
  const CHARACTER_LIMIT = 100;

  return (
    <>
      <h1>היי, זה אני SeeMe !👋</h1>
      <SliderContainer>
        {reportValue !== 0 ? (
          emojisDic[mapValues(reportValue)]
        ) : (
          <TreeImage src="https://cdn.iconscout.com/icon/premium/png-512-thumb/tree-emoji-1587568-1346171.png" />
        )}
      </SliderContainer>

      <h2>מה ברצונך לשתף?</h2>

      <ValuesSlider reportValue={reportValue} setReportValue={setReportValue} />

      <TextField
        label="ניתן גם להוסיף כמה מילים.."
        inputProps={{ maxlength: CHARACTER_LIMIT }}
        value={message}
        // helperText={`${message.length}/${CHARACTER_LIMIT}`}
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
        style={{ fontSize: "20px", borderRadius: "15px" }}
        onClick={handleSubmit}
      >
שיתוף
      </Button>
    </>
  );
}
