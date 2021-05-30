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
  const [schoolsList, setSchoolsList] = useState({});
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
    const classes = await getClasses(_schoolID);
    setClassesList(classes);
  }
  async function handleSelectClass(e) {
    const _classID = e.target.value;
    setClassID(_classID);
  }

  async function handleSubmit() {
    const userToken = await submitLogin(classID);
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
            value={0}
            onChange={(e) => handleSelectSchool(e)}
          >
            <MenuItem value="">
              <em>-</em>
            </MenuItem>
            {Object.keys(schoolsList).map((school) => {
              const { name, city, address, _id } = school;
              return <MenuItem value={_id}>{name}</MenuItem>;
            })}
          </Select>
        </FormControl>

        {schoolID ? (
          <FormControl variant="filled" className={classes.formControl}>
            <InputLabel id="demo-simple-select-filled-label">כיתה</InputLabel>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={0}
              onChange={(e) => handleSelectClass(e)}
            >
              <MenuItem value="">
                <em>-</em>
              </MenuItem>
              {Object.keys(classesList).map((classs) => {
                const { grade, class_number, school_id, _id } = classs;
                return (
                  <MenuItem value={_id}>
                    {grade}`{class_number}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        ) : null}

        <Button
          disabled={!(schoolID && classID)}
          variant="contained"
          color="primary"
          style={{ fontSize: "20px", borderRadius: "15px" }}
          onClick={handleSubmit}
        >
          כניסה
        </Button>
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
