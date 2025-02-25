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
  createDevis,
  getCodeRepAndRsRep,
  updateDevis,
  deleteDevis,
  filterDevis,
} = require("../controllers/devisControllerPlaceholder");



const { getTousDevis , getNombreDevis,getTotalChifre} = require("../controllers/devisController");
const { getAllcodearticle } = require("../controllers/articleController");
//devis controller mt3na 
router.post("/:dbName/create", createDevis);
router.get("/:dbName/clients", getAllClients);
router.get("/:dbName/devis/total",getNombreDevis);
router.get("/:dbName/devis/totalchiffre",getTotalChifre);






//////////////////////////////////////////////

router.get("/:dbName/clients/code/:code", getClientByCode);
router.get("/:dbName/clients/rsoc/:rsoc", getClientByRsoc);
router.get("/:dbName/article", getAllcodearticle);
router.get("/:dbName/devis", getTousDevis);
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
router.delete("/:dbName/devis/:NUMBL", deleteDevis);
router.get("/filterDevis", filterDevis);

module.exports = router;
