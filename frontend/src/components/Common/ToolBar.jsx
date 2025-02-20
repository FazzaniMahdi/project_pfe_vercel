import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// ? icons
import {
  faFolderPlus,
  faEdit,
  faTrashAlt,
  faSearch,
  faArrowLeft,
  faArrowRight,
  faList,
  faSignOutAlt,
  faTimes,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { PrinterIcon } from "@heroicons/react/20/solid";

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Alert from "./Alert";
import { getclientDelete } from "../../app/client/clientSlice";
import { useDispatch } from "react-redux";

function ToolBar(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false)
  const dbName = localStorage.getItem("selectedDatabase");
  const token = localStorage.getItem("token");
  
  
  return (
    <nav className=" w-full h-[110px] border-b border-gray-700 flex items-center px-6 mt-6">
      <div className="flex space-x-4">
        <>
          <button
            type="button"
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
          <div className="border-r border-gray-300 h-8"></div>

          <button
            type="button"
            className="flex flex-col items-center border p-2 rounded-md hover:bg-gray-100"
          >
            <FontAwesomeIcon
              icon={faEdit}
              className="text-yellow-600 text-3xl"
            />
            <span className="text-sm font-semibold text-gray-700">
              Modifier
            </span>
          </button>
          <div className="border-r border-gray-300 h-8"></div>
          <div>
            <button
              type="button"
              onClick={() => {dispatch(getclientDelete())}}
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
            {/* Confirmer Suppression avec arrière plan flou */}
            {isDeleting && <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex items-center justify-center z-50">               
              <div className="bg-white p-8 rounded-md shadow-lg max-w-sm w-full">
                <p className="text-xl font-semibold mb-4">
                  Voulez-vous vraiment supprimer ce devis ?
                </p>
                <div className="flex justify-around">
                  <button
                    className="bg-red-600 text-white px-4 py-2 rounded-md"
                  >
                    Oui
                  </button>
                  <button
                    onClick={() => {setIsDeleting(false)}}
                    className="bg-gray-500 text-white px-4 py-2 rounded-md"
                  >
                    Non
                  </button>
                </div>
              </div> 
            </div> }
          </div>
          <div className="border-r border-gray-300 h-8"></div>
        </>
      </div>
    </nav>
  );
}

export default ToolBar;
