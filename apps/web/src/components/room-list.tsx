import { ArrowUpRightIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useRooms } from '@/http/use-rooms'
import { dayjs } from '@/lib/dayjs'
import { Badge } from './ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card'

export function RoomList() {
  const { data, isLoading } = useRooms()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent rooms</CardTitle>
        <CardDescription>Quick access to newly created rooms</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {isLoading && (
          <p className="text-center text-muted-foreground text-sm">
            Loading rooms...
          </p>
        )}

        {data?.map((room) => {
          return (
            <Link
              to={`/room/${room.id}`}
              key={room.id}
              className="flex items-center justify-between p-3 rounded-lg border hover:bg-accent/50 transition-colors"
            >
              <div className="flex-1 flex flex-col gap-2">
                <h3 className="font-medium">{room.name}</h3>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs">
                    {dayjs(room.createdAt).fromNow()}
                  </Badge>

                  <Badge variant="secondary" className="text-xs">
                    {room.questionsCount} question(s)
                  </Badge>
                </div>
              </div>

              <span className="flex items-center gap-2 text-sm">
                Join
                <ArrowUpRightIcon className="size-3" />
              </span>
            </Link>
          )
        })}
      </CardContent>
    </Card>
  )
}
