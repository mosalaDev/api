import React from 'react';
import PropTypes from 'prop-types';
import { FormControlLabel, Switch, Typography } from '@material-ui/core';

const CustomSwitch = (props) => {
    const { checked, handleChange, name, label, color } = props;

    return (
        <>
            <FormControlLabel
                control={
                    <Switch
                        checked={checked}
                        onChange={handleChange}
                        name={name}
                        color={color}
                        size="small"
                    />
                }
                style={{ marginLeft: 0 }}
                label={<Typography variant="body2" color="textSecondary">{label}</Typography>}
            />
        </>
    );
};

CustomSwitch.propTypes = {
    checked: PropTypes.bool,
    name: PropTypes.string,
    label: PropTypes.string,
    color: PropTypes.string,
    handleChange: PropTypes.func,
};

CustomSwitch.defaultProps = {
    checked: false,
    name: 'switch',
    label: '',
    color: 'primary'
}

export default CustomSwitch;