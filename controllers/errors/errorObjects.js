/**
 * Default errors
 */
exports.not_found = {
    code: 'route/not_found',
    message: 'Not Found',
    status: 404,
};

exports.server_error = {
    code: 'server/server_error',
    message: 'Erreur de serveur.',
    status: 500,
};

exports.update_failed = {
    code: 'update_failed',
    message: 'Echec de la mise à jour.',
    status: 200,
};

/**
 * zone errors
 */
exports.zone_not_found = {
    code: 'zone/not_found',
    message: 'Aucune zone trouvée.',
    status: 404,
};

exports.zone_name_exist = {
    code: 'zone/name_exist',
    message: 'Le nom de zone existe déjà.',
    status: 200,
};

exports.zone_not_exist = {
    code: 'zone/not_exist',
    message: 'Aucune zone ne correspond.',
    status: 404,
};

/**
 * categorie travail errors
 */
exports.categorie_travail_not_found = {
    code: 'categorie_travail/not_found',
    message: 'Aucune catégorie de travail trouvée.',
    status: 404,
};

exports.categorie_travail_name_exist = {
    code: 'categorie_travail/name_exist',
    message: 'Le nom de la catégorie existe déjà.',
    status: 200,
};

exports.categorie_travail_not_exist = {
    code: 'categorie_travail/not_exist',
    message: 'Aucune catégorie de travail ne correspond.',
    status: 404,
};

/**
 * Department errors
 */
exports.travail_not_found = {
    code: 'travail/not_found',
    message: 'Aucun travail trouvé.',
    status: 404,
};

exports.travail_name_exist = {
    code: 'travail/name_exist',
    message: 'Le nom du travail existe déjà.',
    status: 200,
};

exports.departement_not_exist = {
    code: 'departement/not_exist',
    message: 'Aucun departement ne correspond.',
    status: 404,
};

/**
 * Service errors
 */
exports.service_not_found = {
    code: 'service/not_found',
    message: 'Aucun service trouvé.',
    status: 404,
};

exports.service_name_exist = {
    code: 'service/name_exist',
    message: 'Le nom de service existe déjà.',
    status: 200,
};

exports.service_not_exist = {
    code: 'service/not_exist',
    message: 'Aucun service ne correspond.',
    status: 404,
};

/**
 * gamme des travaux errors
 */
exports.gamme_not_found = {
    code: 'gamme_travaux/not_found',
    message: 'Aucune gamme des travaux trouvée.',
    status: 404,
};

exports.gamme_name_exist = {
    code: 'gamme_travaux/name_exist',
    message: 'Le nom de la gamme des travaux existe déjà.',
    status: 304,
};

exports.gamme_not_exist = {
    code: 'gamme_travaux/not_exist',
    message: 'Aucune gamme des travaux ne correspond.',
    status: 404,
};

/**
 * Material errors
 */
exports.material_not_found = {
    code: 'material/not_found',
    message: 'Aucun materiel trouvé.',
    status: 404,
};

exports.material_name_exist = {
    code: 'material/name_exist',
    message: 'Le nom du materiel existe déjà.',
    status: 200,
};

exports.material_not_exist = {
    code: 'material/not_exist',
    message: 'Aucun materiel ne correspond.',
    status: 404,
};

/**
 * Spec errors
 */
exports.spec_libele_not_found = {
    code: 'spec/libele_not_found',
    message: 'Aucun type materiel trouvé.',
    status: 404,
};

exports.spec_type_not_found = {
    code: 'spec/type_not_found',
    message: 'Aucun type materiel trouvé.',
    status: 404,
};

exports.spec_type_exist = {
    code: 'spec/type_exist',
    message: 'Le type materiel existe déjà.',
    status: 200,
};

exports.spec_libele_exist = {
    code: 'spec/libele_exist',
    message: 'Le libelé du type materiel existe déjà.',
    status: 200,
};

exports.spec_not_exist = {
    code: 'spec/not_exist',
    message: 'Aucun type materiel ne correspond.',
    status: 404,
};

/**
 * User errors
 */

exports.user_username_exist = {
    code: 'user/user_name_exist',
    message: 'Le numéro de téléphone saisi a déjà un compte.',
    status: 200,
};

exports.user_not_exist = {
    code: 'user/user_not_found',
    message: 'Aucun utilisateur ne correspond.',
    status: 404
};


/**
 * Artisan errors
 */

exports.artisan_exist = {
    code: 'artisan/user_artisan_exist',
    message: 'L\'utilisateur a déjà un compte artisan.',
    status: 200,
};

exports.artisan_not_exist = {
    code: 'artisan/user_not_found',
    message: 'Aucun artisan ne correspond.',
    status: 404
};

/**
 * Prestation errors
 */

exports.prestation_not_exist = {
    code: 'prestation/prestation_not_found',
    message: 'Aucune prestation ne correspond.',
    status: 404
};

/**
 * Demande devis errors
 */

exports.demande_devis_not_exist = {
    code: 'devis/demande_devis_not_found',
    message: 'Aucune demande de devis ne correspond.',
    status: 404
};

/**
 * Reservation errors
 */

exports.reservation_not_found = {
    code: 'reservation/reservation_not_found',
    message: 'Aucune reservation ne correspond.',
    status: 404
};


/**
 * Auth errors
 */
exports.user_unauthenticated = {
    code: 'user/user_unauth',
    message: 'Aucun utilisateur connecté.',
    status: 200
};
