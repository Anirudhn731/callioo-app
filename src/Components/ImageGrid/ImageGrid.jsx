import "./ImageGrid.css"
import video_conference_1 from "../../assets/video-conference-1.png";
import video_conference_2 from "../../assets/video-conference-2.png";
import video_conference_3 from "../../assets/video-conference-3.png";
import video_conference_4 from "../../assets/video-conference-4.jpg";
import video_conference_5 from "../../assets/video-conference-5.png";

function ImageGrid() {
    return (
        <div className="imagegrid-container">
            <div className="imagegrid-column">
                <img src={video_conference_1} />
                <img src={video_conference_2} />
                <img src={video_conference_3} />
                <img src={video_conference_4} />
                <img src={video_conference_5} />
            </div>
            <div className="imagegrid-column">
                <img src={video_conference_3} />
                <img src={video_conference_4} />
                <img src={video_conference_5} />
                <img src={video_conference_2} />
                <img src={video_conference_1} />
            </div>
            <div className="imagegrid-column">
                <img src={video_conference_2} />
                <img src={video_conference_1} />
                <img src={video_conference_4} />
                <img src={video_conference_5} />
                <img src={video_conference_3} />
            </div>
        </div>
    );

}

export default ImageGrid;