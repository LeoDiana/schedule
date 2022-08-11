import { AcademicStatus } from './entitiesClasses';

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
    expect(academicStatus.shownName).toBeDefined();
  });
});
