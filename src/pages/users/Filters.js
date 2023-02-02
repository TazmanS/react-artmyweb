import * as React from "react";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const genders = ["male", "female"];

function getStyles(gender, filters, theme) {
  return {
    fontWeight:
      filters.gender.indexOf(gender) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const Filters = (props) => {
  const { filters, setFilters } = props;
  const theme = useTheme();

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setFilters({
      ...filters,
      gender: typeof value === "string" ? value.split(",") : value,
    });
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-name-label">Name</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={filters.gender}
          onChange={handleChange}
          input={<OutlinedInput label="Gender" />}
          MenuProps={MenuProps}
        >
          {genders.map((gender) => (
            <MenuItem
              key={gender}
              value={gender}
              style={getStyles(gender, filters, theme)}
            >
              {gender}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default Filters;
