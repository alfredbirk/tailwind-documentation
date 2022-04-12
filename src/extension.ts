// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import fetch from "node-fetch";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export async function activate(context: vscode.ExtensionContext) {
	let openWebview = vscode.commands.registerCommand("tailwind-documentation.search", async () => {
		const response = await fetch(
			"https://knpxzi5b0m-dsn.algolia.net/1/indexes/*/queries?x-algolia-agent=Algolia%20for%20JavaScript%20(4.9.2)%3B%20Browser%20(lite)%3B%20docsearch%20(1.0.0-alpha.27)%3B%20docsearch-react%20(1.0.0-alpha.27)%3B%20autocomplete-core%20(1.0.0-alpha.28)&x-algolia-api-key=5fc87cef58bb80203d2207578309fab6&x-algolia-application-id=KNPXZI5B0M",
			{
				headers: {},
				body: '{"requests":[{"indexName":"tailwindcss","query":"flex","params":"hitsPerPage=20&highlightPreTag=%3Cmark%3E&highlightPostTag=%3C%2Fmark%3E&attributesToRetrieve=%5B%22hierarchy.lvl0%22%2C%22hierarchy.lvl1%22%2C%22hierarchy.lvl2%22%2C%22hierarchy.lvl3%22%2C%22hierarchy.lvl4%22%2C%22hierarchy.lvl5%22%2C%22hierarchy.lvl6%22%2C%22content%22%2C%22type%22%2C%22url%22%5D&attributesToSnippet=%5B%22hierarchy.lvl1%3A10%22%2C%22hierarchy.lvl2%3A10%22%2C%22hierarchy.lvl3%3A10%22%2C%22hierarchy.lvl4%3A10%22%2C%22hierarchy.lvl5%3A10%22%2C%22hierarchy.lvl6%3A10%22%2C%22content%3A10%22%5D&snippetEllipsisText=%E2%80%A6&facetFilters=version%3Av3&distinct=1"}]}',
				method: "POST",
			}
		);
		const data: any = await response.json();
		console.log("data", data);

		//   console.log("data", data);
		console.log("Done");

		const panel = vscode.window.createWebviewPanel(
			"openWebview", // Identifies the type of the webview. Used internally
			"Example Page", // Title of the panel displayed to the user
			vscode.ViewColumn.One, // Editor column to show the new webview panel in.
			{
				// Enable scripts in the webview
				enableScripts: true, //Set this to true if you want to enable Javascript.
			}
		);
		panel.webview.html = getWebviewContent(data.results);

		panel.webview.onDidReceiveMessage(
			message => {
			  console.log("message", message);
			  switch (message.command) {
			  case 'test':
				console.log('testing.');
				panel.webview.html = "";
				return;
			  }
			},
			undefined,
			context.subscriptions
		  );
	});
	context.subscriptions.push(openWebview);

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "tailwind-documentation" is now active!');
}

// this method is called when your extension is deactivated
export function deactivate() {}

function getWebviewContent(results: any) {
	console.log("results", results);
	const hits = results[0].hits;
	console.log("hits", hits);
	return `<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Example Webview</title>
</head>
<body>
   <h1 style="margin-bottom: 250px">This works!</h1>
	//Add some custom HTML here
	<button onclick="onClick()">Click</button>
	<script>
	  const vscode = acquireVsCodeApi();
	  function onClick(){
		vscode.postMessage({command: 'test',text: "testing"})
	  }
	</script>
</body>
</html>`;
}
