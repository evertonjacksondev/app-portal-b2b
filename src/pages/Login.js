import styled from "styled-components";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { useNavigate } from "react-router-dom";
import logo from "../assets/zeene-fundobranco.png"
import { useSnackbar } from 'notistack'
import authApi from "../http/authApi";
import { useEffect, useState } from "react";
import { GoogleAuthenticatorQRCode } from "../components/2FA";
import IconButton from '../components/IconButton'
import jwtDecode from "jwt-decode";
import gpsImg from "../assets/GPS.gif"
import passwordImg from "../assets/password.gif"

const Paragraph = styled.p`
width: 435px;
height: 51px;
overflow:hidden;
top: 46px;
font-family: 'Poppins';
font-style: normal;
justify-content: center;
font-weight: 550;
margin-top:10px;
font-size: 14px;
line-height: 15px;
display: flex;
flex-direction: row;

color: black;
`

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  box-shadow: 0 1px 10px rgb(0 0 0 / 0.2);
  display: flex;
  flex-direction: row;
  border-radius:15px;
  overflow: hidden;
  justify-content: center;
  align-items: center;
`;

const ModalContainer = styled.div`
  background-color: #fff;
  border-radius:15px;
  display:flex;
  gap:20px;
  flex-direction:column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  max-width: 400px;
  min-width: 500;
  min-height: 500px;
  max-height: 800px;
`;

export const LoginContainer = styled.div`
width: 100vw;
height: 100vh;
background:#C9DBEA;
gap:15px;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
 ;
`


export const LoginContainerButton = styled.div`
display:flex;
gap:10px;
 ;
`
export const LoginItem = styled.div`
  max-width: 1120px;
  text-align: center;
 
`
export const Img = styled.img`
width: 20%;
cursor: pointer;

`

const Login = () => {	

	const navigate = useNavigate()
	const { enqueueSnackbar } = useSnackbar()
	const [value, setValue] = useState({})
	const [isLogin, setIsLogin] = useState(false)
	const [decode, setDecode] = useState({ isActive: false });
	const [isGPSEnabled, setIsGPSEnabled] = useState(false);

	useEffect(() => {
		if ('geolocation' in navigator) {
			navigator.geolocation.getCurrentPosition(
				position => {
					setIsGPSEnabled(true);
					setValue((currentValue) => {
						return {
							...currentValue,
							geolocation: {
								latitude: position.coords.latitude,
								longitude: position.coords.longitude,
								timestamp: position.timestamp
							}

						}
					})
				},
				error => {
					setIsGPSEnabled(false);
				}
			);
		} else {
			// O navegador não suporta a API Geolocation
			setIsGPSEnabled(false);
		}
	}, []);

	const handleChange = ({ target }) => {

		const { name, value } = target
		setValue((currentValue) => {
			return {
				...currentValue,
				[name]: value

			}
		})
	}

	const handleDisabled = () => {
		return value.email != "" && value.password != "" ? false : true
	}

	const handleSubmit = async () => {
		try {
			const sucesso = await authApi.authLogin(value.email, value.password, value.geolocation)
			if (sucesso) {
				const decodedToken = jwtDecode(sucesso.authToken);
				setDecode(decodedToken)
				localStorage.removeItem('authToken')
				const payload = sucesso
				setValue((currentValue) => {
					return {
						...currentValue,
						payload
					}
				})
				setIsLogin(true)

			}

		} catch (response) {
			enqueueSnackbar(response.data.message, { variant: 'error' })
		}
	};

	const handleSubmitOTP = async () => {
		try {
			const sucesso = await authApi.authLoginOTP(value.email, value.password, value.code.substring(0, 6), value.payload.authToken)
			if (sucesso) {
				if (sucesso.codeVerify && !sucesso.isActive) {
					localStorage.setItem('authToken', JSON.stringify(value.payload))
					navigate('/produtos')
					enqueueSnackbar('Código Autenticado, Faça o login novamente!', { variant: 'success' })
				} else {
						localStorage.setItem('authToken', JSON.stringify(value.payload))
						navigate('/produtos')
						enqueueSnackbar('Autorizado!', { variant: 'success' })
				}
			}

		} catch (response) {
			enqueueSnackbar(response.data.message, { variant: 'error' })
		}
	};

	return (
		<LoginContainer>
			{!isGPSEnabled && (
				<ModalOverlay>
					<ModalContainer>
						<LoginItem>
							<img style={{ width: '250px' }} src={gpsImg} />
							<Paragraph>
								Atenção!
								É
								necessário ativar sua localização no seu Navegador
							</Paragraph>
							<Paragraph>
								Após ativação do gps clique em atualizar.
							</Paragraph>

						</LoginItem>
						<IconButton iconName={'refresh'} onClick={() => { window.location.reload() }} label={'Atualizar'} />
					</ModalContainer>
				</ModalOverlay>
			)
			}
			{
				isLogin && (
					<>
						<ModalOverlay>
							<ModalContainer>
								<LoginItem>
									{isLogin && decode.isActive && (<img style={{ width: '250px' }} src={passwordImg} />)}
								</LoginItem>
								<LoginItem>
									<Paragraph>Verificação em duas etapas</Paragraph>
									{isLogin && !decode.isActive && (<GoogleAuthenticatorQRCode secret={decode.secret} accountName={value.email} />)}
								</LoginItem>
								<LoginItem>
									<Input
										autoFocus
										type="number"
										name="code"
										onChange={handleChange}
										value={value.code ? value.code.substring(0, 6) : ''}
										required
										placeholder="Código validação"
									/>
								</LoginItem>
								<LoginContainerButton>
									<LoginItem>
										<IconButton
											disabled={value.code && value.code.length > 3 ? false : true}
											onClick={handleSubmitOTP}
											iconName={'done'}
											background={"#F5A623"}
											label={'Validar'} />
									</LoginItem>
									<LoginItem>
										<IconButton background={"#F5A623"} onClick={() => { setIsLogin(false) }} iconName={'closed'} label={'Fechar'} />
									</LoginItem>
								</LoginContainerButton>
							</ModalContainer>
						</ModalOverlay>
					</>
				)
			}
			{
				!isLogin && (
					<>
						<LoginItem>
							<Img src={logo} />
							<p>Faça seu Login</p>
							<strong><em>WARNING!</em> Acesso exclusivo para colaborador</strong>
						</LoginItem>
						<LoginItem>
							<Input
								name="email"
								onChange={handleChange}
								value={value.email}
								required
								placeholder="Email"
							/>
						</LoginItem>
						<LoginItem>
							<Input
								name="password"
								onChange={handleChange}
								value={value.password}
								required
								type="password"
								placeholder="Senha"
							/>
						</LoginItem>
						<LoginItem>
							<Button background="#61a2f7" disabled={handleDisabled()} onClick={handleSubmit}>Entrar </Button>
						</LoginItem>
					</>)
			}

		</LoginContainer >
	)

}


export default Login;