import { useGetLogsQuery } from "../../store/queries/logsApi";

export default function LogsFeed () {
    const {data: logs, isLoading} = useGetLogsQuery()
    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-us', {
            month:'short',
            day:'numeric',
            hour:'numeric',
            minute:'2-digit'
        })
    }
    if (!isLoading){
        return  (
        <div>
            {logs.map(log => {
                return(
                    <div className="border rounded grid grid-cols-4 mb-3 shadow-xl p-1 log" key={log.id}>
                        <div className="col-span-3 text-sm">{log.note}</div>
                        <div className="col-span-1 text-sm">{formatDate(log.created_on)}</div>
                    </div>
                )
            }).reverse()
            }
        </div>
    )
    }

}
