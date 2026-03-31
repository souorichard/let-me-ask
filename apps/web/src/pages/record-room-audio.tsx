import { Play, StopCircle } from 'lucide-react'
import { useRef, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { env } from '@/env'

type RecordRoomAudioProps = {
  roomId: string
}

const isRecordingSupported =
  !!navigator.mediaDevices &&
  typeof navigator.mediaDevices.getUserMedia === 'function' &&
  typeof window.MediaRecorder === 'function'

export function RecordRoomAudio() {
  const params = useParams<RecordRoomAudioProps>()

  const [isRecording, setIsRecording] = useState(false)

  const recorder = useRef<MediaRecorder | null>(null)
  const intervalRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  if (!params.roomId) {
    return <Navigate replace to="/" />
  }

  function stopRecording() {
    setIsRecording(false)

    if (recorder.current && recorder.current.state !== 'inactive') {
      recorder.current.stop()
    }

    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
  }

  async function uploadAudio(audio: Blob) {
    const formData = new FormData()

    formData.append('file', audio, 'record.webm')

    const response = await fetch(
      `${env.VITE_API_URL}/rooms/${params.roomId}/audio`,
      {
        method: 'POST',
        body: formData,
      },
    )

    const result = await response.json()

    console.log(result)
  }

  function createRecorder(audio: MediaStream) {
    recorder.current = new MediaRecorder(audio, {
      mimeType: 'audio/webm',
      audioBitsPerSecond: 64_000,
    })

    recorder.current.ondataavailable = (event) => {
      if (event.data.size > 0) {
        uploadAudio(event.data)
      }
    }

    recorder.current.onstart = () => {
      console.log('Recording started.')
    }

    recorder.current.onstop = () => {
      console.log('Recording stopped.')
    }

    recorder.current.start()
  }

  async function startRecording() {
    if (!isRecordingSupported) {
      toast.error('Audio recording is not supported in this browser.')
      return
    }

    setIsRecording(true)

    const audio = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        sampleRate: 44_100,
      },
    })

    createRecorder(audio)

    intervalRef.current = setTimeout(() => {
      recorder.current?.stop()

      createRecorder(audio)
    }, 5000)
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-3">
      {isRecording ? (
        <Button variant="destructive" onClick={stopRecording}>
          <StopCircle className="size-4" />
          Stop recording
        </Button>
      ) : (
        <Button onClick={startRecording}>
          <Play className="size-4" />
          Record audio
        </Button>
      )}
    </div>
  )
}
