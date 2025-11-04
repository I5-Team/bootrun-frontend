import ProgressBar from "../../components/ProgressBar"

export default function LectureRoomPage() {
    return (
        <div>
            <ProgressBar variant="lecture" value={3} max={15}/>
            <h1>Lecture Room Page</h1>
            <p>Welcome to the lecture room!</p>
        </div>
    );
}