import { merge } from 'webpack-merge';
import common from './webpack.common.js';
import path from 'path';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';

const __dirname = path.resolve();

export default merge(common, {
    mode: 'production',
    plugins: [
        new CleanWebpackPlugin()
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[fullhash:8].js',
    }
});