import * as React from "react";
import "./App.css";
import { useState } from "react";

import logo from "./tailwind-logo.svg";
import { listenerCount } from "process";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookOpen, faHashtag, faChevronRight } from "@fortawesome/free-solid-svg-icons";

interface vscode {
	postMessage(message: any): void;
}

declare const acquireVsCodeApi: Function;
// Fetch the api object
const vscodeApi = acquireVsCodeApi();

const getNextLvl = (lvl: string) => {
	switch (lvl) {
		case "lvl3":
			return "lvl4";
		case "lvl2":
			return "lvl3";
		case "lvl1":
			return "lvl2";
		case "lvl0":
			return "lvl1";
		case "lvl4":
			return undefined;
		default:
			break;
	}
};

const App = () => {
	const [query, setQuery] = useState("");
	const [hits, setHits] = useState<any>([]);
	const [iframeUrl, setIframeUrl] = useState("");
	console.log("hits", hits);

	// public render() {
	//   // console.log("query", query);

	const onInput = (e: any) => {
		const element = e.currentTarget as HTMLInputElement;
		const value = element.value;

		setQuery(value);
		console.log("SENDING value", value);
		vscodeApi.postMessage({ command: "query", value: value });
		// console.log("e3");
	};

	window.addEventListener("message", (message) => {
		console.log("RECEIVED");
		console.log(message);
		setHits(message.data[0].hits);
		console.log("RECEIVED 2");
	});

	let graph: any = {};
	let lvl0Nodes: any = [];

	if (iframeUrl) {
		return <iframe width="100%" height="650px" src={iframeUrl} title="Tailwind documentation"></iframe>;
	}

	console.log("BEFORE FOR LOOP");
	if (hits) {
		for (const hit of hits) {
			let currentLvl: any = "lvl0";
			let currentNode: any;

			if (hit.hierarchy["lvl0"] in graph) {
				currentNode = graph[hit.hierarchy["lvl0"]];
			} else {
				let newNode = {
					name: hit.hierarchy["lvl0"],
					children: [],
					lvl: "lvl0",
					url: hit.url,
					highlightResult: hit._highlightResult.hierarchy.lvl0.value,
				};

				graph[newNode.name] = newNode;
				currentNode = newNode;
				lvl0Nodes.push(currentNode);
			}

			let previousLvl = "lvl0";

			for (let index = 0; index < 1000; index++) {
				{
					const currentLvl: any = getNextLvl(previousLvl);
					if (!currentLvl || !hit.hierarchy[currentLvl]) break;
					// console.log("currentNode", currentNode);
					// console.log("currentLvl", currentLvl);

					const childrenNames = currentNode.children.map((child: any) => child.name);
					// console.log("");
					// console.log("childrenNames", childrenNames);
					// console.log("hit.hierarchy[currentLvl]", hit.hierarchy[currentLvl]);
					// console.log("");

					if (childrenNames.includes(hit.hierarchy[currentLvl])) {
						currentNode = graph[hit.hierarchy[currentLvl]];
					} else {
						let newNode = {
							name: hit.hierarchy[currentLvl],
							children: [],
							lvl: currentLvl,
							url: hit.url,
							highlightResult: hit._highlightResult.hierarchy[currentLvl].value,
						};

						graph[newNode.name] = newNode;
						currentNode.children.push(newNode);
						currentNode = newNode;
					}

					previousLvl = currentLvl;

					// currentNode = newNode;
				}
			}
		}
	}

	let listElements: any = [];

	for (const lvl0Node of lvl0Nodes) {
		listElements.push(lvl0Node);
	}

	let elementsToRender = [];

	for (const lvl0Node of listElements) {
		let stack = [lvl0Node];
		while (stack.length > 0) {
			const currentNode = stack.pop();
			// console.log("cur
			const isHighestLvl = currentNode.children.length === 0;

			switch (currentNode.lvl) {
				case "lvl0":
					elementsToRender.push(<h2>{currentNode.name}</h2>);
					break;
				case "lvl1":
					if (isHighestLvl) {
						elementsToRender.push(
							<div onClick={() => setIframeUrl(currentNode.url)} className="item-container">
								<div>
									<span className="icon-container">
										<FontAwesomeIcon icon={faHashtag} />
									</span>
									<span>{currentNode.name}</span>
								</div>
								<FontAwesomeIcon icon={faChevronRight} />
							</div>
						);
					} else {
						elementsToRender.push(
							<div onClick={() => setIframeUrl(currentNode.url)} className="item-container">
								<div>
									<span className="icon-container">
										<FontAwesomeIcon icon={faBookOpen} />
									</span>
									<span>{currentNode.name}</span>
								</div>
								<FontAwesomeIcon icon={faChevronRight} />
							</div>
						);
					}
					break;
				case "lvl2":
					if (isHighestLvl) {
						elementsToRender.push(
							<div onClick={() => setIframeUrl(currentNode.url)} className="item-container lvl2">
								<div>
									<span className="icon-container">
										<FontAwesomeIcon icon={faHashtag} />
									</span>
									<span>{currentNode.name}</span>
								</div>
								<FontAwesomeIcon icon={faChevronRight} />
							</div>
						);
					}
					break;
				case "lvl3":
					if (isHighestLvl) {
						elementsToRender.push(
							// <div className="vertical-line"></div>
							<div onClick={() => setIframeUrl(currentNode.url)} className="item-container lvl3">
								<div className="vert">
									<span className="icon-container">
										<FontAwesomeIcon icon={faHashtag} />
									</span>
									<span>{currentNode.name}</span>
								</div>
								<FontAwesomeIcon icon={faChevronRight} />
							</div>
						);
					}
					break;

				default:
					break;
			}

			for (const child of currentNode.children.reverse()) {
				stack.push(child);
			}
		}
	}

	console.log("elementsToRender", elementsToRender);

	return (
		<div className="App">
			{/* <header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<h1 className="App-title">Welcome to React</h1>
			</header> */}

			<div className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
			</div>

			<div className="modal">
				<div className="search-container">
					<label className="DocSearch-MagnifierLabel" htmlFor="docsearch-input" id="docsearch-label">
						<svg width="20" height="20" className="DocSearch-Search-Icon" viewBox="0 0 20 20">
							<path
								d="M14.386 14.386l4.0877 4.0877-4.0877-4.0877c-2.9418 2.9419-7.7115 2.9419-10.6533 0-2.9419-2.9418-2.9419-7.7115 0-10.6533 2.9418-2.9419 7.7115-2.9419 10.6533 0 2.9419 2.9418 2.9419 7.7115 0 10.6533z"
								stroke="currentColor"
								fill="none"
								fill-rule="evenodd"
								stroke-linecap="round"
								stroke-linejoin="round"
							></path>
						</svg>
					</label>
					<input
						onInput={onInput}
						className="DocSearch-Input"
						aria-autocomplete="list"
						aria-labelledby="docsearch-label"
						id="docsearch-input"
						autoFocus
						autoComplete="off"
						autoCorrect="off"
						autoCapitalize="off"
						// spellCheck="false"
						placeholder="Search documentation"
						type="search"
						value={query}
					/>
				</div>
			</div>

			{/* {hits && hits.map((hit: any) => (
          <div>{hit.hierarchy.lvl1}</div>
        ))} */}

			{elementsToRender && elementsToRender.map((element: any) => element)}
		</div>
	);
};

export default App;
