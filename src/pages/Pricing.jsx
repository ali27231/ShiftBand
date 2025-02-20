import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import PaidIcon from '@mui/icons-material/Paid';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import StarIcon from '@mui/icons-material/Star';
import DiamondIcon from '@mui/icons-material/Diamond';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import './Pricing.css';
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

const Pricing = () => {
    const [showAuthButtons, setShowAuthButtons] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [selectedPeriod, setSelectedPeriod] = useState('monthly');
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

    const pricingPlans = [
        {
            title: 'پایه',
            icon: <StarIcon sx={{ fontSize: 40 }} />,
            price: {
                monthly: '2,900,000',
                annual: '29,900,000'
            },
            features: [
                'مدیریت 50 پزشک',
                'پشتیبانی ایمیل',
                'آپدیت‌های رایگان',
                'داشبورد پایه',
                'مدیریت شیفت ساده'
            ],
            color: '#4CAF50',
            popular: false
        },
        {
            title: 'حرفه‌ای',
            icon: <DiamondIcon sx={{ fontSize: 40 }} />,
            price: {
                monthly: '4,900,000',
                annual: '49,900,000'
            },
            features: [
                'مدیریت نامحدود پزشک',
                'پشتیبانی تلفنی 24/7',
                'آپدیت‌های پیشرفته',
                'داشبورد حرفه‌ای',
                'مدیریت شیفت پیشرفته',
                'گزارش‌گیری حرفه‌ای',
                'API اختصاصی'
            ],
            color: '#2196F3',
            popular: true
        },
        {
            title: 'سازمانی',
            icon: <WorkspacePremiumIcon sx={{ fontSize: 40 }} />,
            price: {
                monthly: '8,900,000',
                annual: '89,900,000'
            },
            features: [
                'تمام امکانات نسخه حرفه‌ای',
                'پشتیبانی اختصاصی',
                'آموزش حضوری',
                'سفارشی‌سازی کامل',
                'بک‌آپ لحظه‌ای',
                'امنیت پیشرفته',
                'مشاوره تخصصی',
                'اتصال به سامانه‌های بیمارستانی'
            ],
            color: '#9C27B0',
            popular: false
        }
    ];

    const features = [
        {
            icon: <SupportAgentIcon sx={{ fontSize: 40 }} />,
            title: 'پشتیبانی 24/7',
            description: 'تیم پشتیبانی متخصص در تمام ساعات آماده کمک به شما'
        },
        {
            icon: <PaidIcon sx={{ fontSize: 40 }} />,
            title: 'قیمت مناسب',
            description: 'بهترین امکانات با مقرون به صرفه‌ترین قیمت'
        },
        {
            icon: <CheckCircleIcon sx={{ fontSize: 40 }} />,
            title: 'تضمین کیفیت',
            description: '30 روز گارانتی بازگشت وجه بدون قید و شرط'
        }
    ];

    return (
        <div className="pricing-container">
            {/* Header - مشابه Products.jsx */}
            <motion.header
                className="header"
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ type: "spring", stiffness: 100 }}
            >
                {/* محتویات هدر مشابه Products.jsx */}
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

            {/* Mobile Menu - مشابه Products.jsx */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        className="mobile-menu"
                        initial={{ opacity: 0, y: -100 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -100 }}
                        transition={{ duration: 0.3 }}
                    >
                        {/* محتویات منوی موبایل مشابه Products.jsx */}
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

            {/* Pricing Content */}
            <div className="pricing-content">
                <motion.div
                    className="pricing-header"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1>تعرفه‌های اشتراک</h1>
                    <p>بهترین پلن را متناسب با نیاز خود انتخاب کنید</p>
                </motion.div>

                <motion.div
                    className="pricing-period-toggle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    <button
                        className={`period-button ${selectedPeriod === 'monthly' ? 'active' : ''}`}
                        onClick={() => setSelectedPeriod('monthly')}
                    >
                        ماهانه
                    </button>
                    <button
                        className={`period-button ${selectedPeriod === 'annual' ? 'active' : ''}`}
                        onClick={() => setSelectedPeriod('annual')}
                    >
                        سالانه
                        <span className="discount-badge">20% تخفیف</span>
                    </button>
                </motion.div>

                <div className="pricing-plans">
                    {pricingPlans.map((plan, index) => (
                        <motion.div
                            key={index}
                            className={`pricing-card ${plan.popular ? 'popular' : ''}`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.05 }}
                            style={{
                                '--plan-color': plan.color
                            }}
                        >
                            {plan.popular && <span className="popular-badge">پیشنهاد ویژه</span>}
                            <div className="plan-icon" style={{ color: plan.color }}>
                                {plan.icon}
                            </div>
                            <h3>{plan.title}</h3>
                            <div className="plan-price">
                                <span className="currency">تومان</span>
                                <span className="amount">{plan.price[selectedPeriod]}</span>
                                <span className="period">/ {selectedPeriod === 'monthly' ? 'ماهانه' : 'سالانه'}</span>
                            </div>
                            <ul className="plan-features">
                                {plan.features.map((feature, idx) => (
                                    <li key={idx}>
                                        <CheckCircleIcon sx={{ color: plan.color }} />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                            <RippleButton
                                className={`plan-button ${plan.popular ? 'gradient-animation' : ''}`}
                                style={{
                                    backgroundColor: plan.popular ? undefined : plan.color
                                }}
                            >
                                شروع کنید
                            </RippleButton>
                        </motion.div>
                    ))}
                </div>

                <div className="pricing-features">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            className="feature-card"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 + (index * 0.1) }}
                        >
                            <div className="feature-icon">
                                {feature.icon}
                            </div>
                            <h3>{feature.title}</h3>
                            <p>{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
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

export default Pricing;