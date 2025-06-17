import Swal from 'sweetalert2';

class ToastService {
  // Toast configuration
  static _toastConfig = {
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
  };

  static success(message, timer = 3000) {
    const Toast = Swal.mixin(this._toastConfig);
    return Toast.fire({
      icon: 'success',
      title: message,
      timer,
    });
  }

  static error(message, timer = 4000) {
    const Toast = Swal.mixin(this._toastConfig);
    return Toast.fire({
      icon: 'error',
      title: message,
      timer,
    });
  }

  static warning(message, timer = 3500) {
    const Toast = Swal.mixin(this._toastConfig);
    return Toast.fire({
      icon: 'warning',
      title: message,
      timer,
    });
  }

  static info(message, timer = 3000) {
    const Toast = Swal.mixin(this._toastConfig);
    return Toast.fire({
      icon: 'info',
      title: message,
      timer,
    });
  }

  // Loading toast (persistent until manually closed)
  static loading(message = 'Loading...') {
    return Swal.fire({
      title: message,
      allowOutsideClick: false,
      allowEscapeKey: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
  }

  // ✅ FIXED: Promise-based toast - removed unused variable
  static async promise(promise, messages) {
    // Show loading (no need to store reference since we use Swal.close())
    this.loading(messages.pending || 'Loading...');

    try {
      const result = await promise;
      Swal.close(); // Close loading
      this.success(messages.success || 'Success!');
      return result;
    } catch (error) {
      Swal.close(); // Close loading
      this.error(messages.error || 'Error occurred!');
      throw error;
    }
  }

  // Confirmation modal
  static async confirm(title, text, confirmButtonText = 'Yes', cancelButtonText = 'Cancel') {
    return Swal.fire({
      title,
      text,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText,
      cancelButtonText,
    });
  }

  // Custom modal
  static modal(options) {
    return Swal.fire(options);
  }

  // Close all toasts
  static close() {
    Swal.close();
  }
}

export default ToastService;
