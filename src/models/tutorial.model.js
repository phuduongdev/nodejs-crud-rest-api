module.exports = mongoose => {
    let tutorialSchema = mongoose.Schema(
        {
            title: String,
            description: String,
            published: Boolean
        },
        { timestamps: true }
    );

    // use this app with a front-end that needs id field instead of _id
    tutorialSchema.method('toJSON', function tutorialToJSON() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const Tutorial = mongoose.model('tutorial', tutorialSchema);
    return Tutorial;
};
