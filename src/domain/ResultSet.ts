
export interface ResultSet<T extends {id: number}> {
    count: number
    next: string | null
    previous: string | null
    results: T[]
}
