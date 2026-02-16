import ReviewsDAO from "../dao/reviewsDAO.js"

export default class ReviewsController {
    static async apiPostReview(req, res, next){
        try {
            const movieId = parseInt(req.body.movieId)
            const review = req.body.review
            const user = req.body.user
            
            const reviewResponse = await ReviewsDAO.addReview(
                movieId,
                user,
                review
            )
            res.json({
                status : 'Success'
            })
    }catch (e){
        res.status(500).json({error: 'e.message'})
    }
    }

    static async apiGetReview(req, res, next){
        try {
            let id = req.params.id || {}
            let review = await ReviewsDAO.getReview(id)
            if(!review){
                res.status(404).json({ error: "Not found" })
                return
            }
            res.json(review)
    }catch (e){
        console.log(`api, ${e}`)
        res.status(500).json({ error: e })
    }
    }

    static async apiUpdateReview(req, res, next){
        try {
            const reviewId = req.params.id
            const review = req.body.review
            const user = req.body.user
            
            const reviewResponse = await ReviewsDAO.updateReview(
                reviewId,
                user,
                review
            )
            var {error} = reviewResponse
            if(error){
                res.status(400).json({error})
            }

            if(reviewResponse.modifiedCount === 0){
                throw new Error(
                    "unable to update review" ,
                )
            }
            
            res.json({ status: "success"})
    }catch (e){
        res.status(500).json({error: 'e.message'})
    }
    }

    static async apiDeleteReview(req, res, next){
        try {
            const reviewId = req.params.id
            const reviewResponse = await ReviewsDAO.deleteReview(
                reviewId
            )
             if (reviewResponse.deletedCount !== 1) {
             return res.status(404).json({ error: 'No review found to delete' })
             }
            res.json({
                status : 'Success',
                deletedCount: reviewResponse.deletedCount
            })
    }catch (e){
        console.error(`apiDeleteReview error: ${e}`)
        res.status(500).json({error: 'e.message'})
    }
    }
   
    static async apiGetReviewsByMovie(req, res, next) {
  try {
    const movieId = req.params.id;
    const reviews = await ReviewsDAO.getReviewsByMovieId(movieId);
    
    if (!reviews || reviews.length === 0) {
      return res.status(404).json({ reviews: [] });
    }
    
    res.json(reviews);
  } catch (e) {
    console.error(`api, getReviewsByMovie error: ${e}`);
    res.status(500).json({ error: e.message });
  }
}


}
