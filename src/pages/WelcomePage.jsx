import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PersonIcon from '@mui/icons-material/Person';
import AssessmentIcon from '@mui/icons-material/Assessment';
import SettingsIcon from '@mui/icons-material/Settings';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import './WelcomePage.css';
import avatar1 from '../assets/avatar1.jpg';
import avatar2 from '../assets/avatar2.jpg';
import avatar3 from '../assets/avatar3.jpg';
import {Grid, Typography,} from "@mui/material";
import {DiGithubBadge} from "react-icons/di";
import {styled} from "@mui/material/styles";

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

const hospitals = [
    {
        name: "بیمارستان شهید رجایی",
        logo: "https://s6.uupload.ir/files/1rajaeei_lcrf.png"
    },
    {
        name: "بیمارستان جم",
        logo: "https://s6.uupload.ir/files/1jam_aa3.png"
    },
    {
        name: "مجتمع محب",
        logo: "https://s6.uupload.ir/files/1moheb_c54n.png"
    },
    {
        name: "بیمارستان لاله",
        logo: "https://s6.uupload.ir/files/1lale_wxt6.png"
    },
    {
        name: "بیمارستان توس",
        logo: "https://s6.uupload.ir/files/1tos_peth.png"
    },
    {
        name: "بیمارستان رضوی",
        logo: "https://s6.uupload.ir/files/1razavi_bif8.png"
    },
    {
        name: "بیمارستان میلاد",
        logo: "https://s6.uupload.ir/files/1میلاد_t15q.png"
    },
    {
        name: "بیمارستان امام خمینی (ره)",
        logo: "https://s6.uupload.ir/files/1خمینی_4aoz.png"
    },
    {
        name: "بیمارستان مدرس",
        logo: "https://s6.uupload.ir/files/1مدرس_zhbk.png"
    },
    {
        name: "بیمارستان فارابی",
        logo: "https://s6.uupload.ir/files/1فارابی_plx1.png"
    },
    {
        name: "سازمان تامین اجتماعی",
        logo: "https://s6.uupload.ir/files/1تامین_usxi.png"
    },
    {
        name: "بیمارستان امام حسین (ع)",
        logo: "https://s6.uupload.ir/files/1امام_حسین_42uo.png"
    },
];

//const ParticleBurst = ({ x, y }) => {
  //  return (
     //   <motion.div
       //     className="particle-burst"
          //  style={{ left: x, top: y }}
            //initial="hidden"
            //animate="visible"
        //>
          //  {[...Array(12)].map((_, i) => (
             //   <motion.span
                //    key={i}
                  //  variants={{
                    //    hidden: {
                      //      x: 0,
                        //    y: 0,
                          //  opacity: 0
                        //},
                        //visible: {
                          //  x: Math.cos(i * 30 * Math.PI / 180) * 50,
                        //    y: Math.sin(i * 30 * Math.PI / 180) * 50,
                      //      opacity: [0, 1, 0],
                    //        transition: {
                  //              duration: 0.6,
                //                ease: "easeOut"
              //              }
            //            }
          //          }}
        //        />
      //      ))}
    //    </motion.div>
  //  );
//};

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

const Particles = () => {
    return (
        <div className="particles">
            {[...Array(20)].map((_, i) => (
                <motion.div
                    key={i}
                    className="particle"
                    initial={{
                        x: Math.random() * window.innerWidth,
                        y: Math.random() * window.innerHeight,
                    }}
                    animate={{
                        y: [0, -20, 0],
                        x: [0, Math.random() * 20, 0],
                    }}
                    transition={{
                        duration: 3 + Math.random() * 2,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    style={{
                        width: Math.random() * 5 + 'px',
                        height: Math.random() * 5 + 'px',
                    }}
                />
            ))}
        </div>
    );
};

const WelcomePage = () => {
    const [showAuthButtons, setShowAuthButtons] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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

    const features = [
        {
            icon: <DashboardIcon sx={{ fontSize: 40 }} />,
            title: "مدیریت پزشکان",
            description: "ایجاد پنل کاربری اختصاصی برای هر پزشک"
        },
        {
            icon: <CalendarMonthIcon sx={{ fontSize: 40 }} />,
            title: "ثبت شیفت",
            description: "سیستم پیشرفته ثبت و مدیریت شیفت‌های کاری"
        },
        {
            icon: <AccessTimeIcon sx={{ fontSize: 40 }} />,
            title: "شیفت‌های من",
            description: "مشاهده و مدیریت شیفت‌های تخصیص داده شده"
        },
        {
            icon: <PersonIcon sx={{ fontSize: 40 }} />,
            title: "پروفایل کاربری",
            description: "مدیریت اطلاعات شخصی و حرفه‌ای"
        },
        {
            icon: <AssessmentIcon sx={{ fontSize: 40 }} />,
            title: "گزارش حضور و غیاب",
            description: "گزارش‌گیری پیشرفته از عملکرد پرسنل"
        },
        {
            icon: <SettingsIcon sx={{ fontSize: 40 }} />,
            title: "تنظیمات سیستم",
            description: "پیکربندی و شخصی‌سازی سیستم"
        }
    ];

    const stats = [
        { value: "+۶,۳۴۳", label: "بیمارستان فعال در دنیا" },
        { value: "+۲,۷۲۱,۴۳۸", label: "پزشک و پرسنل" },
        { value: "+۱۲۰,۱۲۵,۵۷۵", label: "شیفت مدیریت شده" }
    ];

    return (
        <>
        <div className="welcome-container">
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

            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        className="mobile-menu"
                        initial={{ opacity: 0, y: -100 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -100 }}
                        transition={{ duration: 0.3 }}
                    >
                        <motion.nav className="mobile-nav">
                            {navigationItems.map((item, index) => (
                                <motion.div
                                    key={item.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <Link
                                        to={item.path}
                                        className="nav-link wave-effect"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        {item.title}
                                    </Link>
                                </motion.div>
                            ))}
                        </motion.nav>
                        <motion.div
                            className="mobile-buttons"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                        >
                            <RippleButton
                                className="header-button login"
                                onClick={() => {
                                    handleLogin();
                                    setIsMobileMenuOpen(false);
                                }}
                            >
                                ورود
                            </RippleButton>
                            <RippleButton
                                className="header-button register gradient-animation"
                                onClick={() => {
                                    handleRegister();
                                    setIsMobileMenuOpen(false);
                                }}
                            >
                                ثبت‌نام
                            </RippleButton>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.section
                className="hero"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                <Particles />
                <motion.div
                    className="hero-content glass-effect"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    <motion.h1
                        className="float-animation"
                        initial={{ y: -50 }}
                        animate={{ y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        سیستم هوشمند مدیریت بیمارستان
                    </motion.h1>
                    <motion.p
                        initial={{ y: 50 }}
                        animate={{ y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        راهکاری جامع برای مدیریت یکپارچه بیمارستان شما
                    </motion.p>

                    <AnimatePresence mode='wait'>
                        {!showAuthButtons ? (
                            <RippleButton
                                className="cta-button gradient-animation"
                                onClick={() => setShowAuthButtons(true)}
                            >
                                شروع کنید
                            </RippleButton>
                        ) : (
                            <motion.div
                                className="auth-buttons"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                            >
                                <RippleButton
                                    className="login-button gradient-animation"
                                    onClick={handleLogin}
                                >
                                    ورود
                                </RippleButton>
                                <RippleButton
                                    className="register-button"
                                    onClick={handleRegister}
                                >
                                    ثبت‌نام
                                </RippleButton>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </motion.section>

            <section className="features">
                <div className="features-grid">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            className="feature-card glow-effect"
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
                            <div className="feature-card-content">
                                <motion.div
                                    className="feature-icon float-animation"
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
                                    {feature.icon}
                                </motion.div>
                                <motion.h3
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    {feature.title}
                                </motion.h3>
                                <motion.p
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    {feature.description}
                                </motion.p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="testimonials">
                <h2 className="section-title">نظرات مشتریان</h2>
                <div className="testimonials-grid">
                    <motion.div 
                        className="testimonial-card"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <img src={avatar1} alt="User 1" className="testimonial-avatar" />
                        <h3>علی محمدی</h3>
                        <p className="role">مدیر بیمارستان</p>
                        <p className="comment">عالی بود! سرعت و کیفیت خدمات فوق‌العاده است.</p>
                    </motion.div>
                    <motion.div 
                        className="testimonial-card"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <img src={avatar2} alt="User 2" className="testimonial-avatar" />
                        <h3>مریم احمدی</h3>
                        <p className="role">پزشک</p>
                        <p className="comment">بهترین انتخاب برای من بود.</p>
                    </motion.div>
                    <motion.div 
                        className="testimonial-card"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                    >
                        <img src={avatar3} alt="User 3" className="testimonial-avatar" />
                        <h3>رضا کریمی</h3>
                        <p className="role">معاون سازمان</p>
                        <p className="comment">پشتیبانی عالی و خدمات با کیفیت.</p>
                    </motion.div>
                </div>
            </section>
            <motion.section
                className="trusted-hospitals"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
            >
                <h2 className="trust-title">مورد اعتماد بیمارستان‌ها و کلینیک‌هایی که می‌شناسید</h2>

                <div className="logo-slider">
                    <div className="slider-container">
                        <div className="slider-track">
                            {hospitals.map((hospital, index) => (
                                <div key={index} className="logo-item">
                                    <img src={hospital.logo} alt={hospital.name} />
                                    <p>{hospital.name}</p>
                                </div>
                            ))}
                            {/* تکرار همان آیتم‌ها برای حرکت پیوسته */}
                            {hospitals.map((hospital, index) => (
                                <div key={`repeat-${index}`} className="logo-item">
                                    <img src={hospital.logo} alt={hospital.name} />
                                    <p>{hospital.name}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.section>
            {/* FAQ Section */}
            <motion.section 
                className="faq"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
            >
                <h2 className="section-title">سوالات متداول</h2>
                <div className="faq-container">
                    <motion.div 
                        className="faq-item"
                        whileHover={{ scale: 1.05 }}
                    >
                        <h3>چگونه شروع کنم؟</h3>
                        <p>به سادگی ثبت نام کنید و از خدمات ما استفاده کنید.</p>
                    </motion.div>
                    <motion.div 
                        className="faq-item"
                        whileHover={{ scale: 1.05 }}
                    >
                        <h3>هزینه‌ها چقدر است؟</h3>
                        <p>ما پلن‌های متنوعی داریم که متناسب با نیاز شما است.</p>
                    </motion.div>
                    <motion.div 
                        className="faq-item"
                        whileHover={{ scale: 1.05 }}
                    >
                        <h3>پشتیبانی چگونه است؟</h3>
                        <p>پشتیبانی ۲۴ ساعته از طریق تیکت و تماس تلفنی.</p>
                    </motion.div>
                </div>
            </motion.section>

            <motion.section
                className="statistics gradient-animation"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
            >
                <div className="stats-container">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            className="stat-item float-animation"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                        >
                            <motion.h2>{stat.value}</motion.h2>
                            <motion.p>{stat.label}</motion.p>
                        </motion.div>
                    ))}
                </div>
            </motion.section>

            {/* Footer */}
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
        </>
    );
};

export default WelcomePage;