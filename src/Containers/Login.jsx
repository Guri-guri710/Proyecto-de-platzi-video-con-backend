import React, {useState} from 'react';
import { connect } from 'react-redux';
import { loginRequest } from '../actions';
import googleIcon from '../assets/statics/google-icon.png';
import twiterIcon from '../assets/statics/twitter-icon.png';
import '../assets/styles/components/Login.scss';
import Header from '../components/Header';

const Login = props => {
const [form, set] = useState({
	email:'',
});

const handleInput = event => {
	setValues({
		...form,
		[event.target.name]: event.target.value
	})
}

const handleSubmit = event => {
	event.preventDefault();
	props.LoginRequest(form);
	props.history.push('/');
};

return(
<>
	<Header isLogin />
	<section className='login'>
			<section className='login__container'>
				<h2>Inicia sesión</h2>
				<form className='login__container--form' onSubmit={handleSubmit}>
					<input name="email" className='input' type='text' placeholder='Correo' onChange={handleInput}/>
					<input name="password" className='input' type='password' placeholder='Contraseña' onChange={handleInput}/>
					<button className='button'>Iniciar sesión</button>
					<div className='login__container--remember-me'>
						<label>
							<input type='checkbox' id='cbox1' value='first_checkbox' />
							Recuérdame
						</label>
						<a href='/'>Olvidé mi contraseña</a>
					</div>
				</form>
				<section className='login__container--social-media'>
					<div>
						<img src={googleIcon} /> Inicia sesión con Google
					</div>
					<div>
						<img src={twiterIcon} /> Inicia sesión con Twitter
					</div>
				</section>
				<p className='login__container--register'>
					No tienes ninguna cuenta <a href=''>Regístrate</a>
				</p>
			</section>
		</section>
</>
);
}

const mapDispachToProps =  {
	loginRequest,
}


export default connect(null,mapDispachToProps)(Login)