const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
      minlength: 1,
    },
    blog: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog',
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

CommentSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

CommentSchema.virtual('snippet').get(function () {
  const content = this.content;
  let snippet = content.substring(0, 50);

  if (content[49] !== ' ' && content[50] !== ' ') {
    const nextSpaceIndex = content.indexOf(' ', 50);
    if (nextSpaceIndex !== -1) {
      snippet = content.substring(0, nextSpaceIndex);
    }
  }

  return snippet + '...';
});

CommentSchema.index({ blog: 1 });
CommentSchema.index({ user: 1 });

module.exports = mongoose.model('Comment', CommentSchema);
