import { merge } from 'webpack-merge';
import common from './webpack.common.js';
import path from 'path';
import ThreeMinifierPlugin from "@yushijinhun/three-minifier-webpack";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
const threeMinifier = new ThreeMinifierPlugin();
const __dirname = path.resolve('');

export default merge(common, {
    plugins: [
        threeMinifier, // Minifies our three.js code
        new CleanWebpackPlugin() // Cleans our 'dist' folder between builds
    ],
    resolve: {
        plugins: [
            threeMinifier.resolver,
        ]
    },
    mode: 'production', // Minify our output
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[fullhash:8].js', // Our output will have a unique hash, which will force our clients to download updates if they become available later
        sourceMapFilename: '[name].[fullhash:8].map',
        chunkFilename: '[id].[fullhash:8].js'
    },
    optimization: {
        splitChunks: {
            chunks: 'all', // Split our code into smaller chunks to assist caching for our clients
        },
    },
})