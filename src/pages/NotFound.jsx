import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Typography, Grid, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import HomeIcon from '@mui/icons-material/Home';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { DiGithubBadge } from "react-icons/di";

const NeonText = styled(Typography)({
    color: '#006fff',
    textShadow: '0 0 10px #006fff',
    fontWeight: 700,
    letterSpacing: '1px',
    textAlign: 'left',
    fontSize: '25px',
});

const NeonTextFoother = styled(Typography)({
    color: '#006fff',
    textShadow: '0 0 10px #006fff',
    fontWeight: 700,
    letterSpacing: '1px',
    textAlign: 'rtl',
    fontSize: '25px',
});

const RippleButton = ({ children, className, onClick }) => {
    const [ripples, setRipples] = useState([]);

    const createRipple = (event) => {
        const button = event.currentTarget;
        const rect = button.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const ripple = {
            x,
            y,
            id: Date.now()
        };

        setRipples((prevRipples) => [...prevRipples, ripple]);
        setTimeout(() => {
            setRipples((prevRipples) =>
                prevRipples.filter((item) => item.id !== ripple.id)
            );
        }, 600);

        if (onClick) {
            onClick(event);
        }
    };

    return (
        <button className={`ripple-effect ${className}`} onClick={createRipple}>
            {children}
            {ripples.map((ripple) => (
                <span
                    key={ripple.id}
                    className="ripple"
                    style={{
                        left: ripple.x,
                        top: ripple.y
                    }}
                />
            ))}
        </button>
    );
};
const colors = {
  primary: '#007FFF', // Bright blue
  secondary: '#00BFFF', // Deep sky blue
  accent: '#00FFFF', // Cyan
  dark: '#001F3F', // Navy blue
  light: '#E6F3FF', // Light blue
  white: '#FFFFFF'
};

const CyberButton = styled(motion.a)({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '10px',
  padding: '15px 30px',
  background: `linear-gradient(45deg, ${colors.primary}, ${colors.secondary})`,
  borderRadius: '12px',
  color: colors.white,
  textDecoration: 'none',
  fontSize: '16px',
  fontWeight: 600,
  position: 'relative',
  overflow: 'hidden',
  border: 'none',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  boxShadow: `0 0 15px ${colors.primary}40`,
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: `0 0 25px ${colors.primary}80`,
    '&::before': {
      transform: 'translateX(100%)',
    },
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: -100,
    width: '100%',
    height: '100%',
    background: `${colors.light}20`,
    transform: 'skewX(-15deg)',
    transition: 'transform 0.5s',
  },
});

const GlitchText = styled(Typography)({
  fontSize: '200px',
  fontWeight: 900,
  position: 'relative',
  color: colors.white,
  textShadow: `
    2px 2px ${colors.primary},
    -2px -2px ${colors.secondary}
  `,
  animation: 'glitch 1.5s infinite',
  '@keyframes glitch': {
    '0%': {
      textShadow: `2px 2px ${colors.primary}, -2px -2px ${colors.secondary}`,
      transform: 'translate(0)'
    },
    '25%': {
      textShadow: `-2px 2px ${colors.primary}, 2px -2px ${colors.secondary}`,
      transform: 'translate(2px, 2px)'
    },
    '50%': {
      textShadow: `2px -2px ${colors.primary}, -2px 2px ${colors.secondary}`,
      transform: 'translate(-2px, -2px)'
    },
    '75%': {
      textShadow: `-2px -2px ${colors.primary}, 2px 2px ${colors.secondary}`,
      transform: 'translate(2px, -2px)'
    },
    '100%': {
      textShadow: `2px 2px ${colors.primary}, -2px -2px ${colors.secondary}`,
      transform: 'translate(0)'
    }
  },
  '&::before, &::after': {
    content: '"404"',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%'
  },
  '&::before': {
    left: '2px',
    textShadow: `-2px 0 ${colors.primary}`,
    animation: 'glitch-anim 2s infinite linear alternate-reverse'
  },
  '&::after': {
    left: '-2px',
    textShadow: `2px 0 ${colors.secondary}`,
    animation: 'glitch-anim2 1s infinite linear alternate-reverse'
  }
});

// Enhanced particle effect configuration
const particleConfig = {
  count: 80,
  colors: [colors.primary, colors.secondary, colors.accent],
  size: { min: 2, max: 6 },
  speed: { min: 1, max: 4 },
  opacity: { min: 0.3, max: 0.7 }
};

const NotFound = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const handleLogin = () => {
        navigate('/login');
    };

    const handleRegister = () => {
        navigate('/register');
    };

    const navigationItems = [
        { title: 'محصولات', path: '/products' },
        { title: 'قیمت‌گذاری', path: '/pricing' },
        { title: 'آموزش سامانه', path: '/blog' },
        { title: 'خدمات AI', path: '/ai-services' },
        { title: 'ارتباط با ما', path: '/contactus' }
    ];
  return (
      <Box sx={{
          minHeight: '100vh',
          background: `linear-gradient(135deg, ${colors.dark} 0%, #000B18 100%)`,
          position: 'relative',
          overflow: 'hidden'
      }}>
          <motion.header
              className="header"
              initial={{y: -100}}
              animate={{y: 0}}
              transition={{type: "spring", stiffness: 100}}
          >
              {/* محتویات هدر مشابه Products.jsx */}
              <div className="header-content">
                  <div className="header-right">
                      <motion.img
                          src="https://uploadkon.ir/uploads/6bfa29_25لوگو-شیفت-بند.png"
                          alt="ShiftBand Logo"
                          onClick={() => navigate('/')}
                          className="header-logo glow-effect"
                          whileHover={{scale: 1.05}}
                          whileTap={{scale: 0.95}}
                      />
                  </div>

                  <motion.button
                      className="mobile-menu-button"
                      onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                      whileHover={{scale: 1.1}}
                      whileTap={{scale: 0.9}}
                  >
                      {isMobileMenuOpen ? <CloseIcon/> : <MenuIcon/>}
                  </motion.button>

                  <div className="header-left">
                      <motion.nav
                          className="header-nav"
                          initial={{opacity: 0}}
                          animate={{opacity: 1}}
                          transition={{delay: 0.5}}
                      >
                          {navigationItems.map((item) => (
                              <motion.div
                                  key={item.title}
                                  whileHover={{scale: 1.1}}
                                  whileTap={{scale: 0.95}}
                              >
                                  <Link to={item.path} className="nav-link wave-effect">
                                      {item.title}
                                  </Link>
                              </motion.div>
                          ))}
                      </motion.nav>
                      <motion.div
                          className="header-buttons"
                          initial={{opacity: 0}}
                          animate={{opacity: 1}}
                          transition={{delay: 0.7}}
                      >
                          <RippleButton
                              className="header-button login"
                              onClick={handleLogin}
                          >
                              ورود
                          </RippleButton>
                          <RippleButton
                              className="header-button register gradient-animation"
                              onClick={handleRegister}
                          >
                              ثبت‌نام
                          </RippleButton>
                      </motion.div>
                  </div>
              </div>
          </motion.header>
          {/* Enhanced Particle Effect */}
          <motion.div className="particle-container">
              {[...Array(particleConfig.count)].map((_, i) => (
                  <motion.div
                      key={i}
                      className="particle"
                      initial={{
                          y: -10,
                          x: Math.random() * window.innerWidth,
                          opacity: Math.random() * (particleConfig.opacity.max - particleConfig.opacity.min) + particleConfig.opacity.min
                      }}
                      animate={{
                          y: window.innerHeight + 10,
                          x: Math.random() * window.innerWidth,
                          opacity: Math.random() * (particleConfig.opacity.max - particleConfig.opacity.min) + particleConfig.opacity.min
                      }}
                      transition={{
                          duration: Math.random() * (particleConfig.speed.max - particleConfig.speed.min) + particleConfig.speed.min,
                          repeat: Infinity,
                          ease: "linear",
                          delay: Math.random() * 2
                      }}
                      style={{
                          width: Math.random() * (particleConfig.size.max - particleConfig.size.min) + particleConfig.size.min,
                          height: Math.random() * (particleConfig.size.max - particleConfig.size.min) + particleConfig.size.min,
                          background: particleConfig.colors[Math.floor(Math.random() * particleConfig.colors.length)]
                      }}
                  />
              ))}
          </motion.div>

          {/* Enhanced Main Content */}
          <motion.div
              className="error-content"
              initial={{opacity: 0, y: 50}}
              animate={{opacity: 1, y: 0}}
              transition={{duration: 1, ease: "easeOut"}}
          >
              <GlitchText>404</GlitchText>

              <motion.h2
                  initial={{opacity: 0}}
                  animate={{opacity: 1}}
                  transition={{delay: 0.5}}
                  style={{
                      color: colors.white,
                      fontSize: '2.8rem',
                      textAlign: 'center',
                      marginBottom: '1.5rem',
                      textShadow: `0 0 10px ${colors.primary}40`
                  }}
              >
                  صفحه مورد نظر یافت نشد
              </motion.h2>

              <motion.p
                  initial={{opacity: 0}}
                  animate={{opacity: 1}}
                  transition={{delay: 0.7}}
                  style={{
                      color: colors.light,
                      fontSize: '1.3rem',
                      textAlign: 'center',
                      maxWidth: '700px',
                      margin: '0 auto 3rem',
                      lineHeight: 1.6
                  }}
              >
                  متأسفانه صفحه‌ای که به دنبال آن هستید وجود ندارد یا به آدرس دیگری منتقل شده است
              </motion.p>

              <motion.div
                  className="action-buttons"
                  initial={{opacity: 0, y: 20}}
                  animate={{opacity: 1, y: 0}}
                  transition={{delay: 0.9}}
              >
                  <CyberButton
                      as={motion.button}
                      onClick={() => navigate('/')}
                      whileHover={{
                          scale: 1.05,
                          boxShadow: `0 0 30px ${colors.primary}90`
                      }}
                  >
                      <HomeIcon/> بازگشت به خانه
                  </CyberButton>

                  <CyberButton
                      as={motion.button}
                      onClick={() => navigate(-1)}
                      whileHover={{
                          scale: 1.05,
                          boxShadow: `0 0 30px ${colors.secondary}90`
                      }}
                      style={{
                          background: `linear-gradient(45deg, ${colors.secondary}, ${colors.accent})`
                      }}
                  >
                      <ArrowBackIcon/> صفحه قبلی
                  </CyberButton>
              </motion.div>
          </motion.div>

          <style jsx>{`
              .particle-container {
                  position: fixed;
                  top: 0;
                  left: 0;
                  width: 100%;
                  height: 100%;
                  pointer-events: none;
                  z-index: 0;
              }

              .particle {
                  position: absolute;
                  border-radius: 50%;
                  pointer-events: none;
                  filter: blur(1px);
              }

              .error-content {
                  position: relative;
                  z-index: 1;
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  justify-content: center;
                  min-height: 100vh;
                  padding: 2rem;
                  background: radial-gradient(circle at center, transparent, ${colors.dark}90);
              }

              .action-buttons {
                  display: flex;
                  gap: 2rem;
                  flex-wrap: wrap;
                  justify-content: center;
              }

              @keyframes glitch-anim {
                  0% {
                      clip-path: inset(80% 0 0 0);
                  }
                  100% {
                      clip-path: inset(0 0 80% 0);
                  }
              }

              @keyframes glitch-anim2 {
                  0% {
                      clip-path: inset(0 80% 0 0);
                  }
                  100% {
                      clip-path: inset(0 0 0 80%);
                  }
              }

              @media (max-width: 768px) {
                  ${GlitchText} {
                      font-size: 120px;
                  }
              }
          `}</style>
          <footer className="footer">
              <div className="footer-content">
                  <motion.div
                      className="footer-section"
                      initial={{opacity: 0, x: -50}}
                      whileInView={{opacity: 1, x: 0}}
                      viewport={{once: true}}
                  >
                      <img src="https://uploadkon.ir/uploads/6bfa29_25لوگو-شیفت-بند.png" alt="Logo"
                           className="footer-logo"/>
                      <p>ما به دنبال ارائه بهترین خدمات به مشتریان خود هستیم.</p>
                  </motion.div>
                  <motion.div
                      className="footer-section"
                      initial={{opacity: 0, y: 50}}
                      whileInView={{opacity: 1, y: 0}}
                      viewport={{once: true}}
                  >
                      <NeonTextFoother variant="h4" sx={{mb: 3}}>دسترسی سریع</NeonTextFoother>
                      <ul>
                          <li><Link to="/">خانه</Link></li>
                          <li><Link to="/features">امکانات</Link></li>
                          <li><Link to="/pricing">قیمت‌ها</Link></li>
                          <li><Link to="/contactus">ارتباط با ما</Link></li>
                          <li><Link to="/aboutus">درباره ما</Link></li>
                      </ul>

                  </motion.div>
                  <img
                      src="https://s6.uupload.ir/files/81_nlqs.png"
                      alt="نماد اعتماد الکترونیکی"
                      className="footer-image"
                      onClick={() => window.open("https://trustseal.enamad.ir/?id=341854&Code=YcecWnyU0rb1dXAsfwGz", "_blank")}/>
                  <img
                      src="https://s6.uupload.ir/files/1_x7k0.png"
                      alt="نماد اعتماد الکترونیکی"
                      className="footer-image"
                      onClick={() => window.open("https://logo.samandehi.ir/Verify.aspx?id=366004&p=xlaogvkagvkaobpdobpdaods", "_blank")}/>
                  <motion.div
                      className="footer-section"
                      initial={{opacity: 0, x: 50}}
                      whileInView={{opacity: 1, x: 0}}
                      viewport={{once: true}}
                  >

                  </motion.div>
              </div>

              <div className="social-buttons">
                  <NeonText variant="h4" sx={{mb: 3}}>ارتباط با ما</NeonText>
                  <Grid container spacing={3}>
                      {[
                          {
                              text: 'GitHub',
                              link: 'https://github.com/Shiftbandir',
                              icon: <DiGithubBadge size={24}/>,
                              color: '#f0f6fc'
                          },
                          {
                              text: 'Phone',
                              link: 'tel:02112345678',
                              icon: <img src="https://s6.uupload.ir/files/pngimg.com_-_phone_png48996_pslr.png"
                                         alt="Bale Icon" width={20} height={20}/>,
                              color: '#00ff8c'
                          },
                          {
                              text: 'Email',
                              link: 'mailto:info@shiftband.ir',
                              icon: <img src="https://s6.uupload.ir/files/7123031_mail_google_gmail_icon_8821.png"
                                         alt="Bale Icon" width={20} height={20}/>,
                              color: '#ea4335'
                          },
                          {
                              text: 'Bale',
                              link: 'https://ble.ir/Shiftband_ir',
                              icon: <img src="https://s6.uupload.ir/files/90-grafa-2_rgwz.png" alt="Bale Icon"
                                         width={20} height={20}/>,
                              color: '#5ae487'
                          },
                          {
                              text: 'Eitaa',
                              link: 'https://eitaa.com/Shiftband_ir',
                              icon: <img src="https://s6.uupload.ir/files/103-grafa-2_858w.png" alt="Eitaa Icon"
                                         width={20} height={20}/>,
                              color: '#cc5500'
                          },
                          {
                              text: 'Telegram',
                              link: 'https://t.me/Shiftband_ir',
                              icon: <img src="https://s6.uupload.ir/files/46-grafa-2-2_cmv4.png" alt="Telegram Icon"
                                         width={20} height={20}/>,
                              color: '#0088cc'
                          }
                      ].map((contact, index) => (
                          <Grid item xs={12} sm={6} md={4} key={index}>
                              <motion.div
                                  whileHover={{scale: 1.05}}
                                  whileTap={{scale: 0.95}}
                              >
                                  <CyberButton
                                      href={contact.link}
                                      target="_blank"
                                      style={{
                                          width: '100%',
                                          justifyContent: 'center',
                                          background: `linear-gradient(45deg, ${contact.color}90, ${contact.color}50)`
                                      }}
                                      whileHover={{
                                          background: `linear-gradient(45deg, ${contact.color}, ${contact.color}90)`,
                                          boxShadow: `0 0 20px ${contact.color}50`
                                      }}
                                  >
                                      {contact.icon} {contact.text}
                                  </CyberButton>
                              </motion.div>
                          </Grid>
                      ))}
                  </Grid>
              </div>

              <div className="footer-bottom">
                  <p>تمامی حقوق برای شیفت بند محفوظ است © ۱۴۰۳</p>
              </div>
          </footer>
      </Box>

  );
};

export default NotFound;