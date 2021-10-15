const db = require('../../models');
const { Op } = require('sequelize');
const Work = db.travail;
const Spec = db.materiel_spec;
const TravMat = db.travail_materiel;
const TravCat = db.categorie_travail;
const TravCatCat = db.categorie_travail_travail;
const GamTravaux = db.gamme_travaux;
const Mat = db.materiel;
const { update_failed, travail_not_found, travail_name_exist, categorie_travail_not_exist, gamme_not_exist } = require('../errors/errorObjects');

exports.create_travail = async (req, res, next) => {
    try {
        const data = req.body;
        const g = await GamTravaux.findByPk(data.gamme);

        if (!g) {
            return next(gamme_not_exist);
        }

        const t = await findTravailByName(data.nom);

        if (t) {
            if (t.gammeTravauxId === g.id) {
                return next(travail_name_exist);
            }
        }


        const travail = await Work.create({
            nom_travail: data.nom,
            description: data.description,
            objet: data.objet,
            gammeTravauxId: g.id,
        });

        return res.status(201).json(travail);
    } catch (err) {
        next(err);
    }
};

exports.travail_add_categorie = async (req, res, next) => {
    try {
        const t = await Work.findByPk(req.params.travailId);
        if (!t) {
            return res.json(travail_not_found);
        }

        const cat = await TravCat.findByPk(req.body.categorie);
        if (!cat) {
            return res.json(categorie_travail_not_exist);
        }

        const exist = await TravCatCat.findOne({
            where: {
                [Op.and]: {
                    travailId: t.id,
                    categorieTravailId: cat.id
                }
            }
        });

        if (exist) {
            return res.json({
                code: 'travail_category/already_exist',
                message: "Ce travail a déjà cette catégorie.",
                status: 200,
            });
        }

        const tcatcat = await TravCatCat.create({
            travailId: t.id,
            categorieTravailId: cat.id
        });

        return res.json(tcatcat);
    } catch (err) {
        next(err);
    }
};

exports.travail_remove_categorie = async (req, res, next) => {
    try {
        const t = await Work.findByPk(req.params.travailId);
        if (!t) {
            return res.json(travail_not_found);
        }

        const cat = await TravCat.findByPk(req.body.categorie);
        if (!cat) {
            return res.json(categorie_travail_not_exist);
        }

        TravCatCat.destroy({
            where: {
                [Op.and]: [
                    { travailId: t.id },
                    { categorieTravailId: cat.id }
                ]
            }
        }).then(result => {
            if (result === 1) {
                return res.json({
                    result,
                    message: "One record deleted"
                });
            }
            return res.json({
                result,
                message: "No record was deleted"
            });
        });

    } catch (err) {
        next(err);
    }
};

exports.update_travail = async (req, res, next) => {
    try {
        const data = req.body;
        const t = await Work.findByPk(req.params.travailId);

        if (!t) {
            return next(travail_not_found);
        }

        if (data.gammeTravauxId) {
            const g = await GamTravaux.findByPk(data.gammeTravauxId);

            if (!g) {
                return next(gamme_not_exist);
            }
        }

        if (data.categorieTravailId) {
            const cat = await TravCat.findByPk(categorieTravailId);
            if (!cat) {
                return next(categorie_travail_not_exist);
            }
        }

        const update = await Work.update(data, {
            where: {
                id: t.id
            }
        });

        if (update[0] === 1) {
            const travail = await Work.findByPk(t.id);
            return res.json(travail);
        }

        return next(update_failed);

    } catch (err) {
        next(err);
    }
};

exports.get_all = async (req, res, next) => {
    try {
        const response = await Work.findAndCountAll({
            include: [{
                model: GamTravaux,
                as: 'gamme'
            },
            {
                model: TravCat,
                as: 'categories'
            }
            ]
        });

        return res.json({
            count: response.count,
            travaux: response.rows
        });
    } catch (err) {
        next(err);
    }
};

exports.get_by_id = async (req, res, next) => {
    try {
        const t = await Work.findByPk(req.params.travailId, {
            include: [{
                model: GamTravaux,
                as: 'gamme'
            },
            {
                model: TravCat,
                as: 'categories'
            }
            ]
        });

        if (!t) {
            return res.json(travail_not_found);
        }

        return res.json(t);
    } catch (err) {
        next(err);
    }
};

exports.get_by_name = async (req, res, next) => {
    try {
        const travail = await findTravailByName(req.params.travailName, {
            include: [{
                model: GamTravaux,
                as: 'gamme'
            },
            {
                model: TravCat,
                as: 'categories'
            }
            ]
        });

        if (!travail) {
            return res.json(travail_not_found);
        }

        return res.json(travail);
    } catch (err) {
        next(err);
    }
};

exports.get_travail_material = async (req, res, next) => {
    try {
        const t = await Work.findByPk(req.params.travailId);

        if (!t) {
            return next(travail_not_found);
        }

        const mats = await TravMat.findAll({
            where: {
                travailId: s.id
            },
            include: [Work, Spec]
        });

        return res.json(mats);
    } catch (err) {
        next(err);
    }
};

exports.add_travail_material = async (req, res, next) => {
    try {
        const t = await Work.findByPk(req.params.travailId);

        if (!t) {
            return next(travail_not_found);
        }

        const m = await Mat.findByPk(req.params.materielId);

        if (!m) {
            return next(material_not_exist);
        }

        const travaMat = await TravMat.findOne({
            where: {
                [Op.and]: [
                    { panneId: t.id },
                    { materielId: m.id }
                ]
            }
        });

        if (travaMat) {
            return next({
                code: 'travail-material/already_added',
                message: 'Tentative de duplication d\'un enregistrement.',
                status: 200,
            });
        }

        const tM = await TravMat.create({
            travailId: t.id,
            materielId: m.id,
            description: req.body.description,
        });

        return res.json(tM);
    } catch (err) {
        next(err);
    }
};

exports.get_all_travail_material = async (req, res, next) => {
    try {
        const t = await Work.findByPk(req.params.travailId);

        if (!t) {
            return next(travail_not_found);
        }

        const tMs = await TravMat.findAll({
            where: {
                travailId: t.id
            },
            include: [Mat, Work]
        });

        return res.json(tMs);
    } catch (err) {
        next(err);
    }
};

exports.remove_travail_material = async (req, res, next) => {
    try {
        const t = await Panne.findByPk(req.params.travailId);

        if (!t) {
            return next(travail_not_found);
        }

        const m = await Mat.findByPk(req.params.materielId);
        if (!m) {
            return next(material_not_exist);
        }

        TravMat.destroy({
            where: {
                [Op.and]: [
                    { travailId: t.id },
                    { materielId: m.id }
                ]
            }
        }).then(response => {
            if (response === 1) {
                return res.json({
                    response,
                    message: 'One record deleted',
                });
            }

            return res.json({
                response,
                message: 'No record was deleted.'
            });
        })
            .catch(err => next(err));

    } catch (err) {
        next(err);
    }
};

exports.set_travail_categorie = async (req, res, next) => {
    try {
        const works = await Work.findAll();
        const cat = await TravCat.findByPk(req.params.categorieId);
        if (!cat) {
            return res.json(categorie_travail_not_exist);
        }

        const tcatscats = works.map(t => {
            return {
                travailId: t.id,
                categorieTravailId: cat.id
            };
        });

        const saved = await TravCatCat.bulkCreate(tcatscats);

        return res.json(saved);
    } catch (err) {
        next(err);
    }
};


const findTravailByName = async (name) => {
    const t = await Work.findOne({
        where: {
            nom_travail: name
        },
        include: [{
            model: GamTravaux,
            as: 'gamme'
        },
        {
            model: TravCat,
            as: 'categories'
        }
        ]
    });

    return t;
};