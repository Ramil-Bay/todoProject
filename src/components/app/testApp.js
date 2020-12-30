import React, { useState, useEffect } from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

import AppHeader from '../app-header';
import NewTaskForm from '../new-task-form';
import TaskList from '../task-list';
import Footer from '../footer';

import './app.css';

const App = () => {

	const [todoData, setTodoData] = useState([
		{ label: 'Complited tusk', state: 'active', id: 1, checked: false },
		{ label: 'Editing tusk', state: 'active', id: 2, checked: false },
		{ label: 'Active tusk', state: 'active', id: 3, checked: false },
	]);

	const [timer, setTimer] = useState([
		{ min: 5, sec: 54, id: 1, stop: false, timerLeft: null },
		{ min: 5, sec: 55, id: 2, stop: false, timerLeft: null },
		{ min: 5, sec: 55, id: 3, stop: false, timerLeft: null },
	]);

	const [timeAgoCreated, setTimeAgoCreated] = useState([
		{id: 1, timeAgo: formatDistanceToNow(new Date(), { addSuffix: true }), time: Date.now()},
		{id: 2, timeAgo: formatDistanceToNow(new Date(), { addSuffix: true }), time: Date.now()},
		{id: 3, timeAgo: formatDistanceToNow(new Date(), { addSuffix: true }), time: Date.now()},
	]);

	const [show, setShow] = useState('all');
	const [id, setId] = useState(3);
	const [editValue, setEditValue] = useState('');

	let interval;

	const labelValue = (event) => {	
		setEditValue(event.target.value);
	}

	const timeAgoUpdate = () => {	
		const newData = timeAgoCreated.map(elem => {
			return {
				id: elem.id,
				timeAgo: formatDistanceToNow(elem.time, { addSuffix: true }),
				time: elem.time,
			}
		})
		setTimeAgoCreated(newData);
	}

	useEffect(() => {
		interval = setInterval(timeAgoUpdate, 5000);
	}, [])


	const changeOfState = (idTask) => {
		const newData = todoData.map(elem => {
			if(elem.id === idTask) {
				if(elem.state === 'completed') {
					return {
						label: elem.label,
						state: 'active',
						id: elem.id,
						checked: false,
					}
				}
					return {
						label: elem.label,
						state: 'completed',
						id: elem.id,
						checked: true,
					}
				
			} return elem;
		})

		setTodoData(newData);
	};

	const updateTimer = (idTimer, timerFunc) => {
		const timerElem = timer.find(elem => elem.id === idTimer);
		clearInterval(timerElem.timerLeft);
		setTimer((s) => {
			const newData = s.map(elem => {
				if (elem.id === idTimer) {
					if (elem.stop) {
						clearInterval(timerFunc);
						return {
							min: elem.min,
							sec: elem.sec,
							id: elem.id,
							stop: false,
							timerLeft: elem.timerLeft,
						}
					}
					if (elem.sec < 1 && elem.min < 1) { 
						clearInterval(timerFunc);
						changeOfState(idTimer);
						return {
							min: elem.min,
							sec: elem.sec,
							id: elem.id,
							stop: false,
							timerLeft: elem.timerLeft,
						}
					} 
					if (elem.sec < 1) {
						return {
							min: elem.min - 1,
							sec: 59,
							id: elem.id,
							stop: false,
							timerLeft: timerFunc,
						}
					}
					return {
						min: elem.min,
						sec: elem.sec - 1,
						id: elem.id,
						stop: false,
						timerLeft: timerFunc,
					}
				} return elem;
			})
			return newData;
		});
	}

	const startTimer = (idTimer) => {
		const timerFunc = setInterval(() => updateTimer(idTimer, timerFunc), 1000);
	};

	const timerPause = (idTimer) => {
		const newData = timer.map(elem => {
			if (elem.id === idTimer) {
				return {
					min: elem.min,
					sec: elem.sec,
					id: elem.id,
					stop: true,
				} 
			} return elem;
		})
		setTimer(newData);
	}

	

	const clearCompleted = () => {
		const newTodoData = todoData.filter((elem) => elem.state === 'active');
		setTodoData(newTodoData);
	};

	const filterBy = (data, value) => {
		if (value === 'all') return data;
		const newArr = data.filter((elem) => elem.state === value);

		return newArr;
	};

	const filterAll = (value) => {
		setShow(value);
	};

	const addTusk = (label, min, sec) => {
		const newTusk = {
			label,
			state: 'active',
			id: id + 1,
			checked: false,
		};

		const newTimer = {
			min,
			sec,
			id: id + 1,
			stop: false,
		}

		const newTimeAgo = {
			id: id + 1,
			timeAgo: formatDistanceToNow(new Date(), { addSuffix: true }),
			time: Date.now(),
		}

		setTodoData((s) => [...s, newTusk]);
		setTimer((s) => [...s, newTimer]);
		setTimeAgoCreated((s) => [...s, newTimeAgo]);
		setId((s) => s + 1);
	};

	const onDeleted = (idTask) => {
		const newData = todoData.filter(elem => elem.id !== idTask);
		const newTimerData = timer.filter(elem => elem.id !== idTask);
		const newTimeAgoData = timeAgoCreated.filter(elem => elem.id !== idTask);

		setTodoData(newData);
		setTimer(newTimerData);
		setTimeAgoCreated(newTimeAgoData);
	};

	const editLabel = (value, idTask) => {
		const newData = todoData.map(elem => {
			if (elem.id === Number(idTask)) {
				if (!elem.checked) {
					return {
						label: value,
						state: 'active',
						id: elem.id, 
						checked: elem.checked,
					}
				}
				return {
					label: value,
					state: 'completed',
					id: elem.id, 
					checked: elem.checked,
				}
			} return elem;
		})

		setTodoData(newData);
	};

	const onSubmitEdit = (event) => {
		event.preventDefault();
		if(editValue.trim()) {
			editLabel(editValue, event.target.id);
			setEditValue('');
		}
	};

	const onEdit = (idTask) => {
		let value;
		const newData = todoData.map(elem => {
			if (elem.id === idTask) {
				value = elem.label;
				return {
					label: elem.label,
					state: 'editing',
					id: elem.id, 
					checked: elem.checked,
				}
			} 
			if (elem.checked) {
				return {
					label: elem.label,
					state: 'completed',
					id: elem.id, 
					checked: elem.checked,
				}
			}
			return {
				label: elem.label,
				state: 'active',
				id: elem.id, 
				checked: elem.checked,
			}
		})

		setTodoData(newData);
		setEditValue(value);

	};


	return (
		<section className="todoapp">
			<header className="header">
				<AppHeader />
				<NewTaskForm addTusk={addTusk} />
			</header>
			<section className="main">
				<TaskList
					todos={filterBy(todoData, show)}
					timer={timer} 
					changeOfState={changeOfState}
					onDeleted={onDeleted}
					editLabel={editLabel}
					onEdit={onEdit}
					nowTimer={startTimer}
					timerPause={timerPause}
					timeAgoCreated={timeAgoCreated}
					labelValue={labelValue}
					onSubmitEdit={onSubmitEdit}
				/>
			</section>
			<Footer
				todos={todoData}
				filterAll={filterAll}
				clearCompleted={clearCompleted}
				show={show}
			/>
		</section>
	);
}

export default App;
