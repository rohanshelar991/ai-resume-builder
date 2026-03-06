import React, { useState } from "react";
import { MessageCircle, Send, User, X } from "lucide-react";

const ResumeComments = () => {
  const [comments, setComments] = useState([
    {
      id: 1,
      author: "Sarah Johnson",
      avatar: "SJ",
      content: "Great work on this resume! The experience section is very detailed.",
      timestamp: "2 hours ago",
      replies: [
        {
          id: 101,
          author: "Alex Johnson",
          avatar: "AJ",
          content: "Thanks Sarah! I appreciate the feedback.",
          timestamp: "1 hour ago"
        }
      ]
    },
    {
      id: 2,
      author: "Michael Chen",
      avatar: "MC",
      content: "Consider adding more quantifiable achievements in your work experience.",
      timestamp: "1 day ago",
      replies: []
    }
  ]);
  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyContent, setReplyContent] = useState("");

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment = {
        id: Date.now(),
        author: "You",
        avatar: "Y",
        content: newComment,
        timestamp: "Just now",
        replies: []
      };
      setComments([comment, ...comments]);
      setNewComment("");
    }
  };

  const handleAddReply = (commentId) => {
    if (replyContent.trim()) {
      const reply = {
        id: Date.now(),
        author: "You",
        avatar: "Y",
        content: replyContent,
        timestamp: "Just now"
      };
      
      setComments(comments.map(comment => {
        if (comment.id === commentId) {
          return {
            ...comment,
            replies: [...comment.replies, reply]
          };
        }
        return comment;
      }));
      
      setReplyContent("");
      setReplyingTo(null);
    }
  };

  return (
    <div className="bg-background/50 glassmorphism rounded-xl p-6">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <MessageCircle size={20} />
        Comments ({comments.length})
      </h2>
      
      {/* Add new comment */}
      <div className="mb-6">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          className="w-full form-input h-24 resize-none mb-2"
        />
        <div className="flex justify-end">
          <button
            onClick={handleAddComment}
            disabled={!newComment.trim()}
            className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            <Send size={16} />
            Post Comment
          </button>
        </div>
      </div>
      
      {/* Comments list */}
      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="border-b border-border/50 pb-6 last:border-0 last:pb-0">
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold flex-shrink-0">
                {comment.avatar}
              </div>
              <div className="flex-grow">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold">{comment.author}</h3>
                    <p className="text-xs text-muted-foreground">{comment.timestamp}</p>
                  </div>
                </div>
                <p className="mt-2 text-muted-foreground">{comment.content}</p>
                
                {/* Replies */}
                {comment.replies.length > 0 && (
                  <div className="mt-4 space-y-4 ml-2 pl-4 border-l-2 border-border/30">
                    {comment.replies.map((reply) => (
                      <div key={reply.id} className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-teal-600 flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
                          {reply.avatar}
                        </div>
                        <div className="flex-grow">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-bold text-sm">{reply.author}</h4>
                              <p className="text-xs text-muted-foreground">{reply.timestamp}</p>
                            </div>
                          </div>
                          <p className="mt-1 text-muted-foreground text-sm">{reply.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                
                {/* Reply form */}
                {replyingTo === comment.id ? (
                  <div className="mt-4 flex gap-2">
                    <input
                      type="text"
                      value={replyContent}
                      onChange={(e) => setReplyContent(e.target.value)}
                      placeholder="Write a reply..."
                      className="flex-grow form-input text-sm"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          handleAddReply(comment.id);
                        }
                      }}
                    />
                    <button
                      onClick={() => handleAddReply(comment.id)}
                      disabled={!replyContent.trim()}
                      className="flex items-center gap-1 bg-secondary text-secondary-foreground px-3 py-2 rounded-lg hover:bg-secondary/80 transition-colors disabled:opacity-50 text-sm"
                    >
                      <Send size={14} />
                    </button>
                    <button
                      onClick={() => setReplyingTo(null)}
                      className="flex items-center gap-1 bg-muted text-muted-foreground px-3 py-2 rounded-lg hover:bg-muted/80 transition-colors text-sm"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setReplyingTo(comment.id)}
                    className="mt-3 text-sm text-primary hover:underline"
                  >
                    Reply
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResumeComments;