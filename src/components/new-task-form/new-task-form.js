import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './new-task-form.css';

export default class NewTaskForm extends Component {
	state = {
		label: '',
		min: '',
		sec: '',
	};

	static propTypes = {
		addTusk: PropTypes.func.isRequired,
	};

	onAddNewTask = (evt) => {
		this.setState(() => {
			return {
				label: evt.target.value,
			};
		});
	};

	onAddMin = (evt) => {
		this.setState(() => {
			return {
				min: evt.target.value,
			};
		});
	};

	onAddSec = (evt) => {
		this.setState(() => {
			return {
				sec: evt.target.value,
			};
		});
	};

	onSubmit = (evt) => {
		const { label, min, sec } = this.state;
		if(label.trim()){
			evt.preventDefault();
			const { addTusk } = this.props;
			addTusk(label, min, sec);
			this.setState(() => {
				return {
					label: '',
					min: '',
					sec: '',
				};
			});
		}
	};

	render() {
		const { label, min, sec } = this.state;
		return (
			<form onSubmit={this.onSubmit} className="new-todo-form" name="onSubmitForm" action="">
				<input
					type="text"
					className="new-todo"
					placeholder="What needs to be done?"
					onChange={this.onAddNewTask}
					value={label}
					onSubmit={this.onSubmit}
					required 
				/>
				<input
					type="number"
					className="new-todo--min new-todo-form__timer"
					placeholder="Min"
					min="0"
					value={min}
					onChange={this.onAddMin}
					onSubmit={this.onSubmit} 
					required 
				/>
				<input
					type="number"
					className="new-todo--sec new-todo-form__timer"
					placeholder="Sec"
					min="0"
					max="60"
					value={sec}
					onChange={this.onAddSec}
					onSubmit={this.onSubmit} 
					required 
				/>
				<input type="submit" className="hidden" />
			</form>
		);
	}
}
