import React from 'react';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';

import CompactCheckbox from 'components/common/CompactCheckbox';
import * as options from 'constants/options.json';

const counties = options.county;
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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
  }),
);

interface LongFormProps {
    resource: any;
    setResource: (resource: any) => void;
    errors: any;
};

export const LongForm = function(props: LongFormProps) {
    const classes = useStyles();
    const { setResource, resource, errors } = props;
    console.log(resource);
    const handleChange = (field: string) => (event: any) => {
        setResource({ ...resource, [field]: event.target.value });
    };
    const handleChecked = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setResource({ ...resource, [field]: event.target.checked });
    };
    const checkAllCounties = (event: React.ChangeEvent<HTMLInputElement>) => {
        const obj = counties.reduce((acc: any, cur: any) => ({...acc, [cur]: event.target.checked}), {});
        setResource({ ...resource, ...obj });
    };
    return (
        <>
            <FormControl required error={errors.provider_name} className={classes.formControl}>
                <InputLabel htmlFor="provider-name">Provider Name</InputLabel>
                <Input
                    id="provider-name"
                    value={resource.provider_name}
                    onChange={handleChange('provider_name')}
                />
            </FormControl>
            <TextField
                size="small"
                margin="dense"
                label="Address"
                type="text"
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
            <FormControl required error={errors.counties} className={classes.formControl}>
                <FormLabel component="legend">Counties Served</FormLabel>
                <FormGroup row style={{ padding: "5px" }}>
                    <FormControlLabel
                        control={<CompactCheckbox checked={resource.alameda} onChange={handleChecked('alameda')} />}
                        label="Alameda"
                    />
                    <FormControlLabel
                        control={<CompactCheckbox checked={resource.santa_clara} onChange={handleChecked('santa_clara')} />}
                        label="Santa Clara"
                    />
                    <FormControlLabel
                        control={<CompactCheckbox checked={resource.san_mateo} onChange={handleChecked('san_mateo')} />}
                        label="San Mateo"
                    />
                    <FormControlLabel
                        control={<CompactCheckbox checked={resource.contra_costa} onChange={handleChecked('contra_costa')} />}
                        label="Contra Costa"
                    />
                    <FormControlLabel
                        control={<CompactCheckbox checked={resource.marin} onChange={handleChecked('marin')} />}
                        label="Marin"
                    />
                    <FormControlLabel
                        control={<CompactCheckbox checked={resource.monterey} onChange={handleChecked('monterey')} />}
                        label="Monterey"
                    />
                    <FormControlLabel
                        control={<CompactCheckbox checked={resource.sonoma} onChange={handleChecked('sonoma')} />}
                        label="Sonoma"
                    />
                    <FormControlLabel
                        control={<CompactCheckbox checked={resource.solano} onChange={handleChecked('solano')} />}
                        label="Solano"
                    />
                    <FormControlLabel
                        control={<CompactCheckbox checked={resource.napa} onChange={handleChecked('napa')} />}
                        label="Napa"
                    />
                    <FormControlLabel
                        control={<CompactCheckbox checked={resource.san_francisco} onChange={handleChecked('san_francisco')} />}
                        label="San Francisco"
                    />
                </FormGroup>
                <FormControlLabel
                    control={(
                        <CompactCheckbox
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
