export type NonNullableMapped<T> = { [P in keyof T]: NonNullable<T[P]> };
