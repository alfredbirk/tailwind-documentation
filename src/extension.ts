// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	let openWebview = vscode.commands.registerCommand('tailwind-documentation.search', () => {
		const panel = vscode.window.createWebviewPanel(
		'openWebview', // Identifies the type of the webview. Used internally
		'Example Page', // Title of the panel displayed to the user
		vscode.ViewColumn.One, // Editor column to show the new webview panel in.
		{ // Enable scripts in the webview
			enableScripts: true //Set this to true if you want to enable Javascript. 
		}
		);
		panel.webview.html = getWebviewContent();
	  });
	  context.subscriptions.push(openWebview);
	
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "tailwind-documentation" is now active!');
}

// this method is called when your extension is deactivated
export function deactivate() {}


function getWebviewContent() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Example Webview</title>
</head>
<body>
   <h1>This works!</h1>
	//Add some custom HTML here
</body>
</html>`;
}