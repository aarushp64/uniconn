/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'bg-main': 'var(--bg-main)',
                'bg-darker': 'var(--bg-darker)',
                'bg-dark': 'var(--bg-dark)',
                'bg-elevated': 'var(--bg-elevated)',
                'bg-card': 'var(--bg-card)',
                'bg-card-hover': 'var(--bg-card-hover)',
                'primary': 'var(--primary)',
                'primary-dark': 'var(--primary-dark)',
                'secondary': 'var(--secondary)',
                'accent': 'var(--accent)',
                'gold': 'var(--gold)',
                'success': 'var(--success)',
                'warning': 'var(--warning)',
                'danger': 'var(--danger)',
                'text-primary': 'var(--text-primary)',
                'text-secondary': 'var(--text-secondary)',
                'text-muted': 'var(--text-muted)',
                'text-meta': 'var(--text-meta)',
                'border-soft': 'var(--border-soft)',
                'glass-border': 'var(--glass-border)',
                'glass-surface': 'var(--glass-surface)',
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                display: ['Outfit', 'sans-serif'],
            },
            borderRadius: {
                sm: 'var(--radius-sm)',
                md: 'var(--radius-md)',
                lg: 'var(--radius-lg)',
                xl: 'var(--radius-xl)',
            },
            animation: {
                'fade-in': 'fadeIn 0.5s ease-out',
                'pulse-glow': 'pulse-glow 2s infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                'pulse-glow': {
                    '0%': { boxShadow: '0 0 0 0 rgba(2, 132, 199, 0.4)' },
                    '70%': { boxShadow: '0 0 0 10px rgba(2, 132, 199, 0)' },
                    '100%': { boxShadow: '0 0 0 0 rgba(2, 132, 199, 0)' },
                }
            }
        },
    },
    plugins: [],
}
