import React from 'react';
import PropTypes from 'prop-types';

import Task from '../task';

import './task-list.css';

const TaskList = ({ todos, changeOfState, onDeleted, onEdit, timer, nowTimer, timerPause, timeAgoCreated, labelValue, onSubmitEdit}) => {


	const elements = todos.map((elem) => {
		const { state, id, label} = elem;

		const period = timer.find(element => element.id === id);

		const timeAgo = timeAgoCreated.find(element => element.id === id);

		return (
			<li key={id} className={state}>
				<Task
					{...elem}
					changeOfState={() => changeOfState(id)}
					onDeleted={() => onDeleted(id)}
					onEdit={() => onEdit(id)}
					nowTimer={() => nowTimer(id)}
					timerPause={() => timerPause(id)}
					period={period}
					timeAgoCreated={timeAgo}
				/>
				<form onSubmit={onSubmitEdit} id={id}>
					<input
						type="text"
						className="edit"
						defaultValue={label}
						onChange={labelValue}
					/>
				</form>
			</li>
		);
	});
	return <ul className="todo-list">{elements}</ul>;
};

TaskList.defaultProps = {
	todos: [{ label: 'Complited tusk', state: 'active', id: 1, checked: false }],
	timer: [{min: 5, sec: 5, id: 1}],
	timeAgoCreated: [{id: 1, timeAgo: 'created 5 minutes ago', time: Date.now()}]
};

TaskList.propTypes = {
	timerPause: PropTypes.func.isRequired,
	nowTimer: PropTypes.func.isRequired,
	todos: PropTypes.arrayOf(PropTypes.object),
	changeOfState: PropTypes.func.isRequired,
	onDeleted: PropTypes.func.isRequired,
	editLabel: PropTypes.func.isRequired,
	onEdit: PropTypes.func.isRequired,
	timer: PropTypes.arrayOf(PropTypes.object),
	timeAgoCreated: PropTypes.arrayOf(PropTypes.object),
	labelValue: PropTypes.func.isRequired,
	editValue: PropTypes.string.isRequired,
	onSubmitEdit:PropTypes.func.isRequired,
};

export default TaskList;
