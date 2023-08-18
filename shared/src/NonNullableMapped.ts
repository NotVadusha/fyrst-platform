// eslint-disable-next-line @typescript-eslint/ban-types
export type NonNullableMapped<T> = { [P in keyof T]: T[P] & {} };
