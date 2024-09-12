import styled from "styled-components";

export const MapContainer = styled.div`
    position: relative;
`;

export const OverworldMapImage = styled.img`
`;

export const TrainerImage = styled.img`
    width: 40px;
    height: 40px;
`;

interface TrainerContainerProps {
    leftPercentage: number;
    topPercentage: number;
}

export const TrainerContainer = styled.div<TrainerContainerProps>`
    position: absolute;
    left: ${({ leftPercentage }) => leftPercentage}%;
    top: ${({ topPercentage }) => topPercentage}%;
`;

export const UserNameTag = styled.div`
    background-color: blue;    
    border-radius: 10px;
    padding: 5px;
`