const db = require('../../models');
const CatTrav = db.categorie_travail;
const Work = db.travail;
const Serv = db.service;
const { categorie_travail_name_exist, categorie_travail_not_exist, update_failed, service_not_found } = require('../errors/errorObjects');

exports.create_categorie_travail = async (req, res, next) => {
    try {
        const data = req.body;
        const c = await findCatTravByName(data.nom);

        if (c) {
            return next(categorie_travail_name_exist);
        }

        const cat = await CatTrav.create({
            nom: data.nom,
            details: data.details,
        });

        return res.json(cat);
    } catch (err) {
        next(err);
    }
};

exports.update_categorie_travail = async (req, res, next) => {
    try {
        const data = req.body;
        const c = await CatTrav.findByPk(req.params.categorieId);

        if (!c) {
            return next(categorie_travail_not_exist);
        }

        const response = await CatTrav.update(data, {
            where: {
                id: c.id
            }
        });

        if (response[0] === 1) {
            const uCat = await CatTrav.findByPk(c.id);
            return res.json(uCat);
        }

        return res.json(update_failed);

    } catch (err) {
        next(err);
    }
};

exports.get_all = async (req, res, next) => {
    try {
        const cats = await CatTrav.findAll({
            include: [Work]
        });

        return res.json(cats);
    } catch (err) {
        next(err);
    }
};

exports.get_by_id = async (req, res, next) => {
    try {
        const c = await CatTrav.findByPk(req.params.categorieId, {
            include: [Work]
        });

        if (!c) {
            return res.json(categorie_travail_not_exist);
        }

        return res.json(c);
    } catch (err) {
        next(err);
    }
};

exports.get_by_name = async (req, res, next) => {
    try {
        const catTrav = await findCatTravByName(req.params.categorieName, {
            include: [Work]
        });

        if (!catTrav) {
            return res.json(categorie_travail_not_exist);
        }

        return res.json(catTrav);
    } catch (err) {
        next(err);
    }
};

exports.get_categorie_travaux = async (req, res, next) => {
    try {
        const c = await CatTrav.findByPk(req.params.categorieId, {
            include: [Work]
        });


        if (!c) {
            return res.json(categorie_travail_not_exist);
        }

        const works = await c.getTravails();

        return res.json(works);
    } catch (err) {
        next(err);
    }
};

exports.get_categorie_travaux_by_service = async (req, res, next) => {
    try {
        const c = await CatTrav.findByPk(req.params.categorieId, {
            include: [Work]
        });


        if (!c) {
            return res.json(categorie_travail_not_exist);
        }

        const service = await Serv.findByPk(req.params.serviceId);

        if (!service) {
            return res.json(service_not_found);
        }

        const works = (await c.getTravails()).filter(w => w.serviceId === service.id);



        return res.json(works);
    } catch (err) {
        next(err);
    }
};


const findCatTravByName = async (name) => {
    const c = await CatTrav.findOne({
        where: {
            nom: name
        }
    });

    return c;
};