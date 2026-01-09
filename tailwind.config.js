/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                // Neo-Brutalism vibrant color palette
                neo: {
                    cyan: '#A6FAFF',
                    pink: '#FFA6F6',
                    yellow: '#FACC15',
                    green: '#4ADE80',
                    blue: '#60A5FA',
                    purple: '#C4B5FD',
                    orange: '#FDBA74',
                    red: '#FCA5A5',
                    white: '#FAFAFA',
                    cream: '#FEF3C7',
                },
                // Keep Bharat colors for branding
                bharat: {
                    saffron: '#FF9933',
                    white: '#FFFFFF',
                    green: '#138808',
                    navy: '#000080',
                },
                // Simplified color palette
                primary: {
                    500: '#A6FAFF',
                    600: '#67E8F9',
                },
                dark: {
                    900: '#1a1a1a',
                    950: '#0a0a0a',
                },
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                display: ['"Big Shoulders Display"', 'Outfit', 'system-ui', 'sans-serif'],
            },
            boxShadow: {
                'neo-sm': '2px 2px 0 0 #000000',
                'neo-md': '4px 4px 0 0 #000000',
                'neo-lg': '6px 6px 0 0 #000000',
                'neo-xl': '8px 8px 0 0 #000000',
                'neo-sm-r': '-2px 2px 0 0 #000000',
                'neo-md-r': '-4px 4px 0 0 #000000',
            },
            borderWidth: {
                '3': '3px',
            },
            animation: {
                'fade-in': 'fadeIn 0.3s ease-out',
                'slide-up': 'slideUp 0.3s ease-out',
                'neo-bounce': 'neoBounce 0.2s ease-out',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(10px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                neoBounce: {
                    '0%': { transform: 'translate(0, 0)' },
                    '50%': { transform: 'translate(-2px, -2px)' },
                    '100%': { transform: 'translate(0, 0)' },
                },
            },
        },
    },
    plugins: [],
}

