import * as path from "path";
import * as vscode from "vscode";
import fetch from "node-fetch";
import { Uri } from "vscode";
import appConfig from "../src/apps/tailwind";

export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(
		vscode.commands.registerCommand("tailwind-documentation.search", () => {
			ReactPanel.createOrShow(context.extensionUri, context.extensionPath);
		})
	);
}

/**
 * Manages react webview panels
 */
class ReactPanel {
	/**
	 * Track the currently panel. Only allow a single panel to exist at a time.
	 */
	public static currentPanel: ReactPanel | undefined;

	private static readonly viewType = "react";

	private readonly _panel: vscode.WebviewPanel;
	private readonly _extensionUri: Uri;
	private readonly _extensionPath: string;
	private _disposables: vscode.Disposable[] = [];

	public static createOrShow(extensionUri: Uri, extensionPath: string) {
		const column = vscode.window.activeTextEditor ? vscode.window.activeTextEditor.viewColumn : undefined;

		// If we already have a panel, show it.
		// Otherwise, create a new panel.
		if (ReactPanel.currentPanel) {
			ReactPanel.currentPanel._panel.reveal(column);
		} else {
			ReactPanel.currentPanel = new ReactPanel(extensionUri, extensionPath,  vscode.ViewColumn.Two);
		}
	}

	private constructor(extensionUri: Uri, extensionPath: string, column: vscode.ViewColumn) {
		this._extensionUri = extensionUri;
		this._extensionPath = extensionPath;

		// Create and show a new webview panel
		this._panel = vscode.window.createWebviewPanel(ReactPanel.viewType, `${appConfig.displayName} documentation`, column, {
			// Enable javascript in the webview
			enableScripts: true,

			// And restric the webview to only loading content from our extension's `media` directory.
			localResourceRoots: [vscode.Uri.joinPath(this._extensionUri, "build")],
		});

		// Set the webview's initial html content
		this._panel.webview.html = this._getHtmlForWebview();

		// Listen for when the panel is disposed
		// This happens when the user closes the panel or when the panel is closed programatically
		this._panel.onDidDispose(() => this.dispose(), null, this._disposables);

		// Handle messages from the webview
		this._panel.webview.onDidReceiveMessage(
			async (message) => {
				switch (message.command) {
					// Call agolia API for the search and send results back to webview
					case "query":
						const body = JSON.stringify({
							requests: [
								{
									indexName: appConfig.indexName,
									query: message.value,
									params: new URLSearchParams({
										"hitsPerPage":"20",
										"highlightPreTag":"<mark>",
										"highlightPostTag":"</mark>",
										"snippetEllipsisText":"…",
										"distinct":"1",
										...appConfig.extraBodyParams
									  }).toString()
								},
							],
						});
						const response = await fetch(
							"https://knpxzi5b0m-dsn.algolia.net/1/indexes/*/queries?x-algolia-agent=Algolia%20for%20JavaScript%20(4.9.2)%3B%20Browser%20(lite)%3B%20docsearch%20(1.0.0-alpha.27)%3B%20docsearch-react%20(1.0.0-alpha.27)%3B%20autocomplete-core%20(1.0.0-alpha.28)&x-algolia-api-key=5fc87cef58bb80203d2207578309fab6&x-algolia-application-id=KNPXZI5B0M",
							{
								headers: {},
								body: body,
								method: "POST",
							}
						);
						const data: any = await response.json();

						this._panel.webview.postMessage(data.results);

					case "alert":
						vscode.window.showErrorMessage(message.text);
						return;
				}
			},
			null,
			this._disposables
		);
	}

	public doRefactor() {
		// Send a message to the webview webview.
		// You can send any JSON serializable data.
		this._panel.webview.postMessage({ command: "refactor" });
	}

	public dispose() {
		ReactPanel.currentPanel = undefined;

		// Clean up our resources
		this._panel.dispose();

		while (this._disposables.length) {
			const x = this._disposables.pop();
			if (x) {
				x.dispose();
			}
		}
	}

	private _getHtmlForWebview() {
		const manifest = require(path.join(this._extensionPath, "build", "asset-manifest.json"));
		const mainScript = manifest.files["main.js"];
		const mainStyle = manifest.files["main.css"];
		const scriptPathOnDisk = vscode.Uri.joinPath(this._extensionUri, "build", mainScript);
		const scriptUri = scriptPathOnDisk.with({ scheme: "https" });
		const stylePathOnDisk = vscode.Uri.joinPath(this._extensionUri, "build", mainStyle);
		const styleUri = this._panel.webview.asWebviewUri(stylePathOnDisk);

		// Use a nonce to whitelist which scripts can be run
		const nonce = getNonce();

		return `<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="utf-8">
				<meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no">
				<meta name="theme-color" content="#000000">
				<title>${appConfig.displayName} Documentation</title>
				<link rel="stylesheet" type="text/css" href="${styleUri}">
				<base href="${this._panel.webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, "build"))}/">
				<meta http-equiv="Content-Security-Policy" content="default-src * self blob: data: gap:; style-src * self 'unsafe-inline' blob: data: gap:; script-src * 'self' 'unsafe-eval' 'unsafe-inline' blob: data: gap:; object-src * 'self' blob: data: gap:; img-src * self 'unsafe-inline' blob: data: gap:; connect-src self * 'unsafe-inline' blob: data: gap:; frame-src * self blob: data: gap:;">

			</head>

			<body>
				<noscript>You need to enable JavaScript to run this app.</noscript>
				<div id="root"></div>
				
				<script nonce="${nonce}" src="${scriptUri}"></script>
			</body>
			</html>`;
	}
}

function getNonce() {
	let text = "";
	const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	for (let i = 0; i < 32; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return text;
}
