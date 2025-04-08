import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import BookIcon from '@mui/icons-material/Book';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PersonIcon from '@mui/icons-material/Person';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SearchIcon from '@mui/icons-material/Search';
import CategoryIcon from '@mui/icons-material/Category';
import './Blog.css';
import {styled} from "@mui/material/styles";
import {Typography} from "@mui/material";
import {Grid} from '@mui/material';
import {DiGithubBadge} from 'react-icons/di';

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

const Blog = () => {
    const [showAuthButtons, setShowAuthButtons] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
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

    const categories = [
        { id: 'all', name: 'همه مقالات' },
        { id: 'basics', name: 'آموزش‌های پایه' },
        { id: 'advanced', name: 'آموزش‌های پیشرفته' },
        { id: 'reports', name: 'گزارش‌گیری' },
        { id: 'admin', name: 'مدیریت سیستم' },
        { id: 'mobile', name: 'اپلیکیشن موبایل' }
    ];

    const blogPosts = [
        {
            id: 1,
            title: 'راهنمای شروع کار با شیفت‌بند',
            description: 'در این مقاله با نحوه راه‌اندازی اولیه و تنظیمات پایه سیستم شیفت‌بند آشنا می‌شوید.',
            image: 'https://uploadkon.ir/uploads/641c18_25b1-2.png',
            category: 'basics',
            author: 'علی محمدی',
            date: '۲۵ دی ۱۴۰۳',
            readTime: '۵ دقیقه',
            featured: true
        },
        {
            id: 2,
            title: 'مدیریت پیشرفته شیفت‌های کاری',
            description: 'آموزش کامل نحوه مدیریت شیفت‌ها، جابجایی و تنظیم برنامه زمانی پزشکان.',
            image: 'https://uploadkon.ir/uploads/801c18_251739902510847.jpg',
            category: 'advanced',
            author: 'سارا احمدی',
            date: '۲۳ دی ۱۴۰۳',
            readTime: '۸ دقیقه',
            featured: false
        },
        {
            id: 3,
            title: 'گزارش‌گیری حرفه‌ای از عملکرد پرسنل',
            description: 'نحوه استفاده از ابزارهای گزارش‌گیری و تحلیل عملکرد در شیفت‌بند.',
            image: 'https://uploadkon.ir/uploads/6c1818_251739902562133.jpg',
            category: 'reports',
            author: 'رضا کریمی',
            date: '۲۰ دی ۱۴۰۳',
            readTime: '۶ دقیقه',
            featured: false
        },
        {
            id: 4,
            title: 'تنظیمات پیشرفته سیستم',
            description: 'آموزش تنظیمات پیشرفته و شخصی‌سازی سیستم برای نیازهای خاص.',
            image: 'https://uploadkon.ir/uploads/b8ff18_251739902583436.jpg',
            category: 'admin',
            author: 'مریم حسینی',
            date: '۱۸ دی ۱۴۰۳',
            readTime: '۱۰ دقیقه',
            featured: false
        },
        {
            id: 5,
            title: 'راهنمای استفاده از اپلیکیشن موبایل',
            description: 'آموزش کامل نحوه استفاده از اپلیکیشن موبایل شیفت‌بند برای پزشکان.',
            image: 'https://uploadkon.ir/uploads/4ee718_251739902623320.jpg',
            category: 'mobile',
            author: 'حسین رضایی',
            date: '۱۵ دی ۱۴۰۳',
            readTime: '۷ دقیقه',
            featured: false
        },
        {
            id: 6,
            title: 'مدیریت دسترسی‌های کاربران',
            description: 'آموزش نحوه مدیریت سطوح دسترسی و تعریف نقش‌های مختلف در سیستم.',
            image: 'https://uploadkon.ir/uploads/31ee18_251739902704237.jpg',
            category: 'admin',
            author: 'زهرا محمدی',
            date: '۱۲ دی ۱۴۰۳',
            readTime: '۹ دقیقه',
            featured: false
        }
    ];

    const filteredPosts = blogPosts
        .filter(post => selectedCategory === 'all' || post.category === selectedCategory)
        .filter(post =>
            post.title.includes(searchQuery) ||
            post.description.includes(searchQuery) ||
            post.author.includes(searchQuery)
        );

    const featuredPost = blogPosts.find(post => post.featured);

    return (
        <div className="blog-container">
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

            {/* Blog Content */}
            <div className="blog-content">
                <motion.div
                    className="blog-header"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1>آموزش سامانه شیفت‌بند</h1>
                    <p>مقالات و راهنمای استفاده از سیستم مدیریت شیفت</p>
                </motion.div>

                <div className="blog-search-section">
                    <div className="search-box">
                        <SearchIcon />
                        <input
                            type="text"
                            placeholder="جستجو در مقالات..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="category-filter">
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                className={`category-button ${selectedCategory === category.id ? 'active' : ''}`}
                                onClick={() => setSelectedCategory(category.id)}
                            >
                                <CategoryIcon />
                                {category.name}
                            </button>
                        ))}
                    </div>
                </div>

                {featuredPost && (
                    <motion.div
                        className="featured-post"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="featured-content">
                            <span className="featured-badge">مقاله ویژه</span>
                            <h2>{featuredPost.title}</h2>
                            <p>{featuredPost.description}</p>
                            <div className="post-meta">
                                <span><PersonIcon /> {featuredPost.author}</span>
                                <span><AccessTimeIcon /> {featuredPost.readTime}</span>
                                <span><BookIcon /> {categories.find(c => c.id === featuredPost.category)?.name}</span>
                            </div>
                            <RippleButton className="read-more-button gradient-animation">
                                ادامه مطلب <ArrowForwardIcon />
                            </RippleButton>
                        </div>
                        <div className="featured-image">
                            <img src={featuredPost.image} alt={featuredPost.title} />
                        </div>
                    </motion.div>
                )}

                <div className="blog-grid">
                    {filteredPosts.map((post, index) => (
                        <motion.div
                            key={post.id}
                            className="blog-card"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.05 }}
                        >
                            <div className="card-image">
                                <img src={post.image} alt={post.title} />
                                <span className="category-badge">
                                    {categories.find(c => c.id === post.category)?.name}
                                </span>
                            </div>
                            <div className="card-content">
                                <h3>{post.title}</h3>
                                <p>{post.description}</p>
                                <div className="post-meta">
                                    <span><PersonIcon /> {post.author}</span>
                                    <span><AccessTimeIcon /> {post.readTime}</span>
                                </div>
                                <RippleButton className="read-more-button">
                                    ادامه مطلب <ArrowForwardIcon />
                                </RippleButton>
                            </div>
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

export default Blog;