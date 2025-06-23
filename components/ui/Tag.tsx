


type TagProps = {
    name: string;
    variant: 'default' | 'active' | 'paused' | 'canceled';
};

const variantClasses: Record<TagProps['variant'], string> = {
    default: 'bg-black text-white',
    active: 'bg-green text-beige',
    paused: 'bg-yellow-500 text-black',
    canceled: 'bg-red-800 text-white',
};

export default function Tag({ name, variant = 'default' }: TagProps) {
    const variantClass = variantClasses[variant];

    return (
        <div className={`inline-flex items-center px-2 py-1 mx-0.5 rounded-lg text-xs font-medium ${variantClass}`}>
            {name.charAt(0).toUpperCase() + name.slice(1)}
        </div>
    );
}
