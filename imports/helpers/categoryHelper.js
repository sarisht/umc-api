const map = {
    'auto': 'directions_car',
    'health': 'healing',
    'home': 'home',
    'other': 'help',
}

export function categoryToIcon(category) {
    if (!category)
        category = 'other';
    return map[category];
}