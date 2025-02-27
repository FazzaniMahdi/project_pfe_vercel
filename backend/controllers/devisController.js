const { Sequelize, QueryTypes } = require("sequelize");
const defineClientModel = require("../models/client");
const defineDevisModel = require("../models/Devis");
const { getSequelizeConnection } = require("../db/config");

const jwt = require("jsonwebtoken");
const defineArticleModel = require("../models/article");

const defineDfpModel = require("../models/Dfp");

const defineLdfpModel = require("../models/Ldfp ");
const { getDatabaseConnection } = require("../common/commonMethods");

const getTousDevis = async (req, res) => {
  const { dbName } = req.params;

  if (!dbName) {
    return res.status(400).json({
      message: "Le nom de la base de données est requis.",
    });
  }

  try {
    const dynamicSequelize = getSequelizeConnection(dbName);
    await dynamicSequelize.authenticate();
    console.log(`Connecté à la base de données : ${dbName}`);

    const result = await dynamicSequelize.query(
      `SELECT NUMBL, libpv, datt,CODECLI,ADRCLI,RSCLI,MTTC FROM dfp `,
      { type: QueryTypes.SELECT }
    );

    if (result.length === 0) {
      return res.status(404).json({
        message: "Aucun devis trouvé.",
      });
    }

    return res.status(200).json({
      message: "Devis trouvés avec succès",
      devisList: result,
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des devis :", error.message);
    return res.status(500).json({
      message: "Erreur lors de la récupération des devis.",
      error: error.message,
    });
  }
};
const getTotalChifre = async (req, res) => {
  const { dbName } = req.params;
  if (!dbName) {
    return res.status(400).json({
      message: "le nom de la base de donnes est requis",

    });
  }
  try {
    const dynamicSequelize = getSequelizeConnection(dbName);
    const Devis = defineDevisModel(dynamicSequelize);
    const totalchifre = await Devis.sum("MTTC");
    return res.status(200).json({
      message: "Total de chifre  de devis récupéré avec succès.",
      totalchifre: totalchifre,
    });
  } catch (error) {
    console.error(
      "Erreur lors de la récupération du total de chifre  de devis :",
      error.message
    );
    return res.status(500).json({
      message: "Erreur lors de la récupération du total de chifre de devis.",
      error: error.message,
    });
  }
};



const getNombreDevis = async (req, res) => {
  const { dbName } = req.params;

  if (!dbName) {
    return res.status(400).json({
      message: "Le nom de la base de données est requis.",
    });
  }

  try {
    const dynamicSequelize = getSequelizeConnection(dbName);
    const Devis = defineDevisModel(dynamicSequelize);

    const devisCount = await Devis.count({
      distinct: true,
      col: "NUMBL",
    });

    console.log(
      "Total des devis (distinct NUMBL) avec Sequelize : ",
      devisCount
    );

    return res.status(200).json({
      message: "Total des devis récupéré avec succès.",
      totalDevis: devisCount,
    });
  } catch (error) {
    console.error(
      "Erreur lors de la récupération du total des devis :",
      error.message
    );
    return res.status(500).json({
      message: "Erreur lors de la récupération du total des devis.",
      error: error.message,
    });
  }
};
const creerDevis = async (req, res) => {
  console.log(req);

  const { dbName } = req.params;
  const {
    NUMBL,
    libpv,
    adresse,
    code,
    cp,
    DATEBL,
    MREMISE,
    MTTC,
    comm,
    RSREP,
    CODEREP,
    usera,
    rsoc,
    codesecteur,
    MHT,
    articles,
  } = req.body.devisInfo;

  console.log("NUMBL reçu:", NUMBL);
  console.log("Code client reçu:", code);
  console.log("Articles reçus :", articles);

  if (!NUMBL || NUMBL.trim() === "") {
    return res.status(400).json({ message: "Le champ NUMBL est manquant." });
  }
  if (!code || code.trim() === "") {
    return res.status(400).json({ message: "Le code client est manquant." });
  }
  if (!adresse || adresse.trim() === "") {
    return res
      .status(400)
      .json({ message: "L'adresse du client est manquante ou vide." });
  }
  if (!Array.isArray(articles)) {
    return res
      .status(400)
      .json({ message: "Le champ 'articles' doit être un tableau." });
  }

  try {
    const dynamicSequelize = getSequelizeConnection(dbName);
    await dynamicSequelize.authenticate();

    const Dfp = defineDfpModel(dynamicSequelize);
    const Ldfp = defineLdfpModel(dynamicSequelize);
    const Client = defineClientModel(dynamicSequelize);

    const existingDevis = await Dfp.findOne({ where: { NUMBL } });
    if (existingDevis) {
      return res.status(400).json({
        message: `Le devis avec le numéro ${NUMBL} existe déjà.`,
      });
    }

    const client = await Client.findOne({ where: { code } });
    if (!client) {
      return res.status(404).json({ message: "Client non trouvé." });
    }

    console.log("Données du client récupérées :", client);

    const clientAdresse =
      client.adresse && client.adresse.trim() !== "" ? client.adresse : adresse;

    if (!clientAdresse || clientAdresse.trim() === "") {
      return res.status(400).json({
        message:
          "L'adresse du client est manquante ou vide même après vérification.",
      });
    }

    const transaction = await dynamicSequelize.transaction();

    const creationDate = new Date();
    const formattedDate = creationDate.toISOString().split("T")[0];
    const mlettre = `Devis En Cours -- crée le : ${formattedDate} / par : ${
      usera || "N/A"
    }`;

    const dfpData = {
      NUMBL,
      libpv,
      ADRCLI: clientAdresse,
      CODECLI: client.code,
      DATEBL,
      MREMISE,
      MTTC,
      RSREP,
      CODEREP,
      MHT,
      codesecteur,
      CP: client.cp,
      comm,
      RSCLI: client.rsoc,
      MLETTRE: mlettre,
    };

    const devis = await Dfp.create(dfpData, { transaction });

    const insertedArticles = [];

    for (const article of articles) {
      if (
        !article.code ||
        !article.libelle ||
        !article.nbrunite ||
        !article.prix1 ||
        !article.tauxtva
      ) {
        await transaction.rollback();
        return res.status(400).json({
          message:
            "Tous les champs nécessaires pour l'article doivent être fournis.",
        });
      }

      const articleData = {
        NUMBL,
        CodeART: article.code,
        DesART: article.libelle,
        QteART: article.nbrunite,
        PUART: article.prix1,

        TauxTVA: article.tauxtva,
        Unite: article.unite || "unité",
        Conf: article.CONFIG || "",
        famille: article.famille || "",
        nbun: article.nbrunite,
      };

      const insertedArticle = await Ldfp.create(articleData, { transaction });
      insertedArticles.push(insertedArticle);
    }

    await transaction.commit();

    return res.status(201).json({
      message: "Devis créé avec succès.",
      devis,
      articles: insertedArticles,
      mlettre,
    });
  } catch (error) {
    console.error("Erreur lors de la création du devis :", error);
    return res.status(500).json({
      message: "Erreur lors de la création du devis.",
      error: error.errors ? error.errors : error.message,
    });
  }
};

const getDevisCreator = async(req, res) => {
  const dbConnection = getDatabaseConnection("UserErpSole", res);
  const result = await dbConnection.query(
    `SELECT  FROM utlisateur `,
    { type: QueryTypes.SELECT }
  );

  if(result) {
    return res.status(200).json({result})
  }
}

module.exports = {
  getTousDevis,
  getNombreDevis,
  getTotalChifre,
  creerDevis
}