interface IPost extends Document {
    id: string,
    title: string,
    text: string,
    timestamps: Date
}

export default IPost;