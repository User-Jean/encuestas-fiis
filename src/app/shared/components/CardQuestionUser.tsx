import {
  Card,
  CardContent
} from '@mui/material';
import { useEffect } from 'react';
import { Question, TypeQuestion } from '../types';
import './CardQuestionUser.css'

export interface CardQuestionInterface {
	question: Question;
}

const CardQuestionUser: React.FC<CardQuestionInterface> = ({ question }) => {

	useEffect(() => {

	}, []);

	return (
			<Card>
				<CardContent>
          <b style={{marginBottom: '15px', display: 'block'}}>{question.name}</b>
          
          {question.type != TypeQuestion.Regular 
            ? question.options.map((option, index) =>  (
              <div key={index}>
                <input name={question.id} type='radio' id={`${question.id}${index}`}/> 
                <label htmlFor={`${question.id}${index}`}>{option}</label>
              </div>
            ))
            : <div>
                <input className='input-text' type='text'/>
              </div>}
				</CardContent>
			</Card>
	);
};

export default CardQuestionUser;
