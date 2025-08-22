interface PrimaryButtonProps {
    children: React.ReactNode
    onClick: () => void
    size?: "big" | "normal"
    className?: string
}

export const SecondaryButton = ({ children, onClick, size = "normal", className = "" }: PrimaryButtonProps) => {
    const sizeClasses = size === "big" ? "px-8 py-4 text-lg" : "px-4 py-2"
    return (
        <button
            onClick={onClick}
            className={`${sizeClasses} bg-blue-500 text-white rounded-md hover:bg-blue-600 ${className}`}
        >
            {children}
        </button>
    )
}