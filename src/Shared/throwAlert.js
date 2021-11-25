import Swal from 'sweetalert2';

function throwError({ title }) {
  const obj = {
    title: `<span style="color: #FFFFFF; font-family: Raleway; font-weight: 700;">${title}</span>`,
    backdrop: '#FFFFFFE5',
    background: '#7d16c4',
    confirmButtonColor: '#a31fff',
    icon: 'error',
  };

  Swal.fire(obj);
}

function throwSuccess({ title }) {
  const obj = {
    title: `<span style="color: #FFFFFF; font-family: Raleway; font-weight: 700;">${title}</span>`,
    backdrop: '#FFFFFFE5',
    background: '#7d16c4',
    confirmButtonColor: '#a31fff',
    icon: 'success',
  };

  Swal.fire(obj);
}

export { throwError, throwSuccess };
