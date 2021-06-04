import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";
import { mapColor } from "../service/shared";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "80%",
  },
  margin: {
    height: theme.spacing(3),
  },
}));

const PrettoSlider = withStyles({
  thumb: {
    height: 30,
    width: 30,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    marginTop: -8,
    marginLeft: -12,
    "&:focus, &:hover, &$active": {
      boxShadow: "inherit",
    },
  },
  track: {
    height: 15,
    borderRadius: 8,
    color: "transparent",
  },
  rail: {
    height: 15,
    borderRadius: 8,
    background: "linear-gradient(to right, red, lightcoral ,lightgreen,  green)",
    opacity: 1,
  },
  mark: {
    color: 'transparent'
  }
})(Slider);

const marks = [
  { value: -2, label: "חוויה שלילית", },
  // { value: -1, label: "", },
  // { value: 0, label: "", },
  // { value: 1, label: "", },
  { value: 2, label: "חוויה חיובית", },
];

export default function ValuesSlider({ setReportValue, reportValue }) {
  const classes = useStyles();
  const [color, setColor] = React.useState(mapColor(reportValue));

  function handleOnChange(value) {
    setReportValue(value);
  }

  return (
    <div className={classes.root}>
      <PrettoSlider
        marks={marks}
        valueLabelDisplay="on"
        valueLabelDisplay="off"
        aria-label="slider"
        defaultValue={reportValue}
        min={-2}
        max={2}
        step={1}
        onChangeCommitted={(_, value) => {
          handleOnChange(value);
        }}
        onChange={(_, value) => {
          setColor(mapColor(value));
        }}
      />
    </div>
  );
}
