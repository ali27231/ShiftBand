import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useSpring } from 'framer-motion';
import styled, { keyframes } from 'styled-components';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';

// استایل‌های پیشرفته با افکت‌های سه بعدی
const ChatContainer = styled(motion.div)`
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 9999;
  perspective: 1000px;
`;

const glowingEffect = keyframes`
  0% { box-shadow: 0 0 5px #4fc3f7, 0 0 10px #4fc3f7, 0 0 15px #4fc3f7; }
  50% { box-shadow: 0 0 20px #4fc3f7, 0 0 25px #4fc3f7, 0 0 30px #4fc3f7; }
  100% { box-shadow: 0 0 5px #4fc3f7, 0 0 10px #4fc3f7, 0 0 15px #4fc3f7; }
`;

const ChatButton = styled(motion.button)`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  border: none;
  background: linear-gradient(145deg, #00b4db, #0083b0);
  cursor: pointer;
  position: relative;
  overflow: hidden;
  animation: ${glowingEffect} 2s infinite;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255,255,255,0.8) 0%, transparent 65%);
    transform: rotate(45deg);
    transition: 0.5s;
  }

  &:hover::before {
    transform: rotate(225deg);
  }
`;

const ChatWindow = styled(motion.div)`
  width: 400px;
  height: 600px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 30px;
  overflow: hidden;
  box-shadow: 0 10px 50px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, 
      rgba(255,255,255,0.1) 0%, 
      rgba(255,255,255,0.2) 100%
    );
    pointer-events: none;
  }
`;

// کامپوننت سه بعدی برای پس‌زمینه
const Background3D = () => {
  const mesh = useRef();

  useFrame(() => {
    mesh.current.rotation.x += 0.01;
    mesh.current.rotation.y += 0.01;
  });

  return (
    <mesh ref={mesh}>
      <torusGeometry args={[3, 1, 16, 100]} />
      <meshStandardMaterial 
        color="#00b4db"
        metalness={0.7}
        roughness={0.2}
      />
    </mesh>
  );
};

// کامپوننت اصلی چت
const EnhancedChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const springProps = useSpring({
    scale: isOpen ? 1 : 0.8,
    config: { tension: 300, friction: 20 }
  });

  const theme = createTheme({
    palette: {
      primary: {
        main: '#00b4db',
      },
      secondary: {
        main: '#0083b0',
      },
    },
  });

  const messageVariants = {
    initial: { 
      opacity: 0, 
      y: 50,
      rotateX: -30
    },
    animate: { 
      opacity: 1, 
      y: 0,
      rotateX: 0,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 300
      }
    },
    exit: { 
      opacity: 0,
      scale: 0.8,
      transition: { duration: 0.3 }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <ChatContainer>
        <ChatButton
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(!isOpen)}
        >
          <Canvas>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <Background3D />
          </Canvas>
        </ChatButton>

        <AnimatePresence>
          {isOpen && (
            <ChatWindow
              initial={{ opacity: 0, y: 20, rotateX: -30 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              exit={{ opacity: 0, y: 20, rotateX: 30 }}
              transition={{
                type: "spring",
                damping: 20,
                stiffness: 300
              }}
            >
              {/* محتوای چت */}
            </ChatWindow>
          )}
        </AnimatePresence>
      </ChatContainer>
    </ThemeProvider>
  );
};

// استایل‌های اضافی برای افکت‌های پیشرفته
const additionalStyles = `
  @keyframes floating {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
  }

  @keyframes ripple {
    0% {
      transform: scale(0);
      opacity: 1;
    }
    100% {
      transform: scale(4);
      opacity: 0;
    }
  }

  .message {
    position: relative;
    overflow: hidden;
    
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(
        to right,
        transparent,
        rgba(255, 255, 255, 0.2),
        transparent
      );
      transform: translateX(-100%);
      animation: shimmer 2s infinite;
    }
  }

  @keyframes shimmer {
    100% {
      transform: translateX(100%);
    }
  }

  .bubble {
    position: relative;
    
    &::before {
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      background: radial-gradient(
        circle at center,
        rgba(255, 255, 255, 0.8),
        transparent 70%
      );
      opacity: 0;
      transition: opacity 0.3s;
    }

    &:hover::before {
      opacity: 1;
    }
  }
`;

export default EnhancedChat;