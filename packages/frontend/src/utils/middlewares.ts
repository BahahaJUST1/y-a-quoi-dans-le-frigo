import $http from "../axiosInstance"

export async function getUserLoggedId(): Promise<number> {
  const response = await $http.post('/user/current/id', {});
  return response.data;
}

export async function getUserLoggedRole(): Promise<string> {
  const response = await $http.post('/user/current/role', {});
  return response.data;
}