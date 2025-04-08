import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Container,
  Fade,
  Grid,
  Card,
  CardContent,
  Tab,
  Tabs,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  LinearProgress,
  TextField,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  Assessment as AssessmentIcon,
  CloudDownload as DownloadIcon,
  Print as PrintIcon,
  TrendingUp as TrendingUpIcon,
  Person as PersonIcon,
  LocalHospital as HospitalIcon,
  AccessTime as TimeIcon,
  WifiOff as WifiOffIcon
} from '@mui/icons-material';
import { Chart } from 'react-google-charts';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  maxWidth: 1200,
  margin: '0 auto',
  borderRadius: 16,
  boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
  background: 'linear-gradient(to bottom, #ffffff, #f8f9fa)',
}));

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: 16,
  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
  height: '100%',
  transition: 'transform 0.2s',
  '&:hover': {
    transform: 'translateY(-4px)',
  }
}));

const StatCard = ({ title, value, icon, color }) => (
  <StyledCard>
    <CardContent>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box>
          <Typography color="textSecondary" gutterBottom>
            {title}
          </Typography>
          <Typography variant="h4" component="div" fontWeight="bold">
            {value}
          </Typography>
        </Box>
        <Box
          sx={{
            backgroundColor: `${color}20`,
            p: 1,
            borderRadius: 2,
          }}
        >
          {icon}
        </Box>
      </Box>
    </CardContent>
  </StyledCard>
);

const DEFAULT_STATS = {
  totalDoctors: 45,
  presentToday: 42,
  averageAttendance: '95%',
  totalShifts: 180
};

const DEFAULT_ATTENDANCE_DATA = [
  {
    id: 1,
    doctor: 'دکتر علی محمدی',
    department: 'اورژانس',
    date: '1402/08/15',
    entryTime: '07:55',
    exitTime: '16:05',
    status: 'present',
    attendance: 98
  }
];

const AttendanceReport = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [tabValue, setTabValue] = useState(0);
  const [department, setDepartment] = useState('all');
  const [attendanceData, setAttendanceData] = useState([]);
  const [stats, setStats] = useState({});
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    // Check if online/offline
    const handleOnlineStatus = () => {
      setIsOffline(!navigator.onLine);
    };

    window.addEventListener('online', handleOnlineStatus);
    window.addEventListener('offline', handleOnlineStatus);
    handleOnlineStatus();

    // Initial data load
    loadData();

    return () => {
      window.removeEventListener('online', handleOnlineStatus);
      window.removeEventListener('offline', handleOnlineStatus);
    };
  }, []);

  const loadData = async () => {
    try {
      // Try to load from localStorage first
      const localData = JSON.parse(localStorage.getItem('attendanceData'));
      const localStats = JSON.parse(localStorage.getItem('stats'));

      if (localData && localStats) {
        setAttendanceData(localData);
        setStats(localStats);
      } else {
        // If no local data, use defaults and save them
        setAttendanceData(DEFAULT_ATTENDANCE_DATA);
        setStats(DEFAULT_STATS);
        saveToLocalStorage(DEFAULT_ATTENDANCE_DATA, DEFAULT_STATS);
      }

      // If online, try to fetch from API
      if (navigator.onLine) {
        const response = await fetch('/api/attendance');
        const data = await response.json();
        setAttendanceData(data.attendance);
        setStats(data.stats);
        saveToLocalStorage(data.attendance, data.stats);
      }
    } catch (error) {
      console.error('Error loading data:', error);
      // On error, ensure we at least have default data
      if (!attendanceData.length) {
        setAttendanceData(DEFAULT_ATTENDANCE_DATA);
        setStats(DEFAULT_STATS);
        saveToLocalStorage(DEFAULT_ATTENDANCE_DATA, DEFAULT_STATS);
      }
    }
  };

  const saveToLocalStorage = (attendance, statsData) => {
    try {
      localStorage.setItem('attendanceData', JSON.stringify(attendance));
      localStorage.setItem('stats', JSON.stringify(statsData));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  };

  const getFilteredData = () => {
    let filtered = [...attendanceData];

    if (startDate) {
      filtered = filtered.filter(item => new Date(item.date) >= new Date(startDate));
    }
    if (endDate) {
      filtered = filtered.filter(item => new Date(item.date) <= new Date(endDate));
    }
    if (department !== 'all') {
      filtered = filtered.filter(item => item.department === department);
    }

    return filtered;
  };

  const handleDownload = () => {
    const data = getFilteredData();
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const href = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = href;
    link.download = 'attendance-report.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(href);
  };

  const handlePrint = () => {
    window.print();
  };

  const chartData = [
    ['بخش', 'درصد حضور'],
    ['اورژانس', 95],
    ['داخلی', 88],
    ['جراحی', 92],
    ['اطفال', 85],
    ['قلب', 90],
  ];

  return (
    <Container maxWidth="xl">
      <Box p={4} dir="rtl">
        {isOffline && (
          <Box display="flex" alignItems="center" gap={1} mb={2}>
            <WifiOffIcon color="warning" />
            <Typography color="warning.main">
              حالت آفلاین - اطلاعات از حافظه محلی بارگذاری شده است
            </Typography>
          </Box>
        )}

        <Fade in={true} timeout={1000}>
          <Box textAlign="center" mb={4}>
            <AssessmentIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              گزارش حضور و غیاب
            </Typography>
            <Typography color="text.secondary" mb={4}>
              گزارش جامع وضعیت حضور پزشکان و آمار بیمارستان
            </Typography>
          </Box>
        </Fade>

        <Grid container spacing={3} mb={4}>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="کل پزشکان"
              value={stats.totalDoctors}
              icon={<PersonIcon sx={{ color: '#1976d2', fontSize: 40 }} />}
              color="#1976d2"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="حاضر امروز"
              value={stats.presentToday}
              icon={<HospitalIcon sx={{ color: '#2e7d32', fontSize: 40 }} />}
              color="#2e7d32"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="میانگین حضور"
              value={stats.averageAttendance}
              icon={<TrendingUpIcon sx={{ color: '#ed6c02', fontSize: 40 }} />}
              color="#ed6c02"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="کل شیفت‌ها"
              value={stats.totalShifts}
              icon={<TimeIcon sx={{ color: '#9c27b0', fontSize: 40 }} />}
              color="#9c27b0"
            />
          </Grid>
        </Grid>

        <StyledPaper elevation={0}>
          <Box mb={4} display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={2}>
            <Box display="flex" gap={2} alignItems="center">
              <TextField
                label="تاریخ شروع"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
                size="small"
                sx={{ width: 150 }}
              />
              <TextField
                label="تاریخ پایان"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
                size="small"
                sx={{ width: 150 }}
              />
              <FormControl sx={{ minWidth: 200 }}>
                <InputLabel>بخش</InputLabel>
                <Select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  size="small"
                >
                  <MenuItem value="all">همه بخش‌ها</MenuItem>
                  <MenuItem value="emergency">اورژانس</MenuItem>
                  <MenuItem value="internal">داخلی</MenuItem>
                  <MenuItem value="surgery">جراحی</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box>
              <IconButton color="primary" onClick={handleDownload} title="دانلود گزارش">
                <DownloadIcon />
              </IconButton>
              <IconButton color="primary" onClick={handlePrint} title="چاپ گزارش">
                <PrintIcon />
              </IconButton>
            </Box>
          </Box>

          <Tabs
            value={tabValue}
            onChange={(e, newValue) => setTabValue(newValue)}
            sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}
          >
            <Tab label="گزارش روزانه" />
            <Tab label="نمودار حضور" />
            <Tab label="آمار کلی" />
          </Tabs>

          {tabValue === 0 && (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>نام پزشک</TableCell>
                    <TableCell>بخش</TableCell>
                    <TableCell>تاریخ</TableCell>
                    <TableCell>ورود</TableCell>
                    <TableCell>خروج</TableCell>
                    <TableCell>وضعیت</TableCell>
                    <TableCell>درصد حضور</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {getFilteredData().map((row) => (
                    <TableRow key={row.id}>
                      <TableCell>{row.doctor}</TableCell>
                      <TableCell>
                        <Chip label={row.department} color="primary" variant="outlined" />
                      </TableCell>
                      <TableCell>{row.date}</TableCell>
                      <TableCell>{row.entryTime}</TableCell>
                      <TableCell>{row.exitTime}</TableCell>
                      <TableCell>
                        <Chip
                          label={row.status === 'present' ? 'حاضر' : 'غایب'}
                          color={row.status === 'present' ? 'success' : 'error'}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <Box display="flex" alignItems="center">
                          <Box width="100%" mr={1}>
                            <LinearProgress
                              variant="determinate"
                              value={row.attendance}
                              sx={{
                                height: 8,
                                borderRadius: 5,
                                backgroundColor: '#e9ecef',
                                '& .MuiLinearProgress-bar': {
                                  borderRadius: 5,
                                },
                              }}
                            />
                          </Box>
                          <Box minWidth={35}>
                            <Typography variant="body2" color="textSecondary">
                              {`${Math.round(row.attendance)}%`}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}

          {tabValue === 1 && (
            <Box height={400}>
              <Chart
                chartType="PieChart"
                data={chartData}
                options={{
                  title: 'درصد حضور به تفکیک بخش',
                  pieHole: 0.4,
                  is3D: false,
                  colors: ['#1976d2', '#2e7d32', '#ed6c02', '#9c27b0', '#d32f2f'],
                  backgroundColor: 'transparent',
                }}
                width="100%"
                height="100%"
              />
            </Box>
          )}

          {tabValue === 2 && (
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Chart
                  chartType="ColumnChart"
                  data={[
                    ['ماه', 'درصد حضور'],
                    ['فروردین', 92],
                    ['اردیبهشت', 88],
                    ['خرداد', 95],
                    ['تیر', 90],
                    ['مرداد', 93],
                  ]}
                  options={{
                    title: 'روند حضور ماهانه',
                    backgroundColor: 'transparent',
                    animation: {
                      startup: true,
                      duration: 1000,
                      easing: 'out',
                    },
                  }}
                  width="100%"
                  height="300px"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Chart
                  chartType="LineChart"
                  data={[
                    ['هفته', 'تعداد پزشک'],
                    ['هفته اول', 40],
                    ['هفته دوم', 42],
                    ['هفته سوم', 45],
                    ['هفته چهارم', 43],
                  ]}
                  options={{
                    title: 'تعداد پزشکان حاضر در هفته',
                    curveType: 'function',
                    backgroundColor: 'transparent',
                    animation: {
                      startup: true,
                      duration: 1000,
                      easing: 'out',
                    },
                  }}
                  width="100%"
                  height="300px"
                />
              </Grid>
            </Grid>
          )}
        </StyledPaper>
      </Box>
    </Container>
  );
};

export default AttendanceReport;