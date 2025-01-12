import { Alert, Slide, Snackbar } from "@mui/material";
import { useState } from "react";

const SlideTransition = (props: any) => {
    return <Slide {...props} direction="left" />;
};

export const NotificationHehe = ({ message, success }: { message: string, success: boolean }) => {

    const [isOpened, setIsOpened] = useState<boolean>(true);

    const handleClose = (event: any, reason: any) => {
        if (reason === 'clickaway') {
            return;
        }
        setIsOpened(false);
    };

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
                    severity = {success ? 'success' : 'error'}
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {message}
                </Alert>
            </Snackbar>
        </div>
    );
};