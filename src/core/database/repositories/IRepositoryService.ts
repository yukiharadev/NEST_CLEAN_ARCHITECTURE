import { DeepPartial, FindManyOptions, FindOneOptions } from 'typeorm';

export interface PaginatedResult<TEntity> {
    result: TEntity[];
    meta: {
        totalItems: number;
        itemCount: number;
        itemsPerPage: number;
        totalPages: number;
        currentPage: number;
    };
}

export interface PaginatedRequest {
    pageIndex: number;
    pageSize: number;
}


export interface IRepositoryService<TEntity, TKey = number | string> {
    findAll(options?: FindManyOptions<TEntity>): Promise<TEntity[]>;
    findOne(options: FindOneOptions<TEntity>): Promise<TEntity | null>;
    findById(id: TKey): Promise<TEntity | null>;
    findPaginated(request: PaginatedRequest, options?: FindManyOptions<TEntity>): Promise<PaginatedResult<TEntity>>;
    create(entity: DeepPartial<TEntity>): Promise<TEntity>;
    createMany(entities: DeepPartial<TEntity>[]): Promise<TEntity[]>;
    update(id: TKey, data: DeepPartial<TEntity>): Promise<TEntity | null>;
    updateMany(updates: { id: TKey; data: DeepPartial<TEntity> }[]): Promise<(TEntity | null)[]>;
    delete(id: TKey): Promise<boolean>;
    deleteMany(ids: TKey[]): Promise<number>;
    getQueryBuilder(alias?: string): any;

}