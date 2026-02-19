export const getTagColor = (tag: string) => {
    const colors = [
        'bg-blue-500/20 text-blue-300 border-blue-500/30',
        'bg-green-500/20 text-green-300 border-green-500/30',
        'bg-purple-500/20 text-purple-300 border-purple-500/30',
        'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
        'bg-pink-500/20 text-pink-300 border-pink-500/30',
        'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
        'bg-red-500/20 text-red-300 border-red-500/30',
        'bg-teal-500/20 text-teal-300 border-teal-500/30',
    ];
    let hash = 0;
    for (let i = 0; i < tag.length; i++) {
        hash = tag.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
};
