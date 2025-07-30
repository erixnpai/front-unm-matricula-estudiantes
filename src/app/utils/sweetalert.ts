import Swal, { SweetAlertResult } from 'sweetalert2';

// Define una interfaz para las opciones personalizables
interface AlertOptions {
  title: string;
  text?: string; // Texto adicional opcional
  html?: string; // Texto HTML opcional
  icon: 'success' | 'error' | 'warning' | 'info' | 'question';
  showDenyButton?: boolean;
  showCancelButton?: boolean;
  confirmButtonText?: string;
  denyButtonText?: string;
  cancelButtonText?: string;
  confirmButtonColor?: string;
  denyButtonColor?: string;
  cancelButtonColor?: string;
  footer?: string;
}

// Función mejorada
export async function SweetModal(options: AlertOptions): Promise<SweetAlertResult> {
  const {
    title,
    text = '',
    icon,
    html,
    showDenyButton = false,
    showCancelButton = false,
    confirmButtonText = 'Confirmar',
    denyButtonText = 'Denegar',
    cancelButtonText = 'Cancelar',
    confirmButtonColor = '#3085d6',
    denyButtonColor = '#6b7280', // Gris de Tailwind
    cancelButtonColor = '#d33',
    footer
  } = options;

  return Swal.fire({
    title: title,
    text: text,
    icon: icon,
    html: html,
    color: 'black',
    width: 500,
    footer,
    showConfirmButton: true,
    showDenyButton: showDenyButton,
    showCancelButton: showCancelButton,
    confirmButtonColor: confirmButtonColor,
    denyButtonColor: denyButtonColor,
    cancelButtonColor: cancelButtonColor,
    confirmButtonText: confirmButtonText,
    denyButtonText: denyButtonText,
    cancelButtonText: cancelButtonText,
  });
}