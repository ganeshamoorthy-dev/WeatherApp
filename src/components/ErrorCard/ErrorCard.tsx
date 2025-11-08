import styled from "@emotion/styled";
import { Box, Typography, Button } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import RefreshIcon from "@mui/icons-material/Refresh";
import HomeIcon from "@mui/icons-material/Home";

const StyledErrorCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 40px;
  background: white;
  border-radius: 24px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  margin: 40px auto;
  max-width: 600px;
  text-align: center;
  animation: fadeInScale 0.5s ease-out;

  @keyframes fadeInScale {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  @media (max-width: 768px) {
    padding: 48px 32px;
    margin: 32px auto;
    border-radius: 20px;
  }

  @media (max-width: 576px) {
    padding: 40px 24px;
    margin: 24px auto;
    border-radius: 16px;
  }

  & .error-icon {
    width: 120px;
    height: 120px;
    background: linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 24px;
    animation: pulse 2s ease-in-out infinite;

    @keyframes pulse {
      0%, 100% {
        transform: scale(1);
        box-shadow: 0 0 0 0 rgba(255, 107, 107, 0.7);
      }
      50% {
        transform: scale(1.05);
        box-shadow: 0 0 0 20px rgba(255, 107, 107, 0);
      }
    }

    @media (max-width: 576px) {
      width: 100px;
      height: 100px;
    }

    & svg {
      font-size: 64px;
      color: white;

      @media (max-width: 576px) {
        font-size: 56px;
      }
    }
  }

  & .error-title {
    color: #1e293b;
    font-weight: 700;
    font-size: 2rem;
    margin-bottom: 16px;

    @media (max-width: 768px) {
      font-size: 1.75rem;
    }

    @media (max-width: 576px) {
      font-size: 1.5rem;
      margin-bottom: 12px;
    }
  }

  & .error-message {
    color: #64748b;
    font-size: 1.1rem;
    line-height: 1.6;
    margin-bottom: 32px;
    max-width: 500px;

    @media (max-width: 768px) {
      font-size: 1rem;
      margin-bottom: 28px;
    }

    @media (max-width: 576px) {
      font-size: 0.95rem;
      margin-bottom: 24px;
    }
  }

  & .error-code {
    background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
    color: #475569;
    padding: 12px 24px;
    border-radius: 12px;
    font-family: 'Courier New', monospace;
    font-size: 0.9rem;
    margin-bottom: 32px;
    border-left: 4px solid #ff6b6b;

    @media (max-width: 576px) {
      padding: 10px 20px;
      font-size: 0.85rem;
      margin-bottom: 24px;
    }
  }

  & .button-group {
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
    justify-content: center;

    @media (max-width: 576px) {
      gap: 12px;
      flex-direction: column;
      width: 100%;
    }

    & .action-button {
      padding: 12px 32px;
      border-radius: 12px;
      text-transform: none;
      font-weight: 600;
      font-size: 1rem;
      transition: all 0.3s ease;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

      @media (max-width: 576px) {
        width: 100%;
        padding: 14px 24px;
      }

      &.primary {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;

        &:hover {
          background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(102, 126, 234, 0.4);
        }
      }

      &.secondary {
        background: white;
        color: #667eea;
        border: 2px solid #667eea;

        &:hover {
          background: #f5f7fa;
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(102, 126, 234, 0.2);
        }
      }

      &:active {
        transform: translateY(0);
      }
    }
  }
`;

interface ErrorCardProps {
  title?: string;
  message?: string;
  errorCode?: string;
  onRetry?: () => void;
  onGoHome?: () => void;
  showHomeButton?: boolean;
}

function ErrorCard({
  title = "Oops! Something Went Wrong",
  message = "We encountered an unexpected error. Please try again or contact support if the problem persists.",
  errorCode,
  onRetry,
  onGoHome,
  showHomeButton = false,
}: ErrorCardProps) {
  return (
    <StyledErrorCardContainer>
      <Box className="error-icon">
        <ErrorOutlineIcon />
      </Box>

      <Typography variant="h4" className="error-title">
        {title}
      </Typography>

      <Typography variant="body1" className="error-message">
        {message}
      </Typography>

      {errorCode && (
        <Box className="error-code">
          Error Code: {errorCode}
        </Box>
      )}

      <Box className="button-group">
        {onRetry && (
          <Button
            className="action-button primary"
            startIcon={<RefreshIcon />}
            onClick={onRetry}
          >
            Try Again
          </Button>
        )}
        {showHomeButton && onGoHome && (
          <Button
            className="action-button secondary"
            startIcon={<HomeIcon />}
            onClick={onGoHome}
          >
            Go Home
          </Button>
        )}
      </Box>
    </StyledErrorCardContainer>
  );
}

export default ErrorCard;
