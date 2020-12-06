import React, { Component } from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

import AppHeader from '../app-header';
import NewTaskForm from '../new-task-form';
import TaskList from '../task-list';
import Footer from '../footer';

import './app.css';

export default class App extends Component {
	state = {
		todoData: [
			{ label: 'Complited tusk', state: 'active', id: 1, checked: false },
			{ label: 'Editing tusk', state: 'active', id: 2, checked: false },
			{ label: 'Active tusk', state: 'active', id: 3, checked: false },
		],

		timer: [
			{ min: 5, sec: 54, id: 1, stop: false, timerLeft: null },
			{ min: 5, sec: 55, id: 2, stop: false, timerLeft: null },
			{ min: 5, sec: 55, id: 3, stop: false, timerLeft: null },
		],

		timeAgoCreated: [
			{id: 1, timeAgo: formatDistanceToNow(new Date(), { addSuffix: true }), time: Date.now()},
			{id: 2, timeAgo: formatDistanceToNow(new Date(), { addSuffix: true }), time: Date.now()},
			{id: 3, timeAgo: formatDistanceToNow(new Date(), { addSuffix: true }), time: Date.now()},
		],

		show: 'all',
		id: 3,
		editValue: '',
	};

	componentDidMount() {
		this.interval = setInterval(this.timeAgoUpdate, 5000);
	}

	componentWillUnmount() {
		clearInterval(this.interval);
	}

	labelValue = (event) => {
		this.setState(() => {
			return {
				editValue: event.target.value,
			}
		})
	}

	onSubmitEdit = (event) => {
		event.preventDefault();
		const {editValue} = this.state;
		if(editValue.trim()) {
			this.editLabel(editValue, event.target.id);
			this.setState(() => {
				return {
					editValue: '',
				}
			})
		}
	};

	timeAgoUpdate = () => {
		this.setState(({timeAgoCreated}) => {
			const newData = timeAgoCreated.map(elem => {
				return {
					id: elem.id,
					timeAgo: formatDistanceToNow(elem.time, { addSuffix: true }),
					time: elem.time,
				}
			})

			return {
				timeAgoCreated: newData,
			}
		})
	}

	startTimer = (id) => {
		const {timer} = this.state;
		const timerElem = timer.find(elem => elem.id === id);
		clearInterval(timerElem.timerLeft);
		const timerFunc = setInterval(() => {
			this.setState(({timer}) => { //eslint-disable-line
				const newData = timer.map(elem => {
					if (elem.id === id) {
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
							this.changeOfState(id);
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

				return {
					timer: newData,
				}
			})
		}, 1000)
	};

	timerPause = (id) => {
		this.setState(({timer}) => {
			const newData = timer.map(elem => {
				if (elem.id === id) {
					return {
						min: elem.min,
						sec: elem.sec,
						id: elem.id,
						stop: true,
					} 
				} return elem;
			})
			return {
				timer: newData,
			}
		})
	}

	

	clearCompleted = () => {
		this.setState(({ todoData }) => {
			const newTodoData = todoData.filter((elem) => elem.state === 'active');

			return {
				todoData: newTodoData,
			};
		});
	};

	filterBy = (data, value) => {
		if (value === 'all') return data;
		const newArr = data.filter((elem) => elem.state === value);

		return newArr;
	};

	filterAll = (value) => {
		console.log(value);
		this.setState(() => {
			return {
				show: value,
			};
		});
	};

	addTusk = (label, min, sec) => {
		this.setState(({ todoData, timer, id, timeAgoCreated }) => {
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

			return {
				todoData: [...todoData, newTusk],
				timer: [...timer, newTimer],
				timeAgoCreated: [...timeAgoCreated, newTimeAgo],
				id: id + 1,
			};
		});
	};

	changeOfState = (id) => {
		this.setState(({ todoData }) => {

			const newData = todoData.map(elem => {
				if(elem.id === id) {
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

			return {
				todoData: newData,
			};
		});
	};

	onDeleted = (id) => {
		this.setState(({ todoData, timer, timeAgoCreated }) => {
			const newData = todoData.filter(elem => elem.id !== id);
			const newTimerData = timer.filter(elem => elem.id !== id);
			const newTimeAgoData = timeAgoCreated.filter(elem => elem.id !== id);

			return {
				todoData: newData,
				timer: newTimerData,
				timeAgoCreated: newTimeAgoData,
			};
		});
	};

	editLabel = (value, id) => {
		console.log(value);
		this.setState(({ todoData }) => {
			const newData = todoData.map(elem => {
				if (elem.id === Number(id)) {
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
			console.log(newData);
			return {
				todoData: newData,
			};
		});
	};

	onEdit = (id) => {
		this.setState(({ todoData }) => {
			let value;
			const newData = todoData.map(elem => {
				if (elem.id === id) {
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

			return {
				todoData: newData,
				editValue: value,
			};
		});
	};

	render() {
		const { show, todoData, timer, timeAgoCreated } = this.state;
		return (
			<section className="todoapp">
				<header className="header">
					<AppHeader />
					<NewTaskForm addTusk={this.addTusk} />
				</header>
				<section className="main">
					<TaskList
						todos={this.filterBy(todoData, show)}
						timer={timer} 
						changeOfState={this.changeOfState}
						onDeleted={this.onDeleted}
						editLabel={this.editLabel}
						onEdit={this.onEdit}
						nowTimer={this.startTimer}
						timerPause={this.timerPause}
						timeAgoCreated={timeAgoCreated}
						labelValue={this.labelValue}
						onSubmitEdit={this.onSubmitEdit}
					/>
				</section>
				<Footer
					todos={todoData}
					filterAll={this.filterAll}
					clearCompleted={this.clearCompleted}
					show={show}
				/>
			</section>
		);
	}
}
