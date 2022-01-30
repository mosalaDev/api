import moment from 'moment';

export const formatDate = (date) => (new Date(date)).toLocaleDateString('fr');

export const getTime = (date) => {
    const time = moment(date, moment.HTML5_FMT.TIME);
    return time.format('LT').split(' ')[0];
};