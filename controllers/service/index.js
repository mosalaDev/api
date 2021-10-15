const db = require('../../models');
const Serv = db.service;
const Mat = db.materiel;
const Work = db.travail;
const CatTrav = db.categorie_travail;
const GamTravaux = db.gamme_travaux;
const { update_failed, service_not_found } = require('../errors/errorObjects');

exports.create_service = async (req, res, next) => {
    try {
        const data = req.body;
        const s = await findServiceByName(data.nom);

        if (s) {
            return next(service_name_exist);
        }

        const serv = await Serv.create({
            nom_service: data.nom,
            nomination: data.nomination,
            chef_service: data.chef,
        });

        return res.status(201).json(serv);
    } catch (err) {
        next(err);
    }
};

exports.update_service = async (req, res, next) => {
    try {
        const data = req.body;
        const s = await Serv.findByPk(req.params.serviceId);

        if (!s) {
            return next(service_not_exist);
        }

        const update = await Serv.update(data, {
            where: {
                id: s.id
            }
        });

        if (update[0] === 1) {
            const serv = await Serv.findByPk(s.id);
            return res.json(serv);
        }

        return res.json(update_failed);

    } catch (err) {
        next(err);
    }
};

exports.get_all = async (req, res, next) => {
    try {
        const response = await Serv.findAndCountAll();

        return res.json({
            count: response.count,
            services: response.rows
        });
    } catch (err) {
        next(err);
    }
};

exports.get_all_with_travail = async (req, res, next) => {
    try {
        const response = await Serv.findAndCountAll({
            include: {
                model: GamTravaux,
                as: 'gamme_travaux',
                include: {
                    model: Work,
                    as: 'travaux',
                    include: {
                        model: CatTrav,
                        as: 'categories'
                    }
                }
            }
        });

        return res.json({
            count: response.count,
            services: response.rows
        });
    } catch (err) {
        next(err);
    }
};

exports.get_by_id = async (req, res, next) => {
    try {
        const serv = await Serv.findByPk(req.params.serviceId, {
            include: [{
                model: GamTravaux,
                as: 'gamme_travaux'
            }]
        });

        if (!serv) {
            return res.json(service_not_exist);
        }

        return res.json(serv);
    } catch (err) {
        next(err);
    }
};

exports.get_by_name = async (req, res, next) => {
    try {
        const serv = await findServiceByName(req.params.serviceName);

        if (!serv) {
            return res.json(service_not_exist);
        }

        return res.json(serv);
    } catch (err) {
        next(err);
    }
};

exports.get_service_materials = async (req, res, next) => {
    try {
        const s = await Serv.findByPk(req.params.serviceId);

        if (!s) {
            return next(service_not_found);
        }

        const materials = await Mat.findAll({
            where: {
                serviceId: d.id,
            }
        });

        return res.json(materials);
    } catch (err) {
        next(err);
    }
};

exports.get_service_works = async (req, res, next) => {
    try {
        const s = await Serv.findByPk(req.params.serviceId);

        if (!s) {
            return next(service_not_found);
        }

        const gammes = await GamTravaux.findAll({
            where: {
                serviceId: s.id
            }
        });

        return res.json(gammes);
    } catch (err) {
        next(err);
    }
};

const findServiceByName = async (name) => {
    const s = await Serv.findOne({
        where: {
            nom_service: name
        },
        include: [{
            model: GamTravaux,
            as: 'gamme_travaux'
        }]
    });

    return s;
};