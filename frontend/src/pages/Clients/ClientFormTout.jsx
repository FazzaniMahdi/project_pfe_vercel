import React, { useEffect } from "react";
import ClientForm from "../../components/Client/ClientForm";
import { setToolbarTable } from "../../app/interface_slices/uiSlice";
import { useDispatch, useSelector } from "react-redux";
import AlertModifier from "../../components/Common/AlertModifier";
import Recherche from "../../components/Common/recherche";
import { getDerniereCodeClient } from "../../app/client_slices/clientSlice";

function ClientFormTout() {
  const dispatch = useDispatch();
  const afficherRecherchePopup = useSelector((state) => state.uiStates.afficherRecherchePopup);
  // ! calling that setter outside of a useEffect causes a "cannot update component while rendering a different component"
  // ! this helps a little bit with understanding the useEffect hook
  // ! the above error occured because a mutation was happening during the render phase
  // ! for the record, react has 2 phases: render phase and commit phase
  // ! the mutation should've happened in the commit phase instead of the render phase
  // ! no idea why that issue seems to sometimes happen while other times it will not
  useEffect(() => {
    dispatch(setToolbarTable("client"));
    dispatch(getDerniereCodeClient());  
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="flex-1 ">
        { afficherRecherchePopup == true && <Recherche/> }
        <AlertModifier></AlertModifier>
        <ClientForm />
        <br />
      </div>
    </div>
  );
}

export default ClientFormTout;
