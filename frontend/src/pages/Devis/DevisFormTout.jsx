import ToolBar from "../../components/Common/ToolBar";
import SideBar from "../../components/Common/SideBar";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setActiverChampsForm,
  setToolbarTable,
} from "../../app/interface_slices/uiSlice";

import DevisForm from "../../components/Devis/DevisForm";
import ArticlesDevis from "../../components/Devis/ArticlesDevis";
import Recherche from "./recherche";

function DevisFormTout() {
  const devisInfo = useSelector((state) => state.DevisCrud.devisInfo);
  const toolbarMode = useSelector((state) => state.uiStates.toolbarMode);
  const toobarTable = useSelector((state) => state.uiStates.toolbarTable);
  const afficherRecherchePopup = useSelector((state) => state.uiStates.afficherRecherchePopup);
  // * useEffect #1 : désactiver tous les champs
  // * et indiquer qu'on va utiliser la table de devis
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setToolbarTable("devis"));
    dispatch(setActiverChampsForm(false));
  }, []);
  const NETHTGLOBAL = devisInfo.MHT - devisInfo.MREMISE || 0;
  const taxe = devisInfo.MTTC - NETHTGLOBAL || 0;
  const apayer = devisInfo.MTTC + devisInfo.TIMBRE || 0;

  return (
    <div className="bg-gray-100 min-h-screen p-1 mb-1/2">
      { afficherRecherchePopup == true && <Recherche/> }
      <DevisForm />
    </div>
  );
}

export default DevisFormTout;
