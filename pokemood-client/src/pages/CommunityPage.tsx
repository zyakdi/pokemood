import { useEffect, useState } from 'react'
import { useLocation } from 'react-router';
import { io } from 'socket.io-client'
import { Map } from '../components/Map';

const CommunityPage = () => {
  const location = useLocation();
  const { name } = location.state || {};
  const [userNames, setUserNames] = useState<string[]>([])

  useEffect(() => {
    const socket = io('http://localhost:3000');

    socket.on('connect', () => {
      console.log("Connected to the server", name);
      socket.emit('connect-user', { name });
    })

    socket.on('disconnect', () => {
      console.log("Disconnected from the server");
    })

    socket.on('connected-users-update', (userNames: string[]) => {
      console.log("Connected users", userNames);
      setUserNames(userNames);
    })

    return () => {
      socket.disconnect();
    }
  }, [name])
  return (
    <div>
      <div>Welcome to the community page, {name}!</div>
      <div>Connected users :</div>
      {userNames.map(userName => <div key={userName}>{userName}</div>)}
      <Map users={userNames} />
    </div>
  )
}

export default CommunityPage