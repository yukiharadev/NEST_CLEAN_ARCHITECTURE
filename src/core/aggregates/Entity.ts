export abstract class Entity<TValue = any> {
    constructor(protected readonly id: TValue) {}
    getId(): TValue {
        return this.id;
    }
}