import * as React from "react";
import "./App.css";
import { useState } from "react"


import logo from "./logo.svg";

interface vscode {
  postMessage(message: any): void;
}

declare const acquireVsCodeApi: Function;
// Fetch the api object
const vscodeApi = acquireVsCodeApi();



const App = () => {
  const [query, setQuery] = useState('');
  const [hits, setHits] = useState([]);
  console.log("hits", hits);


	// public render() {
  //   // console.log("query", query);


    const onInput = (e: any) => {
      const element = e.currentTarget as HTMLInputElement
      const value = element.value
      setQuery(value)
      vscodeApi.postMessage(value)
    }

    window.addEventListener('message', (message) => {
      console.log(message)
      setHits(message.data[0].hits)
    });


		return (
			<div className="App">
				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<h1 className="App-title">Welcome to React</h1>
				</header>
				<p className="App-intro">
					To get started, edit <code>src/App.tsx</code> and save to reload.
				</p>

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

        {hits && hits.map((hit: any) => (
          <div>{hit.hierarchy.lvl1}</div>
        ))}

				
			</div>
		);
}

export default App;
