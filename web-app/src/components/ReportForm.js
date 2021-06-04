import { Button, TextField } from "@material-ui/core";
import styled from "styled-components";
import ValuesSlider from "./ValuesSlider";
import { getSchool, submitReport } from "../service/calls";
import { mapValues } from "../service/shared";

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
  const CHARACTER_LIMIT = 200;

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

      <h2>
כיף לראות אותך פה,
<br/>
  מה חווית היום?
      </h2>

      <ValuesSlider
        reportValue={reportValue}
        setReportValue={setReportValue}
      />

      <TextField
        label=""
        value={message}
        helperText="* לא לשכוח כי השיתוף אנונימי"
        onChange={(e) => handleTyping(e)}
        margin="normal"
        style={{ width: "90%" }}
        variant="outlined"
        // placeholder="ניתן גם להוסיף כמה מילים.."
        placeholder="מה הייתה החוויה? איזה רגש עלה בך? איך בחרת להתמודד?"
        multiline
        rows={3}
        // FormHelperTextProps={{marginLeft:'0'}}
      />

      <StyledButton
        disabled={reportValue == 0}
        variant="contained"
        color="primary"
        onClick={handleSubmit}
      >
        שיתוף
      </StyledButton>
    </>
  );
}

const StyledButton = styled(Button)`
  font-size: 2vh;
  border-radius: 15px;
  width: 90%;
  height: 46px;
  margin-top: 5vh;
`;
const SliderContainer = styled.div`
  font-size: 10vh;
  margin-bottom: 5vh;
  min-height: 10vh;
`;
const TreeImage = styled.img`
  height: 15vh;
`;
