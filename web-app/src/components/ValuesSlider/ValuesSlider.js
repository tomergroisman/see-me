import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";
import { mapColor } from "../../service/shared";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "90%",
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
    color: "green",
  },
  rail: {
    height: 15,
    borderRadius: 8,
    color: "red",
    opacity: 1,
  },
})(Slider);

export default function ValuesSlider({ setReportValue, reportValue }) {
  const classes = useStyles();
  const [color, setColor] = React.useState(mapColor(reportValue));

  function handleOnChange(value) {
    setReportValue(value);
  }

  return (
    <div className={classes.root}>
      <PrettoSlider
        style={{ color }}
        valueLabelDisplay="off"
        aria-label="pretto slider"
        defaultValue={reportValue}
        min={-2}
        max={2}
        step={0.05}
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
