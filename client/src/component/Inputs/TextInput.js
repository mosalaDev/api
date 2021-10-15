import React from 'react';
import './inputs.css';
import PropTypes from 'prop-types';
import { Typography, TextField } from '@mui/material';

const TextInput = (props) => {
    const {
        label,
        value = "",
        onChange = () => { },
        placeholder,
        multiline,
        rows,
        ref,
        disabled,
        inputRef,
        rowsMax,
        fullWidth,
        style,
        inputStyles,
        error,
        helperText,
        type,
        datatype,
        id,
        name,
        pattern,
        InputProps,
        inputProps,
        variant,
    } = props;
    return (
        <div className="form-input" style={style}>
            {label && <Typography htmlFor={id} variant="body2" className="label" style={{ textAlign: 'start' }} component="label">{label} </Typography>}
            <TextField
                ref={ref}
                inputRef={inputRef}
                multiline={multiline}
                fullWidth={fullWidth}
                InputProps={{ ...InputProps, style: { borderRadius: 0, } }}
                inputProps={inputProps}
                size="small"
                type={type}
                datatype={datatype}
                name={name}
                id={id}
                disabled={disabled}
                placeholder={placeholder}
                variant={variant ? variant : "outlined"}
                style={{ marginTop: 10, ...inputStyles }}
                rowsMax={rowsMax}
                rows={rows}
                value={value}
                onChange={onChange}
                error={error}
                helperText={helperText}
                pattern={pattern}
            />
        </div>
    )
}

TextInput.propTypes = {
    placeholder: PropTypes.string,
    label: PropTypes.string,
    variant: PropTypes.string,
    multiline: PropTypes.bool,
    fullWidth: PropTypes.bool,
    onChange: PropTypes.func,
    value: PropTypes.string,
    rows: PropTypes.number,
    rowsMax: PropTypes.number,
    style: PropTypes.object,
    inputStyles: PropTypes.object,
    error: PropTypes.bool,
    helperText: PropTypes.string,
    type: PropTypes.string,
    datatype: PropTypes.string,
    id: PropTypes.string,
    name: PropTypes.string,
    pattern: PropTypes.any,
    InputProps: PropTypes.object,
    inputProps: PropTypes.object,
    ref: PropTypes.any,
    inputRef: PropTypes.any,
    disabled: PropTypes.bool
}

export default TextInput;
