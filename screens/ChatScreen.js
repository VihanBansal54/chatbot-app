import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import axios from 'axios';

const ChatScreen = () => {
    const [messages, setMessages] = useState([]);

    // Load initial message when chat opens
    useEffect(() => {
        setMessages([
            {
                _id: 1,
                text: 'Hello! I am your AI mentor. How can I help you today?',
                createdAt: new Date(),
                user: { _id: 2, name: 'Mentor Bot' }
            }
        ]);
    }, []);

    // Send a message to backend & receive response
    const handleSend = useCallback(async (newMessages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages));

        const userMessage = newMessages[0].text;

        try {
            const response = await axios.post('http://localhost:8080/api/chat', { text: userMessage });

            const botMessage = {
                _id: Math.random().toString(),
                text: response.data,
                createdAt: new Date(),
                user: { _id: 2, name: 'Mentor Bot' }
            };

            setMessages(previousMessages => GiftedChat.append(previousMessages, [botMessage]));
        } catch (error) {
            console.error('Error sending message:', error);
        }
    }, []);

    return (
        <View style={styles.container}>
            <GiftedChat
                messages={messages}
                onSend={newMessages => handleSend(newMessages)}
                user={{ _id: 1 }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
});

export default ChatScreen;
