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
                'fade-in': 'fadeInUp 0.6s ease-out',
                'fade-in-down': 'fadeInDown 0.6s ease-out',
                'pulse-glow': 'pulse-glow 2s infinite',
            },
            keyframes: {
                fadeInUp: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                fadeInDown: {
                    '0%': { opacity: '0', transform: 'translateY(-20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                'pulse-glow': {
                    '0%': { boxShadow: '0 0 0 0 rgba(79, 70, 229, 0.4)' },
                    '70%': { boxShadow: '0 0 0 10px rgba(79, 70, 229, 0)' },
                    '100%': { boxShadow: '0 0 0 0 rgba(79, 70, 229, 0)' },
                }
            }
        },
    },
    plugins: [],
}
