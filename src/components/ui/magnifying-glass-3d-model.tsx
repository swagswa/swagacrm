"use client";

import React, { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Environment } from '@react-three/drei';
import * as THREE from 'three';

interface MagnifyingGlassModelProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  isVisible?: boolean;
}

function MagnifyingGlassModel({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1, isVisible = false }: MagnifyingGlassModelProps) {
  const meshRef = useRef<THREE.Group>(null);
  const [startTime, setStartTime] = useState<number | null>(null);
  
  // Загружаем 3D модель лупы
  const { scene } = useGLTF('/magnifying_glass_3d_apple_emoji.glb');
  
  useFrame((state) => {
    if (meshRef.current) {
      // Запускаем анимацию только когда элемент становится видимым
      if (isVisible && startTime === null) {
        setStartTime(state.clock.getElapsedTime());
      }
      
      if (!isVisible || startTime === null) {
        // Скрываем лупу до появления в области видимости
        meshRef.current.scale.setScalar(0);
        return;
      }
      
      const time = state.clock.getElapsedTime() - startTime;
      
      // Анимация появления (первые 2 секунды)
      if (time < 2) {
        const progress = time / 2;
        const easeProgress = 1 - Math.pow(1 - progress, 2);
        
        // Плавное вращение при появлении
        const spinIntensity = (1 - progress);
        meshRef.current.rotation.y = rotation[1] + spinIntensity * Math.PI * 2; // 1 оборот по Y
        meshRef.current.rotation.x = rotation[0];
        meshRef.current.rotation.z = rotation[2];
        
        // Плавное масштабирование от 0 до полного размера
        meshRef.current.scale.setScalar(scale * easeProgress);
        
        // Позиция остается статичной во время появления
        meshRef.current.position.set(position[0], position[1], position[2]);
      } else {
        // Основная анимация после появления - плавное покачивание
        const continuousTime = time - 2;
        
        // Плавное начало анимации позиции
        const positionEase = Math.min(continuousTime / 0.3, 1);
        const smoothEase = positionEase * positionEase * (3 - 2 * positionEase);
        
        meshRef.current.position.y = position[1] + Math.sin(continuousTime * 0.8) * 0.1 * smoothEase;
        meshRef.current.position.x = position[0] + Math.cos(continuousTime * 0.6) * 0.05 * smoothEase;
        meshRef.current.position.z = position[2] + Math.sin(continuousTime * 0.4) * 0.02 * smoothEase;
        
        // Медленное вращение
        meshRef.current.rotation.y = rotation[1] + continuousTime * 0.001;
        meshRef.current.rotation.x = rotation[0] + Math.sin(continuousTime * 0.3) * 0.03 * smoothEase;
        meshRef.current.rotation.z = rotation[2] + Math.cos(continuousTime * 0.2) * 0.02 * smoothEase;
        
        meshRef.current.scale.setScalar(scale);
      }
    }
  });

  return (
    <group ref={meshRef} position={position} rotation={rotation} scale={scale}>
      <primitive object={scene.clone()} />
      <meshStandardMaterial 
        emissive="#ffffff" 
        emissiveIntensity={0.2}
        metalness={0.6}
        roughness={0.3}
      />
    </group>
  );
}

interface MagnifyingGlass3DBackgroundProps {
  className?: string;
}

export function MagnifyingGlass3DBackground({ className = "" }: MagnifyingGlass3DBackgroundProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640); // sm breakpoint
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // Скрываем IntersectionObserver на мобильных устройствах
    if (isMobile) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.3, // Запускаем когда 30% элемента видно
        rootMargin: '0px 0px -50px 0px' // Небольшой отступ снизу
      }
    );

    const currentContainer = containerRef.current;
    if (currentContainer) {
      observer.observe(currentContainer);
    }

    return () => {
      if (currentContainer) {
        observer.unobserve(currentContainer);
      }
    };
  }, [isMobile]);

  // Скрываем 3D модель на мобильных устройствах
  if (isMobile) {
    return null;
  }

  return (
    <div ref={containerRef} className={`absolute inset-0 ${className}`} style={{ zIndex: 1, pointerEvents: 'none' }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        style={{ background: 'transparent', pointerEvents: 'none' }}
      >
        <Suspense fallback={null}>
          {/* Освещение */}
          <ambientLight intensity={0.8} />
          <directionalLight position={[10, 10, 5]} intensity={1.5} />
          <directionalLight position={[-10, -10, -5]} intensity={1.2} />
          <pointLight position={[5, 5, 5]} intensity={1.5} color="#4f46e5" />
          <pointLight position={[-5, -5, 5]} intensity={1.2} color="#06b6d4" />
          
          {/* Модель лупы только для ПК */}
          <MagnifyingGlassModel 
            position={[0, -0.2, 0]} 
            rotation={[0.2, 0.3, -0.1]} 
            scale={0.65} 
            isVisible={isVisible}
          />
          
          {/* Окружение для лучшего освещения */}
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  );
}

// Предзагрузка модели
useGLTF.preload('/magnifying_glass_3d_apple_emoji.glb');