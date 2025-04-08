import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Container,
  Fade,
  Grid,
  Switch,
  FormControlLabel,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  Settings as SettingsIcon,
  Save as SaveIcon,
  AccessTime as TimeIcon,
  Group as GroupIcon,
  NotificationsActive as NotificationIcon,
  Security as SecurityIcon
} from '@mui/icons-material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import api from '../../services/api';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: 16,
  boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
  background: 'linear-gradient(to bottom, #ffffff, #f8f9fa)',
}));

const SettingSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: 12,
  backgroundColor: theme.palette.background.default,
  marginBottom: theme.spacing(3),
  transition: 'transform 0.2s',
  '&:hover': {
    transform: 'translateY(-2px)',
  }
}));

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: 12,
  padding: '12px 24px',
  fontSize: '1.1rem',
  textTransform: 'none',
  background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.primary.light} 90%)`,
  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
  transition: 'transform 0.2s',
  '&:hover': {
    transform: 'translateY(-2px)',
  }
}));

const SystemSettings = () => {
  const [settings, setSettings] = useState({
    morningShiftStart: new Date('2024-01-01T07:00:00'),
    morningShiftEnd: new Date('2024-01-01T14:00:00'),
    eveningShiftStart: new Date('2024-01-01T14:00:00'),
    eveningShiftEnd: new Date('2024-01-01T21:00:00'),
    nightShiftStart: new Date('2024-01-01T21:00:00'),
    nightShiftEnd: new Date('2024-01-01T07:00:00'),
    maxDoctorsPerShift: 10,
    minDoctorsPerShift: 3,
    allowShiftSwap: true,
    requireApproval: true,
    notifyBeforeShift: true,
    notificationTime: 60,
    autoAssignShifts: false,
    vacationRequestDeadline: 7,
    enableEmergencyMode: false
  });

  const handleChange = (field, value) => {
    setSettings({
      ...settings,
      [field]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/settings', settings);
    } catch (error) {
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Container maxWidth="lg">
        <Box p={4} dir="rtl">
          <Fade in={true} timeout={1000}>
            <Box textAlign="center" mb={4}>
              <SettingsIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
              <Typography variant="h4" fontWeight="bold" gutterBottom>
                تنظیمات سیستم
              </Typography>
              <Typography color="text.secondary" mb={4}>
                مدیریت تنظیمات و پیکربندی سیستم نوبت‌دهی بیمارستان
              </Typography>
            </Box>
          </Fade>

          <form onSubmit={handleSubmit}>
            <StyledPaper elevation={0}>

              <SettingSection>
                <Box display="flex" alignItems="center" mb={2}>
                  <TimeIcon sx={{ mr: 1, color: 'primary.main' }} />
                  <Typography variant="h6" fontWeight="bold">
                    تنظیمات شیفت‌ها
                  </Typography>
                </Box>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={4}>
                    <TimePicker
                      label="شروع شیفت صبح"
                      value={settings.morningShiftStart}
                      onChange={(newValue) => handleChange('morningShiftStart', newValue)}
                      renderInput={(params) => <TextField {...params} fullWidth />}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TimePicker
                      label="پایان شیفت صبح"
                      value={settings.morningShiftEnd}
                      onChange={(newValue) => handleChange('morningShiftEnd', newValue)}
                      renderInput={(params) => <TextField {...params} fullWidth />}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      fullWidth
                      type="number"
                      label="حداکثر تعداد پزشک در شیفت صبح"
                      value={settings.maxDoctorsPerShift}
                      onChange={(e) => handleChange('maxDoctorsPerShift', e.target.value)}
                    />
                  </Grid>
                </Grid>
              </SettingSection>

              <SettingSection>
                <Box display="flex" alignItems="center" mb={2}>
                  <GroupIcon sx={{ mr: 1, color: 'primary.main' }} />
                  <Typography variant="h6" fontWeight="bold">
                    تنظیمات مدیریت پرسنل
                  </Typography>
                </Box>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={settings.allowShiftSwap}
                          onChange={(e) => handleChange('allowShiftSwap', e.target.checked)}
                        />
                      }
                      label="امکان تعویض شیفت بین پزشکان"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={settings.requireApproval}
                          onChange={(e) => handleChange('requireApproval', e.target.checked)}
                        />
                      }
                      label="نیاز به تایید مدیر برای تغییر شیفت"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      type="number"
                      label="مهلت درخواست مرخصی (روز)"
                      value={settings.vacationRequestDeadline}
                      onChange={(e) => handleChange('vacationRequestDeadline', e.target.value)}
                    />
                  </Grid>
                </Grid>
              </SettingSection>

              <SettingSection>
                <Box display="flex" alignItems="center" mb={2}>
                  <NotificationIcon sx={{ mr: 1, color: 'primary.main' }} />
                  <Typography variant="h6" fontWeight="bold">
                    تنظیمات اعلان‌ها
                  </Typography>
                </Box>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={settings.notifyBeforeShift}
                          onChange={(e) => handleChange('notifyBeforeShift', e.target.checked)}
                        />
                      }
                      label="ارسال اعلان قبل از شروع شیفت"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      type="number"
                      label="زمان ارسال اعلان قبل از شیفت (دقیقه)"
                      value={settings.notificationTime}
                      onChange={(e) => handleChange('notificationTime', e.target.value)}
                    />
                  </Grid>
                </Grid>
              </SettingSection>

              <SettingSection>
                <Box display="flex" alignItems="center" mb={2}>
                  <SecurityIcon sx={{ mr: 1, color: 'primary.main' }} />
                  <Typography variant="h6" fontWeight="bold">
                    تنظیمات اضطراری
                  </Typography>
                </Box>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={settings.enableEmergencyMode}
                          onChange={(e) => handleChange('enableEmergencyMode', e.target.checked)}
                        />
                      }
                      label="فعال‌سازی حالت اضطراری"
                    />
                  </Grid>
                </Grid>
              </SettingSection>

              <Box mt={4}>
                <StyledButton
                  type="submit"
                  variant="contained"
                  endIcon={<SaveIcon />}
                  fullWidth
                >
                  ذخیره تنظیمات
                </StyledButton>
              </Box>

            </StyledPaper>
          </form>
        </Box>
      </Container>
    </LocalizationProvider>
  );
};

export default SystemSettings;