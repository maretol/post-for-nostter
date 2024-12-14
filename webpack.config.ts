import { Configuration, RuleSetRule, ModuleOptions, ResolveOptions, EntryObject } from 'webpack'
import path from 'path'
import CopyPlugin from 'copy-webpack-plugin'

const entry: EntryObject = {
    main: path.join(__dirname, 'src', 'main.ts'),
    background: path.join(__dirname, "src", "background.ts")
}

const rule: RuleSetRule[] = [
    {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: '/node_modules/'
    }
]

const module: ModuleOptions = {
    rules: rule
}

const resolve: ResolveOptions = {
    extensions:  ['.ts', '.js']
}

const plugins: CopyPlugin[] = [
    new CopyPlugin({
        patterns: [
            {from: "public", to: "."}
        ]
    })
]

const config: Configuration = {
    entry: entry,
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js'
    },
    mode: "production",
    module: module,
    resolve: resolve,
    plugins: plugins
}

export default config;
