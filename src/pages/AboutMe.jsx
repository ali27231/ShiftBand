
import React, { useEffect, useState } from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { 
  DiReact, DiJavascript, DiHtml5, DiCss3, DiGithubBadge,
  DiNodejs, DiPhotoshop, DiIllustrator
} from 'react-icons/di';
import { 
  SiNextdotjs, SiTypescript, SiTailwindcss, SiFirebase,
  SiVercel, SiFigma, SiAdobexd, SiAdobepremierepro,
  SiAdobeaftereffects, SiAdobeaudition
} from 'react-icons/si';
import { BiCamera, BiVideo, BiMovie, BiPalette } from 'react-icons/bi';

const BirthdayCountdown = () => {
    const [timeLeft, setTimeLeft] = useState({});
    const birthday = new Date('2008-01-24');
    const currentYear = new Date().getFullYear();
    const nextBirthday = new Date(currentYear, birthday.getMonth(), birthday.getDate());

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date();
            const difference = nextBirthday - now;

            if (difference < 0) {
                nextBirthday.setFullYear(currentYear + 1);
            }

            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            setTimeLeft({ days, hours, minutes, seconds });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <CyberCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            sx={{ mb: 4, px: 2 }}
        >
            <NeonText
                variant="h4"
                sx={{
                    mb: 3,
                    textAlign: 'right',
                    fontSize: {xs: '1.5rem', sm: '2rem'}
                }}
            >
                Next Birthday Countdown
            </NeonText>
            <Grid container spacing={2}>
                {Object.entries(timeLeft).map(([unit, value]) => (
                    <Grid item xs={6} sm={3} key={unit}>
                        <Box
                            sx={{
                                textAlign: 'center',
                                p: {xs: 1, sm: 2},
                                background: 'rgba(0, 255, 140, 0.05)',
                                borderRadius: '15px',
                                border: '1px solid rgba(0, 255, 140, 0.1)',
                            }}
                        >
                            <Typography
                                variant="h3"
                                sx={{
                                    color: '#00ff8c',
                                    fontSize: {xs: '1.8rem', sm: '2.5rem'}
                                }}
                            >
                                {value}
                            </Typography>
                            <Typography
                                sx={{
                                    color: '#00ff8c',
                                    textTransform: 'capitalize',
                                    fontSize: {xs: '0.9rem', sm: '1rem'}
                                }}
                            >
                                {unit}
                            </Typography>
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </CyberCard>
    );
};

const AboutMeSection = () => {
    return (
        <CyberCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            sx={{ mb: 4 }}
        >
            <NeonText variant="h4" sx={{ mb: 3 }}>About Me</NeonText>
            <Typography sx={{ color: 'rgba(0, 255, 140, 0.8)', lineHeight: 1.8 }}>
                Hello and respect,
                I am Ali Mashhadi, an 11th-grade student in the Mathematics branch 📚 studying at Shahid Navab Safavi High School. Alongside my academic studies, I am actively involved in the Jamia Mosque of Safa 🕌, striving to contribute to the growth and advancement of my community. ✨
                <br /><br />
                Two years ago, I stepped into the world of programming 💻 and have currently specialized in front-end development. My passion for creativity and innovation in the digital world 🎨 led me to learn various software, including Photoshop. Five years ago, I was able to strengthen my skills in this area, and in the last three years, I have become familiar with other Adobe software as well. 🖌️
                <br /><br />
                In addition, I have experience in practical work and handling professional tools 🔧, engaging in electrical work, plumbing, and construction 🏗️. These experiences have helped me present myself as a responsible and efficient individual. 💪
                <br /><br />
                I hope that with continuous effort and hard work, I can take effective steps in serving Shia Islam and my community. 🌹 For me, the Jamia Mosque of Safa is not only a sacred place but also a home where I am engaged in learning, growth, and service. 🌈✨
                <br /><br />
                Wishing success and progress for everyone,
                Ali Mashhadi 🌼💖
            </Typography>
        </CyberCard>
    );
};

// Animations
const float = keyframes`
0%, 100% { transform: translateY(0px); }
50% { transform: translateY(-20px); }
`;

const glitch = keyframes`
0% { transform: translate(0); }
20% { transform: translate(-2px, 2px); }
40% { transform: translate(-2px, -2px); }
60% { transform: translate(2px, 2px); }
80% { transform: translate(2px, -2px); }
100% { transform: translate(0); }
    `;

const scanline = keyframes`
0% { transform: translateY(-100%); }
100% { transform: translateY(100%); }
    `;

const neonPulse = keyframes`
0% { box-shadow: 0 0 10px #00ff8c, 0 0 20px #00ff8c, 0 0 30px #00ff8c; }
50% { box-shadow: 0 0 15px #00ff8c, 0 0 25px #00ff8c, 0 0 35px #00ff8c; }
100% { box-shadow: 0 0 10px #00ff8c, 0 0 20px #00ff8c, 0 0 30px #00ff8c; }
`;

const cyberpunkGlow = keyframes`
0% { background-position: 0% 50%; }
50% { background-position: 100% 50%; }
100% { background-position: 0% 50%; }
`;

// Styled Components
const MainContainer = styled(Box)({
  background: '#0a0a0a',
  minHeight: '100vh',
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'radial-gradient(circle at 50% -20%, #00ff8c22, transparent 70%)',
    zIndex: 0,
  },
});

const CyberCard = styled(motion.div)({
  background: 'rgba(10, 10, 10, 0.8)',
  backdropFilter: 'blur(20px)',
  borderRadius: '20px',
  border: '1px solid rgba(0, 255, 140, 0.1)',
  padding: '2rem',
  position: 'relative',
  overflow: 'hidden',
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '2px',
    background: 'linear-gradient(90deg, #00ff8c, #00ffff, #00ff8c)',
    backgroundSize: '200% 200%',
    animation: `${cyberpunkGlow} 3s linear infinite`,
  },
});

const NeonText = styled(Typography)({
  color: '#00ff8c',
  textShadow: '0 0 10px rgba(0, 255, 140, 0.5)',
  fontWeight: 700,
  letterSpacing: '1px',
});

const HoloIcon = styled(motion.div)({
  width: '70px',
  height: '70px',
  borderRadius: '15px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'rgba(0, 255, 140, 0.05)',
  fontSize: '35px',
  color: '#00ff8c',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(45deg, transparent, rgba(0, 255, 140, 0.1), transparent)',
    animation: `${neonPulse} 2s infinite`,
  },
});

const CyberButton = styled(motion.a)({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '10px',
  padding: '15px 30px',
  background: 'linear-gradient(45deg, #00ff8c, #00ffff)',
  borderRadius: '12px',
  color: '#0a0a0a',
  textDecoration: 'none',
  fontSize: '16px',
  fontWeight: 600,
  position: 'relative',
  overflow: 'hidden',
  border: 'none',
  cursor: 'pointer',
  '&:hover': {
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
    background: 'rgba(255, 255, 255, 0.2)',
    transform: 'skewX(-15deg)',
    transition: 'transform 0.5s',
  },
});

const AboutMe = () => {
  const [isHovered, setIsHovered] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      y: [0, -10, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    });
  }, []);

  const skills = [
    {
      category: "Web Development",
      icon: <DiReact />,
      items: [
        { icon: <DiReact />, name: "React.js", level: 98, glow: "#61DAFB" },
        { icon: <DiJavascript />, name: "JavaScript", level: 95, glow: "#F7DF1E" },
        { icon: <DiHtml5 />, name: "HTML5", level: 98, glow: "#E34F26" },
        { icon: <DiCss3 />, name: "CSS3", level: 95, glow: "#1572B6" }
      ]
    },
    {
      category: "Adobe Creative Suite",
      icon: <DiPhotoshop />,
      items: [
        { icon: <DiPhotoshop />, name: "Photoshop", level: 92, glow: "#31A8FF" },
        { icon: <DiIllustrator />, name: "Illustrator", level: 88, glow: "#FF9A00" },
        { icon: <SiAdobepremierepro />, name: "Premiere Pro", level: 90, glow: "#9999FF" },
        { icon: <SiAdobeaftereffects />, name: "After Effects", level: 85, glow: "#9999FF" },
        { icon: <SiAdobeaudition />, name: "Audition", level: 82, glow: "#9999FF" }
      ]
    },
    {
      category: "Digital Media",
      icon: <BiCamera />,
      items: [
        { icon: <BiCamera />, name: "Photography", level: 90, glow: "#00ff8c" },
        { icon: <BiVideo />, name: "Videography", level: 88, glow: "#00ff8c" },
        { icon: <BiMovie />, name: "Video Editing", level: 85, glow: "#00ff8c" },
        { icon: <BiPalette />, name: "Digital Art", level: 87, glow: "#00ff8c" }
      ]
    }
  ];

  const projects = [
    {
      title: "Shiftband.ir",
      description: "Full-Stack Digital Marketing Platform",
      tech: ["React.js", "Next.js", "TypeScript", "TailwindCSS"],
      features: [
        "Real-time Analytics Dashboard",
        "AI-Powered Content Generation",
        "Advanced SEO Optimization",
        "Responsive Design System"
      ],
      link: "https://shiftband.ir"
    }
  ];

  return (
    <MainContainer>
      <Container maxWidth="lg">
        <Box sx={{ py: 8 }}>
          <AnimatePresence>
            {/* Hero Section */}
            <CyberCard
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              sx={{ mb: 6 }}
              whileHover={{ scale: 1.02 }}
            >
              <Grid container spacing={6} alignItems="center">
                <Grid item xs={12} md={5}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{ position: 'relative' }}
                  >
                    <motion.img
                      src="https://s6.uupload.ir/files/dsc_0382_32v.jpg"
                      style={{
                        width: '100%',
                        borderRadius: '20px',
                        border: '2px solid rgba(0, 255, 140, 0.2)'
                      }}
                      animate={controls}
                    />
                    <motion.div
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '2px',
                        background: 'linear-gradient(90deg, transparent, #00ff8c, transparent)',
                      }}
                      animate={{
                        y: ['0%', '100%'],
                        opacity: [0, 1, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    />
                  </motion.div>
                </Grid>
                <Grid item xs={12} md={7}>
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <NeonText
                      variant="h2"
                      sx={{
                        mb: 2,
                        fontSize: { xs: '2.5rem', md: '3.5rem' },
                        animation: `${glitch} 5s infinite`
                      }}
                    >
                      Ali Mashhadi
                    </NeonText>
                    <Typography
                      variant="h4"
                      sx={{
                        color: '#00ff8c',
                        opacity: 0.8,
                        mb: 3,
                        fontSize: { xs: '1.5rem', md: '2rem' }
                      }}
                    >
                      Full-Stack Developer & Digital Creator
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 4 }}>
                      {[<DiReact />, <DiJavascript />, <DiPhotoshop />, <DiGithubBadge />].map((Icon, index) => (
                        <HoloIcon
                          key={index}
                          whileHover={{
                            scale: 1.2,
                            rotate: 360,
                            boxShadow: '0 0 25px #00ff8c'
                          }}
                          whileTap={{ scale: 0.9 }}
                        >
                          {Icon}
                        </HoloIcon>
                      ))}
                    </Box>
                  </motion.div>
                </Grid>
              </Grid>
                <Box sx={{ position: 'absolute', top: 20, left: 20 }}>
                    <CyberButton
                        href="/aboutme/fa"
                        sx={{
                            padding: '10px 20px',
                            background: 'linear-gradient(45deg, #00ff8c, #00ffff)',
                            fontSize: '14px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                        }}
                        whileHover={{
                            scale: 1.05,
                            boxShadow: '0 0 15px rgba(0, 255, 140, 0.5)'
                        }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <img
                            src="https://s6.uupload.ir/files/untitl2ed-1_sp0z.png"
                            alt="English"
                            style={{ width: '20px', height: '20px' }}
                        />
                        Fa
                    </CyberButton>
                </Box>
            </CyberCard>

            {/* Birthday Countdown Section */}
            <BirthdayCountdown />

            {/* About Me Section */}
            <AboutMeSection />

            {/* Skills Section */}
            {skills.map((category, idx) => (
              <CyberCard
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.2 }}
                sx={{ mb: 4 }}
                whileHover={{ scale: 1.01 }}
              >
                <Box sx={{ mb: 4 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                    <HoloIcon>{category.icon}</HoloIcon>
                    <NeonText variant="h4">{category.category}</NeonText>
                  </Box>
                  <Grid container spacing={3}>
                    {category.items.map((skill, index) => (
                      <Grid item xs={12} sm={6} key={index}>
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          style={{ height: '100%' }}
                        >
                          <Box
                            sx={{
                              p: 3,
                              height: '100%',
                              background: 'rgba(0, 255, 140, 0.03)',
                              borderRadius: '15px',
                              border: '1px solid rgba(0, 255, 140, 0.1)',
                              position: 'relative',
                              overflow: 'hidden',
                            }}
                          >
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                              <Box
                                sx={{
                                  width: 45,
                                  height: 45,
                                  borderRadius: '12px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  background: 'rgba(0, 255, 140, 0.05)',
                                  color: skill.glow,
                                  fontSize: '24px'
                                }}
                              >
                                {skill.icon}
                              </Box>
                              <Box sx={{ flexGrow: 1 }}>
                                <Typography variant="h6" sx={{ color: skill.glow }}>
                                  {skill.name}
                                </Typography>
                              </Box>
                              <Typography
                                variant="h6"
                                sx={{ color: '#00ff8c' }}
                              >
                                {skill.level}%
                              </Typography>
                            </Box>
                            <Box
                              sx={{
                                height: '4px',
                                background: 'rgba(0, 255, 140, 0.1)',
                                borderRadius: '2px',
                                overflow: 'hidden'
                              }}
                            >
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${skill.level}%` }}
                                transition={{ duration: 1, delay: index * 0.1 }}
                                style={{
                                  height: '100%',
                                  background: `linear-gradient(90deg, ${skill.glow}, ${skill.glow}50)`,
                                  borderRadius: '2px'
                                }}
                              />
                            </Box>
                          </Box>
                        </motion.div>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              </CyberCard>
            ))}

            {/* Projects Section */}
            <CyberCard
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              sx={{ mb: 4 }}
              whileHover={{ scale: 1.01 }}
            >
              <Box sx={{ p: 2 }}>
                <NeonText variant="h4" sx={{ mb: 3 }}>Featured Projects</NeonText>
                {projects.map((project, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Typography
                      variant="h5"
                      sx={{ color: '#00ff8c', mb: 2 }}
                    >
                      {project.title}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ color: 'rgba(0, 255, 140, 0.8)', mb: 3 }}
                    >
                      {project.description}
                    </Typography>
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={6}>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                          {project.tech.map((tech, idx) => (
                            <Box
                              key={idx}
                              sx={{
                                px: 3,
                                py: 1,
                                background: 'rgba(0, 255, 140, 0.05)',
                                borderRadius: '10px',
                                border: '1px solid rgba(0, 255, 140, 0.1)',
                                color: '#00ff8c'
                              }}
                            >
                              {tech}
                            </Box>
                          ))}
                        </Box>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                          {project.features.map((feature, idx) => (
                            <Box
                              key={idx}
                              sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 2,
                                color: 'rgba(0, 255, 140, 0.8)'
                              }}
                            >
                              <Box
                                sx={{
                                  width: 6,
                                  height: 6,
                                  borderRadius: '50%',
                                  background: '#00ff8c'
                                }}
                              />
                              {feature}
                            </Box>
                          ))}
                        </Box>
                      </Grid>
                    </Grid>
                  </motion.div>
                ))}
              </Box>
            </CyberCard>

            {/* Contact Section */}
            <CyberCard
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <NeonText variant="h4" sx={{ mb: 4 }}>Contact Methods</NeonText>
              <Grid container spacing={3}>
                {[
                  {
                    text: 'GitHub',
                    link: 'https://github.com/ali27231',
                    icon: <DiGithubBadge size={24} />,
                    color: '#f0f6fc'
                  },
                  //{
                  //  text: 'Portfolio',
                  //  link: 'https://shiftband.ir/aboutme',
                  //  icon: <SiVercel size={20} />,
                  //  color: '#00ff8c'
                  //},
                  {
                    text: 'Phone',
                    link: 'tel:09912207669',
                    icon: <img src="https://s6.uupload.ir/files/pngimg.com_-_phone_png48996_pslr.png" alt="Bale Icon" width={20} height={20} />,
                    color: '#00ff8c'
                  },

                  {
                    text: 'Email',
                    link: 'mailto:mashhadia640@gmail.com',
                    icon: <img src="https://s6.uupload.ir/files/7123031_mail_google_gmail_icon_8821.png" alt="Bale Icon" width={20} height={20} />,
                    color: '#ea4335',
                  },

                    {
                        text: 'Bale',
                        link: 'https://ble.ir/ali_mashhadi86',
                        icon: <img src="https://s6.uupload.ir/files/90-grafa-2_rgwz.png" alt="Bale Icon" width={20} height={20} />,
                        color: '#5ae487'
                    },

                    {
                    text: 'Eitaa',
                    link: 'https://eitaa.com/Ali_mashhadi213',
                    icon: <img src="https://s6.uupload.ir/files/103-grafa-2_858w.png" alt="Eitaa Icon" width={20} height={20} />,
                    color: '#cc5500'
                  },

                  {
                    text: 'Telegram',
                    link: 'https://t.me/DELTA27231',
                    icon: <img src="https://s6.uupload.ir/files/46-grafa-2-2_cmv4.png" alt="Telegram Icon" width={20} height={20} />,
                    color: '#0088cc'
                  }
                ].map((contact, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
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
            </CyberCard>

            {/* Copyright Section */}
            <Box
              sx={{
                textAlign: 'center',
                py: 4,
                borderTop: '1px solid rgba(0, 255, 140, 0.1)',
                mt: 4
              }}
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                <Typography sx={{ color: 'rgba(0, 255, 140, 0.6)' }}>
                  © {new Date().getFullYear()} Ali Mashhadi. All rights reserved.
                  <br />
                  Crafted with <span style={{ color: '#00ff8c' }}>♥</span> and cutting-edge technology.
                </Typography>
              </motion.div>
            </Box>
          </AnimatePresence>
        </Box>
      </Container>
    </MainContainer>
  );
};

export default AboutMe;