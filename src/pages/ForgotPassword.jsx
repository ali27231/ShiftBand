import React, { useState } from 'react';
import {
    Box,
    Paper,
    Typography,
    TextField,
    Button,
    InputAdornment,
    CircularProgress,
    Alert,
    Container,
} from '@mui/material';
import {
    Email as EmailIcon,
    Send as SendIcon,
    ArrowBack as ArrowBackIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const GlassPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    maxWidth: 450,
    margin: 'auto',
    marginTop: theme.spacing(8),
    position: 'relative',
    overflow: 'hidden',
    background: 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(10px)',
    borderRadius: 24,
    border: '1px solid rgba(255, 255, 255, 0.3)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
}));

const LogoContainer = styled(Box)(({ theme }) => ({
    marginBottom: theme.spacing(4),
    textAlign: 'center',
    position: 'relative',
    '&::after': {
        content: '""',
        position: 'absolute',
        bottom: -20,
        left: '50%',
        transform: 'translateX(-50%)',
        width: 60,
        height: 4,
        background: 'linear-gradient(90deg, #2196F3, #21CBF3)',
        borderRadius: 2,
    }
}));

const StyledForm = styled('form')(({ theme }) => ({
    width: '100%',
    marginTop: theme.spacing(2),
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
    '& .MuiOutlinedInput-root': {
        borderRadius: 12,
        transition: 'all 0.3s ease',
        '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        },
        '&.Mui-focused': {
            transform: 'translateY(-2px)',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        }
    },
}));

const GradientButton = styled(Button)(({ theme }) => ({
    borderRadius: 12,
    padding: '12px 24px',
    background: 'linear-gradient(45deg, #2196F3, #21CBF3)',
    transition: 'all 0.3s ease',
    '& .MuiButton-startIcon': {  // اضافه کردن فاصله برای آیکون
        marginLeft: theme.spacing(2),
    },
    '& .MuiButton-endIcon': {    // اضافه کردن فاصله برای آیکون
        marginRight: theme.spacing(2),
    },
    '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: '0 8px 20px rgba(33,150,243,0.3)',
        background: 'linear-gradient(45deg, #1976D2, #1999D2)',
    },
}));

const BackButton = styled(Button)(({ theme }) => ({
    borderRadius: 12,
    padding: '12px 24px',
    background: 'rgba(255,255,255,0.8)',
    border: '1px solid rgba(33,150,243,0.3)',
    marginTop: theme.spacing(2),
    '& .MuiButton-startIcon': {  // اضافه کردن فاصله برای آیکون
        marginLeft: theme.spacing(2),
    },
    '&:hover': {
        background: 'rgba(33,150,243,0.1)',
    },
}));

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        try {
            // اینجا لاجیک ارسال ایمیل بازیابی رمز عبور قرار می‌گیرد
            await new Promise(resolve => setTimeout(resolve, 2000)); // شبیه‌سازی تأخیر شبکه
            setSuccess('لینک بازیابی رمز عبور به ایمیل شما ارسال شد');
        } catch (err) {
            setError('خطا در ارسال ایمیل بازیابی رمز عبور');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="sm">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 15
                }}
            >
                <GlassPaper elevation={0}>
                    <LogoContainer>
                        <motion.div
                            animate={{
                                scale: [1, 1.1, 1],
                                rotate: [0, 10, -10, 0],
                            }}
                            transition={{ duration: 0.8 }}
                        >
                            <img
                                src="https://uploadkon.ir/uploads/6bfa29_25لوگو-شیفت-بند.png"
                                alt="Logo"
                                onClick={() => navigate('/')}
                                style={{
                                    width: 360,
                                    height: 100,
                                    marginBottom: 24,
                                    filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))'
                                }}
                            />
                        </motion.div>
                        <Typography
                            component="h1"
                            variant="h4"
                            gutterBottom
                            sx={{
                                fontWeight: 700,
                                background: 'linear-gradient(45deg, #2196F3, #21CBF3)',
                                backgroundClip: 'text',
                                WebkitBackgroundClip: 'text',
                                color: 'transparent',
                            }}
                        >
                            بازیابی رمز عبور
                        </Typography>
                        <Typography
                            variant="body1"
                            color="textSecondary"
                            sx={{ opacity: 0.8 }}
                        >
                            لطفاً ایمیل خود را وارد کنید تا لینک بازیابی رمز عبور برای شما ارسال شود
                        </Typography>
                    </LogoContainer>

                    <AnimatePresence>
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Alert
                                    severity="error"
                                    sx={{
                                        width: '100%',
                                        mb: 2,
                                        borderRadius: 3,
                                        backgroundColor: 'rgba(253,237,237,0.8)'
                                    }}
                                    onClose={() => setError('')}
                                >
                                    {error}
                                </Alert>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <AnimatePresence>
                        {success && (
                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Alert
                                    severity="success"
                                    sx={{
                                        width: '100%',
                                        mb: 2,
                                        borderRadius: 3,
                                        backgroundColor: 'rgba(237,247,237,0.8)'
                                    }}
                                    onClose={() => setSuccess('')}
                                >
                                    {success}
                                </Alert>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <StyledForm onSubmit={handleSubmit}>
                        <StyledTextField
                            fullWidth
                            margin="normal"
                            label="ایمیل"
                            type="email"
                            autoComplete="email"
                            autoFocus
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <EmailIcon sx={{ color: 'primary.main' }} />
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <Box sx={{ mt: 4 }}>
                            <GradientButton
                                type="submit"
                                fullWidth
                                variant="contained"
                                disabled={loading}
                                startIcon={loading ? <CircularProgress size={20} /> : <SendIcon />}
                            >
                                {loading ? 'در حال ارسال...' : 'ارسال لینک بازیابی'}
                            </GradientButton>
                        </Box>

                        <BackButton
                            fullWidth
                            startIcon={<ArrowBackIcon />}
                            onClick={() => navigate('/login')}
                        >
                            بازگشت به صفحه ورود
                        </BackButton>
                    </StyledForm>
                </GlassPaper>
            </motion.div>
        </Container>
    );
};

export default ForgotPassword;

const globalStyles = `
  body {
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    min-height: 100vh;
  }

  @keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
    100% { transform: translateY(0px); }
  }
`;

const styleSheet = document.createElement("style");
styleSheet.innerText = globalStyles;
document.head.appendChild(styleSheet);