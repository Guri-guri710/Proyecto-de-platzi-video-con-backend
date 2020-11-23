import React from 'react';
import '../assets/styles/components/Header.scss';
import logo from '../assets/statics/logo-platzi-video-BW2.png';
import userIcon from '../assets/statics/user-icon.png';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutRequest } from '../actions';
import gravatar from '../utils/gravatar'


const Header = props => {
  const { user, isLogin, isRegister } = props;
  const hasUser = Object.keys(user).length > 0;

  const handleLogout = () => {
    props.logoutRequest({});//reiniciar
  }

  const headerClass = classNames('header', {
    isLogin,
    isRegister,
  })

  return(
  <header className={headerClass}>

      <Link to="/">
        <img className="header__img" src={logo} alt="Platzi Video" />
      </Link>

      <div className="header__menu">
        <div className="header__menu--profile">

        {hasUser ?
          <img src={gravatar(user.email)} alt={user.email} />:
           <img src={userIcon} alt="" />
        }
          <p>Perfil</p>
        </div>
        <ul>
        {hasUser ?
          <li><a href="/">{user.name}</a></li>:
          null
        }
        {hasUser ?
          <li><a href="#logout" onClick={handleLogout}>Cerrar Sesión</a></li>
          :
          <li>
          <Link to="/Login">Iniciar sesion</Link>
          </li>
        }
        </ul>
      </div>
    </header>
  );
}

const mapStateToProps = state => {
  return{
    user: state.user,
  };
};

const mapDispatchToProps = {
  logoutRequest,
}

export default connect(mapStateToProps , logoutRequest)(Header);