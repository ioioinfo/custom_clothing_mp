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
        clothing_chongzhi: './app/clothing_chongzhi.jsx',
        record: './app/record.jsx',
        signup: './app/signup.jsx',
        coupon: './app/coupon.jsx',
        reset_password: './app/reset_password.jsx',
        my_profile: './app/my_profile.jsx',
        order_list: './app/order_list.jsx',
        contact: './app/contact.jsx',
        company: './app/company.jsx',
        mendian_list: './app/mendian_list.jsx',
        order_detail: './app/order_detail.jsx',
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
