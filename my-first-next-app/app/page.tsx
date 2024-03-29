'use client'
import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'
export default function Home() {
	const [socket, setSocket] = useState<any>(undefined)
	const [inbox, setInbox] = useState<any>(['hello g'])
	const [message, setMessage] = useState('')
	const [roomName, setRoomName] = useState('')

	const handleSendMessage = () => {
		socket.emit('message', message, roomName)
		console.log('message', message)
		console.log(inbox)
	}
	const handleJoinRoom = () => {
		socket.emit('joinRoom', roomName, (callBack: any) => {
			console.log(callBack)
		})
		console.log('roomName', roomName)
	}
	useEffect(() => {
		const socket = io('http://localhost:3001')

		socket.on('connect', () => {
			console.log(` You are connected to ${socket.id}`)
		})

		socket.on('message', (message) => {
			setInbox((inbox: any) => [...inbox, message])
		})

		setSocket(socket)
	}, [])
	return (
		<>
			<div className="flex flex-col gap-5 mt-20 px-10 lg:px-48">
				<div className="flex flex-col gap-2 border rounded-lg p-10">
					{inbox.map((message: string, index: number) => (
						<div key={index} className=" border rounded py-2 px-4">
							{message}
						</div>
					))}
				</div>
				<div className="flex gap-2 align-center justify-center">
					<input
						type="text"
						name="message"
						className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 "
						onChange={(e) => setMessage(e.target.value)}
					/>
					<button className="w-40" onClick={handleSendMessage}>
						Send Message
					</button>
				</div>
				<div className="flex gap-2 align-center justify-center">
					<input
						type="text"
						name="message"
						className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 "
						onChange={(e) => setRoomName(e.target.value)}
					/>
					<button className="w-40" onClick={handleJoinRoom}>
						Join Room
					</button>
				</div>
			</div>
		</>
	)
}
