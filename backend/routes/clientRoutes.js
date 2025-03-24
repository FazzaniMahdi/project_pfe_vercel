const express = require("express");
const router = express.Router();
const {
  getListeClients,
  filtrerListeClients,
  AjouterClient,
  supprimerClient,
  majClient,
  getClientParCode,
  getDerniereCodeClient,
  getClientParTypecli,
  getClientParCin,
  getToutCodesClient,
  getCodePostalDesignationParCode,
} = require("../controllers/clientController");
router.get("/:dbName/List", getListeClients);
router.get("/:dbName/filterClient", filtrerListeClients);
router.post("/:dbName/Add", AjouterClient);
router.delete("/:dbName/Delete/:code", supprimerClient);
router.put("/:dbName/Update", majClient);
router.get("/:dbName/getClientParTypecli", getClientParTypecli);
router.get("/:dbName/getDerniereCodeClient", getDerniereCodeClient);
router.get("/:dbName/getClientParCin/:cin", getClientParCin);

router.get("/:dbName/getToutCodesClient", getToutCodesClient);
router.get("/:dbName/client/:code", getClientParCode);
router.get("/:dbName/getCpInfos", getCodePostalDesignationParCode);

router.get("/:dbName/getCpInfos", getCodePostalDesignationParCode);

module.exports = router;
