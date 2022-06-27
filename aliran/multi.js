import p5 from "p5";
import React from "react";
import { toJSON } from "flatted";

const url = "/api/aliran";

export class Sketch extends React.Component {
  constructor(props) {
    super(props);

    this.ref = React.createRef();
  }

  sketch = (p) => {
    const points = [];
    let mult;

    const width = 800;
    const height = 800;

    let r1;
    let r2;
    let g1;
    let g2;
    let b1;
    let b2;

    p.setup = () => {
      p.createCanvas(width, height);
      p.background(30);
      p.angleMode(p.DEGREES);
      p.noiseDetail(1);

      const density = 30;
      const space = width / density;

      for (let x = 0; x < width; x += space) {
        for (let y = 0; y < height; y += space) {
          const v = p.createVector(
            x + p.random(-10, 10),
            y + p.random(-10, 10)
          );
          points.push(v);
        }
      }

      r1 = p.random(255);
      r2 = p.random(255);
      g1 = p.random(255);
      g2 = p.random(255);
      b1 = p.random(255);
      b2 = p.random(255);

      mult = p.random(0.001, 0.05);
      // mult = p.random(0.05);
      // mult = p.random(0.002, 0.01);
    };

    p.draw = () => {
      p.noStroke();

      for (let i = 0; i < points.length; i++) {
        const r = p.map(points[i].x, 0, width, r1, r2);
        const g = p.map(points[i].y, 0, width, g1, g2);
        const b = p.map(points[i].x, 0, width, b1, b2);
        const alpha = p.map(
          p.dist(width / 2, height / 2, points[i].x, points[i].y),
          0,
          350,
          400,
          0
        );

        p.fill(r, g, b, alpha);

        const angle = p.map(
          p.noise(points[i].x * mult, points[i].y * mult),
          0,
          1,
          0,
          720
        );

        points[i].add(p.createVector(p.cos(angle), p.sin(angle)));

        if (p.dist(width / 2, height / 2, points[i].x, points[i].y) < 350) {
          p.ellipse(points[i].x, points[i].y, 1);
        }
      }
    };

    p.mouseClicked = async () => {
      console.log("client", { points, r1, r2, g1, g2, b1, b2 });

      const data = {
        points,
        r1,
        r2,
        g1,
        g2,
        b1,
        b2,
      };

      try {
        const response = await fetch(url, {
          method: "POST",
          mode: "cors",
          cache: "no-cache",
          credentials: "same-origin",
          headers: {
            "Content-Type": "application/json",
          },
          redirect: "follow",
          referrerPolicy: "no-referrer",
          body: JSON.stringify(toJSON(data)),
        });

        console.log(response.json());
      } catch (error) {
        console.log({ error });
      }

      p.saveCanvas("aliran", "png");
    };
  };

  componentDidMount() {
    this.myP5 = new p5(this.sketch, this.ref.current);
  }

  render() {
    return <div ref={this.ref}></div>;
  }
}
