export const apiUrl = 
  process.env.NEXT_PUBLIC_BASE_API_URL

export const API = {
  userRegister: `${apiUrl}/user`,
  login: `${apiUrl}/login`,
  logout: `${apiUrl}/logout`,
  session: `${apiUrl}/session`,
  aiCoach: `${apiUrl}/ai_coach`,
  muscleGroups: `${apiUrl}/muscle_groups`,
  exercises: `${apiUrl}/exercises`,
  workout: `${apiUrl}/workout`,
}
