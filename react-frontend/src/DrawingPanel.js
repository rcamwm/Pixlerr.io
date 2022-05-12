import React, { useRef } from "react";
import "./styles/drawingPanel.scss";
import Row from "./Rows";

export default function DrawingPanel(props) {
    const { selectedColor, pixelList, updatePixel} = props;

    const panelRef = useRef();
    
    let rows = [];
    for (let i = 0; i < pixelList.length; i++) {
        const y = pixelList.filter(data => data['y'] === i);
        rows.push(<Row 
            selectedColor={selectedColor} 
            pixelRow={y} 
            updatePixel={updatePixel} />);
    }

    return (
        <div id="drawingPanel">
            <div id="pixels" ref={panelRef}>
                {rows}
            </div>
        </div>
    );
}
