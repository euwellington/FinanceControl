export const isEmail = (value: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(value)
}

export const isPhone = (value: string): boolean => {
  const regex = /^[0-9]{10,11}$/ // aceita 10 ou 11 dígitos
  return regex.test(value)
}

export const isCep = (value: string): boolean => {
  const regex = /^[0-9]{5}-?[0-9]{3}$/ // 00000-000 ou 00000000
  return regex.test(value)
}

export const minLength = (value: string, length: number): boolean => {
  return typeof value === "string" && value.trim().length >= length
}

// valida CPF (somente números, 11 dígitos)
export const isCpf = (value: string): boolean => {
  const regex = /^\d{11}$/
  if (!regex.test(value)) return false

  let sum = 0
  let remainder

  if (/^(\d)\1+$/.test(value)) return false

  for (let i = 1; i <= 9; i++) sum += parseInt(value.substring(i - 1, i)) * (11 - i)
  remainder = (sum * 10) % 11
  if (remainder === 10 || remainder === 11) remainder = 0
  if (remainder !== parseInt(value.substring(9, 10))) return false

  sum = 0
  for (let i = 1; i <= 10; i++) sum += parseInt(value.substring(i - 1, i)) * (12 - i)
  remainder = (sum * 10) % 11
  if (remainder === 10 || remainder === 11) remainder = 0
  if (remainder !== parseInt(value.substring(10, 11))) return false

  return true
}

// valida CNPJ (somente números, 14 dígitos)
export const isCnpj = (value: string): boolean => {
  const regex = /^\d{14}$/
  if (!regex.test(value)) return false

  if (/^(\d)\1+$/.test(value)) return false

  const calc = (x: number) => {
    const numbers = value.substring(0, x)
    const digits = value.substring(x)
    let sum = 0
    let pos = x - 7
    for (let i = x; i >= 1; i--) {
      sum += parseInt(numbers[x - i]) * pos--
      if (pos < 2) pos = 9
    }
    const result = sum % 11 < 2 ? 0 : 11 - (sum % 11)
    return result === parseInt(digits[0])
  }

  return calc(12) && calc(13)
}

// valida Document genérico (não vazio e tamanho mínimo)
export const isDocument = (value: string, min = 3): boolean => {
  return typeof value === "string" && value.trim().length >= min
}
