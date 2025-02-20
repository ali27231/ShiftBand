import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import {
    Container,
    Grid,
    Typography,
    Tabs,
    Tab,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import InfoIcon from '@mui/icons-material/Info';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import './Products.css';
import {styled} from "@mui/material/styles";
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

const Products = () => {
   // const [showAuthButtons, setShowAuthButtons] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [currentTab, setCurrentTab] = useState(0);
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

    const products = [
        {
            id: 1,
            name: 'سیستم مدیریت بخش اورژانس',
            description: 'مدیریت هوشمند پذیرش و تریاژ بیماران اورژانسی',
            image: 'https://uploadkon.ir/uploads/837218_251739901838450.jpg',
            price: '12,900,000',
            features: ['هوش مصنوعی', 'گزارش‌گیری پیشرفته', 'پشتیبانی 24/7'],
            category: 'emergency',
            isNew: true,
        },
        {
            id: 2,
            name: 'سامانه مدیریت داروخانه',
            description: 'کنترل موجودی و مدیریت نسخه‌های دارویی',
            image: 'https://uploadkon.ir/uploads/001418_251739901873622.jpg',
            price: '8,900,000',
            features: ['انبارداری هوشمند', 'ثبت نسخه الکترونیک', 'گزارش مصرف'],
            category: 'pharmacy',
            isNew: false,
        },
        {
            id: 3,
            name: 'سیستم نوبت‌دهی آنلاین',
            description: 'مدیریت نوبت‌دهی و زمان‌بندی ویزیت‌ها',
            image: 'https://uploadkon.ir/uploads/5e9418_25p3.png',
            price: '6,900,000',
            features: ['رزرو آنلاین', 'یادآوری پیامکی', 'تقویم پزشکان'],
            category: 'appointment',
            isNew: true,
        },
        {
            id: 4,
            name: 'سامانه مدیریت آزمایشگاه',
            description: 'ثبت و پیگیری نتایج آزمایشات',
            image: 'https://uploadkon.ir/uploads/15cc18_251739901928456.jpg',
            price: '9,900,000',
            features: ['ثبت نتایج آنلاین', 'آرشیو دیجیتال', 'اتصال به دستگاه‌ها'],
            category: 'laboratory',
            isNew: false,
        },
        {
            id: 5,
            name: 'سیستم مدیریت تصویربرداری',
            description: 'مدیریت تصاویر پزشکی و رادیولوژی',
            image: 'https://uploadkon.ir/uploads/91e318_251739901955681.jpg',
            price: '15,900,000',
            features: ['PACS', 'گزارش‌دهی آنلاین', 'آرشیو ابری'],
            category: 'radiology',
            isNew: true,
        },
        {
            id: 6,
            name: 'سامانه مدیریت پرونده بیماران',
            description: 'ثبت و پیگیری پرونده‌های پزشکی',
            image: 'https://uploadkon.ir/uploads/4be518_25p6.png',
            price: '10,900,000',
            features: ['پرونده الکترونیک', 'تاریخچه درمان', 'دسترسی چندسطحی'],
            category: 'records',
            isNew: false,
        },
    ];

    const categories = ['همه', 'اورژانس', 'داروخانه', 'نوبت‌دهی', 'آزمایشگاه', 'تصویربرداری'];

    const handleTabChange = (event, newValue) => {
        setCurrentTab(newValue);
    };

    const filteredProducts = currentTab === 0
        ? products
        : products.filter(product => product.category === categories[currentTab].toLowerCase());

    return (
        <div className="products-container">
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

            <Container maxWidth="lg" className="products-content">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="products-header"
                >
                    <Typography variant="h3" className="products-title">
                        محصولات و راهکارها
                    </Typography>
                    <Typography className="products-subtitle">
                        راهکارهای جامع و یکپارچه برای مدیریت هوشمند بیمارستان
                    </Typography>
                </motion.div>

                <motion.div
                    className="products-tabs"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    <Tabs
                        value={currentTab}
                        onChange={handleTabChange}
                        variant="scrollable"
                        scrollButtons="auto"
                    >
                        {categories.map((category, index) => (
                            <Tab key={index} label={category} />
                        ))}
                    </Tabs>
                </motion.div>

                <Grid container spacing={4} className="products-grid">
                    {filteredProducts.map((product, index) => (
                        <Grid item xs={12} sm={6} md={4} key={product.id}>
                            <motion.div
                                className="product-card glow-effect"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ scale: 1.05 }}
                            >
                                <img src={product.image} alt={product.name} className="product-image" />
                                <div className="product-content">
                                    <div className="product-header">
                                        <h3>{product.name}</h3>
                                        {product.isNew && (
                                            <span className="new-badge">
                                                <NewReleasesIcon /> جدید
                                            </span>
                                        )}
                                    </div>
                                    <p className="product-description">{product.description}</p>
                                    <div className="product-features">
                                        {product.features.map((feature, idx) => (
                                            <span key={idx} className="feature-chip">
                                                {feature}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="product-footer">
                                        <span className="product-price">
                                            {product.price} تومان
                                        </span>
                                        <div className="product-actions">
                                            <RippleButton
                                                className="product-button info"
                                                onClick={() => {}}
                                            >
                                                <InfoIcon /> جزئیات
                                            </RippleButton>
                                            <RippleButton
                                                className="product-button order gradient-animation"
                                                onClick={() => {}}
                                            >
                                                <ShoppingCartIcon /> سفارش
                                            </RippleButton>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </Grid>
                    ))}
                </Grid>
            </Container>
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

export default Products;