import { useState } from 'react';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useDroppable } from '@dnd-kit/core';
import { Send, MessageSquare } from 'lucide-react';
import TaskCard from './TaskCard';
import { useTheme } from '../context/ThemeContext';

const TaskColumn = ({ id, title, tasks, onEditTask }) => {
    const { isDarkMode } = useTheme();
    const { setNodeRef } = useDroppable({
        id: id,
        data: { type: 'Column', id }
    });

    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);

    const handleAddComment = async (e) => {
        e.preventDefault();
        if (!comment.trim()) return;

        const newComment = {
            id: Date.now(),
            text: comment,
            author: 'HR Manager',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setComments([...comments, newComment]);
        setComment('');

        // Send email notification
        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
            const response = await fetch(`${apiUrl}/api/notifications/send`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    type: 'comment',
                    message: `New comment from HR Manager in ${title} column: "${comment}"`,
                    recipientEmail: 'user@example.com', // Demo recipient
                    subject: `New Comment in ${title}`
                }),
            });

            if (!response.ok) {
                console.error('Failed to send email notification');
            } else {
                console.log('Email notification sent successfully');
            }
        } catch (error) {
            console.error('Error sending email notification:', error);
        }
    };

    return (
        <div style={{
            flex: 1,
            minWidth: '320px',
            backgroundColor: isDarkMode ? '#262626' : '#F3F4F6',
            borderRadius: '16px',
            padding: '1rem',
            display: 'flex',
            flexDirection: 'column',
            border: isDarkMode ? '1px solid #404040' : '1px solid #E5E7EB',
            transition: 'all 0.3s ease',
            maxHeight: 'calc(100vh - 200px)'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', padding: '0 0.5rem' }}>
                <h3 style={{ fontWeight: 'bold', color: isDarkMode ? '#F5F5F5' : '#171717' }}>{title}</h3>
                <span style={{
                    backgroundColor: isDarkMode ? '#404040' : '#E5E7EB',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '999px',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    color: isDarkMode ? '#F5F5F5' : '#374151'
                }}>
                    {tasks.length}
                </span>
            </div>

            <div ref={setNodeRef} style={{
                flex: 1,
                minHeight: '100px',
                overflowY: 'auto',
                paddingRight: '0.5rem',
                marginBottom: '1rem'
            }}>
                <SortableContext items={tasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
                    {tasks.map(task => (
                        <TaskCard key={task.id} task={task} onEdit={onEditTask} />
                    ))}
                </SortableContext>
            </div>

            {/* Comment Section */}
            <div style={{
                borderTop: isDarkMode ? '1px solid #404040' : '1px solid #E5E7EB',
                paddingTop: '1rem',
                marginTop: 'auto'
            }}>
                {comments.length > 0 && (
                    <div style={{
                        marginBottom: '1rem',
                        maxHeight: '100px',
                        overflowY: 'auto',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.5rem'
                    }}>
                        {comments.map(c => (
                            <div key={c.id} style={{
                                fontSize: '0.8rem',
                                backgroundColor: isDarkMode ? '#171717' : 'white',
                                padding: '0.5rem',
                                borderRadius: '8px',
                                border: isDarkMode ? '1px solid #404040' : '1px solid #E5E5E5'
                            }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                                    <span style={{ fontWeight: 600, color: isDarkMode ? '#9ca3af' : '#4b5563' }}>{c.author}</span>
                                    <span style={{ fontSize: '0.7rem', color: '#9ca3af' }}>{c.timestamp}</span>
                                </div>
                                <p style={{ color: isDarkMode ? '#F5F5F5' : '#171717', margin: 0 }}>{c.text}</p>
                            </div>
                        ))}
                    </div>
                )}

                <form onSubmit={handleAddComment} style={{ display: 'flex', gap: '0.5rem' }}>
                    <input
                        type="text"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Add HR comment..."
                        style={{
                            flex: 1,
                            padding: '0.5rem 0.75rem',
                            borderRadius: '8px',
                            border: isDarkMode ? '1px solid #404040' : '1px solid #E5E5E5',
                            backgroundColor: isDarkMode ? '#171717' : 'white',
                            color: isDarkMode ? '#F5F5F5' : '#171717',
                            fontSize: '0.875rem',
                            outline: 'none'
                        }}
                    />
                    <button
                        type="submit"
                        style={{
                            padding: '0.5rem',
                            borderRadius: '8px',
                            backgroundColor: isDarkMode ? '#6366f1' : '#171717',
                            color: 'white',
                            border: 'none',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <Send size={16} />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default TaskColumn;
