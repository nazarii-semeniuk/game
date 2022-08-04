import { merge } from 'webpack-merge';
import common from './webpack.common.js';
import path from 'path';

const __dirname = path.resolve('');

export default merge(common, {
    mode: 'development', // Don't minify the source
    devtool: 'eval-source-map', // Source map for easier development
    devServer: {
        static: {
            directory: path.join(__dirname, './dist'), // Serve static files from here
        },
        hot: true, // Reload our page when the code changes
    },
})