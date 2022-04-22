import React, { useState, useEffect } from "react";

const Home = () => {
	const [input, setInput] = useState({ label: "", done: false });
	const [list, setList] = useState([]);
	const [hoverOn, setHoverOn] = useState(false);
	const [firstRender, setFirstRender] = useState(false);

	useEffect(() => {
		getList();
	}, []);

	useEffect(() => {
		if (firstRender) {
			updateList();
		}
	}, [list]);

	const getList = async () => {
		const response = await fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/aemem"
		);
		const data = await response.json();
		setList(data);
		setFirstRender(true);
	};

	const updateList = async () => {
		await fetch("https://assets.breatheco.de/apis/fake/todos/user/aemem", {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(list),
		});
	};

	const ValidateInput = (e) => {
		const labels = list.map((e) => e.label);
		if (
			e.key == "Enter" &&
			e.target.value.trim() != "" &&
			!labels.includes(e.target.value)
		) {
			setList([...list, input]);
			e.target.value = "";
		}
	};

	return (
		<div className="container ">
			<div className="mx-auto mb-3 w-25">
				<label htmlFor="exampleInputEmail1">
					<h2>To Do</h2>
				</label>
				<div className="d-flex">
					<input
						onChange={(e) => {
							setInput({ ...input, label: e.target.value });
						}}
						onKeyDown={(e) => {
							ValidateInput(e);
						}}
					/>
				</div>
			</div>

			{list.map((e, i) => {
				return (
					<div key={i} className="row task mx-auto w-25 border">
						<div className="col-10">{e.label}</div>
						<div
							className="col-2"
							onMouseEnter={() => setHoverOn(i)}
							onMouseLeave={() => setHoverOn(null)}>
							{hoverOn == i && (
								<button
									className="bg-transparent border-0"
									type="button"
									onClick={() => {
										setList(
											list.filter(
												(t, index) => index != i
											)
										);
									}}>
									X
								</button>
							)}
						</div>
					</div>
				);
			})}
			<div className="mx-auto mb-3 w-25 border bg-light counter">
				{list.length >= 0
					? list.length + " items"
					: "No tasks, add a task"}
			</div>
		</div>
	);
};

export default Home;
