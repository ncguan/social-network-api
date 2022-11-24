const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

module.exports = {
    getAllThoughts(req, res) {
        Thought.find()
            .then((thoughts) => res.json(thoughts))
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            })
    },

    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with that ID' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },

    createThought(req, res) {
        Thought.create(req.body)
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought created' })
                    : User.findOneAndUpdate(
                        { _id: req.body.userId },
                        { $addToSet: { thoughts: thought._id } },
                        { new: true }
                    )
            )
            .then((thoughtData) => res.json(thoughtData))
            .catch((err) => res.status(500).json(err))
    },

    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: { thoughtText: req.body.thoughtText } },
            { new: true }
        )
            .then((thoughtData) => res.json(thoughtData))
            .catch((err) => res.status(500).json(err));
    },

    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with that ID' })
                    : User.findOneAndUpdate(
                        { thoughts: req.params.thoughtId },
                        { $pull: { thoughts: req.params.thoughtId } },
                        { new: true }
                    )
            )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'Thought deleted, but no user found' })
                    : res.json({ message: 'Thought deleted' })
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            })
    },

    addReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { new: true }
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with that ID' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err))
    }
}