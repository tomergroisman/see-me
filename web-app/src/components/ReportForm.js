import { Button, TextField } from "@material-ui/core";
import styled from "styled-components";
import ValuesSlider from "./ValuesSlider";
import { getSchool, submitReport } from "../service/calls";
import '../App.css'


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
      <h1>היי, זה אני SeeMe !</h1>
      <ValuesSlider
        reportValue={reportValue}
        setReportValue={setReportValue}
      />
      <div style={{ minHeight: '15vh', width: '100%' }}>
        {reportValue !== 0 ?
          <StyledTextField
            scale={reportValue !== 0 ? 1 : 0}
            label=""
            value={message}
            helperText="*  השיתוף  הינו אנונימי"
            onChange={(e) => handleTyping(e)}
            margin="normal"
            variant="outlined"
            // placeholder="ניתן גם להוסיף כמה מילים.."
            placeholder="מה הייתה החוויה? איזה רגש עלה בך? איך בחרת להתמודד?"
            multiline
            rows={3}
          // className="expandable"
          // FormHelperTextProps={{marginLeft:'0'}}
          /> : null}
      </div>


      <StyledButton
        disabled={reportValue == 0}
        variant="contained"
        color="primary"
        onClick={handleSubmit}
      >          שיתוף
      </StyledButton>
    </>
  );
}

const StyledButton = styled(Button)`
      font-size: 2vh;
      border-radius: 15px;
      width: 70%;
      height: 46px;
      margin-top: 5vh;
      position:relative;
      `;
const StyledTextField = styled(TextField)`
      width:90%;
      overflow: hidden;

      transition: all 2.5s ease-in-out;
      transform-origin: left top;
      transform: scaleY(${props => props.scale});
      `;

const AddSomeWordsLabel = styled.div`
      text-align:right;
      color:#444444;
      width:90%;
      margin-top:3vh;
      `;