import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Container,
  Fade,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  Schedule as ScheduleIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, TimePicker, DatePicker } from '@mui/x-date-pickers';
import api from '../../services/api';
import * as XLSX from 'xlsx';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  maxWidth: 1200,
  margin: '0 auto',
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

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: 12,
  },
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

const ShiftManagement = () => {
  const [shifts] = useState([
    {
      id: 1,
      doctor: 'دکتر علی محمدی',
      department: 'اورژانس',
      date: '1402/08/15',
      startTime: '08:00',
      endTime: '16:00',
      status: 'active'
    },

  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedShift, setSelectedShift] = useState(null);
  const [formData, setFormData] = useState({
    doctor: '',
    department: '',
    date: null,
    startTime: null,
    endTime: null,
    status: 'active'
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const handleOpenDialog = (shift = null) => {
    if (shift) {
      setSelectedShift(shift);
      setFormData(shift);
    } else {
      setSelectedShift(null);
      setFormData({
        doctor: '',
        department: '',
        date: null,
        startTime: null,
        endTime: null,
        status: 'active'
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedShift(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedShift) {
        await api.put(`/shifts/${selectedShift.id}`, formData);
      } else {
        await api.post('/shifts', formData);
      }
      setSnackbar({
        open: true,
        message: selectedShift ? 'شیفت با موفقیت ویرایش شد' : 'شیفت جدید با موفقیت ایجاد شد',
        severity: 'success'
      });
      handleCloseDialog();
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'خطا در ثبت اطلاعات',
        severity: 'error'
      });
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/shifts/${id}`);
      setSnackbar({
        open: true,
        message: 'شیفت با موفقیت حذف شد',
        severity: 'success'
      });

    } catch (error) {
      setSnackbar({
        open: true,
        message: 'خطا در حذف شیفت',
        severity: 'error'
      });
    }
  };

  const downloadExcel = () => {
    const workbook = XLSX.utils.book_new();

    const excelData = shifts.map(shift => ({
      'نام پزشک': shift.doctor,
      'بخش': shift.department,
      'تاریخ': shift.date,
      'ساعت شروع': shift.startTime,
      'ساعت پایان': shift.endTime,
      'وضعیت': shift.status === 'active' ? 'فعال' : 'غیرفعال'
    }));

    const worksheet = XLSX.utils.json_to_sheet(excelData);

    const columnWidths = [
      { wch: 20 }, // نام پزشک
      { wch: 15 }, // بخش
      { wch: 12 }, // تاریخ
      { wch: 12 }, // ساعت شروع
      { wch: 12 }, // ساعت پایان
      { wch: 10 }  // وضعیت
    ];
    worksheet['!cols'] = columnWidths;

    XLSX.utils.book_append_sheet(workbook, worksheet, "Shifts");
    XLSX.writeFile(workbook, "shifts-report.xlsx");
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Container maxWidth="xl">
        <Box p={4} dir="rtl">
          <Fade in={true} timeout={1000}>
            <Box textAlign="center" mb={4}>
              <ScheduleIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
              <Typography variant="h4" fontWeight="bold" gutterBottom>
                مدیریت شیفت‌ها
              </Typography>
              <Typography color="text.secondary" mb={4}>
                برنامه‌ریزی و مدیریت شیفت‌های کاری پزشکان و بخش‌های بیمارستان
              </Typography>
            </Box>
          </Fade>

          <StyledPaper elevation={0}>
            <Box display="flex" justifyContent="center" mt={4}>
              <StyledButton
                  variant="contained"
                  onClick={downloadExcel}
                  startIcon={<ScheduleIcon />}
              >
                دانلود گزارش اکسل
              </StyledButton>
            </Box>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
              <StyledButton
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => handleOpenDialog()}
              >
                ایجاد شیفت جدید
              </StyledButton>
            </Box>

            <StyledTableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>پزشک</TableCell>
                    <TableCell>بخش</TableCell>
                    <TableCell>تاریخ</TableCell>
                    <TableCell>ساعت شروع</TableCell>
                    <TableCell>ساعت پایان</TableCell>
                    <TableCell>وضعیت</TableCell>
                    <TableCell>عملیات</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {shifts.map((shift) => (
                    <TableRow key={shift.id}>
                      <TableCell>{shift.doctor}</TableCell>
                      <TableCell>
                        <Chip label={shift.department} color="primary" variant="outlined" />
                      </TableCell>
                      <TableCell>{shift.date}</TableCell>
                      <TableCell>{shift.startTime}</TableCell>
                      <TableCell>{shift.endTime}</TableCell>
                      <TableCell>
                        <Chip
                          label={shift.status === 'active' ? 'فعال' : 'غیرفعال'}
                          color={shift.status === 'active' ? 'success' : 'error'}
                        />
                      </TableCell>
                      <TableCell>
                        <IconButton onClick={() => handleOpenDialog(shift)} color="primary">
                          <EditIcon />
                        </IconButton>
                        <IconButton onClick={() => handleDelete(shift.id)} color="error">
                          <DeleteIcon />
                        </IconButton>
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
              {selectedShift ? 'ویرایش شیفت' : 'ایجاد شیفت جدید'}
            </DialogTitle>
            <DialogContent dividers>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <StyledFormControl fullWidth>
                    <InputLabel>پزشک</InputLabel>
                    <Select
                      value={formData.doctor}
                      onChange={(e) => setFormData({...formData, doctor: e.target.value})}
                    >
                      <MenuItem value="دکتر علی محمدی">دکتر علی محمدی</MenuItem>
                      <MenuItem value="دکتر سارا احمدی">دکتر سارا احمدی</MenuItem>
                      {/* ... سایر پزشکان */}
                    </Select>
                  </StyledFormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <StyledFormControl fullWidth>
                    <InputLabel>بخش</InputLabel>
                    <Select
                      value={formData.department}
                      onChange={(e) => setFormData({...formData, department: e.target.value})}
                    >
                      <MenuItem value="اورژانس">اورژانس</MenuItem>
                      <MenuItem value="داخلی">داخلی</MenuItem>
                      <MenuItem value="جراحی">جراحی</MenuItem>
                      {/* ... سایر بخش‌ها */}
                    </Select>
                  </StyledFormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <DatePicker
                    label="تاریخ"
                    value={formData.date}
                    onChange={(newValue) => setFormData({...formData, date: newValue})}
                    renderInput={(params) => <StyledTextField {...params} fullWidth />}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TimePicker
                    label="ساعت شروع"
                    value={formData.startTime}
                    onChange={(newValue) => setFormData({...formData, startTime: newValue})}
                    renderInput={(params) => <StyledTextField {...params} fullWidth />}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TimePicker
                    label="ساعت پایان"
                    value={formData.endTime}
                    onChange={(newValue) => setFormData({...formData, endTime: newValue})}
                    renderInput={(params) => <StyledTextField {...params} fullWidth />}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <StyledFormControl fullWidth>
                    <InputLabel>وضعیت</InputLabel>
                    <Select
                      value={formData.status}
                      onChange={(e) => setFormData({...formData, status: e.target.value})}
                    >
                      <MenuItem value="active">فعال</MenuItem>
                      <MenuItem value="inactive">غیرفعال</MenuItem>
                    </Select>
                  </StyledFormControl>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>انصراف</Button>
              <StyledButton onClick={handleSubmit} variant="contained">
                {selectedShift ? 'بروزرسانی' : 'ثبت'}
              </StyledButton>
            </DialogActions>
          </Dialog>

          <Snackbar
            open={snackbar.open}
            autoHideDuration={6000}
            onClose={() => setSnackbar({ ...snackbar, open: false })}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          >
            <Alert
              onClose={() => setSnackbar({ ...snackbar, open: false })}
              severity={snackbar.severity}
              variant="filled"
              sx={{ borderRadius: 3 }}
            >
              {snackbar.message}
            </Alert>
          </Snackbar>
        </Box>
      </Container>
    </LocalizationProvider>
  );
};

export default ShiftManagement;