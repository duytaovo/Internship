import { useSelector } from 'react-redux'

export function useAuthenticated() {
  const { profile } = useSelector(state => state.authentication)
  return (profile.idUser && true) || false
}
