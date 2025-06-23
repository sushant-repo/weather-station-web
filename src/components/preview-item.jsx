export default function PreviewItem({title, value}){
    return (
        <div className="flex flex-col text-sm">
            <p className="font-bold text-green-900 tracking-wide">{title}</p>
            <p>{value}</p>
        </div>
    )
}