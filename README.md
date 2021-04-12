# import-from-figma-vscode

Extension allowing you to import colors, typography & icons from Figma project to your React or Flutter project.
Based on [this utility](https://github.com/ikabirov/import-from-figma)

## Requirements

To start use this extension firstly install it (download from `builds/` last actual version and run `code --install-extension import-from-figma-vscode-x.x.x.vsix`). Don't forget to add `code` to PATH (`Cmd+Shift+P` -> `Install 'code' command in PATH`).
Then create config file at `$PROJECT_ROOT/.vscode/import-from-figma/config.json` and add this file to `.gitignore`, because it will contain your private Figma token. Add this to your config:
```
{
    "figmaToken": "YOUR_TOKEN", // Can be obtained at https://www.figma.com/developers/api#authentication
    "projectId": "YOUR_PROJECT_ID", // https://www.figma.com/file/$YOUR_PROJECT_ID/
    "exportType": "react", // Or "flutter"
    "iconsDir": "icons", // Dir for your icons, for example this will result icons to be in `$PROJECT_ROOT/icons`
    "colorsDir": "lib/figma", // Same: dir to contain file with your colors
    "typographyDir": "lib/figma" // Dir to contain file with your fonts
}
```

## Features

Press `Cmd+Shift+P` and type `Figma` to find options provided by this plugin:
- Open project design in Figma
- Run import from Figma

If your project contains correct config, first option will open Figma with design of your project, and second will start import. Keep in mind, that import is a long process, so watch indicator at the bottom of your IDE to be aware of process status
