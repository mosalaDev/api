const db = require('../../models');
const Zone = db.zone;
const { zone_name_exist, zone_not_exist, update_failed } = require('../errors/errorObjects');

exports.create_zone = async (req, res, next) => {
    try {
        const data = req.body;
        const z = await findZoneByName(data.nom);

        if (z) {
            return next(zone_name_exist);
        }

        const zone = await Zone.create({
            nom: data.nom,
            code: data.code,
        });

        return res.json(zone);
    } catch (err) {
        next(err);
    }
};

exports.update_zone = async (req, res, next) => {
    try {
        const data = req.body;
        const z = await Zone.findByPk(req.params.zoneId);

        if (!z) {
            return next(zone_not_exist);
        }

        const zone = await Zone.update(data, {
            where: {
                id: z.id
            }
        });

        if (zone[0] === 1) {
            const uZone = await Zone.findByPk(z.id);
            return res.json(uZone);
        }

        return res.json(update_failed);

    } catch (err) {
        next(err);
    }
};

exports.get_all = async (req, res, next) => {
    try {
        const zones = await Zone.findAll();

        return res.json(zones);
    } catch (err) {
        next(err);
    }
};

exports.get_by_id = async (req, res, next) => {
    try {
        const zone = await Zone.findByPk(req.params.zoneId);

        if (!zone) {
            return res.json(zone_not_exist);
        }

        return res.json(zone);
    } catch (err) {
        next(err);
    }
};

exports.get_by_name = async (req, res, next) => {
    try {
        const zone = await findZoneByName(req.params.zoneName);

        if (!zone) {
            return res.json(zone_not_exist);
        }

        return res.json(zone);
    } catch (err) {
        next(err);
    }
};


const findZoneByName = async (name) => {
    const z = await Zone.findOne({
        where: {
            nom: name
        }
    });

    return z;
};