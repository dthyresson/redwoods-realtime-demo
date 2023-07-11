import { useState } from 'react'

import { MetaTags } from '@redwoodjs/web'
import { useMutation, useSubscription } from '@redwoodjs/web'
const NEW_MESSAGE_SUBSCRIPTION = gql`
  subscription ListenForNewMessages($roomId: ID!) {
    newMessage(roomId: $roomId) {
      body
      from
    }
  }
`

const SEND_MESSAGE = gql`
  mutation SendMessage($roomId: ID!, $body: String!, $from: String!) {
    sendMessage(input: { roomId: $roomId, body: $body, from: $from }) {
      body
      from
    }
  }
`

function RenderNewMessage({ newMessage }) {
  return (
    <div className="bg-gray-50 p-2">
      {newMessage && (
        <div>
          <h5 className="font-medium">From: {newMessage.from}</h5>
          <h4 className="font-demibold">Message: {newMessage.body}</h4>
        </div>
      )}
    </div>
  )
}

const ListenForNewMessages = ({ roomId }) => {
  const { data, loading } = useSubscription(NEW_MESSAGE_SUBSCRIPTION, {
    variables: { roomId },
  })

  if (!loading) {
    return <div className="w-1/2 flex-initial">{RenderNewMessage(data)}</div>
  }

  return (
    <div className="w-1/2 flex-initial">
      Waiting for next message in Room {roomId} ...
    </div>
  )
}

const SendMessageForm = ({ roomId, body, from }) => {
  const [sendMessage] = useMutation(SEND_MESSAGE)

  const [roomInput, setRoom] = useState(roomId)
  const [bodyInput, setBody] = useState(body)
  const [fromInput, setFrom] = useState(from)

  return (
    <div className="border-1 w-1/2 flex-initial rounded-md border-gray-900 shadow-sm">
      <form>
        <div className="space-y-4">
          <h2 className="text-xl font-bold">Send a Message</h2>
          <div>
            To:{' '}
            <select
              name="roomId"
              defaultValue={roomId}
              onChange={(event) => setRoom(event.target.value)}
            >
              <option value="1" selected={roomId === '1'}>
                Room 1
              </option>
              <option value="2" selected={roomId === '2'}>
                Room 2
              </option>
              <option value="3" selected={roomId === '3'}>
                Room 3
              </option>
              <option value="4" selected={roomId === '4'}>
                Room 4
              </option>
              <option value="5" selected={roomId === '5'}>
                Room 5
              </option>
            </select>
          </div>
          <div>
            Message:{' '}
            <input
              type="text"
              name="body"
              defaultValue={bodyInput}
              onChange={(event) => setBody(event.target.value)}
            />
          </div>
          <div>
            From:{' '}
            <input
              type="text"
              name="from"
              defaultValue={fromInput}
              onChange={(event) => setFrom(event.target.value)}
            />
          </div>
          <div>
            <button
              className="rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={(e) => {
                e.preventDefault()

                sendMessage({
                  variables: {
                    roomId: roomInput,
                    body: bodyInput,
                    from: fromInput,
                  },
                })
              }}
            >
              Send Message
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

const RoomPage = ({ roomId = 1 }) => {
  return (
    <>
      <MetaTags title="Room" description="Room page" />
      <h1 className="mb-12 text-center text-2xl font-bold">
        Current Room {roomId}
      </h1>

      <div className="flex flex-row space-x-4">
        <ListenForNewMessages roomId={roomId} />
        <SendMessageForm roomId={roomId} body="Hello" from="Me" />
      </div>
    </>
  )
}

export default RoomPage
