import { AcademicStatus, Teacher } from './entitiesClasses';
import {Optional} from "../common/types";
import {AcademicStatusDTO} from "./entitiesDTO";

describe('Entities classes', () => {
  const mockAcademicStatusObj = {
    id: 1,
    name: 'test',
    shortName: 't',
  };

  it('should create academic status with all props', () => {
    const academicStatus = new AcademicStatus(mockAcademicStatusObj);

    expect(academicStatus).toEqual(mockAcademicStatusObj);
  });

  it('should have shown name', () => {
    const academicStatus = new AcademicStatus(mockAcademicStatusObj);
    expect(academicStatus.displayName).toBeDefined();
  });

  it('should be able to create entity with fields of entity type', () => {
    const teacher = new Teacher({
      id: 1,
      surname: 'Doe',
      firstName: 'John',
      patronymic: 'John',
      academicStatus: new AcademicStatus(mockAcademicStatusObj),
    });
  });

  it('should create empty entity', () => {
    const mockAcademicStatusObj: Optional<AcademicStatusDTO, 'id'> = {
      name: '',
      shortName: '',
    };

    expect(AcademicStatus.createEmpty()).toEqual(mockAcademicStatusObj);
  })
});
