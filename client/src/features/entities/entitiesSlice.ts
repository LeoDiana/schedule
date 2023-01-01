import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { allEntitiesRelated } from '../../entities/entitiesRelated';
import { AllEntitiesItems } from '../../common/types';
import { DayDTO, LessonTimeDTO } from '../../entities/entitiesDTO';

interface InitialState {
  status: 'idle' | 'loading' | 'succeeded' | 'failed',
  error: string | null,
  entities: AllEntitiesItems,
}

const initialState: InitialState = {
  status: 'idle',
  error: null,
  entities: {
    academicStatus: [],
    teacher: [],
    lessonTime: [],
    day: [],
    lessonType: [],
    subject: [],
    group: [],
    subgroup: [],
    weekType: [],
    building: [],
    classroom: [],
    lesson: [],
  },
};

export const entitiesSlice = createSlice({
  name: 'entities',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchEntities.fulfilled, (state, action) => {
      // console.log('action.payload');
      // console.log(action.payload);
      state.entities = action.payload;
    })
  }
});

export const fetchEntities = createAsyncThunk('entities/fetchEntities', async () => {
  const allFetched = await Promise.all(Object.values(allEntitiesRelated).map(entRelated => entRelated.api.readAll() as any));
  const result: any = {};
  Object.keys(allEntitiesRelated).forEach((key, i) => result[key] = allFetched[i]);
  return result as AllEntitiesItems;
})

// // the outside "thunk creator" function
// const fetchUserById = userId => {
//   // the inside "thunk function"
//   return async (dispatch, getState) => {
//     try {
//       // make an async call in the thunk
//       const user = await userAPI.fetchById(userId)
//       // dispatch an action when we get the response back
//       dispatch(userLoaded(user))
//     } catch (err) {
//       // If something went wrong, handle it here
//     }
//   }
// }

//export const { increment, decrement, incrementByAmount } = counterSlice.actions
export const selectAllEntities = (state: {entities: InitialState}) => state.entities.entities;
export const selectDays = (state: {entities: InitialState}) => state.entities.entities.day as DayDTO[];
export const selectLessonTimes = (state: {entities: InitialState}) => state.entities.entities.lessonTime as LessonTimeDTO[];

export default entitiesSlice.reducer;