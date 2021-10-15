const db = require('../../models');
const Serv = db.service;
const Work = db.travail;
const CatTrav = db.categorie_travail;
const GamTravaux = db.gamme_travaux;
const { update_failed, service_not_found, gamme_name_exist, gamme_not_exist, gamme_not_found } = require('../errors/errorObjects');

exports.create_gamme_travaux = async (req, res, next) => {
    try {
        const data = req.body;

        const s = await Serv.findByPk(data.service);
        if (!s) {
            return next(service_not_found);
        }

        const g = await findGammeByName(data.nom);
        if (g) {
            if (g.serviceId === s.id) {
                return next(gamme_name_exist);
            }
        }

        const gamme = await GamTravaux.create({
            nom: data.nom,
            serviceId: s.id,
        });

        return res.status(201).json(gamme);
    } catch (err) {
        next(err);
    }
};

exports.update_gamme_travaux = async (req, res, next) => {
    try {
        const data = req.body;
        const g = await GamTravaux.findByPk(req.params.gammeId);

        if (!g) {
            return next(gamme_not_exist);
        }

        if (data.serviceId) {
            const s = await Serv.findByPk(data.serviceId);

            if (!s) {
                return next(service_not_found);
            }
        }

        const update = await GamTravaux.update(data, {
            where: {
                id: g.id
            }
        });

        if (update[0] === 1) {
            const gamme = await GamTravaux.findByPk(g.id);
            return res.json(gamme);
        }

        return next(update_failed);

    } catch (err) {
        next(err);
    }
};

exports.get_all = async (req, res, next) => {
    try {
        const response = await GamTravaux.findAll({
            include: [Serv, Work]
        });

        return res.json(response);
    } catch (err) {
        next(err);
    }
};

exports.get_by_id = async (req, res, next) => {
    try {
        const g = await GamTravaux.findByPk(req.params.gammeId, {
            include: [Serv, Work]
        });

        if (!g) {
            return res.json(gamme_not_found);
        }

        return res.json(g);
    } catch (err) {
        next(err);
    }
};

exports.get_by_name = async (req, res, next) => {
    try {
        const gamme = await findGammeByName(req.params.gammeName, {
            include: [Serv, Work]
        });

        if (!gamme) {
            return res.json(gamme_not_found);
        }

        return res.json(gamme);
    } catch (err) {
        next(err);
    }
};

exports.get_gamme_all_travaux = async (req, res, next) => {
    try {
        const g = await GamTravaux.findByPk(req.params.gammeId);

        if (!g) {
            return next(travail_not_found);
        }

        const travaux = await Work.findAll({
            where: {
                gammeTravailId: g.id
            },
            include: [CatTrav]
        });

        return res.json(travaux);
    } catch (err) {
        next(err);
    }
};

const findGammeByName = async (name) => {
    const g = await GamTravaux.findOne({
        where: {
            nom: name
        },
        include: [Serv, Work]
    });

    return g;
};