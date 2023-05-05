import { AsyncThunk, createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { allEntitiesRelated } from '../../entities/entitiesRelated';
import { AllEntitiesItems, AllEntitiesNames, EntitiesNamesToTypes } from '../../common/types';
import { DayDTO, ID, LessonTimeDTO } from '../../entities/entitiesDTO';

interface CreateProps {
  entityName: AllEntitiesNames,
  entity: object
}

interface UpdateProps {
  entityName: AllEntitiesNames,
  entity: { id: ID }
}

interface DeleteProps {
  entityName: AllEntitiesNames,
  id: ID
}

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
      state.entities = action.payload;
      state.status = 'succeeded';
    }).addCase(fetchEntities.pending, (state, action) => {
      state.status = 'loading';
    }).addCase(deleteEntity.fulfilled, (state, action: PayloadAction<DeleteProps>) => {
      const { entityName, id } = action.payload;
      state.entities[entityName] = state.entities[entityName].filter((item) => item.id !== id);
    }).addCase(createEntity.fulfilled, (state, action: PayloadAction<CreateProps>) => {
      const { entityName, entity } = action.payload;
      state.entities[entityName].push(entity as EntitiesNamesToTypes[typeof entityName]);
    }).addCase(updateEntity.fulfilled, (state, action: PayloadAction<UpdateProps>) => {
      const { entityName, entity } = action.payload;
      state.entities[entityName] = state.entities[entityName].map((ent) => ent.id !== entity.id ? ent : entity as EntitiesNamesToTypes[typeof entityName]);
    });
  },
});

export const fetchEntities = createAsyncThunk('entities/fetchEntities', async () => {
  const allFetched = await Promise.all(Object.values(allEntitiesRelated).map(entRelated => entRelated.api.readAll() as any));
  const result: any = {};
  Object.keys(allEntitiesRelated).forEach((key, i) => result[key] = allFetched[i]);
  return result as AllEntitiesItems;
});

export type DeleteEntityApi = AsyncThunk<DeleteProps, DeleteProps, any>;
export const deleteEntity = createAsyncThunk<DeleteProps, DeleteProps>(
  'entities/deleteEntity',
  async ({ entityName, id }) => {
    await allEntitiesRelated[entityName].api.delete(id);
    return { entityName, id };
  });

export type CreateEntityApi = AsyncThunk<CreateProps, CreateProps, any>;
export const createEntity = createAsyncThunk<CreateProps, CreateProps>(
  'entities/createEntity',
  async ({ entityName, entity }) => {
    const result = await allEntitiesRelated[entityName].api.create(entity as any);
    return { entityName, entity: result.data };
  });

export type UpdateEntityApi = AsyncThunk<UpdateProps, UpdateProps, any>;
export const updateEntity = createAsyncThunk<UpdateProps, UpdateProps>(
  'entities/editEntity',
  async ({ entityName, entity }) => {
    const result = await allEntitiesRelated[entityName].api.update(entity as any);
    return { entityName, entity: result.data };
  });


export const selectAllEntities = (state: { entities: InitialState }) => state.entities.entities;
export const selectDays = (state: { entities: InitialState }) => state.entities.entities.day as DayDTO[];
export const selectLessonTimes = (state: { entities: InitialState }) => state.entities.entities.lessonTime as LessonTimeDTO[];
export const selectSubgroup = (state: { entities: InitialState }) => state.entities.entities.subgroup;
export const selectTeacher = (state: { entities: InitialState }) => state.entities.entities.teacher;
export const selectWeekType = (state: { entities: InitialState }) => state.entities.entities.weekType;
// export const selectLessons = (state: { entities: InitialState }) => state.entities.entities.lesson.map(lesson => allEntitiesRelated.lesson.create(lesson as any)) as Lesson[];

export const selectStatus = (state: { entities: InitialState }) => state.entities.status;

export default entitiesSlice.reducer;