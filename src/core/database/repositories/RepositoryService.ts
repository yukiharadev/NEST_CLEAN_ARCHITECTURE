import {
    FindManyOptions,
    FindOneOptions,
    DeepPartial,
    Repository,
    ObjectLiteral,
} from 'typeorm';
import {
    IRepositoryService,
    PaginatedRequest,
    PaginatedResult,
} from './IRepositoryService';
import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class RepositoryService<
    TEntity extends ObjectLiteral,
    TKey = number | string,
> implements IRepositoryService<TEntity, TKey> {
    protected constructor(
        protected readonly repository: Repository<TEntity>,
    ) { }

    async findAll(options?: FindManyOptions<TEntity>): Promise<TEntity[]> {
        return this.repository.find(options);
    }

    async findOne(options: FindOneOptions<TEntity>): Promise<TEntity | null> {
        return this.repository.findOne(options);
    }

    async findById(id: TKey): Promise<TEntity | null> {
        return this.repository.findOneBy({ id } as any);
    }

    async findPaginated(
        request: PaginatedRequest,
        options?: FindManyOptions<TEntity>,
    ): Promise<PaginatedResult<TEntity>> {
        const page = Math.max(request.pageIndex ?? 1, 1);
        const pageSize = Math.max(request.pageSize ?? 10, 1);

        // pageIndex is 1-based; TypeORM skip is 0-based
        const skip = (page - 1) * pageSize;
        const take = pageSize;

        const [data, total] = await this.repository.findAndCount({
            ...options,
            skip,
            take,
        });

        return {
            result: data,
            meta: {
                totalItems: total,
                itemCount: data.length,
                itemsPerPage: pageSize,
                totalPages: Math.ceil(total / pageSize),
                currentPage: page,
            },
        };
    }


    async create(entity: DeepPartial<TEntity>): Promise<TEntity> {
        const created = this.repository.create(entity);
        return this.repository.save(created);
    }

    async createMany(entities: DeepPartial<TEntity>[]): Promise<TEntity[]> {
        const created = this.repository.create(entities);
        return this.repository.save(created);
    }

    async update(
        id: TKey,
        data: DeepPartial<TEntity>,
    ): Promise<TEntity | null> {
        const entity = await this.findById(id);
        if (!entity) return null;

        Object.assign(entity, data);
        return this.repository.save(entity);
    }

    async updateMany(
        updates: { id: TKey; data: DeepPartial<TEntity> }[],
    ): Promise<(TEntity | null)[]> {
        return Promise.all(
            updates.map(({ id, data }) => this.update(id, data)),
        );
    }

    async delete(id: TKey): Promise<boolean> {
        const result = await this.repository.delete(id as any);
        return (result.affected ?? 0) > 0;
    }

    async deleteMany(ids: TKey[]): Promise<number> {
        const result = await this.repository.delete(ids as any);
        return result.affected ?? 0;
    }

    getQueryBuilder(alias?: string) {
        return this.repository.createQueryBuilder(
            alias ?? this.repository.metadata.tableName,
        );
    }
}
