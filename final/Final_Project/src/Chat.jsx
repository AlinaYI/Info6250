import React, { useReducer, useEffect, useState } from 'react';
import { fetchMessages, fetchAddMessage, fetchUsers } from './services';
import reducer, { initialState } from './reducer'; 
import './Chat.css';

function Chat({ username,render, updateUsers, updateMessages }) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [messages,setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    const handleSendMessage = (e) => {
        e.preventDefault();
        fetchAddMessage(username, newMessage)
        .then(() => {
            setNewMessage('');
        })
        .catch(error => {
            console.error('Error sending message:', error);
        });
    };

    // Chat.jsx
    useEffect(() => {
        fetchMessages()
        .then(data => {
            if (data.error) {
            // 处理错误情况
            console.error(data.error);
            } else {
            setMessages(data.messagesList || []);
            }
        })
        .catch(error => {
            console.error('Error fetching messages:', error);
        });
    }, []);
  

    return (
        <div className="chat-container">
            <h2>Chat with Friends</h2>
            <p>Connect and share with your friends about your latest gaming adventures!</p>
            {state.error && <div className="error">{state.error}</div>}
            <div className="users-list">
                <h3>All Users:</h3>
                <ul>
                    {state.users.map(user => (
                        <li key={user.username}>
                            <div className={`user ${user.online ? "active" : ""}`}>
                                <span>{user.username.charAt(0)}</span>
                                <p>{user.username}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="messages">
                <ol>
                    {messages.map(message => (
                        <li key={message.id} className="message">
                                <span>{message.username.charAt(0)}</span>
                                <div>
                                    <p>{message.username}</p>
                                    <p>{message.message}</p>
                                </div>
                        </li>
                    ))}
                </ol>
            </div>
            <form onSubmit={handleSendMessage}>
                <input
                type="text"
                value={newMessage}
                onChange={e => setNewMessage(e.target.value)}
                placeholder="Type a message"
                />
                <button type="submit">Send</button>
            </form>

        </div>
    );
}

export default Chat;
