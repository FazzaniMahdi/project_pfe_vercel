import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// * Action asynchrone pour récupérer la liste des devis
export const getDevisList = createAsyncThunk("slice/getDevisList", async () => {
  const response = await axios.get(
    `${process.env.REACT_APP_API_URL}/api/devis/SOLEVO/devis`
  );
  return response.data.devisList;
});

export const getLigneArticle = createAsyncThunk(
  "slice/getLigneArticle",
  async (NumBL) => {
    console.log(NumBL);
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/devis/SOLEVO/getLigneArticle`,
      {
        params: { NumBL },
      },
    );
    console.log(response)
    return response.data.listeArticle;
  }
);

// * Action asynchrone pour ajouter un devis
export const AjouterDevis = createAsyncThunk(
  "slice/AddDevis",
  async (_, thunkAPI) => {
    console.log("ddd");
    const devisInfo = thunkAPI.getState().DevisCrud.devisInfo;
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/devis/SOLEVO/create`,
      { devisInfo }
    );
    console.log(response);
    return response.data.devis;
  }
);
// * Action asynchrone pour récupérer le nombre des devis générées
export const getNombrededevis = createAsyncThunk(
  "Slice/getNmobredevis",
  async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/devis/SOLEVO/devis/total`
    );
    return response.data.totalDevis;
  }
);

// * Action asynchrone pour récupérer la totalité des chiffres des devis
export const getTotalChifre = createAsyncThunk(
  "slice/getNombreTotal",
  async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/devis/SOLEVO/devis/totalchiffre`
    );
    console.log(response);
    return response.data.totalchifre;
  }
);
// * Action asynchrone pour récupérer un devis par son code
export const getDevisParNUMBL = createAsyncThunk(
  "Slice/getDevisParNUMBL",
  async (NUMBL) => {
    const codeuser = localStorage.getItem("codeuser");
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/devis/SOLEVO/getDevisParNUMBL`,
      {
        params: {
          NUMBL,
          codeuser
        },
      }
    );
    return response.data.devis;
  }
);
// * Action asynchrone pour récupérer la liste des devis par montant
export const getDevisParMontant = createAsyncThunk(
  "devisSlice/getDevisParMontant",
  async (montant) => {
    const codeuser = localStorage.getItem("codeuser");
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/devis/SOLEVO/getDevisParMontant`,
      {
        params: {
          montant,
          codeuser
        },
      }
    );
    console.log(response);
    return response.data.devis;
  }
);
// * Action asynchrone pour récupérer la liste des devis pour un client
export const getDevisParCodeClient = createAsyncThunk(
  "slice/getDevisParCodeClient",
  async (CODECLI) => {
    const codeuser = localStorage.getItem("codeuser");
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/devis/SOLEVO/getDevisParClient`,
      {
        params: {
          CODECLI,
          codeuser
        },
      }
    );

    return response.data.devis;
  }
);
export const getInfoUtilisateur = createAsyncThunk(
  "slice/getInfoUtilisateur",
  async (usera) => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/devis/SOLEVO/getInfoUtilisateur`,
      {
        params: {
          usera,
        },
      }
    );
    console.log(response);
    return response.data.utilisateur;
  }
);
// * Action asynchrone pour récupérer la liste des devis pendant une période spécifique
export const getDevisParPeriode = createAsyncThunk(
  "slice/getDevisParPeriode",
  async (DATEBL) => {
    const codeuser = localStorage.getItem("codeuser");
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/devis/SOLEVO/getDevisParPeriode`,
      {
        params: {
          DATEBL,
          codeuser
        },
      }
    );
    return response.data.devis;
  }
);

// * Action asynchrone pour récupérer la liste des codes des devis
export const getListeNumbl = createAsyncThunk(
  "devisSlice/getListeNUMBL",
  async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/devis/SOLEVO/getListeNUMBL`
    );
    return response.data.listeNUMBL;
  }
);

// * Action asynchrone pour récupérer la liste des points de vente d'une societé
export const getListePointsVente = createAsyncThunk(
  "devisSlice/getListePointsVente",
  async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/devis/SOLEVO/getListePointVente`
    );

    return response.data.pointsVenteDistincts;
  }
);

export const devisSlice = createSlice({
  name: "devisSlice",
  initialState: {
    // * liste de devis
    devisList: [],
    // * liste de codes de devis
    listeNUMBL: [],
    // * liste de points de vente
    listePointsVente: [],
    // * informations du formulaire de devis
    devisInfo: {
      NUMBL: "",
      libpv: "",
      ADRCLI: "",
      CODECLI: "",
      cp: "",
      DATEBL: new Date().toLocaleDateString("fr-FR"),
      MREMISE: "",
      MTTC: "",
      comm: "",
      RSREP: "",
      CODEREP: "",
      TIMBRE:"",
      usera: "",
      RSCLI: "",
      codesecteur: "",
      MHT: "",
      articles: [],
    },
    totalchifre: 0,
    nombreDeDevis: 0,
    status: null,
    error: null,
  },
  reducers: {
    setDevisInfo: (state, action) => {
      const { collone, valeur } = action.payload;
      state.devisInfo[collone] = valeur;
    },
    setDevisList: (state, action) => {
      state.devisList = action.payload;
    },
    setDevisInfoEntiere: (state, action) => {
      state.devisInfo = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getDevisList.pending, (state) => {
        state.status = "chargement";
      })
      .addCase(getDevisList.fulfilled, (state, action) => {
        state.status = "reussi";
        state.devisList = action.payload;
      })
      .addCase(getDevisList.rejected, (state, action) => {
        state.status = "echoue";
        state.error = action.error.message;
      })
      .addCase(AjouterDevis.pending, (state) => {
        state.status = "chargement";
      })
      .addCase(AjouterDevis.fulfilled, (state, action) => {
        state.status = "reussi";
      })
      .addCase(AjouterDevis.rejected, (state, action) => {
        state.erreur = action.payload;
        state.status = "echoue";
      })
      .addCase(getNombrededevis.pending, (state) => {
        state.status = "chargeement";
      })
      .addCase(getNombrededevis.fulfilled, (state, action) => {
        state.nombreDeDevis = action.payload;
        state.status = "reussi";
      })
      .addCase(getNombrededevis.rejected, (state, action) => {
        state.erreur = action.payload;
        state.status = "echoue";
      })

      .addCase(getTotalChifre.pending, (state) => {
        state.status = "chargeement";
      })
      .addCase(getTotalChifre.fulfilled, (state, action) => {
        state.totalchifre = action.payload;
        state.status = "reussi";
      })
      .addCase(getTotalChifre.rejected, (state, action) => {
        state.erreur = action.payload;
        state.status = "echoue";
      })

      .addCase(getDevisParNUMBL.pending, (state) => {
        state.status = "chargeement";
      })
      .addCase(getDevisParNUMBL.fulfilled, (state, action) => {
        state.devisList = action.payload;
        state.devisInfo = action.payload[0];
        state.status = "reussi";
      })
      .addCase(getDevisParNUMBL.rejected, (state, action) => {
        state.erreur = action.payload;
        state.status = "echoue";
      })

      .addCase(getDevisParCodeClient.pending, (state) => {
        state.status = "chargeement";
      })
      .addCase(getDevisParCodeClient.fulfilled, (state, action) => {
        state.devisList = action.payload;
        state.status = "reussi";
      })
      .addCase(getDevisParCodeClient.rejected, (state, action) => {
        state.devisInfo = action.payload;
        state.status = "echoue";
      })

      .addCase(getDevisParMontant.pending, (state) => {
        state.status = "chargeement";
      })
      .addCase(getDevisParMontant.fulfilled, (state, action) => {
        state.devisList = action.payload;
        state.status = "reussi";
      })
      .addCase(getDevisParMontant.rejected, (state, action) => {
        state.status = "echoue";
        state.erreur = action.payload;
      })

      .addCase(getDevisParPeriode.pending, (state) => {
        state.status = "chargeement";
      })
      .addCase(getDevisParPeriode.fulfilled, (state, action) => {
        state.devisList = action.payload;
        state.status = "reussi";
      })
      .addCase(getDevisParPeriode.rejected, (state, action) => {
        state.erreur = action.payload;
        state.status = "echoue";
      })

      .addCase(getListeNumbl.pending, (state) => {
        state.status = "chargement";
      })
      .addCase(getListeNumbl.fulfilled, (state, action) => {
        state.listeNUMBL = action.payload;
        state.status = "reussi";
      })
      .addCase(getListeNumbl.rejected, (state, action) => {
        state.erreur = action.payload;
        state.status = "echoue";
      })

      .addCase(getListePointsVente.pending, (state) => {
        state.status = "chargement";
      })
      .addCase(getListePointsVente.fulfilled, (state, action) => {
        state.listePointsVente = action.payload;
        state.status = "reussi";
      })
      .addCase(getListePointsVente.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "echoue";
      })

      .addCase(getInfoUtilisateur.pending, (state) => {
        state.status = "chargement";
      })
      .addCase(getInfoUtilisateur.fulfilled, (state, action) => {
        state.devisList = action.payload;
        state.status = "reussi";
      })
      .addCase(getInfoUtilisateur.rejected, (state, action) => {
        state.erreur = action.payload;
        state.status = "echoue";
      })

      .addCase(getLigneArticle.pending, (state) => {
        state.status = "chargement";
      })
      .addCase(getLigneArticle.fulfilled, (state, action) => {
        // state.devisInfo = action.payload[0];
        state.devisInfo.articles = action.payload;
        console.log(action.payload);
        state.status = "reussi";
      })
      .addCase(getLigneArticle.rejected, (state, action) => {
        state.erreur = action.payload;
        state.status = "echoue";
      });
  },
});
export const { setDevisInfo, setDevisList, setDevisInfoEntiere } =
  devisSlice.actions;

export default devisSlice.reducer;
