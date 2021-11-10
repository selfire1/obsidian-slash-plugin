import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting } from 'obsidian';

// Remember to rename these classes and interfaces!

interface SlashPlugin {
	mySetting: string;
}

const DEFAULT_SETTINGS: SlashPlugin = {
	mySetting: 'default'
}

const UL_CHAR = "-";

interface AddPrefix {
	replace?: string[];
	prefix?: string;
}

interface RemovePrefix {
	searches?: string[];
}

interface TogglePrefix extends AddPrefix, RemovePrefix {
	add?: (options: AddPrefix) => void;
	remove?: (options: RemovePrefix) => void;
}

export default class MyPlugin extends Plugin {
	settings: SlashPlugin;

	async onload() {
		await this.loadSettings();

		console.log("Loading...");
		this.registerCommands();
		console.log("Loaded!");
	}

	onunload = (): void => {
		console.log("Cleanly shutdown");
	};

  registerCommands = (): void => {
    this.addCommand({
		id: "slash-todo",
		name: "Toggle checklist",
		callback: this.toggleTodo,
	});

    this.addCommand({
		id: "slash-quote",
		name: "Toggle blockquote",
		callback: this.toggleTodo,
	});

  this.addCommand({
		id: "slash-ul",
		name: "Toggle bulleted List",
		callback: this.toggleUL,
  });

  this.addCommand({
		id: "slash-ol",
		name: "Toggle numbered List",
		callback: this.toggleOL,
  });

  this.addCommand({
		id: "slash-normal",
		name: "Remove formatting",
		callback: this.removeFormatting,
  });

  this.addCommand({
		id: "slash-h1",
		name: "Apply Heading 1 (h1)",
		callback: this.getFormatHeading(1),
  });

  this.addCommand({
		id: "slash-h2",
		name: "Apply Heading 2 (h2))",
		callback: this.getFormatHeading(2),
  });

  this.addCommand({
		id: "slash-h3",
		name: "Apply Heading 3 (h3))",
		callback: this.getFormatHeading(3),
  });

  this.addCommand({
		id: "slash-h4",
		name: "Apply Heading 4 (h4)",
		callback: this.getFormatHeading(4),
  });

  this.addCommand({
		id: "slash-h5",
		name: "Apply Heading 5 (h5)",
		callback: this.getFormatHeading(5),
  });

  this.addCommand({
		id: "slash-h6",
		name: "Apply Heading 6 (h6)",
		callback: this.getFormatHeading(6),
  });

  this.addCommand({
		id: "slash-heading-increase",
		name: "Increase heading level",
		callback: this.getIncrementHeadingLevel("+"),
  });

  this.addCommand({
		id: "slash-head-decrease",
		name: "Decrease heading level",
		callback: this.getIncrementHeadingLevel("-"),
  });

  }

  

	async loadSettings() {
		this.settings = Object.assign(
			{},
			DEFAULT_SETTINGS,
			await this.loadData()
		);
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}


class SampleSettingTab extends PluginSettingTab {
	plugin: MyPlugin;

	constructor(app: App, plugin: MyPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;

		containerEl.empty();

		containerEl.createEl('h2', {text: 'Settings for my awesome plugin.'});

		new Setting(containerEl)
			.setName('Setting #1')
			.setDesc('It\'s a secret')
			.addText(text => text
				.setPlaceholder('Enter your secret')
				.setValue(this.plugin.settings.mySetting)
				.onChange(async (value) => {
					console.log('Secret: ' + value);
					this.plugin.settings.mySetting = value;
					await this.plugin.saveSettings();
				}));
	}
}