/**
 ┌──────────────────────────────────────────────────────────────┐
 │               ___ ___ ___ ___ ___ _  _ ___ ___               │
 │              |_ _/ _ \_ _/ _ \_ _| \| | __/ _ \              │
 │               | | (_) | | (_) | || .` | _| (_) |             │
 │              |___\___/___\___/___|_|\_|_| \___/              │
 │                                                              │
 │                                                              │
 │                       set up in 2015.2                       │
 │                                                              │
 │   committed to the intelligent transformation of the world   │
 │                                                              │
 └──────────────────────────────────────────────────────────────┘
*/

module.exports = {
    entry: {
        index: './app/index.jsx',
        login: './app/login.jsx',
        person_center: './app/person_center.jsx',
        product_list: './app/product_list.jsx',
        signup: './app/signup.jsx',
        product_sort: './app/product_sort.jsx',
        product_cart: './app/product_cart.jsx',
        order_sure: './app/order_sure.jsx',
        order_detail: './app/order_detail.jsx',
        order_list: './app/order_list.jsx',
        search: './app/search.jsx',
        product_show: './app/product_show.jsx',

        admin_login: './app/admin_login.jsx',
        admin_user_list: './app/admin_user_list.jsx',
        admin_product_list: './app/admin_product_list.jsx',
        admin_product_img: './app/admin_product_img.jsx',
        admin_add_custom: './app/admin_add_custom.jsx',
    },
    output: {
        path: __dirname,
        filename: './public/js/app/[name].js'
    },
    resolve: {
        modules: [__dirname, '../node_modules','components'],
        alias: {

        },
        extensions: ['.js','.jsx']
    },
    module: {
        loaders: [
            {
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015']
                },
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/
            }
        ]
   }
};
