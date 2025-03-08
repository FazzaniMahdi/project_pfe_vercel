import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// * Thunk pour récupérer la liste des clients
export const getListeClient = createAsyncThunk(
  "slice/getListeClient",
  async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/client/SOLEVO/List`
    );
    return response.data.result;
  }
);
 //* recupere type client par client 
export const getTypeClient = createAsyncThunk(
  "Slice/getTypeClient",
  async (typecli) => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/client/SOLEVO/typeclient/${typecli}`
    );
    return response;
  }
);
//* recu^pere le cin par client 
export const getCin = createAsyncThunk(
  "Slice/getCin",
  async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/client/SOLEVO/getCin`
      
    );
    console.log(response)
    return response;
  }
);
export const getListeCodeClient = createAsyncThunk(
  "Slice/getListeClient",
  async (code) => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/client/SOLEVO/client/${code}`
    );
    console.log(response);
    return response.data.client;
  }
);
// * Thunk pour ajouter un client
export const ajouterClient = createAsyncThunk(
  "slice/ajouterClient",
  async (_, thunkApi) => {
    const clientInfos = thunkApi.getState().ClientCrud.clientInfos;
    console.log(clientInfos);
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/client/SOLEVO/Add`,
      {
        clientInfos,
      }
    );
    console.log(response);
    thunkApi.getState().uiStates.setAlertMessage(response.data.message);
    return response.data;
  }
);

// * Thunk pour mettre à jour un client
export const majClient = createAsyncThunk(
  "slice/majClient",
  async (_, thunkAPI) => {
    const clientUpdate = thunkAPI.getState().ClientCrud.clientInfos;

    const response = await axios.put(
      `${process.env.REACT_APP_API_URL}/api/client/SOLEVO/Update`,
      { clientUpdate } // htha y3niii bch tjib les donnes il kol htha body, ya3ni objet kamel mesh bel champ bel champ
    );
    return response.message;
  }
);

// * Thunk pour filtrer les clients (Correction ici)
export const filtrerClients = createAsyncThunk(
  "slice/filtrerClients",
  async (_, thunkAPI) => {
    // Passer `filters` en paramètre
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/client/SOLEVO/filterClient`,
      {
        params: {
          filters: thunkAPI.getState().ClientCrud.filters, // Utiliser filters ici
        },
      }
    );
    return response.data.data; // Retourner la réponse
  }
);
export const getListeparCode = createAsyncThunk(
  "devisSlice/getListeparCode",
  async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/client/SOLEVO/getListCode`
    );
    return response.data.liteCode;
  }
);

// * Thunk pour supprimer des clients par leurs codes
// * slice/supprimerClient identifiant unique pour la methode
export const supprimerClient = createAsyncThunk(
  "slice/supprimerClient",
  async (_, thunkAPI) => {
    const response = await axios.delete(
      `${process.env.REACT_APP_API_URL}/api/client/SOLEVO/Delete/`,
      {
        data: {
          clients: thunkAPI.getState().ClientCrud.clientsASupprimer,
        },
      }
    );
    return response.data;
  }
);

export const getDerniereCodeClient = createAsyncThunk(
  "clientSlice/getDerniereCodeClient",
  async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/client/SOLEVO/getDerniereCodeClient`
    );
    return response.data.derniereCodeClient.code;
  }
);

export const clientSlice = createSlice({
  name: "slice",
  initialState: {
    // * les champs doivenent etres initialisées à vide
    // * pour éviter des problème quand on
    // * les utilisent tant que valeurs par defaut
    clientInfos: {
      code: "",
      rsoc: "",
      adresse: "",
      cp: "",
      email: "",
      telephone: "",
      desrep: "",
      aval2: "",
      aval1: "",
      Commentaire: "",
      datemaj: "",
      userm: "",
      usera: "",
      fact: "",
      timbref: "",
      cltexport: "",
      suspfodec: "",
      regime: "",
      exon: "",
      majotva: "",
      fidel: "",
      datefinaut: "",
      datedebaut: "",
      decision: "",
      matriculef: "",
      reference: "",
      srisque: "",
      scredit: "",
      delregBL: "",
      delregFT: "",
      delregFC: "",
      remise: "",
      activite: "",
      typecli: "L",
      cin: "",

      secteur: {
        codesec: "",
        desisec: "",
      },
      region: {
        codergg: "",
        desirgg: "",
      },
      cpostal: {
        CODEp: "",
        desicp: "",
      },
    }, // * informations de formulaire de client
    listeClientsParCode: [],
    clientsASupprimer: [], // * tableau des codes de clients a supprimer. id reeelement code.
    status: "inactive",
    erreur: null,
    // todo: change this to french
    // todo: this is for later tho
    // todo: hence the "todo"
    // todo: todo
    filters: {
      code: "",
      rsoc: "",
      Matricule: "",
      telephone: "",
      fax: "",
      desrep: "",
    },
    insertionDepuisDevisForm: false,
  },
  reducers: {
    // * Action synchrone pour modifier les filtres
    setFiltresSaisient: (state, action) => {
      const { valeur, collonne } = action.payload;
      state.filters[collonne] = valeur; // Correction ici
    },
    setClientInfos: (state, action) => {
      // * actions fiha les donnes (payload)
      // * exemple d'objet action : action: {payload: {}}
      const { colonne, valeur } = action.payload;
      state.clientInfos[colonne] = valeur;
    }, // el reducer houwa haja simple
    setClientInfosEntiere: (state, action) => {
      state.clientInfos = action.payload;
    },
    setClientsASupprimer: (state, action) => {
      state.clientsASupprimer.push(action.payload);
    },
    setInsertionDepuisDevisForm: (state, action) => {
      state.insertionDepuisDevisForm = action.payload;
    },
  },
  // * on utilise l'objet builder pour replacer l'opérateur switch case ...
  // * l'objet builder nous permet d'écrire des cas plus lisibles et flexibles
  extraReducers: (builder) => {
    builder
      .addCase(getListeClient.pending, (state) => {
        state.status = "chargement";
      })
      .addCase(getListeClient.fulfilled, (state, action) => {
        state.status = "réussi";
        state.listeClients = action.payload;
      })
      .addCase(getListeClient.rejected, (state, action) => {
        state.status = "échoué";
        state.erreur = action.erreur;
      })

      .addCase(filtrerClients.pending, (state) => {
        state.status = "chargement";
      })
      .addCase(filtrerClients.fulfilled, (state, action) => {
        state.status = "réussi";
        state.listeClients = action.payload; // Mettre à jour la liste filtrée
      })
      .addCase(filtrerClients.rejected, (state, action) => {
        state.status = "échoué";
        state.erreur = action.erreur;
      })

      .addCase(supprimerClient.pending, (state) => {
        state.status = "chargement";
        console.log(state.status);
      })
      .addCase(supprimerClient.fulfilled, (state, action) => {
        state.status = "réussi";
        console.log(action.payload);
        console.log(state.status);
      })
      .addCase(supprimerClient.rejected, (state, action) => {
        state.status = "échoué";
        state.erreur = action.erreur;
        console.log(state.status);
      })

      .addCase(ajouterClient.pending, (state) => {
        state.status = "chargement";
      })
      .addCase(ajouterClient.fulfilled, (state, action) => {
        console.log(action);
        state.status = "réussi";
      })
      .addCase(ajouterClient.rejected, (state, action) => {
        console.log(action);
        state.status = "échoué";
        state.erreur = action.payload;
      })

      .addCase(majClient.pending, (state) => {
        state.status = "chargement";
      })
      .addCase(majClient.fulfilled, (state, action) => {
        state.status = "réussi";
      })
      .addCase(majClient.rejected, (state, action) => {
        console.log(action);
        state.status = "échoué";
        state.erreur = action.payload;
      })

      .addCase(getListeCodeClient.pending, (state) => {
        state.status = "chargement";
      })
      .addCase(getListeCodeClient.fulfilled, (state, action) => {
        console.log(action.payload);
        state.listeClientsParCode = action.payload;
        state.clientInfos = action.payload;
        state.status = "réussi";
      })
      .addCase(getListeCodeClient.rejected, (state, action) => {
        console.log(action);
        state.status = "échoué";
        state.erreur = action.payload;
      })

      .addCase(getListeparCode.pending, (state) => {
        state.status = "chargement";
      })
      .addCase(getListeparCode.fulfilled, (state, action) => {
        state.listeClientsParCode = action.payload;
        //state.clientInfos=action.payload;
        state.status = "réussi";
      })
      .addCase(getListeparCode.rejected, (state, action) => {
        console.log(action);
        state.status = "échoué";
        state.erreur = action.payload;
      })

      .addCase(getDerniereCodeClient.pending, (state) => {
        state.status = "chargement";
      })
      .addCase(getDerniereCodeClient.fulfilled, (state, action) => {
        state.clientInfos.code = (parseInt(action.payload) + 1).toString();
        state.status = "réussi";
      })
      .addCase(getDerniereCodeClient.rejected, (state, action) => {
        state.status = "échoué";
        state.erreur = action.payload;
      })

      .addCase(getTypeClient.pending, (state) => {
        state.status = "chargement";
      })
      .addCase(getTypeClient.fulfilled, (state, action) => {
        state.clientInfos.code = action.payload;
        state.status = "réussi";
      })
      .addCase(getTypeClient.rejected, (state, action) => {
        state.status = "échoué";
        state.erreur = action.payload;
      })

      .addCase(getCin.pending, (state) => {
        state.status = "chargement";
      })
      .addCase(getCin.fulfilled, (state, action) => {
        state.clientInfos.code = action.payload;
        state.status = "réussi";
      })
      .addCase(getCin.rejected, (state, action) => {
        state.status = "échoué";
        state.erreur = action.payload;
      });
  },
});

export const {
  setFiltresSaisient,
  setClientInfos,
  setClientsASupprimer,
  setClientInfosEntiere,
  setInsertionDepuisDevisForm,
} = clientSlice.actions;
export default clientSlice.reducer;
