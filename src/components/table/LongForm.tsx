import React from 'react';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
  }),
);

const allCountiesChecked = (resource: any) => counties.reduce((a: boolean, x: any) => (a && !!resource[x]), true);
const noCountiesChecked = (resource: any) => counties.reduce((a: boolean, x: any) => (a && !resource[x]), true);
export const getErrors = (resource: any) => {
    var errors: any = {};
    if (!resource.provider_name) {
        errors.provider_name = 'Name Required';
    }
    if (!resource.resource) {
        errors.resource = 'Resource Type Required';
    }
    if (noCountiesChecked(resource)) {
        errors.counties = 'At least one county must be served';
    }
    return errors;
};

const counties = [
    'alameda',
    'santa_clara',
    'san_mateo',
    'contra_costa',
    'marin',
    'monterey',
    'sonoma',
    'solano',
    'napa',
    'san_francisco',
];

interface LongFormProps {
    resource: any;
    setResource: (resource: any) => void;
    errors: any;
};

export const LongForm = function(props: LongFormProps) {
    const classes = useStyles();
    const { setResource, resource, errors } = props;
    const handleChange = (field: string) => (event: any) => {
        setResource({ ...resource, [field]: event.target.value });
    };
    const handleChecked = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setResource({ ...resource, [field]: event.target.checked });
    };
    const checkAllCounties = (event: React.ChangeEvent<HTMLInputElement>) => {
        const obj = counties.reduce((acc: any, cur: any) => ({...acc, [cur]: event.target.checked}), {});
        console.log(event.target.checked);
        console.log(obj);
        setResource({ ...resource, ...obj });
        console.log(resource);
    };
    return (
        <>
            <TextField
                required
                size="small"
                margin="dense"
                label="Provider Name"
                type="text"
                fullWidth
                error={errors.provider_name}
                value={resource.provider_name}
                onChange={handleChange('provider_name')}
            />
            <TextField
                size="small"
                margin="dense"
                label="Address"
                type="text"
                fullWidth
                value={resource.address}
                onChange={handleChange('address')}
            />
            <FormControl required error={errors.resource} variant="outlined" className={classes.formControl}>
                <InputLabel htmlFor="add-resource-outlined">Resource Type</InputLabel>
                <Select
                    native
                    value={resource.resource}
                    onChange={handleChange('resource')}
                    label="Resource Type"
                    inputProps={{
                        name: 'add-resource',
                        id: 'add-resource-outlined',
                    }}
                >
                    <option aria-label="None" value="" />
                    <option value="meal">Free Meals</option>
                    <option value="grocery">Grocery</option>
                    <option value="core">Core Service Agency (Basic Emergency and Support Services)</option>
                </Select>
            </FormControl>
            <FormControl required error={errors.counties} component="fieldset" className={classes.formControl}>
                <FormLabel component="legend">Counties Served</FormLabel>
                <FormGroup row>
                    <FormControlLabel
                        control={<Checkbox checked={resource.alameda} onChange={handleChecked('alameda')} />}
                        label="Alameda"
                    />
                    <FormControlLabel
                        control={<Checkbox checked={resource.santa_clara} onChange={handleChecked('santa_clara')} />}
                        label="Santa Clara"
                    />
                    <FormControlLabel
                        control={<Checkbox checked={resource.san_mateo} onChange={handleChecked('san_mateo')} />}
                        label="San Mateo"
                    />
                    <FormControlLabel
                        control={<Checkbox checked={resource.contra_costa} onChange={handleChecked('contra_costa')} />}
                        label="Contra Costa"
                    />
                    <FormControlLabel
                        control={<Checkbox checked={resource.marin} onChange={handleChecked('marin')} />}
                        label="Marin"
                    />
                    <FormControlLabel
                        control={<Checkbox checked={resource.monterey} onChange={handleChecked('monterey')} />}
                        label="Monterey"
                    />
                    <FormControlLabel
                        control={<Checkbox checked={resource.sonoma} onChange={handleChecked('sonoma')} />}
                        label="Sonoma"
                    />
                    <FormControlLabel
                        control={<Checkbox checked={resource.solano} onChange={handleChecked('solano')} />}
                        label="Solano"
                    />
                    <FormControlLabel
                        control={<Checkbox checked={resource.napa} onChange={handleChecked('napa')} />}
                        label="Napa"
                    />
                    <FormControlLabel
                        control={<Checkbox checked={resource.san_francisco} onChange={handleChecked('san_francisco')} />}
                        label="San Francisco"
                    />
                </FormGroup>
                <FormControlLabel
                    control={(
                        <Checkbox
                            checked={allCountiesChecked(resource)}
                            indeterminate={!noCountiesChecked(resource) && !allCountiesChecked(resource)}
                            onChange={checkAllCounties}
                        />
                    )}
                    label="All"
                />
            </FormControl>
        </>
    );
}

export default LongForm;
