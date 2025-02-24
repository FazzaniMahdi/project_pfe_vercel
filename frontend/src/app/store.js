import { configureStore } from '@reduxjs/toolkit'
import testSlice from './interface_slices/testSlice'
import clientSlice from '../app/client_slices/clientSlice'//thb te5oo js 
import uiSlice  from './interface_slices/uiSlice'
import  devisSlice  from './devis_slices/devisSlice'
export default configureStore(
{
    reducer:
    {
        test2: testSlice,
        ClientCrud : clientSlice , // client partie min store cle: clientcrud/valeur : clientslice
        uiStates:uiSlice,
        
        // Devis
        DevisCrud:devisSlice
    },
})
//bch nrmiha fiha les data mt3i kol 
