const express = require("express");
const router = express.Router();
const {
  getListeClients,
  filtrerListeClients,
  AjouterClient,
  supprimerClient,
  getClientParCode,
  majClient,
  getListeCodeClient,
  getDerniereCodeClient,
  getClientParTypeClient,
  getClientParCin,
} = require("../controllers/clientController");
router.get("/:dbName/List", getListeClients);
router.get("/:dbName/filterClient", filtrerListeClients);
router.get("/:dbName/client/:code", getClientParCode);
router.post("/:dbName/Add", AjouterClient);
router.delete("/:dbName/Delete/:code", supprimerClient);
router.put("/:dbName/Update", majClient);
router.get("/:dbName/getListCode", getListeCodeClient);
router.get("/:dbName/getDerniereCodeClient", getDerniereCodeClient);
router.get("/:dbName/typeclient/:typecli", getClientParTypeClient);
router.get("/:dbName/getClientParCin/:cin", getClientParCin);


module.exports = router;
