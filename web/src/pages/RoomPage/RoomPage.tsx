import { useState } from 'react'

import { Link, routes } from '@redwoodjs/router'
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
    newMessage && (
      <div>
        <h4>New Message: {newMessage.body}</h4>
        <h5>From: {newMessage.from}</h5>
      </div>
    )
  )
}

const ListenForNewMessages = ({ roomId }) => {
  const { data, loading } = useSubscription(NEW_MESSAGE_SUBSCRIPTION, {
    variables: { roomId },
  })
  return <h4>New Message: {!loading && RenderNewMessage(data)}</h4>
}

const SendMessageForm = ({ roomId, body, from }) => {
  const [sendMessage] = useMutation(SEND_MESSAGE)

  const [roomInput, setRoom] = useState(roomId)
  const [bodyInput, setBody] = useState(body)
  const [fromInput, setFrom] = useState(from)

  return (
    <form>
      <select
        name="roomId"
        defaultValue={roomId}
        onChange={(event) => setRoom(event.target.value)}
      >
        <option value="1">Room 1</option>
        <option value="2">Room 2</option>
        <option value="3">Room 3</option>
        <option value="4">Room 4</option>
        <option value="5">Room 5</option>
      </select>
      <input
        type="text"
        name="body"
        defaultValue={bodyInput}
        onChange={(event) => setBody(event.target.value)}
      />
      <input
        type="text"
        name="from"
        defaultValue={fromInput}
        onChange={(event) => setFrom(event.target.value)}
      />
      <button
        onClick={(e) => {
          e.preventDefault()

          sendMessage({
            variables: { roomId: roomInput, body: bodyInput, from: fromInput },
          })
        }}
      >
        Send Message
      </button>
    </form>
  )
}

const RoomPage = ({ roomId = 1 }) => {
  return (
    <>
      <MetaTags title="Room" description="Room page" />
      <h1>Room {roomId}</h1>
      <SendMessageForm roomId={roomId} body="Hello" from="Me" />
      <ListenForNewMessages roomId={roomId} />
      <p>
        My default route is named <code>room</code>, link to me with `
        <Link to={routes.room({ roomId: 1 })}>Room</Link>`
      </p>
    </>
  )
}

export default RoomPage
