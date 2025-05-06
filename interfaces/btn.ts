export interface BtnProps {
    title: string;
    onPress: () => void;
    disabled?: boolean;
    type?: 'login' | 'primary' | 'link';
}