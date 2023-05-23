import { Colors } from '../../utils/colors';
import styled from '@emotion/styled';

const ButtonHeader = styled.button`
	background-color: ${Colors.Close};
	padding: 8px 10px;
	border-radius: 10px;
	color: ${Colors.White};
	font-weight: 600;
	cursor: pointer;
`;

const HeaderStyled = {
	ButtonHeader,
};

export default HeaderStyled;
