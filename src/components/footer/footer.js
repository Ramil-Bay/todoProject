import React from 'react';
import PropTypes from 'prop-types';

import TaskFilter from '../task-filter';

import './footer.css';

const Footer = ({
	todos,
	filterAll,
	clearCompleted,
	show,
}) => {
	let itemsLeft = 0;

	todos.forEach((elem) => {
		if (elem.state === 'active') itemsLeft++;
	});

	return (
		<footer className="footer">
			<span className="todo-count">{itemsLeft} items left </span>
			<TaskFilter
				filterAll={(value) => filterAll(value)}
				show={show}
			/>
			<button
				type="button"
				className="clear-completed"
				onClick={clearCompleted}
			>
				Clear completed
			</button>
		</footer>
	);
};

Footer.defaultProps = {
	todos: [{ label: 'Complited tusk', state: 'active', id: 1, checked: false }],
};

Footer.propTypes = {
	todos: PropTypes.arrayOf(PropTypes.object),
	filterAll: PropTypes.func.isRequired,
	clearCompleted: PropTypes.func.isRequired,
	show: PropTypes.string.isRequired,
};

export default Footer;
