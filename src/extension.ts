import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand('import-from-figma-vscode.run-import', () => {
		vscode.window.showInformationMessage('Starting import');

		// Read .vscode/import-from-figma/config.json

		// Notify if config is absent or corrupted

		// Run script from https://github.com/ikabirov/import-from-figma

		// Notify about failure/success
	});

	context.subscriptions.push(disposable);
}

export function deactivate() { }
