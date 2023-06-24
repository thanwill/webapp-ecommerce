import { Link } from "react-router-dom";
import "./style.css";
export default function Header() {
  const storedToken = localStorage.getItem("token");

  return (
    <>
      <nav className='navbar fixed-top navbar-light bg-light mt'>
        <div className='container-fluid'>
          <div className='navbar-brand'>
            <Link to='/'>
              <img
                src='./assets/pipoca.png'
                alt=''
                width='30'
                height='24'
                className='d-inline-block align-text-top'
              />
            </Link>

            <span className='m-3 text-desable'>E-commerce</span>
          </div>
          <button
            className='navbar-toggler'
            type='button'
            data-bs-toggle='offcanvas'
            data-bs-target='#offcanvasNavbar'
            aria-controls='offcanvasNavbar'
            aria-label='Toggle navigation'>
            <span className='navbar-toggler-icon'></span>
          </button>
          <div
            className='offcanvas offcanvas-end'
            tabIndex='-1'
            id='offcanvasNavbar'
            aria-labelledby='offcanvasNavbarLabel'>
            <div className='offcanvas-header'>
              <h5 className='offcanvas-title' id='offcanvasNavbarLabel'>
                Menu
              </h5>
              <button
                type='button'
                className='btn-close'
                data-bs-dismiss='offcanvas'
                aria-label='Close'></button>
            </div>
            <div className='offcanvas-body'>
              <ul className='navbar-nav justify-content-end flex-grow-1 pe-3'>
                <li className='nav-item'>
                  <div className='nav-link active' aria-current='page'>
                    <Link to='/'>Início</Link>
                  </div>
                </li>
                <li className='nav-item'>
                  <div className='nav-link'>
                    <Link to='/produtos'>Produtos</Link>
                  </div>
                </li>
                <li className='nav-item'>
                  <div className='nav-link'>
                    <Link to='/usuarios'>Usuários</Link>
                  </div>
                </li>
                <li className='nav-item'>
                  <div className='nav-link'>
                    <Link to='estoque'>Estoque</Link>
                  </div>
                </li>
              </ul>
              <form className='d-flex mt-3' role='search'>
                <input
                  className='form-control me-2'
                  type='search'
                  name='search'
                  placeholder='Search'
                  aria-label='Search'
                />
                <button className='btn btn-outline-success' type='submit'>
                  Search
                </button>
              </form>
            </div>
          </div>
        </div>
      </nav>

      <nav className=' bg-light fixed-bottom p-3  ali mt-5 text-center'>
        <div className='row'>
          <div
            className='btn-group'
            role='group'
            aria-label='Basic outlined example'>
            <button type='button' className='btn btn-outline-primary'>
              <Link to='/'>Início</Link>
            </button>
            <button type='button' className='btn btn-outline-primary'>
              <Link to='/estoque'>Carrinho</Link>
            </button>
            <button type='button' className='btn btn-outline-primary'>
              {storedToken ? (
                <Link to='/perfil'>Perfil</Link>
              ) : (
                <Link to='/login'>Login</Link>
              )}
            </button>
          </div>
         
        </div>
      </nav>
    </>
  );
}
