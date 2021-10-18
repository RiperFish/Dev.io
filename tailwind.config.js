const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
    /* important: true, */
    purge: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.js',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Nunito', ...defaultTheme.fontFamily.sans],
            },
            gridTemplateColumns: {
                // Simple 16 column grid
                'home': '15% 65% 25%',
                
            },
            colors: {
                wrapper:'#f1f1f1b3',
                customBg: '#f5f6fa',
                customBlue: '#487eb0'
            },
            spacing: {
                editor: '500px',
            },
            boxShadow: {
                //custom: 'rgba(0, 0, 0, 0.09) 0px 3px 12px'
                //custom: 'rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px'
                //custom: 'rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px'
                custom: 'rgb(180 180 180 / 0%) 0px 6px 24px 0px, rgb(83 83 83 / 4%) 0px 0px 0px 1px'
            }

        },
    },

    variants: {
        extend: {
            opacity: ['disabled'],
            margin: ['first'],
        },
    },

    plugins: [require('@tailwindcss/forms')],
};
