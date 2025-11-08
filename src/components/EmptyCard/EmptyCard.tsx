import { Card, CardContent, CardHeader, Typography, Box } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import CloudIcon from '@mui/icons-material/Cloud';

function EmptyCard() {
  return (
    <Card 
      sx={{ 
        maxWidth: 500,
        margin: "15vh auto",
        borderRadius: '24px',
        background: 'linear-gradient(135deg, #ffffff 0%, #f5f7fa 100%)',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
        padding: '24px',
        textAlign: 'center',
        '@media (max-width: 768px)': {
          margin: "10vh auto",
          maxWidth: '90%',
          padding: '20px',
        },
        '@media (max-width: 576px)': {
          margin: "8vh auto",
          padding: '16px',
          borderRadius: '20px',
        }
      }}
    >
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          mb: 3,
          mt: 2 
        }}
      >
        <Box
          sx={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '50%',
            padding: '24px',
            display: 'inline-flex',
            boxShadow: '0 10px 30px rgba(102, 126, 234, 0.3)',
            '@media (max-width: 576px)': {
              padding: '20px',
            }
          }}
        >
          <CloudIcon sx={{ fontSize: 64, color: 'white', '@media (max-width: 576px)': { fontSize: 48 } }} />
        </Box>
      </Box>

      <CardHeader 
        title="WeatherWise App"
        titleTypographyProps={{
          variant: 'h4',
          fontWeight: 700,
          color: '#1e293b',
          sx: {
            '@media (max-width: 576px)': {
              fontSize: '1.75rem',
            }
          }
        }}
        sx={{ padding: '0 0 16px 0' }}
      />
      
      <CardContent sx={{ padding: '0 !important' }}>
        <Typography 
          variant="body1" 
          color="text.secondary"
          sx={{ 
            fontSize: '1.1rem',
            lineHeight: 1.7,
            mb: 2,
            '@media (max-width: 576px)': {
              fontSize: '1rem',
            }
          }}
        >
          Get real-time weather updates for your location and around the world. Check the forecast, track temperatures, and stay prepared
          for any weather conditions.
        </Typography>
        
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1,
            mt: 3,
            padding: '16px',
            background: 'linear-gradient(135deg, #667eea15 0%, #764ba215 100%)',
            borderRadius: '12px',
            '@media (max-width: 576px)': {
              padding: '12px',
              mt: 2,
            }
          }}
        >
          <SearchIcon sx={{ color: '#667eea', fontSize: 28 }} />
          <Typography 
            variant="h6" 
            sx={{ 
              color: '#667eea',
              fontWeight: 600,
              '@media (max-width: 576px)': {
                fontSize: '1rem',
              }
            }}
          >
            Search for a city to get started!
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

export default EmptyCard;
