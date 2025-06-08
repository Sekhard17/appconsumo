// Validaciones personalizadas
export class FormValidator {
private errors: { [key: string]: string; } = {};

validate(formData: FormData): boolean {
this.errors = {};

// Validar tipo
const tipo = formData.get('tipo') as string;
if (!tipo) {
this.errors.tipo = 'Debes seleccionar un tipo de calefacción';
}

// Validar cantidad
const cantidad = parseFloat(formData.get('cantidad') as string);
if (!cantidad || cantidad <= 0) {
this.errors.cantidad = 'La cantidad debe ser mayor a 0';
} else if (cantidad > 1000) {
this.errors.cantidad = 'La cantidad parece demasiado alta';
}

// Validar fecha
const fecha = formData.get('fecha') as string;
if (!fecha) {
this.errors.fecha = 'La fecha es obligatoria';
} else {
const fechaObj = new Date(fecha);
const hoy = new Date();
if (fechaObj > hoy) {
this.errors.fecha = 'La fecha no puede ser futura';
}
}

// Validar espacio
const espacio = parseFloat(formData.get('espacio') as string);
if (!espacio || espacio <= 0) {
this.errors.espacio = 'El tamaño del espacio debe ser mayor a 0';
} else if (espacio > 500) {
this.errors.espacio = 'El espacio parece demasiado grande';
}

// Validar horas
const horas = parseFloat(formData.get('horas') as string);
if (!horas || horas <= 0) {
this.errors.horas = 'Las horas de uso deben ser mayor a 0';
} else if (horas > 24) {
this.errors.horas = 'Las horas no pueden ser más de 24';
}

return Object.keys(this.errors).length === 0;
}

showErrors(): void {
// Limpiar errores anteriores
document.querySelectorAll('.error-message').forEach(el => {
el.classList.add('hidden');
el.textContent = '';
});

// Mostrar nuevos errores
Object.entries(this.errors).forEach(([field, message]) => {
const errorEl = document.querySelector(`[data-field="${field}"]`) as HTMLElement;
if (errorEl) {
errorEl.textContent = message;
errorEl.classList.remove('hidden');
errorEl.className = 'error-message text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2 mt-2 flex items-center';
errorEl.innerHTML = `
              <svg class="w-4 h-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              ${message}
            `;
}
});
}
}
