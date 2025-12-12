/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  IconButton,
} from '@mui/material';
import { Button, Header } from '../../components';
import {
  VideoCall,
  Group,
  CalendarToday,
  Settings,
  ExitToApp,
  Add,
} from '@mui/icons-material';
import { logout } from '../../api/services/auth.service';

const HomeContainer = styled(Container)`
  padding: 2rem;
  min-height: 100vh;
  background: #f5f5f5;
`;

const WelcomeSection = styled(Box)`
  background: white;
  padding: 2rem;
  border-radius: 16px;
  margin-bottom: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const ActionCard = styled(Card)`
  height: 100%;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  }
`;

const CardIcon = styled(Box)`
  width: 60px;
  height: 60px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #001e36, #0078d4, #3bc6ff);
  color: white;
`;

export const Home = () => {
  const navigate = useNavigate();
  const [userName] = useState('کاربر'); // TODO: از context یا state management بگیرید

  const handleLogout = async () => {
    try {
      await logout();
      // بعد از logout موفق، به صفحه login هدایت می‌شود
      navigate('/login');
    } catch (error) {
      // حتی اگر خطا رخ دهد، token پاک شده و به login هدایت می‌شود
      console.error('Logout error:', error);
      navigate('/login');
    }
  };

  const handleCreateMeeting = () => {
    // TODO: اضافه کردن منطق ساخت جلسه
    console.log('Create new meeting');
  };

  const handleJoinMeeting = () => {
    // TODO: اضافه کردن منطق پیوستن به جلسه
    console.log('Join meeting');
  };

  const handleViewMeetings = () => {
    // TODO: اضافه کردن منطق مشاهده جلسات
    console.log('View meetings');
  };

  return (
    <HomeContainer maxWidth="xl">
      <Box
        sx={{
          marginBottom: 3,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Header title="پلتفرم برگزاری جلسات آنلاین" />
        <IconButton onClick={handleLogout} color="error" sx={{ marginLeft: 2 }}>
          <ExitToApp />
        </IconButton>
      </Box>

      <WelcomeSection>
        <Typography variant="h4" gutterBottom>
          خوش آمدید، {userName}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          برای شروع، یکی از گزینه‌های زیر را انتخاب کنید
        </Typography>
      </WelcomeSection>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <ActionCard onClick={handleCreateMeeting}>
            <CardContent>
              <CardIcon>
                <Add sx={{ fontSize: 32 }} />
              </CardIcon>
              <Typography variant="h6" gutterBottom>
                ایجاد جلسه جدید
              </Typography>
              <Typography variant="body2" color="text.secondary">
                یک جلسه آنلاین جدید ایجاد کنید و با دیگران به اشتراک بگذارید
              </Typography>
            </CardContent>
          </ActionCard>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <ActionCard onClick={handleJoinMeeting}>
            <CardContent>
              <CardIcon>
                <VideoCall sx={{ fontSize: 32 }} />
              </CardIcon>
              <Typography variant="h6" gutterBottom>
                پیوستن به جلسه
              </Typography>
              <Typography variant="body2" color="text.secondary">
                با استفاده از کد جلسه به یک جلسه موجود بپیوندید
              </Typography>
            </CardContent>
          </ActionCard>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <ActionCard onClick={handleViewMeetings}>
            <CardContent>
              <CardIcon>
                <CalendarToday sx={{ fontSize: 32 }} />
              </CardIcon>
              <Typography variant="h6" gutterBottom>
                جلسات من
              </Typography>
              <Typography variant="body2" color="text.secondary">
                مشاهده و مدیریت جلسات برنامه‌ریزی شده
              </Typography>
            </CardContent>
          </ActionCard>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <ActionCard>
            <CardContent>
              <CardIcon>
                <Group sx={{ fontSize: 32 }} />
              </CardIcon>
              <Typography variant="h6" gutterBottom>
                تیم‌ها
              </Typography>
              <Typography variant="body2" color="text.secondary">
                مدیریت تیم‌ها و اعضای گروه
              </Typography>
            </CardContent>
          </ActionCard>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <ActionCard>
            <CardContent>
              <CardIcon>
                <Settings sx={{ fontSize: 32 }} />
              </CardIcon>
              <Typography variant="h6" gutterBottom>
                تنظیمات
              </Typography>
              <Typography variant="body2" color="text.secondary">
                تنظیمات حساب کاربری و برنامه
              </Typography>
            </CardContent>
          </ActionCard>
        </Grid>
      </Grid>

      <Box sx={{ marginTop: 4, display: 'flex', justifyContent: 'center' }}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          startIcon={<VideoCall />}
          onClick={handleCreateMeeting}
        >
          شروع جلسه فوری
        </Button>
      </Box>
    </HomeContainer>
  );
};
