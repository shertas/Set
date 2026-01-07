export function showToast(message, { type = 'info', duration = 3000 } = {}) {
  let container = document.getElementById('toast-container')
  if (!container) {
    container = document.createElement('div')
    container.id = 'toast-container'
    container.setAttribute('aria-live', 'polite')
    document.body.appendChild(container)
  }

  const toast = document.createElement('div')
  toast.className = `toast toast-${type}`
  toast.textContent = message
  container.appendChild(toast)

  // Forzar reflow para animación
  requestAnimationFrame(() => {
    toast.classList.add('visible')
  })

  // Auto dismiss
  const hide = () => {
    toast.classList.remove('visible')
    setTimeout(() => toast.remove(), 300)
  }

  if (duration > 0) {
    setTimeout(hide, duration)
  }

  // Dismiss on click
  toast.addEventListener('click', hide)

  return toast
}

export function showConfirm(message, { confirmText = 'Aceptar', cancelText = 'Cancelar', onConfirm = () => { }, onCancel = () => { } } = {}) {
  // simple in-page modal
  let overlay = document.createElement('div')
  overlay.className = 'modal-overlay'

  const modal = document.createElement('div')
  modal.className = 'modal-card'

  modal.innerHTML = `
    <div class="modal-body">
      <p>${message}</p>
    </div>
    <div class="modal-actions">
      <button class="btn-secondary modal-cancel">${cancelText}</button>
      <button class="btn-primary modal-confirm">${confirmText}</button>
    </div>
  `

  overlay.appendChild(modal)
  document.body.appendChild(overlay)

  const remove = () => overlay.remove()

  overlay.querySelector('.modal-confirm').addEventListener('click', () => {
    onConfirm()
    remove()
  })
  overlay.querySelector('.modal-cancel').addEventListener('click', () => {
    onCancel()
    remove()
  })

  return {
    close: remove
  }
}

// Expose helpers to window for non-module scripts (backwards compatible)
if (typeof window !== 'undefined') {
  window.showToast = showToast
  window.showConfirm = showConfirm
}