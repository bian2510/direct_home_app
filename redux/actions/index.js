export const saveToken = (token) => {
  return {
    type: 'SAVETOKEN',
    payload: token
  }
}