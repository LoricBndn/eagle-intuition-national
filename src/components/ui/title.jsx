export default function Title({ title, className}) {
    return (
        <div className={`${className} flex flex-col items-start gap-1`}>
            <span className="w-[15%] h-1 bg-primary"></span>
            <h2 className="section-title">{title}</h2>
        </div>
    )
}