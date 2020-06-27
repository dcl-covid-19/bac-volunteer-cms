import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import NativeSelect from '@material-ui/core/NativeSelect';

import { SIMPLE_OPTIONS } from 'utils/constants';

const useStyles = makeStyles((theme: Theme) => createStyles({
  select: {
    marginLeft: theme.spacing(1),
    maxWidth: '300px',
  },
}));

export type ResourceType = keyof typeof SIMPLE_OPTIONS.resource | 'all';

interface ResourceTypeDropdownProps {
  resourceType: ResourceType,
  setResourceType: React.Dispatch<React.SetStateAction<ResourceType>>;
}

export const ResourceTypeDropdown: (
  React.FunctionComponent<ResourceTypeDropdownProps>
)= (props) => {
  const classes = useStyles();
  const { resourceType, setResourceType } = props;
  const handleChange = React.useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) =>
        setResourceType(event.target.value as ResourceType),
    [setResourceType],
  );
  return (
    <NativeSelect
      variant="filled"
      value={resourceType}
      onChange={handleChange}
      name="resource_type"
      inputProps={{ 'aria-label': 'resource type' }}
      className={classes.select}
    >
      <option value="all">All Resource</option>
      {Object.keys(SIMPLE_OPTIONS.resource).map(key => (
        <option value={key}>
          {SIMPLE_OPTIONS.resource[(
            key as keyof typeof SIMPLE_OPTIONS.resource
          )]}
        </option>
      ))}
    </NativeSelect>
  )
}

export default ResourceTypeDropdown;
