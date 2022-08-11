export interface AcademicStatusDTO {
  id: number;
  name: string;
  shortName: string;
}

// base class with id and shownName

export class AcademicStatus implements AcademicStatusDTO {
  id: number;
  name: string;
  shortName: string;

  public get shownName(): string {
    return `${this.shortName}.`;
  }

  constructor(obj: AcademicStatusDTO & { id: number }) {
    // const { name = '', shortName = '', id = undefined } = obj || {};
    const { name, shortName, id } = obj;
    this.name = name;
    this.shortName = shortName;
    this.id = id;
  }
}
