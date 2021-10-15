const db = require('../../models');
const Spec = db.materiel_spec;
const Serv = db.service;
const Mat = db.materiel;
const { service_name_exist, update_failed, departement_not_exist, material_not_exist, material_not_found } = require('../errors/errorObjects');

exports.create_material = async (req, res, next) => {
    try {
        const data = req.body;
        const m = await findMaterialByName(data.nom);

        if (m) {
            return next(service_name_exist);
        }

        const d = await Serv.findByPk(data.departement);

        if (!d) {
            return next(departement_not_exist);
        }

        const material = await Mat.create({
            nom_materiel: data.nom,
            quantification: data.quantification,
            departementId: d.id
        });

        return res.status(201).json(material);
    } catch (err) {
        next(err);
    }
};

exports.update_material = async (req, res, next) => {
    try {
        const data = req.body;
        const m = await Mat.findByPk(req.params.materialId);

        if (!m) {
            return next(material_not_exist);
        }

        if (data.departementId) {
            const d = await Serv.findByPk(data.departementId);
            if (!d) {
                return next(departement_not_exist);
            }
        }

        const update = await Mat.update(data, {
            where: {
                id: m.id
            }
        });

        if (update[0] === 1) {
            const material = await Mat.findByPk(m.id);
            return res.json(material);
        }

        return next(update_failed);

    } catch (err) {
        next(err);
    }
};

exports.get_all = async (req, res, next) => {
    try {
        const materials = await Mat.findAll();

        return res.json(materials);
    } catch (err) {
        next(err);
    }
};

exports.get_by_id = async (req, res, next) => {
    try {
        const m = await Mat.findByPk(req.params.materialId);

        if (!m) {
            return res.json(material_not_exist);
        }

        return res.json(m);
    } catch (err) {
        next(err);
    }
};

exports.get_by_name = async (req, res, next) => {
    try {
        const m = await findMaterialByName(req.params.materialName);

        if (!m) {
            return res.json(material_not_exist);
        }

        return res.json(m);
    } catch (err) {
        next(err);
    }
};

exports.get_material_specs = async (req, res, next) => {
    try {
        const m = await Mat.findByPk(req.params.materialId);

        if (!m) {
            return next(material_not_found);
        }

        const specs = await Spec.findAll({
            where: {
                materielId: m.id
            }
        });

        return res.json(specs);
    } catch (err) {
        next(err);
    }
};


const findMaterialByName = async (name) => {
    const m = await Mat.findOne({
        where: {
            nom_materiel: name
        }
    });

    return m;
};