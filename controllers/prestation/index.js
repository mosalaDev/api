const db = require('../../models');
const { Op } = require('sequelize');
const { prestation_not_exist, panne_not_exist, spec_not_exist, update_failed, artisan_not_exist } = require('../errors/errorObjects');
const Pres = db.prestation;
const Dem = db.demPrestation;
const Panne = db.panne;
const PresPanne = db.prestationPanne;
const PresMat = db.prestationMaterial;
const Spec = db.spec;
const Art = db.artisan;

exports.create_prestation = async (req, res, next) => {
    try {
        const data = req.body;
        const dem = await Dem.findByPk(data.demande);

        if (!dem) {
            return next(prestation_not_exist);
        }

        const pres = await Pres.create({
            demandePrestationId: dem.id
        });

        return res.json(pres);
    } catch (err) {
        next(err);
    }
};

exports.get_all = async (req, res, next) => {
    try {
        const prestations = await Pres.findAll({
            include: [Panne, Spec]
        });

        return res.json(prestations);
    } catch (err) {
        next(err);
    }
};

exports.get_one = async (req, res, next) => {
    try {
        const pres = await Pres.findByPk(req.params.prestationId, {
            include: [Panne, Spec]
        });

        if (!pres) {
            return next(prestation_not_exist);
        }

        return res.json(pres);
    } catch (err) {
        next(err);
    }
};

exports.affect_artisan = async (req, res, next) => {
    try {
        const pres = await Pres.findByPk(req.params.prestationId);
        if (!pres) {
            return next(prestation_not_exist);
        }

        const artisan = await Art.findByPk(req.body.artisan);

        if (!artisan) {
            return next(artisan_not_exist);
        }

        const update = await Pres.update({ artisanId: artisan.id }, {
            where: {
                id: pres.id
            }
        });
        if (update[0] === 1) {
            const p = await Pres.findByPk(pres.id);
            return res.json(p);
        }

        return next(update_failed);
    } catch (err) {
        next(err);
    }
};

exports.prestation_start = async (req, res, next) => {
    try {
        const pres = await Pres.findByPk(req.params.prestationId);
        if (!pres) {
            return next(prestation_not_exist);
        }

        const { heure_arr } = req.body;
        let update = [0];

        if (!pres.heure_arr) {
            update = await Pres.update({ heure_arr }, {
                where: {
                    id: pres.id
                }
            });
        }

        if (update[0] === 1) {
            const p = await Pres.findByPk(pres.id);
            return res.json(p);
        }

        return next(update_failed);
    } catch (err) {
        next(err);
    }
};

exports.prestation_add_panne = async (req, res, next) => {
    try {
        const pres = await Pres.findByPk(req.params.prestationId);
        if (!pres) {
            return next(prestation_not_exist);
        }

        const panne = await Panne.findByPk(req.body.panne);
        if (!panne) {
            return next(panne_not_exist);
        }

        const pP = await PresPanne.create({
            panneId: panne.id,
            prestationId: pres.id
        });

        return res.json(pP);
    } catch (err) {
        next(err);
    }
};

exports.prestation_add_material = async (req, res, next) => {
    try {
        const pres = await Pres.findByPk(req.params.prestationId);
        if (!pres) {
            return next(prestation_not_exist);
        }

        const spec = await Spec.findByPk(req.body.material);
        if (!spec) {
            return next(spec_not_exist);
        }

        const pM = await PresPanne.create({
            materielSpecId: spec.id,
            prestationId: pres.id
        });

        return res.json(pM);
    } catch (err) {
        next(err);
    }
};

exports.prestation_remove_panne = async (req, res, next) => {
    try {
        const pres = await Pres.findByPk(req.params.prestationId);
        if (!pres) {
            return next(prestation_not_exist);
        }

        const panne = await Panne.findByPk(req.params.panneId);
        if (!panne) {
            return next(panne_not_exist);
        }

        const result = await PresPanne.destroy({
            where: {
                [Op.and]: [
                    { prestatioId: pres.id },
                    { panneId: panne.id }
                ]
            }
        });

        return res.json(result);
    } catch (err) {
        next(err);
    }
};

exports.prestation_remove_material = async (req, res, next) => {
    try {
        const pres = await Pres.findByPk(req.params.prestationId);
        if (!pres) {
            return next(prestation_not_exist);
        }

        const spec = await Spec.findByPk(req.params.materialId);
        if (!spec) {
            return next(spec_not_exist);
        }

        const result = await PresMat.destroy({
            where: {
                [Op.and]: [
                    { prestatioId: pres.id },
                    { panneId: panne.id }
                ]
            }
        });

        return res.json(result);
    } catch (err) {
        next(err);
    }
};

exports.prestation_devis = async (req, res, next) => {
    try {
        const pres = await Pres.findByPk(req.params.prestationId);
        if (!pres) {
            return next(prestation_not_exist);
        }

        const pannes = await PresPanne.findAll({
            where: {
                prestationId: pres.id
            },
            include: Panne
        });

        const mats = await PresMat.findAll({
            where: {
                prestationId: pres.id,
            },
            include: Spec
        });

        return res.json({
            materiels: mats,
            travaux: pannes
        });
    } catch (err) {
        next(err);
    }
};



