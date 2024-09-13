import { useEffect, useState } from 'react'
import { useLocation } from 'react-router';
import { io } from 'socket.io-client'
import { Map } from '../components/Map';
import { UserDto } from '../types/user.dto';

const CommunityPage = () => {
  const location = useLocation();
  const { name } = location.state || {};
  const [connectedUsers, setConnectedUsers] = useState<UserDto[]>([])

  useEffect(() => {
    const socket = io('http://localhost:3000');

    socket.on('connect', () => {
      console.log("Connected to the server", name);
      const position: { left: number; top: number } = {
        left: Math.random() * 90,
        top: Math.random() * 85,
      }    
      socket.emit('connect-user', { name, position });
    })

    socket.on('disconnect', () => {
      console.log("Disconnected from the server");
    })

    socket.on('connected-users-update', (connectedUsers: UserDto[]) => {
      console.log("Connected users", connectedUsers);
      setConnectedUsers(connectedUsers);
    })

    return () => {
      socket.disconnect();
    }
  }, [name])
  return (
    <div>
      <div>Welcome to the community page, {name}!</div>
      <div>Connected users :</div>
      {connectedUsers.map(user => <div key={user.name}>{user.name}</div>)}
      <Map users={connectedUsers} />
    </div>
  )
}

export default CommunityPage