import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    id:'',
    mail:'',
    token:'',
    userType:'',
    first_name :'',
    last_name :'',
    phone_number :'',
    date_of_birth :'',
    image :'',
  },
  reducers: {
    updateId : (state,action)=>{
        state.id = action.payload
    },
    updateMail : (state,action)=>{
        state.mail = action.payload
    },
    updateToken : (state,action)=>{
        state.token = action.payload
        localStorage.setItem("Token",state.token)
    },
    updateUserType : (state,action)=>{
        state.userType = action.payload
    },
    updateFirstName : (state,action)=>{
        state.first_name = action.payload
    },
    updateLastName : (state,action)=>{
        state.last_name = action.payload
    },
    updatePhoneNumber : (state,action)=>{
        state.phone_number = action.payload
    },
    updateDateOfBirth : (state,action)=>{
        state.date_of_birth = action.payload
    },
    updateImage : (state,action)=>{
        state.image = action.payload
    },
    
    updateCredentials : (state,action)=>
    {
        state.id=action.payload.user.id
        state.mail=action.payload.user.mail
        state.token=action.payload.Token
        state.userType=action.payload.UserType
        state.first_name=action.payload.user.first_name?action.payload.user.first_name:null
        state.last_name=action.payload.user.last_name?action.payload.user.last_name:null
        state.phone_number=action.payload.user.phone_number?action.payload.user.phone_number:null
        state.date_of_birth=action.payload.user.date_of_birth?action.payload.user.date_of_birth:null
        state.image=action.payload.user.image?action.payload.user.image:null
        
    }
  }
})

// Action creators are generated for each case reducer function
export const { updateId,updateEmail,updateToken, updateUserType,updateFirstName,updateLastName,updatePhoneNumber,updateDateOfBirth,updateImage,updateCredentials } = userSlice.actions

export default userSlice.reducer