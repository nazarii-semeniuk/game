import { merge } from 'webpack-merge';
import common from './webpack.common.js';
import path from 'path';

const __dirname = path.resolve();

export default merge(common, {
    mode: 'development',
    devtool: 'eval-source-map',
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        hot: true
    }
});