import { useEffect } from 'react';

export const MouseMagic = () => {
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const star = document.createElement('div');
      star.className = 'Magic';
      
      // Position sur la souris
      star.style.left = `${e.clientX}px`;
      star.style.top = `${e.clientY}px`;

      // Taille aléatoire pour plus de réalisme
      const size = Math.random() * 4 + 1;
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;

      document.body.appendChild(star);

      // Suppr l'élément après l'animation (1s)
      setTimeout(() => {
        star.remove();
      }, 1000);
    };
    // ordonne au navigateur d'exécuter la fonction handleMouseMove à chaque millimètre de déplacement de la souris.
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return null;
};