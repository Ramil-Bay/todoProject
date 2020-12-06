import React from 'react';
import PropTypes from 'prop-types';

import './task-filter.css';

const TaskFilter = ({ filterAll, show }) => {
	return (
		<ul className="filters">
			<li>
				<button
					type="button"
					className={show === 'all' ? 'selected' : ''}
					onClick={() => filterAll('all')}
				>
					All
				</button>
			</li>
			<li>
				<button
					type="button"
					className={show === 'active' ? 'selected' : ''}
					onClick={() => filterAll('active')}
				>
					Active
				</button>
			</li>
			<li>
				<button
					type="button"
					className={show === 'completed' ? 'selected' : ''}
					onClick={() => filterAll('completed')}
				>
					Completed
				</button>
			</li>
		</ul>
	);
};

TaskFilter.propTypes = {
	filterAll: PropTypes.func.isRequired,
	show: PropTypes.string.isRequired,
};

export default TaskFilter;
