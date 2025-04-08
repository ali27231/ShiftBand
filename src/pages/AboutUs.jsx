import React, {useState} from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import './AboutUs.css';
import {styled} from "@mui/material/styles";
import {Grid, Typography} from "@mui/material";
import {DiGithubBadge} from "react-icons/di";

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

const AboutUs = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
    const navigate = useNavigate();

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

    const teamMembers = [
        {
            name: "علی مشهدی",
            role: "طراح سایت",
            image: "https://s6.uupload.ir/files/dsc_0382_32v.jpg",
            description: "فعال حوزه طراحی وب و گرافیک"
        },
        {
            name: "امیر مهدی رضایی",
            role: "مدیر فنی",
            image: "https://s6.uupload.ir/files/dsc_0231_xl1y.jpg",
            description: "فعال حوزه توسعه اپلیکیشن"
        },
        {
            name: "محمدرضا عبدی",
            role: "طراح سایت",
            image: "https://s6.uupload.ir/files/dsc_0077_bh9g.jpg",
            description: "فعال حوزه طراحی وب و گرافیک"
        }
    ];

    return (
        <div className="about-container">
            <motion.header
                className="header"
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ type: "spring", stiffness: 100 }}
            >
                <div className="header-content">
                    <div className="header-right">
                        <motion.img
                            src="https://uploadkon.ir/uploads/6bfa29_25لوگو-شیفت-بند.png"
                            alt="ShiftBand Logo"
                            onClick={() => navigate('/')}
                            className="header-logo glow-effect"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        />
                    </div>

                    <motion.button
                        className="mobile-menu-button"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
                    </motion.button>

                    <div className="header-left">
                        <motion.nav
                            className="header-nav"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                        >
                            {navigationItems.map((item) => (
                                <motion.div
                                    key={item.title}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Link to={item.path} className="nav-link wave-effect">
                                        {item.title}
                                    </Link>
                                </motion.div>
                            ))}
                        </motion.nav>
                        <motion.div
                            className="header-buttons"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.7 }}
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

            {/* Hero Section */}
            <motion.section
                className="about-hero"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                <div className="about-hero-content glass-effect">
                    <motion.h1
                        initial={{ y: -50 }}
                        animate={{ y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        درباره شیفت‌بند
                    </motion.h1>
                    <motion.p
                        initial={{ y: 50 }}
                        animate={{ y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        پیشرو در ارائه راهکارهای هوشمند مدیریت بیمارستانی
                    </motion.p>
                </div>
            </motion.section>

            {/* Our Story Section */}
            <section className="story-section">
                <motion.div
                    className="story-content"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2>داستان ما</h2>
                    <p>
                        شیفت‌بند در سال ۱۴۰۳ با هدف ارتقای کیفیت خدمات درمانی از طریق
                        دیجیتال‌سازی فرآیندهای بیمارستانی تأسیس شد. ما با تیمی متشکل از
                        متخصصان حوزه سلامت و برنامه‌نویسان باتجربه، این سیستم جامع را
                        توسعه داده‌ایم.
                    </p>
                </motion.div>
            </section>

            {/* Team Section */}
            <section className="team-section">
                <h2>تیم ما</h2>
                <div className="team-grid">
    {teamMembers.map((member, index) => (
        <motion.div
            key={index}
            className="team-card glass-effect"
            onClick={() => member.name === "علی مشهدی" && navigate('/aboutme/')}
            style={{ cursor: member.name === "علی مشهدی" ? 'pointer' : 'default' }}
            whileHover={{
                scale: 1.05,
                rotateY: 10,
                rotateX: 10
            }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{
                opacity: 1,
                y: 0,
                transition: {
                    type: "spring",
                    stiffness: 300,
                    damping: 20
                }
            }}
            viewport={{ once: true }}
        >
            <div className="team-card-content">
                <motion.div
                    className="team-icon float-animation"
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 10, -10, 0]
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                >
                    <img src={member.image} alt={member.name} />
                </motion.div>
                <motion.h3
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    {member.name}
                </motion.h3>
                <motion.p 
                    className="role"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    {member.role}
                </motion.p>
                <motion.p 
                    className="description"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    {member.description}
                </motion.p>
            </div>
        </motion.div>
    ))}
</div>
            </section>

            {/* Values Section */}
            <section className="values-section gradient-animation">
                <h2>ارزش‌های ما</h2>
                <div className="values-grid">
                    <motion.div
                        className="value-card"
                        whileHover={{ scale: 1.05 }}
                    >
                        <DashboardIcon sx={{ fontSize: 40 }} />
                        <h3>نوآوری</h3>
                        <p>همواره در حال توسعه و بهبود خدمات</p>
                    </motion.div>
                    {/* سایر کارت‌های ارزش */}
                </div>
            </section>

            <footer className="footer">
                <div className="footer-content">
                    <motion.div
                        className="footer-section"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <img src="https://uploadkon.ir/uploads/6bfa29_25لوگو-شیفت-بند.png" alt="Logo" className="footer-logo" />
                        <p>ما به دنبال ارائه بهترین خدمات به مشتریان خود هستیم.</p>
                    </motion.div>
                    <motion.div
                        className="footer-section"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <NeonTextFoother variant="h4" sx={{ mb: 3 }} >دسترسی سریع</NeonTextFoother>
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
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >

                    </motion.div>
                </div>

                <div className="social-buttons">
                    <NeonText variant="h4" sx={{ mb: 3 }} >ارتباط با ما</NeonText>
                    <Grid container spacing={3}>
                        {[
                            {
                                text: 'GitHub',
                                link: 'https://github.com/Shiftbandir',
                                icon: <DiGithubBadge size={24} />,
                                color: '#f0f6fc'
                            },
                            {
                                text: 'Phone',
                                link: 'tel:02112345678',
                                icon: <img src="https://s6.uupload.ir/files/pngimg.com_-_phone_png48996_pslr.png" alt="Bale Icon" width={20} height={20} />,
                                color: '#00ff8c'
                            },
                            {
                                text: 'Email',
                                link: 'mailto:info@shiftband.ir',
                                icon: <img src="https://s6.uupload.ir/files/7123031_mail_google_gmail_icon_8821.png" alt="Bale Icon" width={20} height={20} />,
                                color: '#ea4335'
                            },
                            {
                                text: 'Bale',
                                link: 'https://ble.ir/Shiftband_ir',
                                icon: <img src="https://s6.uupload.ir/files/90-grafa-2_rgwz.png" alt="Bale Icon" width={20} height={20} />,
                                color: '#5ae487'
                            },
                            {
                                text: 'Eitaa',
                                link: 'https://eitaa.com/Shiftband_ir',
                                icon: <img src="https://s6.uupload.ir/files/103-grafa-2_858w.png" alt="Eitaa Icon" width={20} height={20} />,
                                color: '#cc5500'
                            },
                            {
                                text: 'Telegram',
                                link: 'https://t.me/Shiftband_ir',
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
                </div>

                <div className="footer-bottom">
                    <p>تمامی حقوق برای شیفت بند محفوظ است © ۱۴۰۳</p>
                </div>
            </footer>
        </div>
    );
};

export default AboutUs;