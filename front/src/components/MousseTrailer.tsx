import { useEffect } from 'react';

export const MouseTrailer = () => {
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const star = document.createElement('div');
      star.className = 'star-particle';
      
      // Position de l'étoile sur la souris
      star.style.left = `${e.clientX}px`;
      star.style.top = `${e.clientY}px`;

      // Taille aléatoire pour plus de réalisme
      const size = Math.random() * 4 + 1;
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;

      document.body.appendChild(star);

      // Supprimer l'élément après l'animation (1s)
      setTimeout(() => {
        star.remove();
      }, 1000);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return null; // Ce composant ne dessine rien lui-même, il injecte des divs
};