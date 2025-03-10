import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faSearch,
  faArrowLeft,
  faArrowRight,
  faList,
  faSignOutAlt,
  faFolderPlus,
  faEdit,
  faTrashAlt,
  faCancel,
} from "@fortawesome/free-solid-svg-icons";
import {
  ajouterClient,
  getDerniereCodeClient,
  getListeClient,
  majClient,
  viderChampsClientInfo,
} from "../../app/client_slices/clientSlice";
import {
  setAfficherAlertModal,
  setAlertMessage,
  setActiverChampsForm,
  setActiverBoutonsValiderAnnuler,
  setToolbarMode,
} from "../../app/interface_slices/uiSlice";
import {
  AjouterDevis,
  viderChampsDevisInfo,
} from "../../app/devis_slices/devisSlice";
import { getUtilisateurCourantInfos } from "../../app/utilisateur_slices/utilisateurSlice";

function ToolBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const devisInfo = useSelector((state) => state.DevisCrud.devisInfo);
  const clientInfos = useSelector((state) => state.ClientCrud.clientInfos);
  // * state pour afficher/cacher fenetre de confirmation pour
  // * la suppression
  const [isDeleting, setIsDeleting] = useState(false);
  // * state pour controller quelle table on utilise
  // * puisque ce composant est partagé
  const toolbarTable = useSelector((state) => state.uiStates.toolbarTable);
  // * boolean pour afficher / cacher les bouton valider et supprimer
  const activerBoutonsValiderAnnuler = useSelector(
    (state) => state.uiStates.activerBoutonsValiderAnnuler
  );

  const toolbarMode = useSelector((state) => state.uiStates.toolbarMode);
  const handleNaviguerVersListe = async () => {
    if (toolbarTable == "devis") {
      navigate("/DevisList");
    }
    if (toolbarTable == "client") {
      navigate("/ClientList");
    }
  };
  // * ajout d'un client/devi
  const handleAjoutBtnClick = async () => {
    dispatch(setActiverBoutonsValiderAnnuler(true));
    dispatch(setActiverChampsForm(true));
    dispatch(setToolbarMode("ajout"));
    // * vider les champs du formulaires
    if (toolbarTable == "devis") {
      dispatch(viderChampsClientInfo());
    }

    if (toolbarTable == "client") {
      dispatch(viderChampsClientInfo());
      dispatch(getDerniereCodeClient());
      // * dispatch une action pour récuperer le code + nom d'utilisateur courant
      dispatch(getUtilisateurCourantInfos());
    }
  };
  const HandleRecherche = async () => {
    navigate("/recherche");
  };
  // * méthode pour mettre à jour un client/devis
  const handleModifierBtnClick = async () => {
    if (toolbarTable == "devis") {
      if (!devisInfo.NUMBL) {
        // ! a remplacer par toast
        alert("aucune devis est selectionné pour la modification");
      }
    }

    if (toolbarTable == "client") {
      if (!clientInfos.code) {
        // ! a remplacer par toast
        alert("aucun client est selectionné pour la modification");
      }
    }

    if (
      (toolbarTable == "client" && clientInfos.code) ||
      (toolbarTable == "devis" && devisInfo.NUMBL)
    ) {
      dispatch(setToolbarMode("modification"));
      dispatch(setActiverBoutonsValiderAnnuler(true));
      dispatch(setActiverChampsForm(true));
    }
  };

  // * afficher la fenetre de confirmation
  // * pour supprimer un ou plusieurs clients/devis
  const afficherModel = async () => {
    if (toolbarTable == "devis") {
      if (!devisInfo.NUMBL) {
        // ! a remplacer par toast
        alert("aucune devis est selectionné pour la suppression");
      }
    }

    if (toolbarTable == "client") {
      if (!clientInfos.code) {
        // ! a remplacer par toast
        alert("aucun client est selectionné pour la suppression");
      }
    }

    if (
      (toolbarTable == "client" && clientInfos.code) ||
      (toolbarTable == "devis" && devisInfo.NUMBL)
    ) {
      dispatch(setAfficherAlertModal(true));
    }
  };

  // * méthode pour valider l'ajout d'un client/devis
  const handleValiderBtnClick = () => {
    if (toolbarTable == "client") {
      if (toolbarMode == "ajout") {
        //dispatch(ajouterClient());
        dispatch(setAfficherAlertModal(true));

      }

      if (toolbarMode == "modification") {
        dispatch(majClient());
        dispatch(setActiverChampsForm(false));
        dispatch(setActiverBoutonsValiderAnnuler(false));
        dispatch(viderChampsClientInfo());
      }
    }
    if (toolbarTable == "devis") {
      if (toolbarMode == "ajout") {
        dispatch(AjouterDevis());
        dispatch(setActiverChampsForm(true));
      }

      if (toolbarMode == "modification") {
        console.log("modification d'un devis");
        // dispatch(majDevis())
      }
    }
    dispatch(setToolbarMode("consultation"));
  };

  // * cacher les bouttons valider/annuler
  // * réafficher les autres bouttons
  // * vider toutes les champs
  const annulerOperation = () => {
    dispatch(setActiverBoutonsValiderAnnuler(false));
    dispatch(setActiverChampsForm(false));
    dispatch(viderChampsClientInfo());
    dispatch(viderChampsDevisInfo());
    dispatch(setToolbarMode("consultation"));
  };

  const handleNaviguerListe = () => {
    if (toolbarTable == "devis") {
      navigate("/DevisList");
    }

    if (toolbarTable == "client") {
      navigate("/clientList");
    }
  };

  const handleNaviguerVersPrecedent =() => {
    console.log("naviguer ver l'élèment précedent")
  }

  const handleNaviguerVersSuivant = () => {
    console.log("naviguer vers l'élèment suivant");
  }
  return (
    <>
      <nav className="w-full h-[110px] border-b border-gray-700 flex items-center px-6">
        <div className="flex space-x-4">
          {!activerBoutonsValiderAnnuler && (
            <button
              type="button"
              onClick={handleAjoutBtnClick}
              className="flex flex-col items-center border p-2 rounded-md hover:bg-gray-100"
            >
              <FontAwesomeIcon
                icon={faFolderPlus}
                className="text-blue-600 text-3xl"
              />
              <span className="text-sm font-semibold text-gray-700">
                Nouveaux
              </span>
            </button>
          )}
          {!activerBoutonsValiderAnnuler && (
            <>
              <div className="border-r border-gray-300 h-8"></div>
              <button
                type="button"
                className="flex flex-col items-center border p-2 rounded-md hover:bg-gray-100"
                onClick={() => handleModifierBtnClick()}
              >
                <FontAwesomeIcon
                  icon={faEdit}
                  className="text-yellow-600 text-3xl"
                />
                <span className="text-sm font-semibold text-gray-700">
                  Modifier
                </span>
              </button>
            </>
          )}
          {!activerBoutonsValiderAnnuler && (
            <>
              <div className="border-r border-gray-300 h-8"></div>

              <button
                type="button"
                onClick={() => afficherModel()}
                className="flex flex-col items-center border p-2 rounded-md hover:bg-gray-100"
              >
                <FontAwesomeIcon
                  icon={faTrashAlt}
                  className="text-red-600 text-3xl"
                />
                <span className="text-sm font-semibold text-gray-700">
                  Supprimer
                </span>
              </button>
            </>
          )}

          {isDeleting && (
            <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-8 rounded-md shadow-lg max-w-sm w-full">
                <p className="text-xl font-semibold mb-4">
                  Voulez-vous vraiment supprimer ce devis ?
                </p>
                <div className="flex justify-around">
                  <button className="bg-red-600 text-white px-4 py-2 rounded-md">
                    Oui
                  </button>
                  <button
                    onClick={() => setIsDeleting(false)}
                    className="bg-gray-500 text-white px-4 py-2 rounded-md"
                  >
                    Non
                  </button>
                </div>
              </div>
            </div>
          )}

          {!activerBoutonsValiderAnnuler && (
            <>
              <div className="border-r border-gray-300 h-8"></div>

              <button
                className="flex flex-col items-center border p-2 rounded-md hover:bg-gray-100"
                onClick={() => navigate("/recherche")}
              >
                <FontAwesomeIcon
                  icon={faSearch}
                  className="text-blue-600 text-3xl"
                />
                <span className="text-sm font-semibold text-gray-700">
                  Rechercher
                </span>
              </button>
            </>
          )}

          {!activerBoutonsValiderAnnuler && (
            <button className="flex items-center text-gray-700 border p-2 rounded-md hover:bg-gray-100" onClick={handleNaviguerVersPrecedent}>
              <FontAwesomeIcon icon={faArrowLeft} className="text-3xl" />
            </button>
          )}

          {!activerBoutonsValiderAnnuler && (
            <button className="flex items-center text-gray-700 border p-2 rounded-md hover:bg-gray-100" onClick={handleNaviguerVersSuivant}>
              <FontAwesomeIcon icon={faArrowRight} className="text-3xl" />
            </button>
          )}

          {!activerBoutonsValiderAnnuler && (
            <button
              type="button"
              onClick={() => handleNaviguerVersListe()}
              className="flex items-center text-gray-700 ml-4 border p-2 rounded-md hover:bg-gray-100"
            >
              <FontAwesomeIcon icon={faList} className="text-3xl" />
              <span className="ml-2 text-sm font-semibold text-gray-700">
                Liste
              </span>
            </button>
          )}

          {!activerBoutonsValiderAnnuler && (
            <button
              type="button"
              onClick={() => navigate("/Dashboard")}
              className="flex items-center text-gray-700 ml-4 border p-2 rounded-md hover:bg-gray-100"
            >
              <FontAwesomeIcon icon={faSignOutAlt} className="text-3xl" />
              <span className="ml-2 text-sm font-semibold text-gray-700">
                Quitter
              </span>
            </button>
          )}

          {activerBoutonsValiderAnnuler && (
            <button
              type="button"
              onClick={() => handleValiderBtnClick()}
              className="flex items-center text-gray-700 ml-4 border p-2 rounded-md hover:bg-gray-100"
            >
              <FontAwesomeIcon icon={faCheck} className="text-3xl" />
              <span className="ml-2 text-sm font-semibold text-gray-700">
                Valider
              </span>
            </button>
          )}

          {activerBoutonsValiderAnnuler && (
            <button
              type="button"
              onClick={() => annulerOperation()}
              className="flex items-center text-gray-700 ml-4 border p-2 rounded-md hover:bg-gray-100"
            >
              <FontAwesomeIcon icon={faCancel} className="text-3xl" />
              <span className="ml-2 text-sm font-semibold text-gray-700">
                Annuler
              </span>
            </button>
          )}
        </div>
        <nav className="w-full h-[250px] border-b border-gray-700 flex items-center px-1 mt-1">
          <div className="flex space-x-4">{/* Vos autres boutons ici */}</div>
        </nav>
      </nav>

      {toolbarTable == "devis" && (
        <h2
          style={{
            color: "rgb(48, 60, 123)",
            fontWeight: "bold",
            fontStyle: "italic",
          }}
          className="text-3xl"
        >
          Devis / Facture Proforma
        </h2>
      )}
      {toolbarTable == "client" && (
        <h2
          style={{
            color: "rgb(48, 60, 123)",
            fontWeight: "bold",
            fontStyle: "italic",
          }}
          className="text-3xl"
        >
          Client / Facture Proforma
        </h2>
      )}
    </>
  );
}

export default ToolBar;
