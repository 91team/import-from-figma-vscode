declare module 'import-from-figma';

type Config = {
    figmaToken: string
    projectId: string
    exportType: 'react' | 'flutter'
    outputDir: string
    iconsDir?: string
    colorsDir?: string
    typographyDir?: string
}