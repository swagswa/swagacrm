"use client";

import React, { Suspense, useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Environment } from '@react-three/drei';
import * as THREE from 'three';

interface PhoneModelProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
}

function PhoneModel({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1 }: PhoneModelProps) {
  const meshRef = useRef<THREE.Group>(null);
  
  // Загружаем 3D модель
  const { scene } = useGLTF('/telephone_receiver_3d_icon.glb');
  
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime();
      
      // Анимация появления (первые 3 секунды)
      if (time < 3) {
        const progress = time / 3;
        const easeProgress = 1 - Math.pow(1 - progress, 2); // Более плавное появление
        
        // Плавное вращение при появлении только по Y-оси
        const spinIntensity = (1 - progress);
        meshRef.current.rotation.y = rotation[1] + spinIntensity * Math.PI * 4; // 2 оборота по Y
        meshRef.current.rotation.x = rotation[0]; // Без вращения по X
        meshRef.current.rotation.z = rotation[2]; // Без вращения по Z
        
        // Плавное масштабирование
        meshRef.current.scale.setScalar(scale * (0.5 + easeProgress * 0.5));
        
        // Позиция остается статичной во время появления
        meshRef.current.position.set(position[0], position[1], position[2]);
      } else {
        // Основная анимация после появления - плавное начало с нулевых значений
        const continuousTime = time - 3; // Время с момента окончания анимации появления
        
        // Плавное начало анимации позиции (первые 0.5 секунды после появления)
        const positionEase = Math.min(continuousTime / 0.5, 1);
        const smoothEase = positionEase * positionEase * (3 - 2 * positionEase); // Smooth step
        
        meshRef.current.position.y = position[1] + Math.sin(continuousTime * 0.5) * 0.15 * smoothEase;
        meshRef.current.position.x = position[0] + Math.cos(continuousTime * 0.3) * 0.08 * smoothEase;
        meshRef.current.position.z = position[2] + Math.sin(continuousTime * 0.2) * 0.03 * smoothEase;
        
        // Вращение продолжается плавно
        meshRef.current.rotation.y = rotation[1] + continuousTime * 0.002;
        meshRef.current.rotation.x = rotation[0] + Math.sin(continuousTime * 0.2) * 0.05 * smoothEase;
        meshRef.current.rotation.z = rotation[2] + Math.cos(continuousTime * 0.15) * 0.03 * smoothEase;
        
        meshRef.current.scale.setScalar(scale);
      }
    }
  });

  return (
    <group ref={meshRef} position={position} rotation={rotation} scale={scale}>
      <primitive object={scene.clone()} />
      <meshStandardMaterial 
        emissive="#ffffff" 
        emissiveIntensity={0.3}
        metalness={0.8}
        roughness={0.2}
      />
    </group>
  );
}

interface Phone3DBackgroundProps {
  className?: string;
}

export function Phone3DBackground({ className = "" }: Phone3DBackgroundProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640); // sm breakpoint
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Скрываем 3D модель на мобильных устройствах
  if (isMobile) {
    return null;
  }

  // Параметры для ПК (оригинальные)
  const desktopConfig = {
    position: [1.7, -0.2, 0] as [number, number, number],
    rotation: [0.1, -0.2, 0.05] as [number, number, number],
    scale: 2.5,
    camera: { position: [0, 0, 5], fov: 50 }
  };

  return (
    <div className={`absolute inset-0 ${className}`} style={{ zIndex: 1 }}>
      <Canvas
        camera={{ position: desktopConfig.camera.position as [number, number, number], fov: desktopConfig.camera.fov }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          {/* Улучшенное освещение */}
          <ambientLight intensity={1.2} />
          <directionalLight position={[10, 10, 5]} intensity={2.5} />
          <directionalLight position={[-10, -10, -5]} intensity={1.8} />
          <directionalLight position={[0, 10, 0]} intensity={2} />
          <directionalLight position={[15, 5, 10]} intensity={1.5} />
          <pointLight position={[5, 5, 5]} intensity={2} color="#4f46e5" />
          <pointLight position={[-5, -5, 5]} intensity={1.8} color="#06b6d4" />
          <pointLight position={[0, 0, 8]} intensity={1.5} color="#ffffff" />
          <pointLight position={[8, 3, 3]} intensity={1.2} color="#f59e0b" />
          
          {/* Модель телефона только для ПК */}
          <PhoneModel 
            position={desktopConfig.position} 
            rotation={desktopConfig.rotation} 
            scale={desktopConfig.scale} 
          />
          
          {/* Окружение для лучшего освещения */}
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  );
}

// Предзагрузка модели
useGLTF.preload('/telephone_receiver_3d_icon.glb');