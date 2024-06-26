import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('extension.interceptQuickOpen', async () => {
        const quickPick = vscode.window.createQuickPick();
        quickPick.placeholder = 'Search files by name (append : to go to line or @ to go to symbol)';
        
        quickPick.onDidChangeValue(async (value) => {
            let modifiedValue = value.startsWith('/') ? value.substring(1) : value;
            vscode.commands.executeCommand('workbench.action.quickOpen', modifiedValue);
        });

        quickPick.onDidHide(() => quickPick.dispose());
        quickPick.show();
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {}
