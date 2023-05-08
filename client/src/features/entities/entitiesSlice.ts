import { AsyncThunk, createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { allEntitiesRelated } from '../../entities/entitiesRelated';
import { AllEntitiesItems, AllEntitiesNames, EntitiesNamesToTypes, FilterType } from '../../common/types';
import { ID, LessonDTO, WeekTypeDTO } from '../../entities/entitiesDTO';
import { RootState } from '../../app/store';

interface CreatePropsGeneral <T extends AllEntitiesNames> {
  entityName: T,
  entity: EntitiesNamesToTypes[T]
}
type CreateProps = CreatePropsGeneral <AllEntitiesNames>;

interface UpdatePropsGeneral<T extends AllEntitiesNames> {
  entityName: T,
  entity: EntitiesNamesToTypes[T]
}
type UpdateProps = UpdatePropsGeneral<AllEntitiesNames>;

interface DeleteProps {
  entityName: AllEntitiesNames,
  id: ID
}

export interface EntitiesInitialState {
  status: 'idle' | 'loading' | 'succeeded' | 'failed',
  error: string | null,
  entities: AllEntitiesItems,
}

const initialState: EntitiesInitialState = {
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
      const entityStore: Array<EntitiesNamesToTypes[typeof entityName]> = state.entities[entityName];
      entityStore.filter((item) => item.id !== id);
    }).addCase(createEntity.fulfilled, (state, action: PayloadAction<CreateProps>) => {
      const { entityName, entity } = action.payload;
      const entityStore: Array<EntitiesNamesToTypes[typeof entityName]> = state.entities[entityName];
      entityStore.push(entity);
    }).addCase(updateEntity.fulfilled, (state, action: PayloadAction<UpdateProps>) => {
      const { entityName, entity } = action.payload;
      const entityStore: Array<EntitiesNamesToTypes[typeof entityName]> = state.entities[entityName];
      (state.entities[entityName] as Array<EntitiesNamesToTypes[typeof entityName]>) = entityStore.map((ent) => ent.id !== entity.id ? ent : entity);
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
    const result = await allEntitiesRelated[entityName].api.create(entity);
    return { entityName, entity: result.data };
  });

export type UpdateEntityApi = AsyncThunk<UpdateProps, UpdateProps, any>;
export const updateEntity = createAsyncThunk<UpdateProps, UpdateProps>(
  'entities/editEntity',
  async ({ entityName, entity }) => {
    const result = await allEntitiesRelated[entityName].api.update(entity);
    return { entityName, entity: result.data };
  });


export const selectAllEntities = (state: RootState) => state.entities.entities;
export const selectDays = (state: RootState) => state.entities.entities.day;
export const selectLessonTimes = (state: RootState) => state.entities.entities.lessonTime;
export const selectSubgroup = (state: RootState) => state.entities.entities.subgroup;
export const selectTeacher = (state: RootState) => state.entities.entities.teacher;
export const selectWeekType = (state: RootState) => state.entities.entities.weekType;
export const selectFilteredLessons = (
  state: RootState,
  weekType: WeekTypeDTO,
  filter: FilterType,
  filteredEntity: { id: ID }
) => state.entities.entities.lesson
  .filter((l) => l.weekType?.id === weekType.id
    && l[filter]?.id === filteredEntity.id) as LessonDTO[];
export const selectLessons = (state: RootState) => state.entities.entities.lesson;

export const selectStatus = (state: RootState) => state.entities.status;

export default entitiesSlice.reducer;