import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AllEntities, AllEntitiesOfType, FieldsOfType } from '../../common/types';
import { commonEntitiesInfo } from '../../common/entitiesInfo';

/*
entities.academicStatus[0].name

filters for lessons
1. if lesson not in schedule


dublicate

actual state | editing state. *press on save* -> update actual state
*/

type EntitiesState = AllEntitiesOfType<FieldsOfType<AllEntities>[]> & {
  status: string;
  error: any;
};

const initialState: EntitiesState = {
  academicStatus: [{ name: 'test', shortName: 'Test' }],
  teacher: [],
  subject: [],
  lessonType: [],
  lessonTime: [],
  day: [],
  weekType: [],
  building: [],
  classroom: [],
  subgroup: [],
  group: [],
  lesson: [],
  status: 'idle',
  error: null,
};

// const initialState: EntitiesState = {
//   academicStatus: AcademicStatus[],
//   teacher: Teacher[],
//   subject: Subject[],
//   lessonType: LessonType[],
//   lessonTime: LessonTime[],
//   day: Day[],
//   weekType: WeekType[],
//   building: Building[],
//   classroom: Classroom[],
//   subgroup: Subgroup[],
//   group: Group[],
//   lesson: Lesson[],
// };

// fetch all entities

export const entitiesSlice = createSlice({
  name: 'entities',
  initialState,
  reducers: {
    // create: (state) => {},
    // delete: (state) => {},
    // update: (state) => {},
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllEntities.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const selectAllEntitiesOfType = (state: any, entityType: AllEntities) => {
  return state.entities[entityType];
};

export const fetchAllEntities = createAsyncThunk('entities/fetchEntities', async () => {
  const response: EntitiesState = {} as EntitiesState;
  let entityName: keyof typeof commonEntitiesInfo;
  for (entityName in commonEntitiesInfo) {
    response[entityName] = (await commonEntitiesInfo[
      entityName
    ].api.readAll()) as FieldsOfType<AllEntities>[];
  }
  return response;
});

export const fetchEntitiesOfType = createAsyncThunk(
  'entities/fetchEntities',
  async (entityType: AllEntities) => {
    return await commonEntitiesInfo[entityType].api.readAll();
  },
);

export default entitiesSlice.reducer;
