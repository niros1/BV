import React from "react"
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Slider, Typography, Theme, createStyles, makeStyles, Grid, InputLabel, Select, MenuItem } from "@material-ui/core"
import { observer } from "mobx-react";
import { useStore } from "../setupContext";
import { UserStore } from "../store/users";



const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            backgroundColor: theme.palette.primary.main,
            width: "100%"

        },
        container: {
            width: "100%"
        },
        slider: {
            color: "#007bff"
        },
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
    }),
);

const BVFilter: React.FunctionComponent<{ userStore: UserStore }> = ({ userStore }) => {
    const classes = useStyles();
    const [value, setValue] = React.useState('all');
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue((event.target as HTMLInputElement).value);
        userStore.setSexFilter((event.target as HTMLInputElement).value);
    };

    const ageSliderChangeHandler = (event: any, newValue: number | number[]) => {
        userStore.setAgeFilter(newValue as number);
    };

    const itemsSliderChangeHandler = (event: any, newValue: number | number[]) => {
        userStore.itemsAgeFilter(newValue as number);
    };


    const handleCountryChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        userStore.setCountryFilter(event.target.value as string);
    };

    function valuetext(value: number) {
        return `${value}`;
    }

    function clearSelectedImage() {
        userStore.selectedImageId = undefined;
    }

    return (
        <FormControl component="fieldset" className={classes.root} onClick={clearSelectedImage}>
            {/* <FormLabel component="legend">Gender</FormLabel> */}

            <Grid container className={classes.container} justify="center"
                alignItems="center" alignContent="center" direction="row" spacing={2}>
                <Grid item key="sex" md={8}>
                    <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
                        <FormControlLabel value="all" control={<Radio />} label="All" />
                        <FormControlLabel value="f" control={<Radio />} label="Female" />
                        <FormControlLabel value="m" control={<Radio />} label="Male" />
                        {/* <FormControlLabel value="disabled" disabled control={<Radio />} label="(Disabled option)" /> */}
                    </RadioGroup>
                </Grid>
                <Grid item key="age" md={8}>
                    <div className={classes.root}>
                        <Typography id="discrete-slider" gutterBottom>
                            Age
                    </Typography>
                        <Slider
                            onChange={ageSliderChangeHandler}
                            defaultValue={50}
                            getAriaValueText={valuetext}
                            aria-labelledby="discrete-slider"
                            valueLabelDisplay="auto"
                            step={10}
                            marks
                            min={10}
                            max={100}
                            className={classes.slider}
                        />
                    </div>
                </Grid>
                <Grid item key="items" md={8}>
                    <div className={classes.root}>
                        <Typography id="discrete-slider" gutterBottom>
                            Num of items
                    </Typography>
                        <Slider
                            onChange={itemsSliderChangeHandler}
                            defaultValue={50}
                            getAriaValueText={valuetext}
                            aria-labelledby="discrete-slider"
                            valueLabelDisplay="auto"
                            step={10}
                            marks
                            min={10}
                            max={100}
                            className={classes.slider}
                        />
                    </div>
                </Grid>
                <Grid item key="country" md={8} >
                    <Typography id="discrete-slider" gutterBottom>
                        Country
                    </Typography>
                    <Select className={classes.formControl}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={userStore.countryFilter}
                        onChange={handleCountryChange}
                        defaultValue='10'
                    >
                        <MenuItem value={"Any"}>Any</MenuItem>
                        {userStore.countries.map((c: any, i: number) => {
                            return <MenuItem value={c} key={i}>{c}</MenuItem>
                        })}
                    </Select>
                </Grid>
            </Grid>
        </FormControl >
    )
}

const Observed = observer(BVFilter);
const WithStore: React.FunctionComponent = () => {
    const { users } = useStore();
    return (<Observed {...{ userStore: users }}></Observed >);
}

export default observer(WithStore);
