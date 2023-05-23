import { Colors } from '../shared/utils/colors';
import styled from '@emotion/styled';

const FormContainer = styled.form`
	width: 100%;
	height: 100%;
`;

const Logo = styled.img`
	width: 100%;
	height: 100%;
	object-fit: cover;
`;

const ButtonLogin = styled.button`
	background-color: ${Colors.Primary};
	width: 100%;
	margin-top: 20px !important;
	padding-top: 12px;
	padding-bottom: 12px;
	color: #fff;
	border-radius: 5px;
	font-weight: bold;
	&: hover {
		cursor: pointer;
		background-color: ${Colors.Secundary};
	}
`;

const LoginStyled = {
	ButtonLogin,
	Logo,
	FormContainer,
};

export default LoginStyled;
