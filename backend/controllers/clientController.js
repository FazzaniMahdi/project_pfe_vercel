const defineClientModel = require("../models/societe/client");
const {
  getDatabaseConnection,
  verifyTokenValidity,
} = require("../common/commonMethods");

// * récupèrer la liste des clients à partir de la base des données
// * dbName donnée comme paramètre de requete

const getListeClients = async (req, res) => {
  const { dbName } = req.params;
  try {
    //const decoded = verifyTokenValidity(req, res);
    const dbConnection = await getDatabaseConnection(dbName, res);

    const result = await dbConnection.query(`select * from client`, {
      type: dbConnection.QueryTypes.SELECT,
    });

    return res.status(200).json({
      message: "liste client recupere",
      result,
    });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

// * retourner une liste des clients filtrée, selon le table
// * filters données par le client
const filtrerListeClients = async (req, res) => {
  const { dbName } = req.params;
  const { filters } = req.query;

  const dbConnection = await getDatabaseConnection(dbName, res);
  // ? liste des conditions
  // ? exemple : ["NUML like :numbl, "libpv like :libpv"...]
  let whereClauses = [];
  // ? object contenant les noms des paramètres de requete sql avec leurs remplacements
  // ? exemple : {{numbl: %dv2401%}, {libpv: %kasserine% }}
  let replacements = {};

  // ? ajout de chaque condition quand la valeur n'est pas vide
  if (filters.code) {
    whereClauses.push("code like :code");
    replacements.code = `%${filters.code}%`;
  }
  if (filters.Matricule) {
    whereClauses.push("Matricule like :Matricule");
    replacements.Matricule = `%${filters.Matricule}%`;
  }
  if (filters.telephone) {
    whereClauses.push("telephone like :telephone");
    replacements.telephone = `%${filters.telephone}%`;
  }
  if (filters.fax) {
    whereClauses.push("fax like :fax");
    replacements.fax = `%${filters.fax}%`;
  }
  if (filters.rsoc) {
    whereClauses.push("rsoc like :rsoc");
    replacements.rsoc = `%${filters.rsoc}%`;
  }
  if (filters.desrep) {
    whereClauses.push("desrep like :desrep");
    replacements.desrep = `%${filters.desrep}%`;
  }

  // ? concatenation de l'opérateur logique après chaque ajout d'un nouvelle condition
  let whereCondition = whereClauses.join(" AND ");

  // ? Si on on a aucune condition on effectue une requete de select * from dfp
  let query = `SELECT code, rsoc, desrep, fax, telephone, Matricule
     FROM client 
      ${whereCondition ? "WHERE " + whereCondition : ""}`;

  const result = await dbConnection.query(query, {
    replacements: replacements,
    type: dbConnection.QueryTypes.SELECT,
  });

  return res.status(200).json({
    message: "Filtrage réussi",
    data: result,
  });
};

// * Inserer les informations d'un client clientInfos
// * dans la base des données dbName donnée comme paramètre de requete

const AjouterClient = async (req, res) => {
  const { dbName } = req.params;
  const { clientInfos } = req.body;
  
  try {
    const dbConnection = await getDatabaseConnection(dbName, res);
    const Client = defineClientModel(dbConnection);
    const newClient = await Client.create({
      //add + save min base 3ibrt 3ml insert into mn base de donnes
      code: clientInfos.code,
      typecli: clientInfos.typecli, // ! select à vérifier
      cin: clientInfos.cin,
      rsoc: clientInfos.rsoc,
      adresse: clientInfos.adresse,
      activite: clientInfos.activite,
      cp: clientInfos.cp,
      desicp: clientInfos.desicp,
      nature: clientInfos.nature, // !
      desisec: clientInfos.desisec, // !
      desireg: clientInfos.desireg, // ! dans la base: desireg, dans clientInfos : desirgg
      tel1:clientInfos.tel1,
      tel2:clientInfos.tel2,
      email: clientInfos.email,
      fax: clientInfos.fax,
      nom1: clientInfos.nom1,
      nom2: clientInfos.nom2,
      nom3: clientInfos.nom3,
      titre1: clientInfos.titre1,
      titre2: clientInfos.titre2,
      titre3: clientInfos.titre3,
      gsm1: clientInfos.gsm1,
      gsm2: clientInfos.gsm2,
      gsm3: clientInfos.gsm3,
      nposte1: clientInfos.nposte1,
      nposte2: clientInfos.nposte2,
      nposte3: clientInfos.nposte3,
      Commentaire: clientInfos.Commentaire,
      usera: clientInfos.usera, // ! 
      fact: clientInfos.fact, // ! checkbox à vérifier
      timbref: clientInfos.timbref, // ! checkbox à vérifier
      cltexport: clientInfos.cltexport, // ! checkbox à vérifier
      suspfodec: clientInfos.suspfodec, // ! checkbox à vérifier
      regime: clientInfos.regime, // ! checkbox à vérifier
      exon: clientInfos.exon, // ! checkbox à vérifier
      majotva: clientInfos.majotva, // ! checkbox à vérifier
      fidel: clientInfos.fidel, // ! checkbox à vérifier
      datefinaut: clientInfos.datefinaut,
      datedebaut: clientInfos.datedebaut,
      decision: clientInfos.decision,
      matriculef: clientInfos.matriculef,
      reference: clientInfos.reference,
      srisque: clientInfos.srisque,
      scredit: clientInfos.scredit,
      remise: clientInfos.remise,
      compteb : clientInfos.compteb, // !
      banque:clientInfos.banque,
      contrat:clientInfos.contrat,
      blockage:clientInfos.blockage,
      susptva:clientInfos.susptva,
      tarif:clientInfos.tarif,
      desireg:clientInfos.desireg
      
    });

    return res.status(200).json({ message: "insertion avec succès" });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

// * supprimer un client ou plusieurs clients par leurs codes
// * qui se trouvent dans le tableau clients envoyé par le client
// * de la base des données dbName donnée comme paramètre de requete

const supprimerClient = async (req, res) => {
  const { dbName } = req.params;
  // ? tableau contenant les codes des clients à supprimer
  const { code } = req.params;
  try {
    const dbConnection = await getDatabaseConnection(dbName, res);
    const Client = defineClientModel(dbConnection);

    await Client.destroy({ where: { code: code } });

    return res
      .status(200)
      .json({ message: "client(s) supprimé(s) avec succès" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "un erreur est survenu lors de suppression de client" });
  }
};

// * récupere un client à partir de la base des données
// * dbName donnée comme paramètre de requete
// * par son code, aussi donnée comme paramètre de requete

const getClientParCode = async (req, res) => {
  const { dbName } = req.params;
  const { code } = req.params;
  try {
    const dbConnection = await getDatabaseConnection(dbName, res);
    const client = await dbConnection.query(
      `select * from client where code = :code`,
      {
        type: dbConnection.QueryTypes.SELECT,
        replacements: {
          code,
        },
      }
    );
    console.log(client);
    if (client) return res.status(200).json({ client });

    return res.status(404).json({ message: "Client introuvable" });
  } catch (error) {
    return res.status(500).json({
      message: "Une erreur est survenue lors de la récupération du client.",
      error,
    }); // Correct French
  }
};

// * mettre à jour un client d'une societé donnée comme paramètre de requete (dbName)
// ! AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
const majClient = async (req, res) => {
  const { dbName } = req.params;
  const { clientUpdate } = req.body;

  try {
    const dbConnection = await getDatabaseConnection(dbName, res);
    const Client = defineClientModel(dbConnection);
    const client = await Client.findOne({ where: { code: clientUpdate.code } });

    if (client) {
      await Client.update(
        {
          code: clientUpdate.code,
          typecli: clientUpdate.typecli, // add this to the model
          cin: clientUpdate.cin, // add this to model
          email: clientUpdate.email,
          rsoc: clientUpdate.rsoc,
          cp: clientUpdate.cp,
          telephone: clientUpdate.telephone,
          desrep: clientUpdate.desrep,
          adresse: clientUpdate.adresse,
          aval2: clientUpdate.aval2,
          aval1: clientUpdate.aval1,
          Commentaire: clientUpdate.Commentaire,
          datemaj: clientUpdate.datemaj,
          userm: clientUpdate.userm,
          usera: clientUpdate.usera,
          fact: clientUpdate.fact,
          timbref: clientUpdate.timbref,
          cltexport: clientUpdate.cltexport,
          suspfodec: clientUpdate.suspfodec,
          regime: clientUpdate.regime,
          exon: clientUpdate.exon,
          majotva: clientUpdate.majotva,
          fidel: clientUpdate.fidel,
          datefinaut: clientUpdate.datefinaut,
          datedebaut: clientUpdate.datedebaut,
          decision: clientUpdate.decision,
          matriculef: clientUpdate.matriculef,
          reference: clientUpdate.reference,
          srisque: clientUpdate.srisque,
          scredit: clientUpdate.scredit,
          delregBL: clientUpdate.delregBL,
          delregFT: clientUpdate.delregFT,
          delregFC: clientUpdate.delregFC,
          remise: clientUpdate.remise,
          activite: clientUpdate.activite,
        },
        { where: { code: clientUpdate.code } }
      );
      return res
        .status(200)
        .json({ message: "Client mise à jour avec succès" });
    }
  } catch (error) {
    return res.status(500).json({
      message: "un erreur est survenu lors de mise à jour de client ",
      error: error.message,
    });
  }
};

// * récupere la liste de codes de clients
const getToutCodesClient = async (req, res) => {
  try {
    const { dbName } = req.params;
    const dbConnection = await getDatabaseConnection(dbName, res);

    const listeCodesClients = await dbConnection.query(
      `SELECT code FROM client ORDER BY code`,
      {
        type: dbConnection.QueryTypes.SELECT,
      }
    );

    return res.status(200).json({
      message: "Code client récupéré avec succès",
      listeCodesClients: listeCodesClients,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const getClientParTypecli = async (req, res) => {
  try {
    const { dbName } = req.params;
    const { typecli } = req.query;
    const dbConnection = await getDatabaseConnection(dbName, res);
    const client = await dbConnection.query(
      `SELECT * FROM CLIENT where typecli = :typecli`,
      {
        type: dbConnection.QueryTypes.SELECT,
        replacements: {
          typecli,
        },
      }
    );
    console.log(client);

    return res
      .status(200)
      .json({ message: "type client  récuperé avec succès", clients: client });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const getClientParCin = async (req, res) => {
  try {
    const { dbName } = req.params;
    const { cin } = req.params;
    const dbConnection = await getDatabaseConnection(dbName, res);
    const client = await dbConnection.query(
      `SELECT * FROM CLIENT where cin = :cin`,
      {
        type: dbConnection.QueryTypes.SELECT,
        replacements: {
          cin: cin,
        },
      }
    );

    return res
      .status(200)
      .json({ message: "client récuperé avec succès", client: client });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getDerniereCodeClient = async (req, res) => {
  try {
    const { dbName } = req.params;
    const dbConnection = await getDatabaseConnection(dbName, res);
    const derniereCodeClient = await dbConnection.query(
      `SELECT code FROM CLIENT ORDER BY CAST(code AS UNSIGNED) DESC LIMIT 1`,
      {
        type: dbConnection.QueryTypes.SELECT,
      }
    );

    return res.status(200).json({
      message: "dernière code client récuperé avec succès",
      derniereCodeClient: derniereCodeClient[0],
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
//* récuperer la liste de codes posteaux
// * example:
// * input : 
// * output : liste de codes posteaux
const getListeCodesSecteur = async (req, res) => {
  const { dbName } = req.params;
  try {
    const dbConnection = await getDatabaseConnection(dbName, res);
    const listeCodesSecteurs = await dbConnection.query(
      `SELECT codesec from secteur`,
      {
        type: dbConnection.QueryTypes.SELECT,
      }
    )

    return res.status(200).json({message: "liste de codes secteurs récuperée avec succès", listeCodesSecteurs});
  }catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

//* récuperer la désignation d'un secteur par son code
// * example:
// * input : 002
// * output : SHZ
const getDesignationSecteurparCodeSecteur = async (req, res) => {
  const { dbName, codesecteur } = req.params;
  console.log(dbName, " ", codesecteur);
  try {
    const dbConnection = await getDatabaseConnection(dbName, res);
    const secteurInfo = await dbConnection.query(
      `Select codesec, desisec from secteur where codesec = :codesecteur `,
      {
        type: dbConnection.QueryTypes.SELECT,
        replacements: {
          codesecteur: codesecteur,
        },
      }
    );

    console.log(secteurInfo);

    return res
      .status(200)
      .json({ message: "secteur récupéré avec succès", secteurInfo });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
//* récuperer la liste de régions
// * example:
// * input : 
// * output : liste de régions
// * http://localhost:5000/api/client/SOLEVO/getListeCodeRegions
const getListeCodeRegions = async (req, res) => {
  const { dbName } = req.params;
  try {
    const dbConnection = await getDatabaseConnection(dbName, res);
    const listeCodesRegion = await dbConnection.query(
      `SELECT codergg from region`,
      {
        type: dbConnection.QueryTypes.SELECT,
      }
    )

    return res.status(200).json({message: "liste de codes posteaux récuperée avec succès", listeCodesRegion});
  }catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
//* récuperer la liste de villes d'un région
// * example:
// * input : Ariana
// * output : liste de villes de région d'Ariana
const getVilleParRegion = async (req, res) => {
  const { dbName, codeRegion } = req.params;
  console.log(dbName, " ", codeRegion);
  try {
    const dbConnexion = await getDatabaseConnection(dbName, res);
    const ListRegion = await dbConnexion.query(
      `Select desirgg from region where codergg = :codeRegion`,
      {
        type: dbConnexion.QueryTypes.SELECT,
        replacements: {
          codeRegion,
        },
      }
    );
    return res
      .status(200)
      .json({ message: "region recupere avec suucess", ListRegion });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};




//* récuperer la ville associé à un code postal
// * example:
// * input : Ariana
// * output : liste de villes de région d'Ariana
// * http://localhost:5000/api/client/SOLEVO/getVilleParCodePostale/1000
const getVilleParCodePostale = async (req, res) => {
  const { dbName, cp } = req.params;
  try {
    console.log(dbName, " ", cp);
    const dbConnection = await getDatabaseConnection(dbName, res);
    const ville = await dbConnection.query(
      `SELECT desicp from cpostal where CODEp = :cp`,
      {
        type: dbConnection.QueryTypes.SELECT,
        replacements: {
          cp: cp
        }
      }
    )
    return res
      .status(200)
      .json({ message: "liste ville de code postale récuperé avec succès", ville : ville});
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};




//* récuperer la liste de codes posteaux
// * example:
// * input : 
// * output : liste de codes posteaux
// * http://localhost:5000/api/client/SOLEVO/getListeCodesPosteaux
const getListeCodesPosteaux = async (req, res) => {
  const { dbName } = req.params;
  try {
    const dbConnection = await getDatabaseConnection(dbName, res);
    const listeCodesPosteaux = await dbConnection.query(
      `SELECT CODEp from cpostal`,
      {
        type: dbConnection.QueryTypes.SELECT,
      }
    )

    return res.status(200).json({message: "liste de codes posteaux récuperée avec succès", listeCodesPosteaux});
  }catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

module.exports = {
  getListeClients,
  filtrerListeClients,
  AjouterClient,
  supprimerClient,
  getClientParCode,
  majClient,
  getClientParTypecli,
  getDerniereCodeClient,
  getClientParCin,
  getToutCodesClient,
  getDesignationSecteurparCodeSecteur,
  getVilleParRegion,
  getVilleParCodePostale,
  getListeCodesPosteaux,
  getListeCodeRegions,
  getListeCodesSecteur,
};
