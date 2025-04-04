import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { FaUser, FaCog, FaCreditCard, FaSignOutAlt } from "react-icons/fa";
import ToolBar from "../Common/ToolBar";
import { useDispatch, useSelector } from "react-redux";
import {
  getArticleParCode,
  getDesignationFamilleParCodeFamille,
  getdesignationSousFamillebycodeSousFamille,
  getListeCodesArticles,
  getListecodesousFamille,
  getListeFamillesArticle,
  setArticleInfos,
  viderChampsArticleInfo,
} from "../../app/article_slices/articleSlice";
function ArticleForm() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const articleInfos = useSelector((state) => state.ArticlesDevis.articleInfos);
  const ListeCodeArticles = useSelector(
    (state) => state.ArticlesDevis.ListeCodeArticles
  );
  const ListeFamille = useSelector((state) => state.ArticlesDevis.ListeFamille);
  const toolbarMode = useSelector((state) => state.uiStates.toolbarMode);
  const ListeSousFamille = useSelector(
    (state) => state.ArticlesDevis.ListeSousFamille
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getListeFamillesArticle()); //* la colonne code Famille
    dispatch(getListecodesousFamille()); //** la collone de code sous famille */
    dispatch(getListeCodesArticles()); // * la colonne de code article
  }, []);

  const hundlesubmitCodeSousFamille = (codeSousfamille) => {
    dispatch(
      setArticleInfos({ colonne: "sousfamille", valeur: codeSousfamille })
    );
    //*valeur : codeSousfamille
    if (codeSousfamille != "") {
      dispatch(getdesignationSousFamillebycodeSousFamille(codeSousfamille));
    } else {
      dispatch(setArticleInfos({ colonne: "Libellesousfamille", valeur: "" }));
    }
  };
  const handleDesignationFamilleChange = (valeur, colonne) => {
    console.log(valeur, " ", colonne);
  };
  const handleCodeFamilleChange = (valeur, colonne) => {
    dispatch(setArticleInfos({ colonne: colonne, valeur: valeur }));
    // * valeur == codeFamille
    if (valeur != "") {
      dispatch(getDesignationFamilleParCodeFamille(valeur));
    } else {
      dispatch(setArticleInfos({ colonne: "libelleFamille", valeur: "" }));
    }
  };

  const handleCodeArticleChange = (codeArticle) => {
    dispatch(setArticleInfos({ colonne: "code", valeur: codeArticle }));
    //*valeur=: codeArticle
    if (
      codeArticle != ""
    ) {
      dispatch(getArticleParCode(codeArticle));
    } else {
      dispatch(viderChampsArticleInfo());
    }
  };

  return (
    <div className="container">
      <div className={`navigation ${isSidebarOpen ? "active" : ""}`}>
        <ul>
          <li>
            <a href="#">
              <span className="icon">
                <ion-icon name="speedometer-outline"></ion-icon>
              </span>
              <span className="title">ERP Logicom</span>m
            </a>
          </li>

          {[
            { name: "Dashboard", icon: "home-outline", path: "/dashboard" },
            {
              name: "Clients",
              icon: "people-outline",
              path: "/ClientFormTout",
            },
            {
              name: "Article",
              icon: "chatbubble-outline",
              path: "/ArticleFormTout",
            },
            {
              name: "devistout",
              icon: "lock-closed-outline",
              path: "/DevisFormTout",
            },
            {
              name: "les societes",
              icon: "help-outline",
              path: "/SocietiesList",
            },
            { name: "Settings", icon: "settings-outline", path: "/" },
            {
              name: "Deconnexion",
              icon: "log-out-outline",
              path: "/deconnexion",
            },
          ].map((item, index) => (
            <li key={index}>
              {/* Use Link instead of <a> */}
              <Link to={item.path}>
                <span className="icon">
                  <ion-icon name={item.icon}></ion-icon>
                </span>
                <span className="title">{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className={`main ${isSidebarOpen ? "active" : ""}`}>
        <div className="topbar">
          <div className="toggle" onClick={toggleSidebar}>
            <ion-icon name="menu-outline"></ion-icon>
          </div>

          <ToolBar></ToolBar>

          <div className="relative inline-block text-left">
            {/* Avatar avec événement de clic */}
            <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
              <img
                src="assets/imgs/customer01.jpg"
                alt="User"
                className="w-10 h-10 rounded-full border-2 border-white shadow-md"
              />
              {/* Indicateur de statut en ligne */}
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
            </div>

            {/* Menu déroulant */}
            {isOpen && (
              <div className="absolute right-0 mt-3 w-56 bg-white border rounded-lg shadow-lg z-50">
                <div className="p-4 flex items-center border-b">
                  <img
                    src="assets/imgs/customer01.jpg"
                    alt="User"
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <div>
                    <p className="font-semibold">John Doe</p>
                    <p className="text-sm text-gray-500">Admin</p>
                  </div>
                </div>
                <ul className="py-2">
                  <li className="px-4 py-2 flex items-center hover:bg-gray-100 cursor-pointer">
                    <FaUser className="mr-3" /> My Profile
                  </li>
                  <li className="px-4 py-2 flex items-center hover:bg-gray-100 cursor-pointer">
                    <FaCog className="mr-3" /> Settings
                  </li>
                  <li className="px-4 py-2 flex items-center hover:bg-gray-100 cursor-pointer relative">
                    <FaCreditCard className="mr-3" /> Billing
                    <span className="ml-auto bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      4
                    </span>
                  </li>
                  <li className="px-4 py-2 flex items-center hover:bg-gray-100 cursor-pointer border-t">
                    <FaSignOutAlt className="mr-3" /> Log Out
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
        <div className="details">
          <div className="recentOrders gap-y-0.5">
            <div className="cardHeader">
              <h2
                style={{
                  color: "rgb(48, 60, 123)",
                  fontWeight: "bold",
                  fontStyle: "italic",
                }}
                className="text-3xl"
              >
                Article
              </h2>
              <a href="#" className="btn">
                View All
              </a>
            </div>
            <div className="flex flex-wrap">
              <div className="flex flex-col w-1/3">
                <label
                  className="font-bold mb-1"
                  style={{ color: "rgb(48, 60, 123)" }}
                >
                  Code Famille
                </label>

                <input
                  type="text"
                  className="border border-gray-300 rounded-md p-2"
                  value={articleInfos.famille}
                  onChange={(e) =>
                    handleCodeFamilleChange(e.target.value, "famille")
                  }
                  list="listeCodesFamilles"
                />

                <datalist id="listeCodesFamilles">
                  {ListeFamille.length > 0 ? (
                    ListeFamille.map((famille, indice) => (
                      <option key={indice} value={famille.code}>
                        {famille.code}
                      </option>
                    ))
                  ) : (
                    <option disabled>Aucun article trouvé</option>
                  )}
                </datalist>
              </div>
              <div className="flex flex-col w-2/3">
                <label
                  className="font-bold mb-1"
                  style={{ color: "rgb(48, 60, 123)" }}
                >
                  Designation Famille
                </label>

                <input
                  type="text"
                  className="border border-gray-300 rounded-md p-2"
                  value={articleInfos.libelleFamille}
                  onChange={(e) =>
                    handleDesignationFamilleChange(
                      e.target.value,
                      "libelleFamille"
                    )
                  }
                />
              </div>
            </div>
            <div className="flex flex-wrap">
              <div className="flex flex-col w-1/3">
                <label
                  className="font-bold mb-1"
                  style={{ color: "rgb(48, 60, 123)" }}
                >
                  Code Sous Famille
                </label>

                <input
                  type="text"
                  className="border border-gray-300 rounded-md p-2"
                  value={articleInfos.sousfamille}
                  list="listeCodesSousFamille"
                  onChange={(e) => hundlesubmitCodeSousFamille(e.target.value)}
                />
                <datalist id="listeCodesSousFamille">
                  {ListeSousFamille.length > 0 ? (
                    ListeSousFamille.map((Sousfamille, indice) => (
                      <option key={indice} value={Sousfamille.code}>
                        {Sousfamille.code}
                      </option>
                    ))
                  ) : (
                    <option disabled>Aucune liste Sous famille trouvé</option>
                  )}
                </datalist>
              </div>
              <div className="flex flex-col w-2/3">
                <label
                  className="font-bold mb-1"
                  style={{ color: "rgb(48, 60, 123)" }}
                >
                  Designation sous Famille
                </label>
                <input
                  type="text"
                  className="border border-gray-300 rounded-md p-2"
                  value={articleInfos.Libellesousfamille}
                />
              </div>
            </div>
            <div className="flex flex-wrap">
              <div className="flex flex-col w-1/3">
                <label
                  className="font-bold mb-1"
                  style={{ color: "rgb(48, 60, 123)" }}
                >
                  Code Article
                </label>

                <input
                  type="text"
                  className="border border-gray-300 rounded-md p-2"
                  value={articleInfos.code}
                  list="listeCodesArticle"
                  onChange={(e) => handleCodeArticleChange(e.target.value)}
                />

                <datalist id="listeCodesArticle">
                  {ListeCodeArticles.length > 0 ? (
                    ListeCodeArticles.map((article, indice) => (
                      <option key={indice} value={article.code}>
                        {article.code}
                      </option>
                    ))
                  ) : (
                    <option disabled>Aucun code d'article trouvé</option>
                  )}
                </datalist>
              </div>
              <div className="flex flex-col w-1/3">
                <label
                  className="font-bold mb-1"
                  style={{ color: "rgb(48, 60, 123)" }}
                >
                  code A bare
                </label>

                <input
                  type="text"
                  className="border border-gray-300 rounded-md p-2"
                  value={articleInfos.codebarre}
                />
              </div>
              <div className="flex flex-col w-1/3">
                <label
                  className="font-bold mb-1"
                  style={{ color: "rgb(48, 60, 123)" }}
                >
                  Designation Article
                </label>
                <input
                  type="text"
                  className="border border-gray-300 rounded-md p-2"
                  value={articleInfos.libelle}
                />
              </div>
            </div>
            <div className="flex flex-cols">
              <button className="btn">Taxe</button>
            </div>

            <div className="flex flex-wrap items-center gap-x-6">
              {/* %TVA */}
              <div className="flex flex-col w-1/3">
                <label className="font-bold text-[rgb(48,60,123)]">
                  {" "}
                  %TVA{" "}
                </label>
                <input
                  type="text"
                  className="border border-gray-300 rounded-md p-2 w-full"
                  value={articleInfos.tauxtva}
                />
              </div>

              {/* Fodek */}
              <div className="flex flex-col w-1/3">
                <label className="font-bold text-[rgb(48,60,123)]">
                  {" "}
                  Fodek{" "}
                </label>
                <input
                  type="text"
                  className="border border-gray-300 rounded-md p-2 w-full"
                  value={articleInfos.fodec}
                />
              </div>

              {/* DC (Checkbox) */}
              {/* <div className="flex items-center gap-x-2">
                <input
                  type="checkbox"
                  className="border border-gray-300 rounded-md"
                  checked=
                  {(toolbarMode == "consultation" ||
                    toolbarMode == "modification") &&
                    articleInfos.typeart == "DC"}
                />
                <label className="text-[rgb(48,60,123)] font-bold">DC</label>
               
              </div> */}
            </div>

            <div className="flex flex-cols">
              <button className="btn">Stockage</button>
            </div>
            <div className="flex flex-wrap">
              <div className="flex flex-col w-1/3">
                <label
                  className="font-bold mb-1"
                  style={{ color: "rgb(48, 60, 123)" }}
                >
                  NGP
                </label>

                <input
                  type="text"
                  className="border border-gray-300 rounded-md p-2"
                  value={articleInfos.NGP}
                />
              </div>
              <div className="flex flex-col w-1/3">
                <label
                  className="font-bold mb-1"
                  style={{ color: "rgb(48, 60, 123)" }}
                >
                  Lieu de stockage
                </label>

                <input
                  type="text"
                  className="border border-gray-300 rounded-md p-2"
                  value={articleInfos.lieustock}
                />
              </div>
              <div className="flex flex-col w-1/3">
                <label
                  className="font-bold mb-1"
                  style={{ color: "rgb(48, 60, 123)" }}
                >
                  Ref origine
                </label>
                <input
                  type="text"
                  className="border border-gray-300 rounded-md p-2"
                  value={articleInfos.reforigine}
                />
              </div>
            </div>

            <div className="flex flex-wrap">
              <div className="flex flex-col w-1/3">
                <label
                  className="font-bold mb-1"
                  style={{ color: "rgb(48, 60, 123)" }}
                >
                  Fours
                </label>

                <input
                  type="text"
                  className="border border-gray-300 rounded-md p-2"
                  value={articleInfos.fourn}
                />
              </div>
              <div className="flex flex-col w-2/3">
                <label
                  className="font-bold mb-1"
                  style={{ color: "rgb(48, 60, 123)" }}
                >
                  Fours
                </label>

                <input
                  type="text"
                  className="border border-gray-300 rounded-md p-2"
                  value={articleInfos.fourn}
                />
              </div>
            </div>
          </div>

          <div className="recentCustomers">
            <div className="cardHeader">
              {/* <h2>PARAMETTRE DE FACTURATION</h2> */}
            </div>
            <div className="card rounded-box p-6 space-y-2">
              {/* Conteneur pour Code Client, Type Client et CIN */}
              <div className="flex flex-wrap">
                <div className="flex flex-col w-1/3">
                  <label
                    className="font-bold mb-1"
                    style={{ color: "rgb(48, 60, 123)" }}
                  >
                    unite
                  </label>

                  <input
                    type="text"
                    className="border border-gray-300 rounded-md p-2"
                    placeholder="start"
                    value={articleInfos.unite}
                  />
                </div>
                <div className="flex flex-col w-1/3">
                  <label
                    className="font-bold mb-1"
                    style={{ color: "rgb(48, 60, 123)" }}
                  >
                    Brut
                  </label>

                  <input
                    type="text"
                    className="border border-gray-300 rounded-md p-2"
                    value={articleInfos.prixbrut}
                  />
                </div>
                <div className="flex flex-col w-1/3">
                  <label
                    className="font-bold mb-1"
                    style={{ color: "rgb(48, 60, 123)" }}
                  >
                    Net
                  </label>
                  <input
                    type="text"
                    className="border border-gray-300 rounded-md p-2"
                    value={articleInfos.prixnet}
                  />
                </div>
              </div>
              <div className="flex flex-wrap">
                <div className="flex flex-col w-1/3">
                  <label
                    className="font-bold mb-1"
                    style={{ color: "rgb(48, 60, 123)" }}
                  >
                    Nb/Unite
                  </label>

                  <input
                    type="text"
                    className="border border-gray-300 rounded-md p-2"
                    value={articleInfos.nbrunit}
                  />
                </div>
                <div className="flex flex-col w-2/3">
                  <label
                    className="font-bold mb-1"
                    style={{ color: "rgb(48, 60, 123)" }}
                  >
                    Compte Comptable
                  </label>

                  <input
                    type="text"
                    className="border border-gray-300 rounded-md p-2"
                    value={articleInfos.comptec}
                  />
                </div>
              </div>
              <div className="flex flex-wrap">
                <div className="flex flex-col w-1/3">
                  <label
                    className="font-bold mb-1"
                    style={{ color: "rgb(48, 60, 123)" }}
                  >
                    Type
                  </label>
                  <input
                    type="text"
                    className="border border-gray-300 rounded-md p-2"
                    value={articleInfos.type}
                  />
                </div>
                <div className="flex flex-col w-2/3">
                  <label
                    className="font-bold mb-1"
                    style={{ color: "rgb(48, 60, 123)" }}
                  >
                    colisage
                  </label>

                  <input
                    type="text"
                    className="border border-gray-300 rounded-md p-2"
                    value={articleInfos.colisage}
                  />
                </div>
              </div>
              <div className="flex items-center gap-x-4">
                <div className="flex items-center gap-x-2">
                  <input
                    type="radio"
                    className="border border-gray-300 rounded-md"
                    checked={
                      (toolbarMode == "consultation" ||
                        toolbarMode == "modification") &&
                      articleInfos.typeart == "PF"
                    }
                  />
                  <label className="text-[rgb(48,60,123)]">PF</label>
                </div>

                <div className="flex items-center gap-x-2">
                  <input
                    type="radio"
                    className="border border-gray-300 rounded-md"
                    checked={
                      (toolbarMode == "consultation" ||
                        toolbarMode == "modification") &&
                      articleInfos.typeart == "X"
                    }
                  />
                  <label className="text-[rgb(48,60,123)]">X</label>
                </div>

                <div className="flex items-center gap-x-2">
                  <input
                    type="radio"
                    className="border border-gray-300 rounded-md"
                    checked={
                      (toolbarMode == "consultation" ||
                        toolbarMode == "modification") &&
                      articleInfos.typeart == "MP"
                    }
                  />
                  <label className="text-[rgb(48,60,123)]">MP</label>
                </div>

                <div className="flex items-center gap-x-2">
                  <input
                    type="radio"
                    className="border border-gray-300 rounded-md"
                    checked={
                      (toolbarMode == "consultation" ||
                        toolbarMode == "modification") &&
                      articleInfos.import == "I"
                    }
                  />
                  <label className="text-[rgb(48,60,123)]">Importé</label>
                </div>

                <div className="flex items-center gap-x-2">
                  <input
                    type="radio"
                    className="border border-gray-300 rounded-md"
                    checked={
                      (toolbarMode == "consultation" ||
                        toolbarMode == "modification") &&
                      articleInfos.import == "L"
                    }
                  />
                  <label className="text-[rgb(48,60,123)]">Local</label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="details">
          <div className="recentOrders">
            <div className="cardHeader">
              <h2>Article</h2>
            </div>
            <div className="card rounded-box p-6 space-y-2">
              <div className="flex flex-nowrap">
                <div className="flex">
                  <div className="flex flex-col items-start gap-y-4 p-8">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        className="border border-gray-300 rounded-md"
                        checked={
                          (toolbarMode == "consultation" ||
                            toolbarMode == "modification") &&
                          articleInfos.sav == "O"
                        }
                      />
                      <label className="text-blue-900">Gestion SAv</label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        className="border border-gray-300 rounded-md"
                        checked={
                          (toolbarMode == "consultation" ||
                            toolbarMode == "modification") &&
                          articleInfos.cons == "O"
                        }
                      />
                      <label className="text-blue-900">Consigne</label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        className="border border-gray-300 rounded-md"
                        checked={
                          (toolbarMode == "consultation" ||
                            toolbarMode == "modification") &&
                          articleInfos.nomenclature == "O"
                        }
                      />
                      <label className="text-blue-900">Nomenec fiche</label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        className="border border-gray-300 rounded-md"
                        checked={
                          (toolbarMode == "consultation" ||
                            toolbarMode == "modification") &&
                          articleInfos.gestionstock == "O"
                        }
                      />
                      <label className="text-blue-900">Gestion de Stock</label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        className="border border-gray-300 rounded-md"
                        checked={
                          (toolbarMode == "consultation" ||
                            toolbarMode == "modification") &&
                          articleInfos.avecconfig == "O"
                        }
                      />
                      <label className="text-blue-900">Configuration Art</label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        className="border border-gray-300 rounded-md"
                        checked={
                          (toolbarMode == "consultation" ||
                            toolbarMode == "modification") &&
                          articleInfos.ventevrac == "O"
                        }
                      />
                      <label className="text-blue-900">Vente Vrac</label>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <label
                      className="block font-bold text-center"
                      style={{ color: "rgb(48, 60, 123)" }}
                    >
                      Configuiration
                    </label>

                    <textarea
                      className="w-full border border-gray-300 rounded-md p-2"
                      value={articleInfos.CONFIG}
                      rows={10}
                      cols={30}
                    />
                  </div>
                  <div className="flex flex-col items-center gap-4">
                    <label className="block font-bold text-center text-[rgb(48,60,123)]"></label>
                    <button className="w-full border border-gray-300 rounded-md p-2">
                      {" "}
                      Correction de Stock
                    </button>

                    <label className="block font-bold text-center text-[rgb(48,60,123)]"></label>
                    <button className="w-full border border-gray-300 rounded-md p-2">
                      Catalogue des prix
                    </button>

                    <label className="block font-bold text-center text-[rgb(48,60,123)]"></label>
                    <button className="w-full border border-gray-300 rounded-md p-2">
                      Valeur du Stock
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="recentCustomers">
            <div className="card rounded-box p-6 space-y-2">
              <div className="flex flex-col w-full">
                {/* Ligne pour "Creation" */}
                <div className="flex items-center space-x-4">
                  <label
                    className="font-medium w-1/3 text-left block "
                    style={{ color: "rgb(48, 60, 123)" }}
                  >
                    Creation
                  </label>

                  <input
                    type="text"
                    className="border border-gray-300 rounded-md p-2 w-2/3"
                    disabled
                    value={articleInfos.usera}
                  />
                </div>

                {/* Ligne pour "Modification" */}
                <div className="flex items-center space-x-4">
                  <label
                    className="font-medium w-1/3 text-left block "
                    style={{ color: "rgb(48, 60, 123)" }}
                  >
                    Modification
                  </label>
                  <input
                    type="text"
                    className="border border-gray-300 rounded-md p-2 w-2/3"
                    value={articleInfos.userm}
                  />
                </div>

                {/* Ligne pour "Date Maj" */}
                <div className="flex items-center space-x-4">
                  <label
                    className="font-medium w-1/3 text-left block "
                    style={{ color: "rgb(48, 60, 123)" }}
                  >
                    Date Maj
                  </label>
                  <input
                    type="date"
                    value={articleInfos.datemaj}
                    className="border border-gray-300 rounded-md p-2 w-2/3"
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <label
                  className="block font-bold text-center"
                  style={{ color: "rgb(48, 60, 123)" }}
                >
                  commentaire
                </label>

                <textarea
                  className="w-full border border-gray-300 rounded-md p-2"
                  cols={33}
                  rows={7}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <script src="%PUBLIC_URL%/assets/js/main.js"></script>
    </div>
  );
}

export default ArticleForm;
