const withMT = require('@material-tailwind/react/utils/withMT');

module.exports = withMT({
    content: ["./src/**/*.{js,jsx}"],
    theme: {
        screens: {
            'sm': '640px',
            'md': '768px',
            'lg': '1024px',
            'xl': '1280px',
            '2xl': '1536px',
        },
        extend: {},
    },
    plugins: [],
});
