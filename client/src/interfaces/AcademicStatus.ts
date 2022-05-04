export interface AcademicStatus {
  id?: string;
  name: string;
  shortName: string;
}

export interface AcademicStatusId extends AcademicStatus {
  id: string;
}
