//TODO: implement subtypes for nested objects (ex: parent.id: 1)
export type PartialProjectionType<T> = {
  [key in keyof T]?: 1 | 0
}
