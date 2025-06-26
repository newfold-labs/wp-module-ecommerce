import { useState } from 'react';
import {Label} from "@newfold/ui-component-library";

export const CategoriesField = ({id, name, label}) => {

	const suggestions = [
		{ id: 1234, name: 'Adventure' },
		{ id: 3123, name: 'Action' },
		{ id: 6785, name: 'Comedy' },
		{ id: 8685, name: 'Drama' },
		{ id: 85678, name: 'Fantasy' },
		{ id: 24325, name: 'Horror' },
		{ id: 345, name: 'Mystery' },
		{ id: 5345, name: 'Romance' },
		{ id: 123, name: 'Thriller' },
		{ id: 1098, name: 'Western' },
		{ id: 97806, name: 'Crime' },
		{ id: 876, name: 'Animation' },
		{ id: 9875, name: 'Musical' },
		{ id: 8756, name: 'Documentary' }
	];

	const [categories, setCategories] = useState([]);
	const [inputValue, setInputValue] = useState('');

	const filteredSuggestions = suggestions.filter(
		(s) => s.name.toLowerCase().includes(inputValue.toLowerCase()) && ! categories.includes(s)
	);

	const addCategory = (category) => {
		if ( ! categories.includes(category) ) {
			setCategories([...categories, category]);
		}
		// Reset input value.
		setInputValue('');
	};

	const removeCategory = ( categoryToRemove ) => {
		setCategories( categories.filter((category) => category !== categoryToRemove));
	};

	const handleKeyDown = (event) => {
		if (event.key === 'Enter' ) {
			event.preventDefault();

			addCategory({id: 0, name: inputValue.trim()});
		}
	};

	console.log(categories);

	return (
		<div className="nfd-quick-add-product__categories-field">
			<div className="nfd-flex nfd-items-center nfd-mb-2">
				<Label htmlFor={id} label={label} />
			</div>

			<div className="nfd-tag-input nfd-tag-field__input">
				{categories.map((category) => (
					<span key={category.name} className="nfd-badge nfd-badge--plain nfd-tag-input__tag">
						<span className="nfd-mb-px">{category.name}</span>
						<button className="nfd-tag-input__remove-tag" onClick={() => removeCategory(category)}>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="nfd-h-3 nfd-w-3">
								<path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
							</svg>
						</button>
					</span>
				))}
				<input type="text" className="nfd-tag-input__input" id="tag-field-label" value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyDown={handleKeyDown}/>
			</div>

			{inputValue && filteredSuggestions.length > 0 && (
				<ul className="nfd-tag-input-suggestions">
					{filteredSuggestions.map((sugg) => (
						<li key={sugg.name} onClick={() => addCategory(sugg)}>
							{sugg.name}
						</li>
					))}
				</ul>
			)}

			{/*<input type="hidden" id={id} name={name} value={JSON.stringify(categories)}/>*/}
		</div>
	);
}