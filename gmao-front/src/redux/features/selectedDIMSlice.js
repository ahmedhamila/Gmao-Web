import { createSlice } from '@reduxjs/toolkit'

export const selectedDIMSlice = createSlice({
  name: 'selectedDIM',
  initialState: {
    refDIM:'',
    equipement:'',
    section:'',
    
  },
  reducers: {
    updateRefDIM: (state,action)=>{
        state.refDIM = action.payload
    },
    updateEquipement: (state,action)=>{
        state.equipement = action.payload
    },
    updateSection: (state,action)=>{
        state.section = action.payload
    },
    
    updateSelectedDIM : (state,action)=>
    {
        
        state.refDIM=action.payload.refDIM
        state.equipement=action.payload.equipement
        state.section=action.payload.section
        
    }
  }
})

// Action creators are generated for each case reducer function
export const { updateRefDIM,updateEquipement,updateSection,updateSelectedDIM } = selectedDIMSlice.actions

export default selectedDIMSlice.reducer