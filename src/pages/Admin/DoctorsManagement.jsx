import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Container,
  Fade,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Avatar,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Tooltip,
  InputAdornment
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  LocalHospital as DoctorIcon,
  CheckCircle as ActiveIcon,
  Cancel as InactiveIcon
} from '@mui/icons-material';
import api from '../../services/api';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: 16,
  boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
  background: 'linear-gradient(to bottom, #ffffff, #f8f9fa)',
}));

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  borderRadius: 12,
  '& .MuiTableCell-head': {
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    fontWeight: 'bold'
  }
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: 12,
    '&:hover fieldset': {
      borderColor: theme.palette.primary.main,
    },
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: 12,
  padding: '8px 24px',
  textTransform: 'none',
  background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.primary.light} 90%)`,
  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
  transition: 'transform 0.2s',
  '&:hover': {
    transform: 'translateY(-2px)',
  }
}));

const DoctorsManagement = () => {
  const [doctors, setDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isOffline, setIsOffline] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    speciality: '',
    medicalCode: '',
    phone: '',
    email: '',
    status: 'active'
  });

  useEffect(() => {
    checkConnection();
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    fetchDoctors();
  }, [isOffline]);

  const checkConnection = () => {
    setIsOffline(!navigator.onLine);
  };

  const handleOnline = () => {
    setIsOffline(false);
    syncWithServer();
  };

  const handleOffline = () => {
    setIsOffline(true);
  };

  const syncWithServer = async () => {
    try {
      const localDoctors = JSON.parse(localStorage.getItem('doctors') || '[]');
      await api.post('/doctors/sync', localDoctors);
      fetchDoctors();
    } catch (error) {
      console.error('Error syncing with server:', error);
    }
  };

  const fetchDoctors = async () => {
    if (isOffline) {
      const storedDoctors = localStorage.getItem('doctors');
      if (storedDoctors) {
        setDoctors(JSON.parse(storedDoctors));
      }
      return;
    }

    try {
      const response = await api.get('/doctors');
      setDoctors(response.data);
      localStorage.setItem('doctors', JSON.stringify(response.data));
    } catch (error) {
      console.error('Error fetching doctors:', error);
      const storedDoctors = localStorage.getItem('doctors');
      if (storedDoctors) {
        setDoctors(JSON.parse(storedDoctors));
      }
      setIsOffline(true);
    }
  };

  const handleOpenDialog = (doctor = null) => {
    if (doctor) {
      setSelectedDoctor(doctor);
      setFormData(doctor);
    } else {
      setSelectedDoctor(null);
      setFormData({
        firstName: '',
        lastName: '',
        speciality: '',
        medicalCode: '',
        phone: '',
        email: '',
        status: 'active'
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedDoctor(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newDoctor = {
      ...formData,
      id: selectedDoctor?.id || Date.now().toString()
    };

    if (isOffline) {
      let updatedDoctors;
      if (selectedDoctor) {
        updatedDoctors = doctors.map(doc =>
          doc.id === selectedDoctor.id ? newDoctor : doc
        );
      } else {
        updatedDoctors = [...doctors, newDoctor];
      }

      localStorage.setItem('doctors', JSON.stringify(updatedDoctors));
      setDoctors(updatedDoctors);
      handleCloseDialog();
      return;
    }

    try {
      if (selectedDoctor) {
        await api.put(`/doctors/${selectedDoctor.id}`, newDoctor);
      } else {
        await api.post('/doctors', newDoctor);
      }

      fetchDoctors();
      handleCloseDialog();
    } catch (error) {
      console.error('Error saving doctor:', error);
      setIsOffline(true);
      handleSubmit(e);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('آیا از حذف این پزشک اطمینان دارید؟')) {
      return;
    }

    if (isOffline) {
      const updatedDoctors = doctors.filter(doc => doc.id !== id);
      localStorage.setItem('doctors', JSON.stringify(updatedDoctors));
      setDoctors(updatedDoctors);
      return;
    }

    try {
      await api.delete(`/doctors/${id}`);
      fetchDoctors();
    } catch (error) {
      console.error('Error deleting doctor:', error);
      setIsOffline(true);
      handleDelete(id);
    }
  };

  const filteredDoctors = doctors.filter(doctor =>
    doctor.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.speciality.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container maxWidth="xl">
      <Box p={4} dir="rtl">
        <Fade in={true} timeout={1000}>
          <Box textAlign="center" mb={4}>
            <DoctorIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              مدیریت پزشکان
            </Typography>
            <Typography color="text.secondary" mb={4}>
              مدیریت و ساماندهی اطلاعات پزشکان سیستم
            </Typography>
            {isOffline && (
              <Chip
                label="حالت آفلاین"
                color="warning"
                sx={{ mb: 2 }}
              />
            )}
          </Box>
        </Fade>

        <StyledPaper elevation={0}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
            <StyledTextField
              placeholder="جستجو..."
              variant="outlined"
              size="small"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
              }}
            />
            <StyledButton
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => handleOpenDialog()}
            >
              افزودن پزشک جدید
            </StyledButton>
          </Box>

          <StyledTableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>تصویر</TableCell>
                  <TableCell>نام و نام خانوادگی</TableCell>
                  <TableCell>تخصص</TableCell>
                  <TableCell>کد نظام پزشکی</TableCell>
                  <TableCell>وضعیت</TableCell>
                  <TableCell>عملیات</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredDoctors.map((doctor) => (
                  <TableRow key={doctor.id}>
                    <TableCell>
                      <Avatar src={doctor.avatar} alt={doctor.firstName}>
                        {doctor.firstName[0]}
                      </Avatar>
                    </TableCell>
                    <TableCell>
                      {doctor.firstName} {doctor.lastName}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={doctor.speciality}
                        size="small"
                        color="primary"
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell>{doctor.medicalCode}</TableCell>
                    <TableCell>
                      <Chip
                        icon={doctor.status === 'active' ? <ActiveIcon /> : <InactiveIcon />}
                        label={doctor.status === 'active' ? 'فعال' : 'غیرفعال'}
                        color={doctor.status === 'active' ? 'success' : 'error'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Tooltip title="ویرایش">
                        <IconButton onClick={() => handleOpenDialog(doctor)} color="primary">
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="حذف">
                        <IconButton onClick={() => handleDelete(doctor.id)} color="error">
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </StyledTableContainer>
        </StyledPaper>

        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>
            {selectedDoctor ? 'ویرایش اطلاعات پزشک' : 'افزودن پزشک جدید'}
          </DialogTitle>
          <DialogContent dividers>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <StyledTextField
                  fullWidth
                  label="نام"
                  value={formData.firstName}
                  onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <StyledTextField
                  fullWidth
                  label="نام خانوادگی"
                  value={formData.lastName}
                  onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <StyledTextField
                  fullWidth
                  label="تخصص"
                  value={formData.speciality}
                  onChange={(e) => setFormData({...formData, speciality: e.target.value})}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <StyledTextField
                  fullWidth
                  label="کد نظام پزشکی"
                  value={formData.medicalCode}
                  onChange={(e) => setFormData({...formData, medicalCode: e.target.value})}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <StyledTextField
                  fullWidth
                  label="شماره تماس"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <StyledTextField
                  fullWidth
                  label="ایمیل"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>انصراف</Button>
            <StyledButton onClick={handleSubmit} variant="contained">
              {selectedDoctor ? 'بروزرسانی' : 'ثبت'}
            </StyledButton>
          </DialogActions>
        </Dialog>
      </Box>
    </Container>
  );
};

export default DoctorsManagement;