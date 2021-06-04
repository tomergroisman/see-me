import {
  Button,
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { getClasses, getSchools, submitLogin } from "../service/calls";
import { classesLetters } from "../service/dictionaries";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    width: "70%",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function Login({setToken}) {
  const [schoolsList, setSchoolsList] = useState([]);
  const [classesList, setClassesList] = useState({});

  const [schoolID, setSchoolID] = useState(null);
  const [classID, setClassID] = useState(null);

  const classes = useStyles();

  useEffect(async () => {
    const schools = await getSchools();
    setSchoolsList(schools);
  }, []);

  async function handleSelectSchool(e) {
    const _schoolID = e.target.value;
    setSchoolID(_schoolID);
    const schoolDetails = await getClasses(_schoolID);
    // const {address,name,city,classes} = schoolDetails
    
    // const classesArray = Object.keys(classes).map((class)=>{
    //   const 
    //   return 
    // })
    setClassesList(schoolDetails);
  }
  async function handleSelectClass(e) {
    const classID = e.target.value;

    setClassID(classID);
  }

  async function handleSubmit() {
    const userToken  = await submitLogin(classID);
    localStorage.setItem("token", userToken);
    setToken(userToken)
  }

  return (
    <>
      <LoginContainer>
        <h1>מסך התחברות</h1>
        <FormControl variant="filled" className={classes.formControl}>
          <InputLabel id="demo-simple-select-filled-label">בית ספר</InputLabel>
          <Select
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            value={schoolID}
            onChange={(e) => handleSelectSchool(e)}
          >
            <MenuItem value="">
              <em>-</em>
            </MenuItem>
            {schoolsList.map((school,index) => {
              const { name, city, address, id: _id } = school;
              return (
              <MenuItem value={_id}key={index + 'school'}>
                {name}
                </MenuItem>
                )
            })}
          </Select>
        </FormControl>

        {schoolID ? (
          <FormControl variant="filled" className={classes.formControl}>
            <InputLabel id="demo-simple-select-filled-label">כיתה</InputLabel>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={classID}
              onChange={(e) => handleSelectClass(e)}
            >
              <MenuItem value="">
                <em>-</em>
              </MenuItem>
              {Object.keys(classesList).map((key) => {
                const classs = classesList[key]
                const { grade, class_number, _id} = classs;
                const classID = _id["$oid"]
                return (
                  <MenuItem value={classID} key={key + 'class'}>
                    {classesLetters[grade]}`{class_number}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        ) : null}

        <StyledButton
          disabled={!(schoolID && classID)}
          variant="contained"
          color="primary"
          style={{ fontSize: "20px", borderRadius: "15px" }}
          onClick={handleSubmit}
        >
          כניסה
        </StyledButton>
      </LoginContainer>
    </>
  );
}

const LoginContainer = styled.div`
  text-align: center;
  align-items:center;
  height: 100vh;
  display:flex;
  flex-direction: column;
`;

const StyledButton = styled(Button)`
  font-size: 2vh;
  border-radius: 15px;
  width: 60%;
  height: 52px;
  margin-top: 20vh;
`;