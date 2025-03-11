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

function DevisFormTout() {
  const devisInfo = useSelector((state) => state.DevisCrud.devisInfo);
  const toolbarMode = useSelector((state) => state.uiStates.toolbarMode);
  const toobarTable = useSelector((state) => state.uiStates.toolbarTable);
  console.log(devisInfo)
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
      {/* Toolbar et Sidebar */}

      <ToolBar />
      <DevisForm />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"></div>

      {/* Table des articles */}
      {toolbarMode === "ajout" && <ArticlesDevis />}
      <div className="mt-6">
        <div className="p-4 sticky bottom-0 w-full">
          <table className="min-w-full table-auto border-collapse border border-gray-300">
            <thead className="bg-gray-300">
              {/* Ajout du fond gris pour l'en-tête */}
              <tr>
                <th className="p-3 text-left text-sm font-medium text-gray-600 border">
                  Famille
                </th>
                <th className="p-3 text-left text-sm font-medium text-gray-600 border">
                  Code Article
                </th>
                <th className="p-3 text-left text-sm font-medium text-gray-600 border">
                  Unité
                </th>
                <th className="p-3 text-left text-sm font-medium text-gray-600 border">
                  Quantite
                </th>
                <th className="p-3 text-left text-sm font-medium text-gray-600 border">
                  Remise
                </th>
                <th className="p-3 text-left text-sm font-medium text-gray-600 border">
                  Libelle
                </th>
                <th className="p-3 text-left text-sm font-medium text-gray-600 border">
                  TVA
                </th>
                <th className="p-3 text-left text-sm font-medium text-gray-600 border">
                  PUHT
                </th>
                <th className="p-3 text-left text-sm font-medium text-gray-600 border">
                  PUTTC
                </th>
                <th className="p-3 text-left text-sm font-medium text-gray-600 border">
                  NET HT
                </th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {devisInfo.articles?.map((article) => (
                <tr
                  key={`${article.famille}-${article.CodeART}`}
                  className="hover:bg-indigo-100 transition-all duration-150 ease-in-out"
                >
                  <td className="p-3 border border-gray-300">
                    {article.famille}
                  </td>
                  <td className="p-3 border border-gray-300">
                    {article.CodeART}
                  </td>
                  <td className="p-3 border border-gray-300">
                    {article.Unite}
                  </td>
                  <td className="p-3 border border-gray-300">
                    {article.QteART}
                  </td>
                  <td className="p-3 border border-gray-300">
                    {article.Remise}%
                  </td>
                  <td className="p-3 border border-gray-300">
                    {article.DesART}
                  </td>
                  <td className="p-3 border border-gray-300">
                    {article.TauxTVA}%
                  </td>
                  <td className="p-3 border border-gray-300">
                    {article.PUART}
                  </td>
                  <td className="p-3 border border-gray-300">
                    {article.PUART}
                  </td>
                  <td className="p-3 border border-gray-300">
                    {article.PUART}
                  </td>

                  {/* <td className="p-3 border border-gray-300">A001</td>
                  <td className="p-3 border border-gray-300">A001</td>
                  <td className="p-3 border border-gray-300">A001</td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="bg-gray-300 p-4 sticky bottom-0 w-full">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[150px]">
            <label className="block  font-bold">Montant HT :</label>

            <input
              type="text"
              name="totalHt"
              defaultValue={devisInfo.MHT}
              className="w-full border rounded-md p-2"
              readOnly
            />
          </div>
          <div className="flex-1 min-w-[150px]">
            <label className="block font-medium">Remise Totale :</label>
            <input
              type="text"
              name="Remise"
              defaultValue={devisInfo.MREMISE}
              className="w-full border rounded-md p-2"
              readOnly
            />
          </div>
          <div className="flex-1 min-w-[150px]">
            <label className="block font-medium">Net HT Global :</label>
            <input
              type="text"
              name="netHtGlobal"
              value={NETHTGLOBAL.toFixed(3)}
              className="w-full border rounded-md p-2"
              readOnly
            />
          </div>
          <div className="flex-1 min-w-[150px]">
            <label className="block font-medium">Taxe :</label>
            <input
              type="text"
              name="taxe"
              value={taxe.toFixed(3)}
              className="w-full border rounded-md p-2"
              readOnly
            />
          </div>
          <div className="flex-1 min-w-[150px]">
            <label className="block font-medium">Montant TTC :</label>
            <input
              type="text"
              name="MTTC"
              defaultValue={devisInfo.MTTC ? devisInfo.MTTC.toFixed(3) : ""}
              className="w-full border rounded-md p-2"
              readOnly
            />
          </div>
          <div className="flex-1 min-w-[150px]">
            <label className="block font-medium">Timbre :</label>
            <input
              type="text"
              name="timbre"
              defaultValue={devisInfo.TIMBRE}
              readOnly={!(toolbarMode == "ajout" && toobarTable == "devis")}
              className="w-full border rounded-md p-2"
            />
          </div>
          <div className="flex-1 min-w-[150px]">
            <label className="block font-medium">À Payer :</label>
            <input
              type="text"
              name="aPayer"
              value={apayer.toFixed(3)}
              className="w-full border rounded-md p-2"
              readOnly
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DevisFormTout;
