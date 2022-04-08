import React, { useState, useEffect } from "react";

const Home = () => {
	const [input, setInput] = useState("");
	const [list, setList] = useState([]);
	const [hoverOn, setHoverOn] = useState(false);

	useEffect(()=>{

	})

	const getTasks = async () => {
		const response = await fetch("http://assets.breatheco.de/apis/fake/todos/user/aemem")
		const data = await response.json();
		
	}

	const addTasks = async () => {
		const response = await fetch("http://assets.breatheco.de/apis/fake/todos/user/aemem", {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data)
		})
		const data = await response.json();
		
	}

	return (
		<div className="container ">
			<div className="mx-auto mb-3 w-25">
				<label htmlFor="exampleInputEmail1">
					<h2>To Do</h2>
				</label>
				<div className="d-flex">
					<input
						type="text"
						className="form-control"
						id="inputTask"
						aria-describedby="emailHelp"
						placeholder="enter task"
						value={input}
						onChange={(e) => {
							setInput(e.target.value);
						}}
					/>
					<button
						type="button"
						className="btn btn-light"
						onClick={() => {
							setList([...list, input]);
							setInput("");
						}}>
						Submit
					</button>
				</div>
			</div>

			{list.map((e, i) => {
				return (
					<div key={i} className="row task mx-auto w-25 border">
						<div className="col-10">{e}</div>
						<div
							className="col-2"
							onMouseEnter={() => setHoverOn(i)}
							onMouseLeave={() => setHoverOn(null)}>
							{hoverOn == i && (
								<button
									className="bg-transparent border-0"
									type="button"
									onClick={(i) => {
										list.splice(i, 1);
									}}>
									X
								</button>
							)}
						</div>
					</div>
				);
			})}
			<div className="mx-auto mb-3 w-25 border bg-light counter">
				{list.length > 0
					? list.length + " items"
					: "No tasks, add a task"}
			</div>
		</div>
	);
};

export default Home;
