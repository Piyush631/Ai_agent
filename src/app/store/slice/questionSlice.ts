import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface QuestionState {
  jobposition: string;
  jobdescription: string;
  duration: string;
  interviewtype: string[];
  question: any;
  userId: number;
  candidateName: string;
  candidateEmail: string;
}

const initialState: QuestionState = {
  jobposition: "",
  jobdescription: "",
  duration: "",
  interviewtype: [],
  question: [],
  userId: 0,
  candidateName: "",
  candidateEmail: "",
};

const questionSlice = createSlice({
  name: "question",
  initialState,
  reducers: {
    setQuestion: (state, action: PayloadAction<QuestionState>) => {
      state.jobposition = action.payload.jobposition;
      state.jobdescription = action.payload.jobdescription;
      state.duration = action.payload.duration;
      state.interviewtype = action.payload.interviewtype;
      state.question = action.payload.question;
      state.userId = action.payload.userId;
      state.candidateName = action.payload.candidateName;
      state.candidateEmail = action.payload.candidateEmail;
    },
  },
});

export const { setQuestion } = questionSlice.actions;
export default questionSlice.reducer;
