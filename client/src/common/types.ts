import { AcademicStatus, AcademicStatusDTO } from '../entities/entitiesClasses';

export type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

type EntitiesNamesToTypes = {
  academicStatus: AcademicStatus;
};

export type AllEntities = EntitiesNamesToTypes[keyof EntitiesNamesToTypes];
export type AllEntitiesNames = keyof EntitiesNamesToTypes;

export type DtoOfEntity<T extends AllEntities> = T extends AcademicStatus
  ? AcademicStatusDTO
  : never;
