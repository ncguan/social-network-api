const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

const thoughtSchema = new Schema(
  {
    toughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: formatTimestamp
    },
    username: {
      type: String,
      required: true
    },
    reactions: [reactionSchema]
  },
  {
    toJSON: {
      virtuals: true
    },
    id: false
  }
);

function formatTimestamp(date){
  return date.toString();
}

thoughtSchema.virtual('reactionCount').get(function (){
  return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;