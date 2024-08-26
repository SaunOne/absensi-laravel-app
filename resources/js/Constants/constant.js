export const menu = (role) => {
    if (role === 'admin') {
        return [
            {
                name: 'Dashboard',
                href: route('dashboard'),
                current: route().current('dashboard'),
            },
            {
                name: 'Users',
                href: route('users'),
                current: route().current('users'),
            },
            {
                name: 'Absensi',
                href: route('dashboard'),
                current: route().current('absensi'),
            }
        ]
    } else {
        return [
            {
                name: 'Dashboard',
                href: route('dashboard'),
                current: route().current('dashboard'),
            },
        ]
    }
}
