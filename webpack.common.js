import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';

export default {
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/html/index.html'
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: 'src/static',
                    to: 'static',
                    noErrorOnMissing: true
                }
            ]
        })
    ],
    entry: './src/game.js',
    module: {
        rules: [
            {
                // Load our GLSL shaders in as text
                test: /.(glsl|vs|fs|vert|frag)$/, exclude: /node_modules/, use: ['raw-loader']
            },
        ],
    },
    resolve: {
        extensions: ['.js'],
    },
}