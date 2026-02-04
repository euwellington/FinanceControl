export interface IPaginated<T> {
    page: number;
    pageSize: number;
    totalRecords: number;
    totalPages: number;
    data: T[];
}

export interface IPaginatedTable {
    page: number;
    pageSize: number;
    totalPages: number;
    totalRecords: number;
}