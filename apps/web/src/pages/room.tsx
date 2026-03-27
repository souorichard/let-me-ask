import { Navigate, useParams } from 'react-router-dom'

type RoomProps = {
  roomId: string
}

export function Room() {
  const params = useParams<RoomProps>()

  if (!params.roomId) {
    return <Navigate replace to="/" />
  }

  return <h1>Room Details: {params.roomId}</h1>
}
