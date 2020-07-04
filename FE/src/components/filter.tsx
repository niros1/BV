import React from "react"
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Slider, Typography, Theme, createStyles, makeStyles, Grid, InputLabel, Select, MenuItem } from "@material-ui/core"
import { observer } from "mobx-react";
import { useStore } from "../setupContext";
import { ImageStore } from "../store/images";



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
            // minWidth: 120,
        },
    }),
);

const BVFilter: React.FunctionComponent<{ ImageStore: ImageStore }> = ({ ImageStore }) => {
    const classes = useStyles();
    const [value, setValue] = React.useState('all');
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue((event.target as HTMLInputElement).value);
        ImageStore.setSexFilter((event.target as HTMLInputElement).value);
    };

    const ageSliderChangeHandler = (event: any, newValue: number | number[]) => {
        ImageStore.setAgeFilter(newValue as number);
    };

    const itemsSliderChangeHandler = (event: any, newValue: number | number[]) => {
        ImageStore.itemsAgeFilter(newValue as number);
    };


    const handleCountryChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        ImageStore.setCountryFilter(event.target.value as string);
    };

    function valuetext(value: number) {
        return `${value}`;
    }

    function clearSelectedImage() {
        ImageStore.selectedImageId = undefined;
    }

    return (
        <FormControl component="fieldset" className={classes.root} onClick={clearSelectedImage}>
            <Grid container className={classes.container} justify="flex-start"
                alignItems="flex-start" alignContent="stretch" direction="row" spacing={4}>
                <Grid item key="sex" md={3}>
                    <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
                        <FormControlLabel value="all" control={<Radio />} label="All" />
                        <FormControlLabel value="f" control={<Radio />} label="Female" />
                        <FormControlLabel value="m" control={<Radio />} label="Male" />
                    </RadioGroup>
                </Grid>
                <Grid md={6}>
                    <Grid item key="age" md={10}>
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
                    <Grid item key="items" md={10}>
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
                </Grid>
                <Grid item key="country" md={3} >
                    <Typography id="discrete-slider" gutterBottom>
                        Country
                    </Typography>
                    <Select className={classes.formControl}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={ImageStore.countryFilter}
                        onChange={handleCountryChange}
                        defaultValue='10'
                    >
                        <MenuItem value={"Any"}>Any</MenuItem>
                        {ImageStore.countries.map((c: any, i: number) => {
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
    return (<Observed {...{ ImageStore: users }}></Observed >);
}

export default observer(WithStore);
