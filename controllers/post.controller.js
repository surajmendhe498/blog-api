const Post= require('../models/post.model');
const User= require('../models/user.model')

const addPost= async(req, res)=>{
    try {
        const {title, content, userId}= req.body;

        const user= await User.findById(userId);
        if(!user){
            return res.status(404).json({message: 'User not found'});
        }

        const post= new Post({
            title,
            content,
            user: userId
        });

        await post.save();
        res.status(201).json({message: 'Post added successfully', data:post})
        
    } catch (error) {
        return res.status(500).json({message: 'Internal server error'});
    }
};

const getPosts= async(req, res)=>{
    try {
        const userId= req.params.userId;
        const posts= await Post.find({user: userId}).populate('user', 'name email');

        if (posts.length === 0) {
            return res.status(404).json({ message: 'No posts found for this user' });
        }
        
        res.status(200).json({message: 'Post fetched successfully', data:posts});
        
    } catch (error) {
        return res.status(500).json({message: 'Internal server error'});
    }
}

const deletePost= async(req, res)=>{
    try {
        const {postId}= req.params;
        const {userId}= req.body;

        const post= await Post.findById(postId);
        if(!post){
            return res.status(404).json({message: 'Post not found'});
        };

        if(post.user != userId){
            return res.status(403).json({message: 'You are not authorized to delete this post'});
        }

        const deletePost= await Post.findByIdAndDelete(postId);
        if(!deletePost){
            return res.status(404).json({message: 'Post not found'});
        }

        res.status(200).json({message: 'Post deleted successfully'});
        
    } catch (error) {
        return res.status(500).json({message: 'Internal server error'});
    }
} 

module.exports= {addPost, getPosts, deletePost};