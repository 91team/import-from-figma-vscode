import * as vscode from 'vscode';
import * as path from "path";
import { importFromFigma, Config } from 'import-from-figma'

type PluginConfig = Omit<Config, 'outputDir'>

export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand('import-from-figma-vscode.run-import', async () => {
		vscode.window.showInformationMessage('Starting import');

		const currentWorkspace = getCurrentWorkspaceFolder()

		if (!currentWorkspace) {
			vscode.window.showErrorMessage('Failed to define current workspace')
			return
		}

		const workspacePath = currentWorkspace.uri.fsPath

		const configPath = path.join(
			workspacePath,
			".vscode",
			"import-from-figma",
			"config.json"
		);

		let config: PluginConfig

		try {
			const rawConfig = await vscode.workspace.openTextDocument(configPath);
			config = JSON.parse(rawConfig.getText());
		} catch (_) {
			vscode.window.showErrorMessage(`Config file not found or corrupted.\nSearching file at ${configPath}`)
			return
		}

		vscode.window.showInformationMessage('Got config. Running import...');

		await vscode.window.withProgress({
			location: vscode.ProgressLocation.Window,
			cancellable: false,
			title: 'Import from figma...'
		}, async (progress) => {
			progress.report({ increment: 0 });

			try {
				await importFromFigma({ ...config, outputDir: workspacePath });
			} catch (e) {
				vscode.window.showErrorMessage(`Import failed with exception\n${e}`)
				console.log(e)
			}

			progress.report({ increment: 100 });
		});

		vscode.window.showInformationMessage('Import from Figma has finished');
	});

	context.subscriptions.push(disposable);
}

export function deactivate() { }

function getCurrentWorkspaceFolder() {
	if (vscode.workspace.workspaceFolders?.length === 1) {
		return vscode.workspace.workspaceFolders[0]
	}

	const currentFileURI = vscode.window.activeTextEditor?.document.uri;

	if (currentFileURI) {
		return vscode.workspace.getWorkspaceFolder(currentFileURI)
	}
}