const express = require("express");
const router = express.Router();
const {
  getAllClients,
  getClientByCode,
  getClientByRsoc,
  getLibpvByNumbl,
  getDevisWithDetails,

  getDevisCountByMonthAndYear,
  getDevisValidees,

  getCodeRepAndRsRep,
  updateDevis,
  
  filterDevis,
} = require("../controllers/devisControllerPlaceholder");
const { getAllcodearticle } = require("../controllers/articleController");

const {
  getTousDevis,
  getNombreDevis,
  getTotalChiffres,
  creerDevis,
  getDevisParNUMBL,
  getCodesDevis,
  getDevisParMontant,
  GetDevisListParClient,
  GetDevisParPeriode,
  getInfoUtilisateur,
  getListePointVente,
  getLignesDevis,
  getDevisCreator,
  getDerniereNumbl,
  deleteDevis,
  getListeDevisParCodeClient
} = require("../controllers/devisController");
//devis controller mt3na
router.post("/:dbName/creerDevis", creerDevis);
router.get("/:dbName/clients", getAllClients);
router.get("/:dbName/getNombreDevis", getNombreDevis);
router.get("/:dbName/getTotalChiffres", getTotalChiffres);
router.get("/:dbName/getDevisParNUMBL/:NUMBL", getDevisParNUMBL);
router.get("/:dbName/getCodesDevis/:usera", getCodesDevis);
router.get("/:dbName/getDevisParMontant/:montant", getDevisParMontant);
router.get("/:dbName/getDevisParClient", GetDevisListParClient);
router.get("/:dbName/getDevisParPeriode", GetDevisParPeriode);

router.get("/:dbName/getDevisParMontant", getDevisParMontant);
router.get("/:dbName/getInfoUtilisateur", getInfoUtilisateur);
router.get("/:dbName/getListePointVente", getListePointVente);
router.get("/:dbName/getLignesDevis/:NumBL", getLignesDevis);
router.get("/:dbName/getDevisCreator", getDevisCreator);
router.get("/:dbName/getDerniereNumbl", getDerniereNumbl);
router.delete("/:dbName/deleteDevis/:NUMBL", deleteDevis);


router.get("/:dbName/getListePointVente", getListePointVente);

router.get("/:dbName/getInfoUtilisateur", getInfoUtilisateur);
router.get("/:dbName/getListeDevisParCodeClient", getListeDevisParCodeClient)
//////////////////////////////////////////////

router.get("/:dbName/clients/code/:code", getClientByCode);
router.get("/:dbName/clients/rsoc/:rsoc", getClientByRsoc);
//router.get("/:dbName/article", getAllcodearticle);
router.get("/:dbName/getTousDevis", getTousDevis);
router.get("/:dbName/devis/libpv/:numbl", getLibpvByNumbl);
router.get("/:dbName/devis/details", getDevisWithDetails);

router.get(
  "/devis-count-by-month-and-year/:dbName",
  getDevisCountByMonthAndYear
);
router.get("/:dbName/devis-validees", getDevisValidees);
router.get(
  "/get-representant-details/:databaseName/:numbl",
  getCodeRepAndRsRep
);
router.put("/:dbName/:numbl", updateDevis);
// router.delete("/:dbName/devis/:NUMBL", deleteDevis);
router.get("/filterDevis", filterDevis);

module.exports = router;
