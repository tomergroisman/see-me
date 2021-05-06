import PropTypes from "prop-types";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";
import Tooltip from "@material-ui/core/Tooltip";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "90%",
  },
  margin: {
    height: theme.spacing(3),
  },
}));

function ValueLabelComponent(props) {
  const { children, open, value } = props;
  const emojisDic = {
    "-2": "😥",
    "-1": "😔",
    0: "😐",
    1: "😊",
    2: "😄",
  };

  return (
    <Tooltip open={open} enterTouchDelay={500} placement="top" title={'dd'}>
      {/* {children} */}
    </Tooltip>
  );
}

ValueLabelComponent.propTypes = {
  children: PropTypes.element.isRequired,
  open: PropTypes.bool.isRequired,
  value: PropTypes.number.isRequired,
};

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

  function handleOnChange(value) {
    setReportValue(value);
  }

  const slideColor = reportValue > 0 ? "green" : reportValue < 0 ?"red":'blue';

  return (
    <div className={classes.root}>
      <PrettoSlider
        style={{ color: slideColor }}
        valueLabelDisplay="auto"
        aria-label="pretto slider"
        defaultValue={reportValue}
        min={-2}
        max={2}
        onChange={(_, value) => {
          handleOnChange(value);
        }}
      />
    </div>
  );
}
