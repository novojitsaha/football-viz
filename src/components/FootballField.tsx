import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import Player from "../types/player";
interface FootballFieldProps {
  homePlayers: Player[] | undefined;
  awayPlayers: Player[] | undefined;
  event: any;
  eventIndex: number;
}

// prop prop.current
const FootballField: React.FC<FootballFieldProps> = ({
  homePlayers,
  awayPlayers,
  event,
  eventIndex,
}) => {
  // persistent reference to the svg element
  const svgRef = useRef(null);

  useEffect(() => {
    d3.select(svgRef.current).selectAll("*").remove();

    const scale: number = 6;
    const width: number = 120 * scale;
    const height: number = 80 * scale;

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

    type LineCoordinate = { x1: number; y1: number; x2: number; y2: number };
    type CircleCoordinate = { cx: number; cy: number; r: number };

    // football field line coordinates
    const lineCoordinates: LineCoordinate[] = [
      // Outline of the pitch
      { x1: 0, y1: 0, x2: 120, y2: 0 },
      { x1: 0, y1: 0, x2: 0, y2: 80 },
      { x1: 120, y1: 0, x2: 120, y2: 80 },
      { x1: 0, y1: 80, x2: 120, y2: 80 },
      // Mid line
      { x1: 60, y1: 0, x2: 60, y2: 80 },
      // Penalty areas
      { x1: 0, y1: 18, x2: 18, y2: 18 },
      { x1: 0, y1: 62, x2: 18, y2: 62 },
      { x1: 18, y1: 18, x2: 18, y2: 62 },
      { x1: 120, y1: 18, x2: 102, y2: 18 },
      { x1: 120, y1: 62, x2: 102, y2: 62 },
      { x1: 102, y1: 18, x2: 102, y2: 62 },
      // Goal areas
      { x1: 0, y1: 30, x2: 6, y2: 30 },
      { x1: 0, y1: 50, x2: 6, y2: 50 },
      { x1: 6, y1: 30, x2: 6, y2: 50 },
      { x1: 120, y1: 30, x2: 114, y2: 30 },
      { x1: 120, y1: 50, x2: 114, y2: 50 },
      { x1: 114, y1: 30, x2: 114, y2: 50 },
      // Goal post
      { x1: 0, y1: 36, x2: 1, y2: 36 },
      { x1: 0, y1: 44, x2: 1, y2: 44 },
      { x1: 1, y1: 36, x2: 1, y2: 44 },
      { x1: 120, y1: 36, x2: 119, y2: 36 },
      { x1: 120, y1: 44, x2: 119, y2: 44 },
      { x1: 119, y1: 36, x2: 119, y2: 44 },
    ];

    // football field circle coordinates
    const circleCoordinates: CircleCoordinate[] = [
      // Circle and center
      { cx: 60, cy: 40, r: 10 },
      { cx: 60, cy: 40, r: 0.5 },
    ];

    const arcCoordinates = [
      // Top penalty arc
      {
        cx: 12,
        cy: 40,
        r: 10,
        startAngle: 0.65,
        endAngle: 2.5,
      },
      // Bottom penalty arc
      {
        cx: 108,
        cy: 40,
        r: 10,
        startAngle: 3.8,
        endAngle: 5.65,
      },
    ];

    // Function to generate path for arcs
    const arcGenerator = d3
      .arc<any>()
      .innerRadius((d) => d.r * scale)
      .outerRadius((d) => d.r * scale)
      .startAngle((d) => d.startAngle)
      .endAngle((d) => d.endAngle);

    // Draw arcs infront of penalty areas
    svg
      .selectAll("path.arc")
      .data(arcCoordinates)
      .enter()
      .append("path")
      .attr("class", "arc")
      .attr("d", (d) =>
        arcGenerator({ ...d, innerRadius: d.r, outerRadius: d.r })
      )
      .attr("transform", (d) => `translate(${d.cx * scale}, ${d.cy * scale})`)
      .attr("fill", "none")
      .attr("stroke", "black")
      .attr("stroke-width", 2);

    // Draw football field lines
    svg
      .selectAll("line")
      .data(lineCoordinates)
      .enter()
      .append("line")
      .attr("x1", (d) => d.x1 * scale)
      .attr("y1", (d) => d.y1 * scale)
      .attr("x2", (d) => d.x2 * scale)
      .attr("y2", (d) => d.y2 * scale)
      .attr("stroke", "black")
      .attr("stroke-width", 2);

    // Draw football field circles
    const fieldGroup = svg.append("g").attr("class", "field-group");
    fieldGroup
      .selectAll("circle")
      .data(circleCoordinates)
      .enter()
      .append("circle")
      .attr("cx", (d) => d.cx * scale)
      .attr("cy", (d) => d.cy * scale)
      .attr("r", (d) => d.r * scale)
      .attr("fill", "transparent")
      .attr("stroke", "black")
      .attr("stroke-width", 2);

    // Append a text element to the SVG for the tooltip
    const tooltipTextGroup = svg
      .append("g")
      .attr("class", "tooltip-text-group");
    const tooltipText = tooltipTextGroup
      .append("text")
      .attr("fill", "black")
      .attr("font-size", "12px")
      .style("opacity", 0); // Hidden by default

    // Draw home player circles
    const homePlayerGroup = svg.append("g").attr("class", "home-player-group");
    homePlayerGroup
      .selectAll("player-circles")
      .data(homePlayers ?? [])
      .enter()
      .append("circle")
      .attr("cx", (p) => (p.coordinates ? p.coordinates[0] * scale : 0))
      .attr("cy", (p) => (p.coordinates ? p.coordinates[1] * scale : 0))
      .attr("r", 2 * scale)
      .attr("fill", "transparent")
      .attr("stroke", "black")
      .attr("stroke-width", 2)
      .attr("fill", "blue")
      .on("mouseover", (_event, p) => {
        tooltipText
          .attr("x", p.coordinates ? p.coordinates[0] * scale + 10 : 0) // Position slightly to the right of the circle
          .attr("y", p.coordinates ? p.coordinates[1] * scale : 0) // Align vertically with the circle
          .text(`${p.name}`) // Set the text
          .style("opacity", 1); // Make it visible
      })
      .on("mouseout", () => {
        tooltipText.style("opacity", 0); // Hide the text
      });

    // Draw away player circles
    const awayPlayerGroup = svg.append("g").attr("class", "away-player-group");
    awayPlayerGroup
      .selectAll("player-circles")
      .data(awayPlayers ?? [])
      .enter()
      .append("circle")
      .attr("cx", (p) => (p.coordinates ? (120 - p.coordinates[0]) * scale : 0))
      .attr("cy", (p) => (p.coordinates ? p.coordinates[1] * scale : 0))
      .attr("r", 2 * scale)
      .attr("fill", "transparent")
      .attr("stroke", "black")
      .attr("stroke-width", 2)
      .attr("fill", "darkred")
      .on("mouseover", (_event, p) => {
        tooltipText
          .attr("x", p.coordinates ? (120 - p.coordinates[0]) * scale + 10 : 0) // Position slightly to the right of the circle
          .attr("y", p.coordinates ? p.coordinates[1] * scale : 0) // Align vertically with the circle
          .text(`${p.name}`) // Set the text
          .style("opacity", 1); // Make it visible
      })
      .on("mouseout", () => {
        tooltipText.style("opacity", 0); // Hide the text
      });

    // Add home jersey number inside player circles
    const homeJerseyGroup = svg.append("g").attr("class", "home-jersey-group");
    homeJerseyGroup
      .selectAll("text")
      .data(homePlayers ?? [])
      .enter()
      .append("text")
      .attr("x", (p) => (p.coordinates ? p.coordinates[0] * scale : 0))
      .attr("y", (p) => (p.coordinates ? p.coordinates[1] * scale : 0))
      .attr("dy", "0.35em")
      .attr("text-anchor", "middle")
      .attr("fill", "white")
      .text((p) => p.jersey)
      .on("mouseover", (_event, p) => {
        tooltipText
          .attr("x", p.coordinates ? p.coordinates[0] * scale + 10 : 0) // Position slightly to the right of the circle
          .attr("y", p.coordinates ? p.coordinates[1] * scale : 0) // Align vertically with the circle
          .text(`${p.name}`) // Set the text
          .style("opacity", 1); // Make it visible
      })
      .on("mouseout", () => {
        tooltipText.style("opacity", 0); // Hide the text
      });

    // Add away jersey number inside player circles
    const awayJerseyGroup = svg.append("g").attr("class", "away-jersey-group");
    awayJerseyGroup
      .selectAll("text")
      .data(awayPlayers ?? [])
      .enter()
      .append("text")
      .attr("x", (p) => (p.coordinates ? (120 - p.coordinates[0]) * scale : 0))
      .attr("y", (p) => (p.coordinates ? p.coordinates[1] * scale : 0))
      .attr("dy", "0.35em")
      .attr("text-anchor", "middle")
      .attr("fill", "white")
      .text((p) => p.jersey)
      .on("mouseover", (_event, p) => {
        tooltipText
          .attr("x", p.coordinates ? (120 - p.coordinates[0]) * scale + 10 : 0) // Position slightly to the right of the circle
          .attr("y", p.coordinates ? p.coordinates[1] * scale : 0) // Align vertically with the circle
          .text(`${p.name}`) // Set the text
          .style("opacity", 1); // Make it visible
      })
      .on("mouseout", () => {
        tooltipText.style("opacity", 0); // Hide the text
      });

    if (event[eventIndex]?.type?.name === "Pass") {
      const passEvent = event[eventIndex];
      const passCoordinates = {
        x1: passEvent.location[0] * scale,
        y1: passEvent.location[1] * scale,
        x2: passEvent.pass.end_location[0] * scale,
        y2: passEvent.pass.end_location[1] * scale,
      };
      console.log(
        `Pass from ${passEvent.player.name} to ${passEvent.pass.recipient.name}`
      );
      console.log("Pass Coordinates:", passCoordinates);

      svg
        .selectAll("pass-lines")
        .data([passCoordinates])
        .enter()
        .append("line")
        .attr("class", "pass-lines")
        .attr("x1", (d) => d.x1)
        .attr("y1", (d) => d.y1)
        .attr("x2", (d) => d.x2)
        .attr("y2", (d) => d.y2)
        .attr("stroke", "red")
        .attr("stroke-width", 2);
    }
  }, [event, eventIndex]);

  return <svg className="bg-green-600" ref={svgRef}></svg>;
};

export default FootballField;
