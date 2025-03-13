const { QueryTypes } = require("sequelize");
const { getSequelizeConnection } = require("../db/config");
const defineDfpModel = require("../models/societe/dfp");
const defineLdfpModel = require("../models/societe/ldfp");
const { getDatabaseConnection } = require("../common/commonMethods");

// * récuperer la liste des dévis d'une societé donnée (dbName)

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
      `SELECT NUMBL, DATEBL,libpv, datt,CODECLI,ADRCLI,RSCLI,MTTC,CODEFACTURE,usera,RSREP,codesecteur FROM dfp `,
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

// * récuperer la somme de colonne MTTC pour une societé donnée (dbName)

const getTotalChiffres = async (req, res) => {
  const { dbName } = req.params;
  if (!dbName) {
    return res.status(400).json({
      message: "le nom de la base de donnes est requis",
    });
  }
  try {
    const dynamicSequelize = getSequelizeConnection(dbName);
    const Devis = defineDfpModel(dynamicSequelize);
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

// * récuperer le nombre de dévis genérer pour une societé donnée (dbName)

const getNombreDevis = async (req, res) => {
  const { dbName } = req.params;

  if (!dbName) {
    return res.status(400).json({
      message: "Le nom de la base de données est requis.",
    });
  }

  try {
    const dynamicSequelize = getSequelizeConnection(dbName);
    const Devis = defineDfpModel(dynamicSequelize);

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

// * créer un devis dans une societé donnée (dbName)

const creerDevis = async (req, res) => {
  const { dbName } = req.params;
  const {
    NUMBL,
    libpv,
    ADRCLI,
    CODECLI,
    cp,
    DATEBL,
    MREMISE,
    MTTC,
    comm,
    RSREP,
    CODEREP,
    usera,
    RSCLI,
    codesecteur,
    MHT,
    articles,
  } = req.body.devisInfo;

  console.log("NUMBL reçu:", NUMBL);
  console.log("Code client reçu:", CODECLI);
  console.log("Articles reçus :", articles);
  console.log("CODECLI: ", CODECLI);
  console.log("ADRCLI: ", ADRCLI);

  articles.map((article) => 
  {
    article.NumBL = NUMBL
  })

  try {
    const dbConnection = await getDatabaseConnection(dbName, res);

    const Dfp = defineDfpModel(dbConnection);
    const ldfp = defineLdfpModel(dbConnection);

    const existingDevis = await Dfp.findOne({ where: { NUMBL } });
    if (existingDevis) {
      return res.status(400).json({
        message: `Le devis avec le numéro ${NUMBL} existe déjà.`,
      });
    }

    const dateCreation = new Date();
    const dateFormatte = dateCreation.toISOString().split("T")[0];
    const mlettre = `Devis En Cours -- crée le : ${dateFormatte} / par : ${
      usera || "N/A"
    }`;

    const dfpData = {
      NUMBL,
      libpv,
      ADRCLI,
      CODECLI,
      DATEBL,
      MREMISE,
      MTTC,
      RSREP,
      CODEREP,
      MHT,
      codesecteur,
      cp,
      comm,
      RSCLI,
      MLETTRE: mlettre,
    };

    const devis = await Dfp.create(dfpData);
    articles.map(async (article) => {
      article.NLigne = articles.length
      article.CodeART = article.code;
      const ligneDevis = await ldfp.create(article);
      console.log(ligneDevis);
    })

    return res.status(201).json({
      message: "Devis créé avec succès.",
      devis,
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
//* recupere la ligne d'article
const getLignesDevis = async (req, res) => {
  try {
    const { dbName } = req.params;
    const { NumBL } = req.query;
    console.log(NumBL);
    const dbConnection = await getDatabaseConnection(dbName, res);
    const listeArticle = await dbConnection.query(
      `Select CodeART,Remise,Unite,QteART,DesART,TauxTVA,famille,PUART from ldfp where NumBL = :NumBL`,
      {
        replacements: { NumBL },
        type: dbConnection.QueryTypes.SELECT,
      }
    );

    return res.status(200).json({
      message: "ligne Article regupere avec succe",
      listeArticle: listeArticle,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

// * récuperer la liste de devis créés dans une date spécifique (DATEBL)
// * pour une societé donnée (dbName)

const GetDevisParPeriode = async (req, res) => {
  try {
    const { dbName } = req.params;
    const { DATEBL } = req.query;
    const { codeuser } = req.query;
    const dbConnection = await getDatabaseConnection(dbName, res);

    const devis = await dbConnection.query(
      `select  NUMBL, libpv,ADRCLI, CODECLI, cp, DATEBL, MREMISE, MTTC, comm, RSREP, CODEREP, usera, RSCLI, codesecteur, MHT from dfp where DATE(DATEBL)= :DATEBL and usera = :codeuser`,
      {
        replacements: { DATEBL, codeuser },
        type: dbConnection.QueryTypes.SELECT,
      }
    );
    return res
      .status(200)
      .json({ message: "recupere la periode par devis ", devis: devis });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// * récuperer la liste de devis créés pour un client spécifique (CODECLI)
// * pour une societé donnée (dbName)

const GetDevisListParClient = async (req, res) => {
  try {
    const { dbName } = req.params;
    const { CODECLI } = req.query;
    const { codeuser } = req.query;
    const dbConnection = await getDatabaseConnection(dbName, res);
    const devis = await dbConnection.query(
      `select  NUMBL, libpv,ADRCLI, CODECLI, cp, DATEBL, MREMISE, MTTC, comm, RSREP, CODEREP, usera, RSCLI, codesecteur, MHT from dfp where CODECLI=:CODECLI and usera = :codeuser`,
      {
        replacements: { CODECLI, codeuser },
        type: dbConnection.QueryTypes.SELECT,
      }
    );
    return res
      .status(200)
      .json({ message: "recupere code client par devis ", devis: devis });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// * récuperer la liste des codes de devis (NUMBL)
// * pour une societé donnée (dbName)

const getCodesDevis = async (req, res) => {
  try {
    const { dbName } = req.params;
    const { usera } = req.query;
    const dbConnection = await getDatabaseConnection(dbName, res);
    const listeNUMBL = await dbConnection.query(
      `SELECT NUMBL from dfp where usera = :usera order by CAST(NUMBL AS UNSIGNED) ASC`,
      {
        type: dbConnection.QueryTypes.SELECT,
        replacements: {
          usera: usera,
        },
      }
    );

    return res.status(200).json({
      message: "tout le code devis recupere avec succes",
      listeNUMBL: listeNUMBL,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// * récuperer un devis par son code (NUMBL)
// * pour une societé donnée (dbName)

const getDevisParNUMBL = async (req, res) => {
  try {
    const { dbName } = req.params;
    const { NUMBL } = req.query;
    const { codeuser } = req.query;

    const dbConnection = await getDatabaseConnection(dbName, res);
    console.log(NUMBL, " ", codeuser);
    if (NUMBL && codeuser) {
      // devis selectionné
      const devis = await dbConnection.query(
        `SELECT NUMBL,libpv,ADRCLI, CODECLI, cp, DATEBL, MREMISE, MTTC, comm, RSREP, CODEREP,TIMBRE, usera, RSCLI, codesecteur, MHT from dfp where NUMBL = :NUMBL and usera = :codeuser`,
        {
          replacements: { NUMBL, codeuser },
          type: dbConnection.QueryTypes.SELECT,
        }
      );
      return res
        .status(200)
        .json({ message: "devis recupere avec succes", devis: devis });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// * récuperer l'utilisateur qui a crée un devis à partir
// * de la base des données ErpSole
// * pour une societé donnée
// ! still haven't tested this
const getDevisCreator = async (req, res) => {
  try {
    const { codea } = req.params;
    const dbConnection = getDatabaseConnection("UserErpSole", res);
    const resultat = await dbConnection.query(
      `SELECT * FROM utlisateur u, dfp d where d.codea = u.codeuser`,
      {
        type: QueryTypes.SELECT,
      }
    );

    if (resultat) {
      console.log(resultat);
      return res.status(200).json({ resultat: resultat });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// * récuperer toutes les devis par montant
// * pour une societé donnée (dbName)
const getInfoUtilisateur = async (req, res) => {
  try {
    const { dbName } = req.params;
    const { usera } = req.query;
    console.log(usera);
    const dbConnection = await getDatabaseConnection(dbName, res);
    if (usera) {
      const utilisateur = await dbConnection.query(
        `SELECT NUMBL,libpv,ADRCLI, CODECLI, cp, DATEBL, MREMISE, MTTC, comm, RSREP, CODEREP, usera, RSCLI, codesecteur, MHT from dfp where usera = :usera`,
        {
          replacements: { usera },
          type: dbConnection.QueryTypes.SELECT,
        }
      );
      return res.status(200).json({
        message: "client recupere avec succes ",
        utilisateur: utilisateur,
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const getDevisParMontant = async (req, res) => {
  try {
    const { dbName } = req.params;
    const { montant } = req.query;
    const { codeuser } = req.query;

    const dbConnection = await getDatabaseConnection(dbName, res);
    if (montant) {
      // devis selectionné
      const devis = await dbConnection.query(
        `SELECT NUMBL,libpv,ADRCLI, CODECLI, cp, DATEBL, MREMISE, MTTC, comm, RSREP, CODEREP, usera, RSCLI, codesecteur, MHT from dfp where MTTC = :montant and usera = :codeuser`,
        {
          replacements: { montant, codeuser },
          type: dbConnection.QueryTypes.SELECT,
        }
      );
      return res
        .status(200)
        .json({ message: "devis recupere avec succes", devis: devis });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// * récuperer la liste de points de vente
const getListePointVente = async (req, res) => {
  try {
    const { dbName } = req.params;
    const dbConnection = await getDatabaseConnection(dbName, res);
    const pointsVenteDistincts = await dbConnection.query(
      `SELECT DISTINCT(Libelle) from pointvente`,
      {
        type: dbConnection.QueryTypes.SELECT,
      }
    );

    return res.status(200).json({
      message: "points de vente recupérés avec succès",
      pointsVenteDistincts: pointsVenteDistincts,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getDerniereNumbl = async (req, res) => {
  try {
    const { dbName } = req.params;
    const dbConnection = await getDatabaseConnection(dbName, res);
    const derniereNumbl = await dbConnection.query(
      `SELECT NUMBL from dfp where DateBl = (SELECT MAX(DATEBL) from dfp) ORDER BY (NUMBL) DESC LIMIT 1`,
      {
        type: dbConnection.QueryTypes.SELECT,
      }
    );
    console.log(derniereNumbl[0]);
    // ? derniereNumbl: derniereNumbl[0] || {}
    // ? pour que le backend ne plantera pas si derniereNumbl retourne aucune résultat
    // ? c'est à dire un tableau vide: []
    return res
      .status(200)
      .json({
        message: "dernièr numbl récuperé avec succès",
        derniereNumbl: derniereNumbl[0] || {},
      });
  } catch (error) {
    return res.status(500).json({ messasge: error.message });
  }
};

module.exports = {
  getTousDevis,
  getNombreDevis,
  getTotalChiffres,
  creerDevis,
  getDevisParNUMBL,
  getCodesDevis,
  getDevisParMontant,
  GetDevisListParClient,
  GetDevisParPeriode,
  getListePointVente,
  getInfoUtilisateur,
  getListePointVente,
  getLignesDevis,
  getDevisCreator,
  getDerniereNumbl,
};
