export type Success<T> = { readonly isSuccess: true; readonly value: T };
export type Failure<E> = { readonly isSuccess: false; readonly error: E };

export type Result<T, E> = Success<T> | Failure<E>;

export const success = <T>(value: T): Success<T> => ({
  isSuccess: true,
  value,
});
export const failure = <E>(error: E): Failure<E> => ({
  isSuccess: false,
  error,
});
