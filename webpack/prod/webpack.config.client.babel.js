import webpack from 'webpack';
import paths from '../paths.babel';
import {resolve} from 'path';
import {StatsWriterPlugin} from 'webpack-stats-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';

export default {
    mode: 'production',
    devtool: 'source-map',
    entry: {
        main: paths.CLIENT_ENTRY,
        vendor: ['grape']
    },
    output: {
        filename: '[name].[contenthash:8].js',
        path: paths.CLIENT_BUILD,
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            importLoaders: 1,
                            localIdentName: '[folder]___[local]___[hash:base64:5]'
                        }
                    },
                    'sass-loader'
                ]
            }
        ]
    },
    optimization: {
        splitChunks: {
            chunks: 'initial',
            minSize: 0,
        }
    },
    plugins: [
        new webpack.HashedModuleIdsPlugin(),
        new StatsWriterPlugin(),
        new MiniCssExtractPlugin('main.[hash].css'),
        new UglifyJsPlugin({
            parallel: true,
            sourceMap: true
        })
    ]
}
