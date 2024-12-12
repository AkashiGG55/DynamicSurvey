import { useNavigate } from 'react-router';
function NotFound() {
    const navigate = useNavigate();
    return (
        <section>
            <p>404 No Encontrado</p>
            <button className='cursor-pointer p-1 bg-slate-200 rounded-md inline-block w-auto' onClick={() => navigate('/')}>Volver a la página de inicio </button>
        </section>
    )
  }
  
  export default NotFound
  