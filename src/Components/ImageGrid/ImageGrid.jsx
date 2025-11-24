import "./ImageGrid.css"

function ImageGrid() {
    return (
        <div className="imagegrid-container">
            <div className="imagegrid-column">
                <img src="src\assets\video-conference-1.png" />
                <img src="src\assets\video-conference-2.png" />
                <img src="src\assets\video-conference-3.png" />
                <img src="src\assets\video-conference-4.jpg" />
                <img src="src\assets\video-conference-5.png" />
            </div>
            <div className="imagegrid-column">
                <img src="src\assets\video-conference-3.png" />
                <img src="src\assets\video-conference-4.jpg" />
                <img src="src\assets\video-conference-5.png" />
                <img src="src\assets\video-conference-2.png" />
                <img src="src\assets\video-conference-1.png" />
            </div>
            <div className="imagegrid-column">
                <img src="src\assets\video-conference-2.png" />
                <img src="src\assets\video-conference-1.png" />
                <img src="src\assets\video-conference-4.jpg" />
                <img src="src\assets\video-conference-5.png" />
                <img src="src\assets\video-conference-3.png" />
            </div>
        </div>
    );

}

export default ImageGrid;