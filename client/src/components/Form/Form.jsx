import React from 'react';
import Login from './Login/Login';
import {
	Container,
	FormContainer
} from './Styles'

const Form = () => {
	return (
		<Container>
			<FormContainer>
				<Login />
			</FormContainer>
		</Container>
	);
};

export default Form;