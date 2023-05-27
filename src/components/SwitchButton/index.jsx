import "./styles.scss";
import Switch from "@mui/material/Switch";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

const SwitchButton = ({ label, setState, state}) => {
  const handleOnChange = () => {
    setState(!state);

  };
  return (
    <FormGroup>
      <FormControlLabel onChange={handleOnChange} control={<Switch />} label={label} />
    </FormGroup>
  );
};

export default SwitchButton;
