export interface IBaseRepository<T> {
  getById(id: number): Promise<T>;
  create(entity: T): Promise<T>;
  update(entity: T): Promise<T>;
  remove(entity: T): Promise<T>;
}
