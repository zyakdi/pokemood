import { MapContainer, OverworldMapImage, TrainerContainer, TrainerImage, UserNameTag } from "./Map.style"

interface MapProps {
    users: string[]
}

export const Map: React.FC<MapProps> = ({ users }) => {
    return (
        <MapContainer>
            <OverworldMapImage src="/pokemon-map.png" alt="Community map" />
            {users.map(user => {
                const leftPercentage = Math.random() * 90;
                const topPercentage = Math.random() * 85;
                return <TrainerContainer leftPercentage={leftPercentage} topPercentage={topPercentage}>
                    <UserNameTag>{user}</UserNameTag>
                    <TrainerImage src="/blue-trainer.png" />
                </TrainerContainer>
            })}

        </MapContainer>
    )
}
