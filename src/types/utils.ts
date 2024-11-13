/**
 * Exclude all index signature keys from a type.
 *
 * @example
 * type A = {
 *   [key: string]: string;
 *   foo: string;
 *   bar: number;
 * };
 * type B = ExcludeIndex<A>; // { foo: string; bar: number; }
 */
type ExcludeIndex<T> = T extends any
  ? T extends { [key: string]: any }
    ? { [K in keyof T as string extends K ? never : K]: T[K] }
    : T
  : T;
