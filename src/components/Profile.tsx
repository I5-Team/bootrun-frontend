import styled from "styled-components";
import userProfileDefault from "../assets/images/profile-user-default.png"

type ProfileProps = {
    src?: string;
    size?: number // rem
}

const StyledProfileImg = styled.img<{ size: number }>`
    width: ${({ size }) => size}rem;
    height: ${({ size }) => size}rem;
    aspect-ratio: 1 / 1;
    border-radius: 50%;
    border: 0.1rem solid ${({ theme }) => theme.colors.gray200};
`;

export default function Profile({ src, size = 4.2 }: ProfileProps) { 
    return (
        <>
            <StyledProfileImg 
                src={src || userProfileDefault} 
                size={size}
                alt="프로필"
            />
        </>
    );
}