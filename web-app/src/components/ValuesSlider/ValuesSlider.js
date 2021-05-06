import React from 'react';
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "90%",
  },
  margin: {
    height: theme.spacing(3),
  },
}));

const PrettoSlider = withStyles({
  root: {
    color: "yellow",
    height: 15,
  },
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
  active: {},
  valueLabel: {
    left: "calc(-50% + 12px)",
  },
  track: {
    height: 15,
    borderRadius: 8,
  },
  rail: {
    height: 15,
    borderRadius: 8,
  },
})(Slider);

export default function ValuesSlider({ setReportValue, reportValue }) {
  const classes = useStyles();
  const [color, setColor] = React.useState(mapColor(reportValue));

  function handleOnChange(value) {
    setReportValue(value);
  }

  function mapColor(value) {
    return value > 0 ? "green" : value < 0 ?"red" : 'blue'
  }

  return (
    <div className={classes.root}>
      <PrettoSlider
        style={{ color }}
        valueLabelDisplay="auto"
        aria-label="pretto slider"
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
