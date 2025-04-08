import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid, 
  Paper,
  Typography,
  CircularProgress,
  Card,
  CardContent,
} from '@mui/material';
import {
  LocalHospital as DoctorIcon,
  EventAvailable as ShiftIcon,  
  People as UsersIcon,
  Assessment as ReportIcon,
  Notifications as NotificationsIcon
} from '@mui/icons-material';
import { styled, alpha } from '@mui/material/styles';
import { useTheme } from '../../context/ThemeContext';
import moment from 'moment-jalaali';
import api from '../../services/api';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: 24,
  boxShadow: theme.palette.mode === 'dark' 
    ? '0 4px 20px rgba(0,0,0,0.2)'
    : '0 4px 20px rgba(0,0,0,0.08)',
  border: theme.palette.mode === 'dark' ? `1px solid ${alpha(theme.palette.primary.main, 0.1)}` : 'none',
  backdropFilter: 'blur(8px)',
  background: theme.palette.mode === 'dark'
    ? `linear-gradient(145deg, ${alpha(theme.palette.background.paper, 0.9)}, ${alpha(theme.palette.background.paper, 0.7)})`
    : theme.palette.background.paper,
}));

const StatCard = styled(Card)(({ theme }) => ({
  background: theme.palette.mode === 'dark'
    ? `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.8)} 0%, ${alpha(theme.palette.primary.dark, 0.9)} 100%)`
    : `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
  color: theme.palette.primary.contrastText,
  marginBottom: theme.spacing(2),
  borderRadius: 24,
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: theme.palette.mode === 'dark'
      ? `0 20px 30px -10px ${alpha(theme.palette.primary.main, 0.3)}`
      : `0 20px 30px -10px ${alpha(theme.palette.primary.main, 0.2)}`,
  }
}));

const NotificationBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2.5),
  marginBottom: theme.spacing(2),
  backgroundColor: theme.palette.mode === 'dark' 
    ? alpha(theme.palette.background.default, 0.5)
    : theme.palette.background.default,
  borderRadius: 16,
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
  '&:hover': {
    transform: 'translateX(-8px)',
    backgroundColor: theme.palette.mode === 'dark'
      ? alpha(theme.palette.action.hover, 0.2)
      : theme.palette.action.hover,
    borderColor: theme.palette.primary.main,
  }
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: alpha(theme.palette.primary.contrastText, 0.15),
  borderRadius: '50%',
  padding: theme.spacing(1.5),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'rotate(10deg)',
    backgroundColor: alpha(theme.palette.primary.contrastText, 0.25),
  }
}));

const GlowingText = styled(Typography)(({ theme }) => ({
  color: theme.palette.mode === 'dark' ? theme.palette.primary.main : 'inherit',
  textShadow: theme.palette.mode === 'dark' 
    ? `0 0 10px ${alpha(theme.palette.primary.main, 0.3)}`
    : 'none',
}));

const AdminDashboard = () => {
  const { darkMode } = useTheme();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [statsResponse, notificationsResponse] = await Promise.all([
        api.get('/admin/dashboard/stats'),
        api.get('/admin/dashboard/notifications')
      ]);
      setStats(statsResponse.data);
      setNotifications(notificationsResponse.data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress size={60} thickness={4} />
      </Box>
    );
  }

  return (
    <Box p={4} dir="rtl">
      <GlowingText variant="h4" gutterBottom sx={{ 
        fontWeight: 800,
        mb: 4,
        fontSize: { xs: '1.8rem', md: '2.4rem' },
        letterSpacing: '-0.5px'
      }}>
        پنل مدیریت بیمارستان ✨
      </GlowingText>

      <Grid container spacing={4}>
        <Grid item xs={12} md={3}>
          <StatCard elevation={darkMode ? 0 : 2}>
            <CardContent sx={{ p: 3 }}>
              <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
                <Typography variant="h6" fontWeight={600}>تعداد پزشکان</Typography>
                <IconWrapper>
                  <DoctorIcon />
                </IconWrapper>
              </Box>
              <Typography variant="h3" fontWeight={800}>{stats?.totalDoctors || 0}</Typography>
            </CardContent>
          </StatCard>
        </Grid>

        <Grid item xs={12} md={3}>
          <StatCard elevation={darkMode ? 0 : 2}>
            <CardContent sx={{ p: 3 }}>
              <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
                <Typography variant="h6" fontWeight={600}>شیفت‌های امروز</Typography>
                <IconWrapper>
                  <ShiftIcon />
                </IconWrapper>
              </Box>
              <Typography variant="h3" fontWeight={800}>{stats?.todayShifts || 0}</Typography>
            </CardContent>
          </StatCard>
        </Grid>

        <Grid item xs={12} md={3}>
          <StatCard elevation={darkMode ? 0 : 2}>
            <CardContent sx={{ p: 3 }}>
              <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
                <Typography variant="h6" fontWeight={600}>پزشکان حاضر</Typography>
                <IconWrapper>
                  <UsersIcon />
                </IconWrapper>
              </Box>
              <Typography variant="h3" fontWeight={800}>{stats?.activeDoctors || 0}</Typography>
            </CardContent>
          </StatCard>
        </Grid>

        <Grid item xs={12} md={3}>
          <StatCard elevation={darkMode ? 0 : 2}>
            <CardContent sx={{ p: 3 }}>
              <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
                <Typography variant="h6" fontWeight={600}>گزارشات جدید</Typography>
                <IconWrapper>
                  <ReportIcon />
                </IconWrapper>
              </Box>
              <Typography variant="h3" fontWeight={800}>{stats?.newReports || 0}</Typography>
            </CardContent>
          </StatCard>
        </Grid>

        <Grid item xs={12} md={6}>
          <StyledPaper elevation={darkMode ? 0 : 1}>
            <Box display="flex" alignItems="center" mb={3}>
              <ShiftIcon sx={{ ml: 2, color: 'primary.main' }} />
              <Typography variant="h6" fontWeight={600}>شیفت‌های امروز</Typography>
            </Box>
            {stats?.todayShiftDetails?.map((shift, index) => (
              <NotificationBox key={index}>
                <Typography sx={{ fontSize: '1.1rem', fontWeight: 500 }}>
                  دکتر {shift.doctorName} - {shift.department} - {shift.time}
                </Typography>
              </NotificationBox>
            ))}
          </StyledPaper>
        </Grid>

        <Grid item xs={12} md={6}>
          <StyledPaper elevation={darkMode ? 0 : 1}>
            <Box display="flex" alignItems="center" mb={3}>
              <NotificationsIcon sx={{ ml: 2, color: 'primary.main' }} />
              <Typography variant="h6" fontWeight={600}>اعلان‌های سیستم</Typography>
            </Box>
            {notifications.map((notification, index) => (
              <NotificationBox key={index}>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                  <Typography sx={{ fontSize: '1.1rem', fontWeight: 500 }}>
                    {notification.message}
                  </Typography>
                  <Typography 
                    variant="caption" 
                    color="textSecondary"
                    sx={{ 
                      fontSize: '0.9rem',
                      opacity: 0.8,
                      fontWeight: 400 
                    }}
                  >
                    {moment(notification.date).fromNow()}
                  </Typography>
                </Box>
              </NotificationBox>
            ))}
          </StyledPaper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminDashboard;