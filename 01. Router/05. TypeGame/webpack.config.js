const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
    mode:'development',
    devtool:"eval",
    resolve:{
        extensions:['.vue' , '.js']
    },
    entry:{
        app:'./main.js'
    },
    module:{
        rules:[
            {
                test:/\.vue$/,
                loader:'vue-loader'
            },
            {
                test:/\.css$/,
                use:[
                    'vue-style-loader',
                    {
                        loader:'css-loader',
                        options:{
                            esModule:false
                        }
                    }
                ]
            },
            {
                test:/\.scss$/,
                use:[
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                  {
                    loader: 'file-loader',
                    options:{
                        esModule:false
                    }
                  },
                ],
            }
        ]
    },
    plugins:[
        new VueLoaderPlugin()
    ],
    output:{
        filename:'app.js',
        path:path.join(__dirname , 'dist')
    },
    devServer:{
        publicPath:'/dist'
    }
}