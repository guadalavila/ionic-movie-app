export interface ToastDefault {
    message: string;
    header?: string;
    position?: 'top' | 'bottom' | 'middle';
    type?: 'success' | 'warning' | 'error';
    duration?: number;
}
