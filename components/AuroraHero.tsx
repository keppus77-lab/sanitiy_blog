import React, { useState, useEffect, useRef } from 'react';

export default function AuroraHero() {
    const canvasRef = useRef(null);
    const cursorRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
    const blobsRef = useRef([]);
    const animationRef = useRef(null);
    const isMobileRef = useRef(false);

    useEffect(() => {
        isMobileRef.current = window.innerWidth < 768;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initBlobs();
    };

    const initBlobs = () => {
      const blobCount = isMobileRef.current ? 4 : 7;
      blobsRef.current = Array.from({ length: blobCount }, (_, i) => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        baseX: Math.random() * canvas.width,
        baseY: Math.random() * canvas.height,
        size: isMobileRef.current ? 250 + Math.random() * 200 : 350 + Math.random() * 350,
        baseSize: isMobileRef.current ? 250 + Math.random() * 200 : 350 + Math.random() * 350,
        color: [
          { r: 34, g: 139, b: 34 },    // Forest Green
          { r: 46, g: 125, b: 50 },    // Deep Green
          { r: 76, g: 175, b: 80 },    // Medium Green
          { r: 102, g: 187, b: 106 },  // Light Green
          { r: 67, g: 97, b: 48 },     // Dark Olive
          { r: 56, g: 142, b: 60 },    // Moss Green
          { r: 129, g: 199, b: 132 }   // Pale Green
        ][i % 7],
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        layer: Math.random(),
        phase: Math.random() * Math.PI * 2
      }));
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const handleMouseMove = (e) => {
      cursorRef.current.targetX = e.clientX;
      cursorRef.current.targetY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Spring-based cursor following
    const updateCursor = () => {
      const spring = 0.15;
      cursorRef.current.x += (cursorRef.current.targetX - cursorRef.current.x) * spring;
      cursorRef.current.y += (cursorRef.current.targetY - cursorRef.current.y) * spring;
    };

    // Noise texture generation
    const generateNoise = () => {
      const noiseCanvas = document.createElement('canvas');
      noiseCanvas.width = 200;
      noiseCanvas.height = 200;
      const noiseCtx = noiseCanvas.getContext('2d');
      const imageData = noiseCtx.createImageData(200, 200);
      
      for (let i = 0; i < imageData.data.length; i += 4) {
        const value = Math.random() * 15;
        imageData.data[i] = value;
        imageData.data[i + 1] = value;
        imageData.data[i + 2] = value;
        imageData.data[i + 3] = 25;
      }
      
      noiseCtx.putImageData(imageData, 0, 0);
      return noiseCanvas;
    };

    const noiseTexture = generateNoise();

    const animate = (time) => {
      ctx.fillStyle = '#0a0a0f';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Additive blending
      ctx.globalCompositeOperation = 'lighter';

      updateCursor();

      blobsRef.current.forEach((blob, index) => {
        // Parallax effect based on layer
        const parallaxSpeed = 0.5 + blob.layer * 0.5;
        
        // Smooth floating animation
        blob.phase += 0.008 * parallaxSpeed;
        blob.x = blob.baseX + Math.sin(blob.phase) * 80 * parallaxSpeed;
        blob.y = blob.baseY + Math.cos(blob.phase * 0.7) * 60 * parallaxSpeed;

        // Slow drift
        blob.baseX += blob.vx * parallaxSpeed;
        blob.baseY += blob.vy * parallaxSpeed;

        // Wrap around edges
        if (blob.baseX < -200) blob.baseX = canvas.width + 200;
        if (blob.baseX > canvas.width + 200) blob.baseX = -200;
        if (blob.baseY < -200) blob.baseY = canvas.height + 200;
        if (blob.baseY > canvas.height + 200) blob.baseY = -200;

        // Cursor interaction with magnetic spring effect
        const dx = cursorRef.current.x - blob.x;
        const dy = cursorRef.current.y - blob.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = isMobileRef.current ? 200 : 400;
        
        let interactionScale = 1;
        let brightness = 1;
        
        if (distance < maxDistance && !isMobileRef.current) {
          const influence = 1 - (distance / maxDistance);
          interactionScale = 1 + influence * 0.5;
          brightness = 1 + influence * 0.6;
          
          // Magnetic pull
          const pullStrength = influence * 0.08;
          blob.x += dx * pullStrength;
          blob.y += dy * pullStrength;
        }

        // Smooth size transition
        const targetSize = blob.baseSize * interactionScale;
        blob.size += (targetSize - blob.size) * 0.1;

        // Create gradient with bloom effect
        const gradient = ctx.createRadialGradient(
          blob.x, blob.y, 0,
          blob.x, blob.y, blob.size
        );

        const { r, g, b } = blob.color;
        const adjustedR = Math.min(255, r * brightness);
        const adjustedG = Math.min(255, g * brightness);
        const adjustedB = Math.min(255, b * brightness);

        gradient.addColorStop(0, `rgba(${adjustedR}, ${adjustedG}, ${adjustedB}, 0.8)`);
        gradient.addColorStop(0.4, `rgba(${adjustedR}, ${adjustedG}, ${adjustedB}, 0.4)`);
        gradient.addColorStop(0.7, `rgba(${adjustedR * 0.8}, ${adjustedG * 0.8}, ${adjustedB * 0.8}, 0.2)`);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = gradient;
        ctx.filter = `blur(${40 + blob.layer * 20}px)`;
        ctx.fillRect(blob.x - blob.size, blob.y - blob.size, blob.size * 2, blob.size * 2);
      });

      ctx.filter = 'none';

      // Add subtle noise overlay
      ctx.globalCompositeOperation = 'overlay';
      ctx.globalAlpha = 0.08;
      const pattern = ctx.createPattern(noiseTexture, 'repeat');
      ctx.fillStyle = pattern;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = 'source-over';

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#0a0a0f]">
      {/* Aurora Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{
          transform: 'translate3d(0, 0, 0)',
          willChange: 'transform'
        }}
      />

      {/* Glassmorphism Content Card */}
      <div className="relative z-10 flex items-center justify-center w-full h-full px-4">
        <div 
          className="max-w-4xl w-full backdrop-blur-2xl bg-white/5 border border-white/10 rounded-3xl p-12 md:p-16 shadow-2xl"
          style={{
            transform: 'translate3d(0, 0, 0)',
            willChange: 'transform',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), inset 0 1px 0 0 rgba(255, 255, 255, 0.1)'
          }}
        >
          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Waldarbeit.
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              Nachhaltig & Modern
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed max-w-2xl">
            Entdecke die Zukunft der Forstwirtschaft – wo Tradition auf Innovation trifft. 
            Neueste Techniken, nachhaltige Praktiken und Expertenwissen.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105"
              style={{ transform: 'translate3d(0, 0, 0)' }}
            >
              Mehr erfahren
            </button>
            <button 
              className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105"
              style={{ transform: 'translate3d(0, 0, 0)' }}
            >
              Blog durchstöbern
            </button>
          </div>

          {/* Subtle accent line */}
          <div className="mt-12 pt-8 border-t border-white/10">
            <p className="text-sm text-gray-400 flex items-center gap-2">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
              Seit 2026 – Professionelle Waldarbeiten in Franken
            </p>
          </div>
        </div>
      </div>

      {/* Vignette effect */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, transparent 0%, rgba(10, 10, 15, 0.4) 100%)'
        }}
      />
    </div>
  );
}