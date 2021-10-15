import 'date-fns';
import React from 'react';
import PropTypes from 'prop-types';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';

const DPicker = (props) => {
    const { selectedDate, setSelectedDate, label, className, fullwidth } = props;

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
                className={className}
                id="date-picker-dialog"
                variant="dialog"
                inputVariant="outlined"
                label={label}
                fullWidth={fullwidth}
                size="small"
                style={{ marginTop: 10, width: '100%' }}
                InputProps={{ style: { borderRadius: 0 } }}
                format="dd/MM/yyyy"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                    'aria-label': 'change date',
                }}
            />
        </MuiPickersUtilsProvider>
    );
}

DPicker.propTypes = {
    selectedDate: PropTypes.any.isRequired,
    setSelectedDate: PropTypes.func.isRequired,
    label: PropTypes.string,
    className: PropTypes.string,
    fullwidth: PropTypes.bool
}

const TPicker = (props) => {
    const { selectedTime, setSelectedTime, label, className } = props;
    const handleTimeChange = (date) => {
        setSelectedTime(date)
    }
    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardTimePicker
                className={className}
                id="time-picker"
                label={label}
                size="small"
                inputVariant="outlined"
                value={selectedTime}
                onChange={handleTimeChange}
                KeyboardButtonProps={{
                    'aria-label': 'change time',
                }}
            />
        </MuiPickersUtilsProvider>
    )
};

TPicker.propTypes = {
    selectedTime: PropTypes.any.isRequired,
    setSelectedTime: PropTypes.func.isRequired,
    label: PropTypes.string,
    className: PropTypes.string,
}


export const TimePicker = TPicker;
export const DatePicker = DPicker;