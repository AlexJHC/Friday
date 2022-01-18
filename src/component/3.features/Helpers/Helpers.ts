// validate Email Regular Expression - boolean
export const emailRegExp = (email: string) =>
  email.trim().match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)

// validate number of symbols must be more than 7 - boolean
export const passwordLength = (password:string) => password.length > 7

//Data string to yyyy/mm/d
export const dateConvertor = (dateString:string) => {
  const isoNumbers = Date.parse(dateString)
  return new Date(isoNumbers).toLocaleDateString().split('.').reverse().join('-')
}
