import {AcademicStatusRelated, allEntitiesRelated} from './entitiesRelated';
import { AcademicStatusDTO } from './entitiesDTO';
import {DtoOfEntity, Optional} from "../common/types";

describe('Entities related', () => {
  // it('should has name', () => {
  //   const entityRelated = new EntityRelated();
  //
  //   expect(entityRelated.name).toBeDefined();
  // });

  let academicStatusRelated: AcademicStatusRelated;

  beforeAll(() => {
    academicStatusRelated = new AcademicStatusRelated();
  });

  // it('should create academic status related object', () => {
  //   const academicStatusRelated = new AcademicStatusRelated();
  //
  //   expect(academicStatusRelated.name).toEqual('academicStatus');
  // });

  it('should create empty academic status object', () => {
    const mockAcademicStatusObj: Optional<AcademicStatusDTO, 'id'> = {
      name: '',
      shortName: '',
    };

    expect(academicStatusRelated.createEmpty()).toEqual(mockAcademicStatusObj);
  });

  it('should create academic status object from props', () => {
    const mockAcademicStatusObj: AcademicStatusDTO = {
      id: 1,
      name: 'test',
      shortName: 't',
    };

    expect(academicStatusRelated.create(mockAcademicStatusObj)).toEqual(mockAcademicStatusObj);
  });

  it('should have related api', () => {
    expect(academicStatusRelated.api).toBeDefined();
  });

  it('should have all entities related functionality in allEntitiesRelated', () => {
    expect(allEntitiesRelated).toBeDefined();
  })

  it('should have fields', () => {
    expect(academicStatusRelated.fields).toBeDefined();
  })
});

