import { AcademicStatus, Teacher } from '../entities/entitiesClasses';
import { AcademicStatusDTO, TeacherDTO } from '../entities/entitiesDTO';

export type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

export type EntitiesNamesToTypes = {
  academicStatus: AcademicStatus;
  teacher: Teacher;
};

export type AllEntities = EntitiesNamesToTypes[keyof EntitiesNamesToTypes];
export type AllEntitiesNames = keyof EntitiesNamesToTypes;

export type DtoOfEntity<T extends AllEntities> = T extends AcademicStatus
  ? AcademicStatusDTO
  : T extends Teacher
  ? TeacherDTO
  : never;

type DtoFieldsToCorrespondingClasses<T extends DtoOfEntity<AllEntities>> = {
  [K in keyof T]: K extends AllEntitiesNames ? EntitiesNamesToTypes[K] : T[K];
};
export type ConstructorFor<T extends DtoOfEntity<AllEntities>> = DtoFieldsToCorrespondingClasses<T>;

// export type DtoOfEntityName<T extends AllEntitiesNames> = T extends 'academicStatus'
//   ? AcademicStatusDTO
//   : never;
