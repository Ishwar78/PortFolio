import React, { useEffect, useRef } from "react";
import "./CursorFollower.css";

export default function CursorFollower({ text = "ISHWAR" }) {
  const followerRef = useRef(null);
  const dotRef = useRef(null);

  const mouse = useRef({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  });

  const position = useRef({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);

    let animationFrame;

    const animate = () => {
      // Smooth cursor movement
      position.current.x +=
        (mouse.current.x - position.current.x) * 0.14;

      position.current.y +=
        (mouse.current.y - position.current.y) * 0.14;

      if (followerRef.current) {
        followerRef.current.style.transform = `
          translate3d(
            ${position.current.x}px,
            ${position.current.y}px,
            0
          )
          translate(-50%, -50%)
        `;
      }

      if (dotRef.current) {
        dotRef.current.style.transform = `
          translate3d(
            ${mouse.current.x}px,
            ${mouse.current.y}px,
            0
          )
          translate(-50%, -50%)
        `;
      }

      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <>
      {/* Small cursor dot */}
      <div
        ref={dotRef}
        className="cursor-dot"
        aria-hidden="true"
      />

      {/* Text follower */}
      <div
        ref={followerRef}
        className="cursor-follower"
        aria-hidden="true"
      >
        <span>{text}</span>
      </div>
    </>
  );
}