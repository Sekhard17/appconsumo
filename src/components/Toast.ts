export interface ToastOptions {
  type?: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
  title?: string;
}

export class ToastManager {
  private container: HTMLElement;

  constructor() {
    this.container = document.getElementById('toast-container') || document.body;
  }

  show(message: string, options: ToastOptions = {}) {
    const {
      type = 'info',
      duration = 4000,
      title
    } = options;

    const toast = this.createToast(message, type, title);
    this.container.appendChild(toast);

    // Animar entrada
    setTimeout(() => {
      toast.classList.remove('translate-x-full', 'opacity-0');
      toast.classList.add('translate-x-0', 'opacity-100');
    }, 10);

    // Auto remove
    setTimeout(() => {
      this.removeToast(toast);
    }, duration);

    // Click to dismiss
    toast.addEventListener('click', () => {
      this.removeToast(toast);
    });

    return toast;
  }

  private createToast(message: string, type: string, title?: string): HTMLElement {
    const toast = document.createElement('div');
    
    const typeStyles = {
      success: 'bg-green-50 border-green-200 text-green-800',
      error: 'bg-red-50 border-red-200 text-red-800',
      warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
      info: 'bg-blue-50 border-blue-200 text-blue-800'
    };

    const icons = {
      success: '✅',
      error: '❌',
      warning: '⚠️',
      info: 'ℹ️'
    };

    toast.className = `
      transform translate-x-full opacity-0 transition-all duration-300 ease-out
      max-w-sm w-full ${typeStyles[type as keyof typeof typeStyles]}
      border rounded-lg shadow-lg p-4 cursor-pointer hover:shadow-xl
      backdrop-blur-sm
    `.replace(/\s+/g, ' ').trim();

    toast.innerHTML = `
      <div class="flex items-start space-x-3">
        <div class="flex-shrink-0 text-lg">
          ${icons[type as keyof typeof icons]}
        </div>
        <div class="flex-1 min-w-0">
          ${title ? `<p class="font-semibold text-sm">${title}</p>` : ''}
          <p class="text-sm ${title ? 'mt-1' : ''}">${message}</p>
        </div>
        <button class="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors">
          <span class="sr-only">Cerrar</span>
          ✕
        </button>
      </div>
    `;

    return toast;
  }

  private removeToast(toast: HTMLElement) {
    toast.classList.remove('translate-x-0', 'opacity-100');
    toast.classList.add('translate-x-full', 'opacity-0');
    
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 300);
  }

  success(message: string, title?: string) {
    return this.show(message, { type: 'success', title });
  }

  error(message: string, title?: string) {
    return this.show(message, { type: 'error', title });
  }

  warning(message: string, title?: string) {
    return this.show(message, { type: 'warning', title });
  }

  info(message: string, title?: string) {
    return this.show(message, { type: 'info', title });
  }
}

// Instancia global
export const toast = new ToastManager(); 