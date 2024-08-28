export interface Message {
    id?: string;
    text: string;
    severity: 'error' | 'warning' | 'info' | 'success';
}