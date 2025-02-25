import { createSlice } from "@reduxjs/toolkit";

export const uiSlice = createSlice({
  name: "uiSlice",
  initialState: {
    // * states pour l'affichage d'un alert
    // * message: message d'alert
    // * afficherAlert: visibilité d'alert
    // * typeAlert : warning, success, error...
    message: "initial alert message",
    afficherAlert: false,
    typeAlert: "",
    // *state alerte model
    afficherAlertModal: false,
    messageAlertModal: "",
    // * state pour vider les champs de clientInfos: 
    // * false : ne pas appeler la fonction qui vide les champs
    // * true : appeler la fonction qui vide les champs
    clearAppele: false,
    // * state pour déterminer quelle table on utilise
    // * puisque toolbar est un composant common de
    // * client et devis pour le moment
    toolbarTable: "",
    // * state pour activer/ desactiver les champs de formulaire
    // * selon le mode
    activerChampsForm: false
  },
  reducers: {
    setAlertMessage: (state, action) => {
      state.message = action.payload;
      state.afficherAlert = true;
    },
    toggleAlert: (state) => {
      state.afficherAlert = !state.afficherAlert;
    },
    setTypeAlert: (state, action) => {
      state.typeAlert = action.payload;
    },

    /// Alerte  moch simple
    setMessageAlertModal: (state, action) => {
      state.messageAlertModal = action.payload;
    },
    setAfficherAlertModal: (state, action) => {
      state.afficherAlertModal = action.payload;
    },

    setClearAppele: (state, action) => {
      state.clearAppele = action.payload;
    },
    setToolbarTable: (state, action) => {
      state.toolbarTable = action.payload;
    },
    setActiverChampsForm: (state, action) => {
      state.activerChampsForm = action.payload;
    }
  },
});
export const {
  setAlertMessage,
  toggleAlert,
  setTypeAlert,
  setMessageAlertModal,
  setAfficherAlertModal,
  setClearAppele,
  setToolbarTable,
  setActiverChampsForm
} = uiSlice.actions;
export default uiSlice.reducer;
