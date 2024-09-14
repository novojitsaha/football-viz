import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const FootballField = () => {
    const svgRef = useRef(null);

    useEffect(() => {
        d3.select(svgRef.current).selectAll("*").remove();
        const scale: number = 5;

        const width = 120 * scale;
        const height = 80 * scale;

        const svg = d3
            .select(svgRef.current)
            .attr("width", width)
            .attr("height", height);


        const coordinates = [
            // Outline of the pitch
            { x1: 0, y1: 0, x2: 120, y2: 0 },
            { x1: 0, y1: 0, x2: 0, y2: 80 },
            { x1: 120, y1: 0, x2: 120, y2: 80 },
            { x1: 0, y1: 80, x2: 120, y2: 80 },
            // Mid line
            { x1: 60, y1: 0, x2: 60, y2: 80 },
            // Penalty areas
            { x1: 0, y1: 18, x2: 18, y2: 18 },
            { x1: 0, y1: 18, x2: 0, y2: 62 },
            { x1: 0, y1: 62, x2: 18, y2: 62 },
            { x1: 18, y1: 18, x2: 18, y2: 62 },
            { x1: 120, y1: 18, x2: 102, y2: 18 },
            { x1: 120, y1: 18, x2: 120, y2: 62 },
            { x1: 120, y1: 62, x2: 102, y2: 62 },
            { x1: 102, y1: 18, x2: 102, y2: 62 },
            // Goal areas
            { x1: 0, y1: 30, x2: 6, y2: 30 },
            { x1: 0, y1: 30, x2: 0, y2: 50 },
            { x1: 0, y1: 50, x2: 6, y2: 50 },
            { x1: 6, y1: 30, x2: 6, y2: 50 },
            { x1: 120, y1: 30, x2: 114, y2: 30 },
            { x1: 120, y1: 30, x2: 120, y2: 50 },
            { x1: 120, y1: 50, x2: 114, y2: 50 },
            { x1: 114, y1: 30, x2: 114, y2: 50 },
            // Circle and center
            { cx: 60, cy: 40, r: 10 },
            { cx: 60, cy: 40, r: 0.5 }
        ]

        // Draw field boundaries
        svg.selectAll("line")
            .data(coordinates)
            .enter()
            .append("line")
            .attr("x1", (d) => d.x1 * 5) // Scale for better visibility
            .attr("y1", (d) => d.y1 * 5)
            .attr("x2", (d) => d.x2 * 5)
            .attr("y2", (d) => d.y2 * 5)
            .attr("stroke", "black")
            .attr("stroke-width", 2);

        // Draw circles for the center
        svg.selectAll("circle")
            .data(coordinates.filter(d => d.cx))
            .enter()
            .append("circle")
            .attr("cx", d => d.cx * 5)
            .attr("cy", d => d.cy * 5)
            .attr("r", d => d.r * 5)
            .attr("fill", "none")
            .attr("stroke", "black")
            .attr("stroke-width", 2);


    }, [])




    return <svg className='bg-green-600' ref={svgRef}></svg>
}

export default FootballField