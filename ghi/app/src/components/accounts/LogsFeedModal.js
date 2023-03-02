import { useGetLogsQuery } from "../../store/queries/logsApi";

export default function LogsFeed () {
    const {data: logs, isLoading} = useGetLogsQuery()
    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-us', {
            year:'numeric',
            month:'numeric',
            day:'numeric',
            hour:'numeric',
            minute:'2-digit'
        })
    }

    console.log(logs)
    if (!isLoading){
        return  (
        <div>
            {logs.map(log => {
                return(
                    <div className="border rounded grid grid-cols-4 p-1 m-2" key={log.id}>
                        <div className="col-span-3">{log.note}</div>
                        <div className="col-span-1">{formatDate(log.created_on)}</div>
                    </div>
                )
            }).reverse()
            }
        </div>
    )
    }

}
