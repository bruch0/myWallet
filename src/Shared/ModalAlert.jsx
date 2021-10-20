import Swal from 'sweetalert2'

function ModalAlert ({ title }) {
  const obj =
    {
      title: `<span style="color: #FFFFFF; font-family: Raleway; font-weight: 700;">${title}</span>`,
      backdrop: '#FFFFFFE5',
      background: '#7d16c4',
      confirmButtonColor: '#a31fff',
      icon: 'error'
    }

  Swal.fire(obj)
}

export default ModalAlert
