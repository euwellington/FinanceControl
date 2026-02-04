export type ValidationRule<T> = {
  required?: boolean
  validate?: (value: T) => string | undefined
}

export type ValidationRules<T> = {
  [K in keyof T]?: ValidationRule<T[K]>
}