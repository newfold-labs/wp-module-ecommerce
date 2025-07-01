import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Label } from "@newfold/ui-component-library";
import { fetchCategories, prepareCategoryObject } from "../../functions";

const CategoriesField = ({id, label, onChange, name=''}) => {

	const [suggestions, setSuggestions] = useState([]);
	const [categories, setCategories] = useState([]);
	const [inputValue, setInputValue] = useState('');

	// Load suggestions categories.
	useEffect(() => {
		( async () => {
			const response = await fetchCategories();
			setSuggestions( response );
		} )()
	}, []);

	useEffect(() => {
		if ( typeof onChange === "function" ) {
			onChange( categories );
		}
	}, [categories]);

	// Filter suggestions based on selected categories.
	const filteredSuggestions = suggestions.filter(
		(s) => s.name.toLowerCase().includes(inputValue.toLowerCase()) && ! categories.includes(s)
	);

	// Add category.
	const addCategory = (category) => {
		if ( ! categories.filter((cat) => cat.id === category.id && cat.name === category.name).length ) {
			setCategories([...categories, category]);
		}
		// Reset input value.
		setInputValue('');
	};

	// Remove category.
	const removeCategory = ( categoryToRemove ) => {
		setCategories( categories.filter((category) => category !== categoryToRemove));
	};

	const handleKeyDown = (event) => {
		if (event.key === 'Enter' ) {
			event.preventDefault();

			addCategory(prepareCategoryObject({name: inputValue.trim()}));
		}
	};

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

			<input type="hidden" id={id} name={name || id} value={JSON.stringify(categories)}/>
		</div>
	);
}

CategoriesField.propTypes = {
	id: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	name: PropTypes.string,
	onChange: PropTypes.func
}

export default CategoriesField;