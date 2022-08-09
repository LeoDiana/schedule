import { EntityApi } from './apiCalls';
import { AcademicStatus } from '../entities/entitiesClasses';
import mockAxios from 'jest-mock-axios';

describe('Entity CRUD operations', () => {
  let entityApi: EntityApi<AcademicStatus>;

  beforeEach(() => {
    entityApi = new EntityApi('academicStatus');
  });

  afterEach(() => {
    mockAxios.reset();
  });

  it('should be created for specific endpoint', () => {
    expect(entityApi.endpoint).toEqual('academic-statuses');
  });

  it('should implement all CRUD operations', () => {
    expect(entityApi.create).toBeDefined();
    expect(entityApi.update).toBeDefined();
    expect(entityApi.delete).toBeDefined();
    expect(entityApi.readAll).toBeDefined();
  });

  describe('operations should work both on resolve and error', () => {
    const serverError = new Error('Server error');

    const academicStatus = new AcademicStatus({ name: 'test', shortName: 't' });
    const academicStatusWithId = new AcademicStatus({ name: 'test', shortName: 't', id: 1 });
    const id = 1;

    it('create resolve', async () => {
      await entityApi.create(academicStatus);

      expect(mockAxios.post).toHaveBeenCalledWith('academic-statuses', academicStatus);
    });

    it('create error', async () => {
      mockAxios.post.mockRejectedValueOnce(serverError);

      await entityApi.create(academicStatus);

      expect(mockAxios.post).toHaveBeenCalledWith('academic-statuses', academicStatus);
    });

    it('update resolve', async () => {
      await entityApi.update(academicStatusWithId);

      expect(mockAxios.put).toHaveBeenCalledWith(
        `academic-statuses/${academicStatusWithId.id}`,
        academicStatusWithId,
      );
    });

    it('update error', async () => {
      mockAxios.put.mockRejectedValueOnce(serverError);

      await entityApi.update(academicStatusWithId);

      expect(mockAxios.put).toHaveBeenCalledWith(
        `academic-statuses/${academicStatusWithId.id}`,
        academicStatusWithId,
      );
    });

    it('should not update without id', async () => {
      await entityApi.update(academicStatus);
      expect(mockAxios.put).not.toHaveBeenCalled();
    });

    it('delete resolve', async () => {
      await entityApi.delete(id);

      expect(mockAxios.delete).toHaveBeenCalledWith(`academic-statuses/${id}`);
    });

    it('delete error', async () => {
      mockAxios.delete.mockRejectedValueOnce(serverError);

      await entityApi.delete(id);

      expect(mockAxios.delete).toHaveBeenCalledWith(`academic-statuses/${id}`);
    });

    it('read all resolve', async () => {
      const entities = [academicStatusWithId];
      const mockResponse = { data: entities };
      mockAxios.get.mockResolvedValueOnce(mockResponse);

      const response = await entityApi.readAll();

      expect(mockAxios.get).toHaveBeenCalledWith('academic-statuses');
      expect(response).toEqual(entities);
    });

    it('read all error', async () => {
      mockAxios.get.mockRejectedValueOnce(serverError);

      const response = await entityApi.readAll();

      expect(mockAxios.get).toHaveBeenCalledWith('academic-statuses');
      expect(response).toEqual([]);
    });
  });

  it.todo('class for current DB');
});
