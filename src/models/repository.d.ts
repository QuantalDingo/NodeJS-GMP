export interface Repository<T> {
	create(item: T): Promise<T>;
	delete(id: string): Promise<T>;
	findAll<K extends keyof T>(key: K, value: T[K], take?: number): Promise<T[]>;
	find(id: string): Promise<T | null>;
	update(id: string, item: Partial<T>): Promise<T>;
}
