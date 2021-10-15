import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Select as MUiSelect, MenuItem, InputBase, withStyles } from '@material-ui/core';

const Select = (props) => {
    const { options, label, id, fullWidth, value, onChange, style, inputStyle, labelProps, error, helperText } = props;
    return (
        <div className="select" style={{ ...style }} >
            {label && <Typography variant="body2" className="label" {...labelProps}>{label}</Typography>}
            <MUiSelect
                id={id}
                fullWidth={fullWidth}
                value={value}
                style={{ marginTop: 10, ...inputStyle }}
                input={<BootstrapInput />}
                onChange={onChange}
                error={error}
            >
                {options.map((option, index) => (
                    <MenuItem
                        style={{ textTransform: 'capitalize' }}
                        value={option.id ? option.id : option.name ? option.name : option}
                        key={`${option.name ? option.name : option}_${index}`}>
                        {option.name ? option.name : option.nom ? option.nom : option.nom_service ? option.nom_service : option}
                    </MenuItem>
                ))}
            </MUiSelect>
            {error && <Typography variant="caption" color="error">{helperText}</Typography>}
        </div>
    )
}

Select.propTypes = {
    options: PropTypes.arrayOf(PropTypes.any),
    label: PropTypes.string,
    id: PropTypes.string,
    fullWidth: PropTypes.bool,
    value: PropTypes.string,
    onChange: PropTypes.func,
    style: PropTypes.object,
    inputStyle: PropTypes.object,
    labelProps: PropTypes.object,
    error: PropTypes.bool,
    helperText: PropTypes.string,
}

const BootstrapInput = withStyles((theme) => ({
    root: {
        'label + &': {
            marginTop: theme.spacing(3),
        },
    },
    input: {
        position: 'relative',
        border: '1px solid #0000003b',
        fontSize: 16,
        padding: '10px 26px 10px 12px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
    },
}))(InputBase);


export default Select;