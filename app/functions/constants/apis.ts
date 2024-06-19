export const apiUrl = 
  process.env.NEXT_PUBLIC_BASE_API_URL

export const API = {
  userRegister: `${apiUrl}/user`,
  userLogin: `${apiUrl}/login`
}
