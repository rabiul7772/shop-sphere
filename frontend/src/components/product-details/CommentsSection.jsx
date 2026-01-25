import { MessageSquare, Send } from 'lucide-react';
import { useState } from 'react';

const CommentsSection = ({ comments, onAddComment }) => {
  const [newComment, setNewComment] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (!newComment.trim()) return;
    onAddComment(newComment);
    setNewComment('');
  };

  return (
    <div className="card bg-base-100 shadow-xl border border-base-200">
      <div className="card-body p-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <MessageSquare className="size-5 text-primary" />
          <h3 className="font-bold text-lg">Comments</h3>
          <div className="badge badge-neutral badge-sm">{comments.length}</div>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="mb-8">
          <div className="join w-full">
            <input
              type="text"
              placeholder="Add a comment..."
              className="input input-bordered join-item w-full bg-base-200 focus:bg-base-100 transition-colors"
              value={newComment}
              onChange={e => setNewComment(e.target.value)}
            />
            <button
              type="submit"
              className="btn btn-neutral join-item hover:bg-neutral-focus"
            >
              <Send className="size-4" />
            </button>
          </div>
        </form>

        {/* Comments List */}
        <div className="space-y-6">
          {comments.map((comment, index) => (
            <div
              key={index}
              className="flex gap-4 group animate-in fade-in slide-in-from-bottom-4 duration-500"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="avatar">
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">
                  {/* Fallback to first letter if no image */}
                  {comment.userImage ? (
                    <img src={comment.userImage} alt={comment.userName} />
                  ) : (
                    <span>{comment.userName.charAt(0)}</span>
                  )}
                </div>
              </div>

              <div className="flex-1">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="font-bold text-sm">{comment.userName}</span>
                  <span className="text-xs text-base-content/50">
                    {comment.date}
                  </span>
                </div>
                <div className="bg-base-200/50 p-3 rounded-2xl rounded-tl-none text-sm text-base-content/90 inline-block max-w-[90%] md:max-w-[80%]">
                  {comment.text}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommentsSection;
