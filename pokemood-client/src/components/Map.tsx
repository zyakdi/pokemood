import { UserDto } from "../types/user.dto";
import { MapContainer, OverworldMapImage, TrainerContainer, TrainerImage, UserNameTag } from "./Map.style"

interface MapProps {
    users: UserDto[]
}

export const Map: React.FC<MapProps> = ({ users }) => {
    return (
        <MapContainer>
            <OverworldMapImage src="/pokemon-map.png" alt="Community map" />
            {users.map(user => {
                return <TrainerContainer key={user.name} $leftPercentage={user.position.left} $topPercentage={user.position.top}>
                    <UserNameTag>{user.name}</UserNameTag>
                    <TrainerImage src="/blue-trainer.png" />
                </TrainerContainer>
            })}

        </MapContainer>
    )
}
