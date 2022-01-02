import Swal from 'sweetalert2';

interface sucessOptionsProps {
  message: string,
  closingCallback?: () => any,
}

const fireSwal = {
  loading: () => {
    Swal.fire({
      icon: 'info',
      title: 'Your form is being saved!',
      didOpen: () => Swal.showLoading(),
    });
  },
  success: (options: sucessOptionsProps) => {
    Swal.hideLoading();
    Swal.update({
      icon: 'success',
      title: options.message,
      showConfirmButton: false,
      didClose: options.closingCallback?.(),
    });
    setTimeout(() => {
      Swal.close();
    }, 1000);
  },
  error: () => {
    Swal.hideLoading();
    Swal.update({
      icon: 'error',
      title: 'Oops! Something went wrong. Please reload and try again.',
    });
  },
  delete: (message: string) => {
    return Swal.fire({
      title: 'Are you sure?',
      text: message,
      icon: 'warning',
      showCloseButton: true,
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it.',
      cancelButtonText: "No, don't do it!",
    });
  },
  successfullyDeleted: (message: string) => {
    Swal.fire({
      icon: 'success',
      title: message,
      showConfirmButton: false,
      timer: 1000,
    })
  },
};

export default fireSwal;
