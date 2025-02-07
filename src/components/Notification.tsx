import { Alert, Slide, Snackbar } from "@mui/material";
import { useState } from "react";

const SlideTransition = (props: any) => {
    return <Slide {...props} direction="left`   " />;
};

export const NotificationHehe = ({ message, success }: { message: string, success: string }) => {

    const [isOpened, setIsOpened] = useState<boolean>(true);

    const handleClose = (_: any, reason: any) => {
        if (reason === 'clickaway') {
            return;
        }
        setIsOpened(false);
    };

    let severity: 'success' | 'error' | 'warning' | 'info' = 'info'; 

    switch (success) {
      case 'success':
        severity = 'success';
        break;
      case 'error':
        severity = 'error';
        break;
      case 'warning':
        severity = 'warning';
        break;
      default:
        severity = 'info';
    }

    return (
        <div>
            <Snackbar
                open={isOpened}
                onClose={handleClose}
                autoHideDuration={3000}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                TransitionComponent={SlideTransition}
            >
                <Alert
                    // onClose={handleClose}
                    severity = {severity}
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {message}
                </Alert>
            </Snackbar>
        </div>
    );
};