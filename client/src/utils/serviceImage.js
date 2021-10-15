import electricity from '../assets/electricityIcon.svg';
import carrelage from '../assets/carreaux.svg';
import plumbery from '../assets/plumbery.svg';
import climatisation from '../assets/climatisation.svg';
import fixing from '../assets/fixing.svg';
import montage from '../assets/montage.svg';
import peinture from '../assets/painter.svg';

export const getServiceImage = (name) => {
    switch (name) {
        case 'électricité':
            return electricity;
        case 'plomberie et cuisine':
            return plumbery;
        case 'froid et climatisation':
            return climatisation;
        case 'montage et démontage de meubles':
            return montage;
        case 'Peinture décoration-ébénisterie':
            return peinture;
        case 'carrelage':
            return carrelage;
        case 'fixation d\'objets':
            return fixing;
        default:
            break;
    }
};