export function ContentWrapper({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div
            className="
    flex flex-1 flex-col
    rounded-xl
    bg-white
    border border-gray-200
    shadow-sm
    min-h-full
    overflow-auto
    p-6
  "
        >
            {children}
        </div>

    );
}
