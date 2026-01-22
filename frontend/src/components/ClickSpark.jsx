import React, { useEffect, useState } from 'react';

const ClickSpark = () => {
  const [sparks, setSparks] = useState([]);

  useEffect(() => {
    const handleClick = (e) => {
      const sparkId = Date.now();
      const newSpark = {
        id: sparkId,
        x: e.clientX,
        y: e.clientY,
      };

      setSparks((prev) => [...prev, newSpark]);

      // Remove spark after animation completes
      setTimeout(() => {
        setSparks((prev) => prev.filter((spark) => spark.id !== sparkId));
      }, 1000);
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  return (
    <>
      {sparks.map((spark) => (
        <div
          key={spark.id}
          className="spark-container"
          style={{
            position: 'fixed',
            left: spark.x,
            top: spark.y,
            pointerEvents: 'none',
            zIndex: 9999,
          }}
        >
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="spark-particle"
              style={{
                position: 'absolute',
                width: '4px',
                height: '4px',
                borderRadius: '50%',
                background: `hsl(${264 + Math.random() * 20}, ${70 + Math.random() * 20}%, ${60 + Math.random() * 20}%)`,
                transform: `translate(-50%, -50%) rotate(${i * 45}deg) translateY(0)`,
                animation: `spark-burst 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards`,
                animationDelay: `${i * 0.02}s`,
              }}
            />
          ))}
          {/* Central glow */}
          <div
            style={{
              position: 'absolute',
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(180, 164, 214, 0.8) 0%, rgba(155, 139, 196, 0) 70%)',
              transform: 'translate(-50%, -50%)',
              animation: 'spark-glow 0.6s ease-out forwards',
            }}
          />
        </div>
      ))}
      <style>{`
        @keyframes spark-burst {
          0% {
            transform: translate(-50%, -50%) rotate(var(--rotation, 0deg)) translateY(0) scale(1);
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) rotate(var(--rotation, 0deg)) translateY(30px) scale(0);
            opacity: 0;
          }
        }

        @keyframes spark-glow {
          0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 1;
          }
          50% {
            transform: translate(-50%, -50%) scale(1.5);
            opacity: 0.6;
          }
          100% {
            transform: translate(-50%, -50%) scale(2);
            opacity: 0;
          }
        }

        .spark-particle:nth-child(1) { --rotation: 0deg; }
        .spark-particle:nth-child(2) { --rotation: 45deg; }
        .spark-particle:nth-child(3) { --rotation: 90deg; }
        .spark-particle:nth-child(4) { --rotation: 135deg; }
        .spark-particle:nth-child(5) { --rotation: 180deg; }
        .spark-particle:nth-child(6) { --rotation: 225deg; }
        .spark-particle:nth-child(7) { --rotation: 270deg; }
        .spark-particle:nth-child(8) { --rotation: 315deg; }
      `}</style>
    </>
  );
};

export default ClickSpark;