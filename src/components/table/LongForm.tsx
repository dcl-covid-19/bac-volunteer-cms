import React from 'react';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';

import CompactCheckbox from 'components/common/CompactCheckbox';
import { allFieldsEqualBool, setAllFields } from 'util/Resource';
import * as options from 'constants/Options.json';

const countyNames = options.county;
const counties = Object.keys(countyNames);
const resourceTypes = options.resource;

const makeOptions = (options: any) => Object.keys(options).map(option => (
    <FormControlLabel value={option} control={<Radio />} label={options[option]} key={option} />
));
const makeCheckboxes = (
    resource: any,
    names: any,
    handleChecked: (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => void
) => Object.keys(names).map(field => (
    <FormControlLabel
        control={<CompactCheckbox checked={!!resource[field]} onChange={handleChecked(field)} />}
        label={names[field]}
    />
));

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
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
    const handleChange = (field: string) => (event: any) => {
        setResource({ ...resource, [field]: event.target.value });
    };
    const handleChecked = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setResource({ ...resource, [field]: event.target.checked ? 1 : 0 });
    };
    const checkAllCounties = (event: React.ChangeEvent<HTMLInputElement>) => setAllFields(
        resource,
        setResource,
        counties,
        event.target.checked ? 1 : 0
    );
    return (
        <>
            <FormControl
                required
                error={!!errors.provider_name}
                variant="outlined"
                fullWidth
                className={classes.formControl}
            >
                <InputLabel htmlFor="provider-name">Provider Name</InputLabel>
                <OutlinedInput
                    id="provider-name"
                    value={resource.provider_name || ''}
                    onChange={handleChange('provider_name')}
                    label="Provider Name"
                />
            </FormControl>
            <FormControl variant="outlined" fullWidth className={classes.formControl}>
                <InputLabel htmlFor="address">Address</InputLabel>
                <OutlinedInput
                    id="address"
                    value={resource.address || ''}
                    onChange={handleChange('address')}
                    label="Address"
                />
            </FormControl>
            <FormControl
                component="fieldset"
                required
                error={!!errors.resource}
                fullWidth
                className={classes.formControl}
            >
                <FormLabel component="legend">Resource Type</FormLabel>
                <RadioGroup
                    aria-label="resource-type"
                    name="resource-type"
                    value={resource.resource || ''}
                    onChange={handleChange('resource')}
                >
                    {makeOptions(resourceTypes)}
                </RadioGroup>
            </FormControl>
            <FormControl component="fieldset" required error={!!errors.counties} className={classes.formControl}>
                <FormLabel component="legend">Counties Served</FormLabel>
                <FormGroup row style={{ padding: "5px" }}>
                    {makeCheckboxes(resource, countyNames, handleChecked)}
                </FormGroup>
                <FormControlLabel
                    control={(
                        <CompactCheckbox
                            checked={allFieldsEqualBool(resource, counties, true)}
                            indeterminate={
                                !allFieldsEqualBool(resource, counties, true) &&
                                !allFieldsEqualBool(resource, counties, false)
                            }
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
