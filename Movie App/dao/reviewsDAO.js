import { ObjectId } from 'mongodb'


let reviews

export default class ReviewsDAO{
    static async injectDB(conn) {
        if(reviews){
            return
        }
        try{
            reviews = await conn.db("reviews").collection("reviews")
        }catch(e){
            console.error(`Unable to establish connection handles in userDAO: ${e}`)

        }
    }

    static async addReview(movieId,user,review) {
        try{
          const reviewDoc = {
            movieId: movieId,
            user: user,
            review: review,
          }
          return await reviews.insertOne(reviewDoc)
        }catch(e){
            console.error(`Unable to post review: ${e}`)
            return { error: e }
        }
    }
    
     static async getReview(reviewId) {
        try{
          return await reviews.findOne({_id: new ObjectId(reviewId)})
        }catch(e){
            console.error(`Unable to get review: ${e}`)
            return { error: e }
        }
    }

     static async updateReview(reviewId,user,review) {
        try{
          const reviewDoc = await reviews.updateOne({
            _id: new ObjectId(reviewId)
        },{
            $set: {user: user, review: review}
          })
          return reviewDoc
        }catch(e){
            console.error(`Unable to update review: ${e}`)
            return { error: e.message }
        }
    }

     static async deleteReview(reviewId) {
        try{
          const deleteResponse = await reviews.deleteOne({
            _id: new ObjectId(reviewId),
          }) 
          return deleteResponse
        }catch(e){
            console.error(`Unable to post review: ${e}`)
            return { error:e }
        }
    }

     static async getReviewsByMovieId(movieId) {
        console.log("mov",movieId)
        try{
          const cursor = await reviews.find({movieId:parseInt(movieId)})
           return await cursor.toArray()
        }catch(e){
            console.error(`Unable to get review: ${e}`)
            return { error:e }
        }
    }

}
