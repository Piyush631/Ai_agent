import { createSlice ,PayloadAction} from "@reduxjs/toolkit";

interface QuestionState{
    jobposition:String
  jobdescription:String
  duration:String
  interviewtype:String[]  
  question:any
  userId:number

}
const initialState:QuestionState={
    jobposition:"",
    jobdescription:"",
    duration:"",
    interviewtype:[],
    question:[],
    userId:0
    

}
const questionSlice=createSlice({
    name:"question",
    initialState,
    reducers:{
                
    }
})

