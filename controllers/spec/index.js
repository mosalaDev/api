const db = require('../../models');
const Mat = db.materiel;
const Spec = db.materiel_spec;
const { service_not_exist, update_failed, service_not_found, panne_name_exist, panne_not_exist, material_not_exist, spec_libele_exist, spec_type_exist, spec_not_exist, spec_libele_not_found, spec_type_not_found } = require('../errors/errorObjects');

exports.create_spec = async (req, res, next) => {
    try {
        const data = req.body;
        let s = await findSpecByLibele(data.libele);

        if (s) {
            return next(spec_libele_exist);
        }

        s = await findSpecByType(data.type_value);

        if (s) {
            return next(spec_type_exist);
        }

        const m = await Mat.findByPk(data.materiel);

        if (!m) {
            return next(material_not_exist);
        }

        const spec = await Spec.create({
            libele: data.libele,
            nom_type: data.nom_type,
            materielId: m.id,
            valeur_type: data.type_value,
            matiere: data.matiere,
            origine: data.origine,
            prix_unitaire: data.pu,
        });

        return res.status(201).json(spec);
    } catch (err) {
        next(err);
    }
};

exports.update_spec = async (req, res, next) => {
    try {
        const data = req.body;
        const s = await Spec.findByPk(req.params.specId);

        if (!s) {
            return next(spec_not_exist);
        }

        if (data.materielId) {
            const m = await Mat.findByPk(data.materielId);
            if (!m) {
                return next(material_not_exist);
            }
        }

        const update = await Spec.update(data, {
            where: {
                id: s.id
            }
        });

        if (update[0] === 1) {
            const spec = await Spec.findByPk(s.id);
            return res.status(201).json(spec);
        }

        return next(update_failed);

    } catch (err) {
        next(err);
    }
};

exports.get_all = async (req, res, next) => {
    try {
        const specs = await Spec.findAll({
            include: Mat
        });

        return res.json(specs);
    } catch (err) {
        next(err);
    }
};

exports.get_by_id = async (req, res, next) => {
    try {
        const s = await Spec.findByPk(req.params.specId, {
            include: Mat
        });

        if (!s) {
            return res.json(spec_not_exist);
        }

        return res.json(s);
    } catch (err) {
        next(err);
    }
};

exports.get_by_libele = async (req, res, next) => {
    try {
        const s = await findSpecByLibele(req.params.libele);

        if (!s) {
            return res.json(spec_libele_not_found);
        }

        return res.json(s);
    } catch (err) {
        next(err);
    }
};

exports.get_by_type = async (req, res, next) => {
    try {
        const s = await findSpecByType(req.params.type);

        if (!s) {
            return res.json(spec_type_not_found);
        }

        return res.json(s);
    } catch (err) {
        next(err);
    }
};


const findSpecByLibele = async (libele) => {
    const s = await Spec.findOne({
        where: {
            libele: libele
        },
        include: Mat
    });

    return s;
};

const findSpecByType = async (type) => {
    const s = await Spec.findOne({
        where: {
            valeur_type: type
        },
        include: Mat
    });

    return s;
};