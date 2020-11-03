import React, { useState } from 'react';
import AnalyticsBySearch from "./AnalyticsBySearch";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { Props } from "../../containers/DashBoard";

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
      },
      selectEmpty: {
        marginTop: theme.spacing(2),
      },
  }));

const SearchBar: React.FC<Props> = () => {
    const classes = useStyles();
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState('');
    const [type, setType] = useState('');
    const [browser, setBrowser] = useState("");
    const [allSearchProps, setAllSearchProps] = useState(
      {
      sorting: sort,
      type: type,
      browser: browser,
      search: search
    });

    const setFormOfSearchInputs = () => {
      let objForm = {
        sorting: sort,
        type: type,
        browser: browser,
        search: search
      }
      setAllSearchProps(objForm);
    }

    return (
        <div className="Search_Container">
            <div className="Search_Inputs_container">
        <form className={classes.root} noValidate autoComplete="off">
      <TextField id="outlined-basic" label="Search" variant="outlined" onChange={(e: any) => {
        setSearch(e.target.value)
        // setFormOfSearchInputs()
        }} />
    </form>
    <FormControl className={classes.formControl}>
        <InputLabel shrink id="demo-simple-select-placeholder-label-label">
          Sort
        </InputLabel>
        <Select
          labelId="demo-simple-select-placeholder-label-label"
          id="demo-simple-select-placeholder-label"
          value={sort}
          onChange={(e : any) => {
            setSort(e.target.value)
            // setFormOfSearchInputs()
          }}
          displayEmpty
          className={classes.selectEmpty}
        >
          <MenuItem value={"-date"}>Newest Date</MenuItem>
          <MenuItem value={"+date"}>Latest Date</MenuItem>
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel shrink id="demo-simple-select-placeholder-label-label">
          Type
        </InputLabel>
        <Select
          labelId="demo-simple-select-placeholder-label-label"
          id="demo-simple-select-placeholder-label"
          value={type}
          onChange={(e : any) => {
            setType(e.target.value)
            // setFormOfSearchInputs()
          }}
          displayEmpty
          className={classes.selectEmpty}
        >
          <MenuItem value={""}>
            <em>All</em>
          </MenuItem>
          <MenuItem value={"login"}>Login</MenuItem>
          <MenuItem value={"signup"}>Signup</MenuItem>
          <MenuItem value={"admin"}>Admin</MenuItem>
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel shrink id="demo-simple-select-placeholder-label-label">
          Browser
        </InputLabel>
        <Select
          labelId="demo-simple-select-placeholder-label-label"
          id="demo-simple-select-placeholder-label"
          value={browser}
          onChange={(e : any) => {
            setBrowser(e.target.value)
            // setFormOfSearchInputs()
          }}
          className={classes.selectEmpty}
          displayEmpty
        >
          <MenuItem value={""}><em>None</em></MenuItem>
          <MenuItem value={"chrome"}>Chrome</MenuItem>
          <MenuItem value={"safari"}>Safari</MenuItem>
          <MenuItem value={"edge"}>Edge</MenuItem>
          <MenuItem value={"firefox"}>Firefox</MenuItem>
          <MenuItem value={"ie"}>IE</MenuItem>
          <MenuItem value={"other"}>Other</MenuItem>
        </Select>
      </FormControl>
      <button onClick={setFormOfSearchInputs}>Search</button>
    </div>
    <AnalyticsBySearch allSearchProps={allSearchProps} />
        </div>
    )
}

export default React.memo(SearchBar)


