import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './task.css';


// eslint-disable-next-line react/prefer-stateless-function
export default class Task extends Component {

	static defaultProps = {
		checked: false,
		label: 'drink coffe',
		state: 'active',
		period: {min: 5, sec: 44, id: 1},
		timeAgoCreated: {id: 1, timeAgo: '5 minutes ago', time: Date.now()}
	};

	static propTypes = {
		timeAgoCreated: PropTypes.arrayOf(PropTypes.object),
		timerPause: PropTypes.func.isRequired,
		nowTimer: PropTypes.func.isRequired,
		onEdit: PropTypes.func.isRequired,
		changeOfState: PropTypes.func.isRequired,
		onDeleted: PropTypes.func.isRequired,
		checked: PropTypes.bool,
		label: PropTypes.string,
		state: PropTypes.string,
		period: PropTypes.instanceOf(),
	};

	componentDidMount() {

	}

	render() {
		const {
			changeOfState,
			checked,
			label,
			onDeleted,
			onEdit,
			state,
			period,
			nowTimer,
			timerPause,
			timeAgoCreated,
		} = this.props;

		let time;

		if (state === 'completed') time = 'finished'
		else time = period.sec >= 10 ? `${period.min}:${period.sec}` : `${period.min}:0${period.sec}`;

		return (
			<div className="view">
				<input
					className="toggle"
					type="checkbox"
					onChange={changeOfState}
					checked={checked}
				/>
				<label >
					<span tabIndex={0} role="button" className="description" onClick={changeOfState} onKeyDown={changeOfState}>{label}</span> 
					<div className="timerContainer">
						<button 
						type="button"
						className="icon-play timer-icon"
						aria-label="Play"
						onClick={nowTimer} />
						<button 
						onClick={timerPause}
						type="button" 
						className="icon-pause timer-icon"
						aria-label="Pause" />
						<span className="timerSpan">
						{time}
						</span>
					</div>
					<span className="created">
						created {timeAgoCreated.timeAgo}
					</span>
				</label>
				<button
					type="button"
					className="icon icon-edit"
					aria-label="Edit"
					onClick={onEdit}
				/>
				<button
					type="button"
					className="icon icon-destroy"
					aria-label="Destroy"
					onClick={onDeleted}
				/>
			</div>
		);
	}
}

