export default function getRating(firstRating: number, secondRating: number, firstPlayerWins: boolean){
    //Elo Algorithm base values
    const kFactor = 32; 
    const scaleFactor = 400;
    const exponentBase = 10;

    var firstRatingChange: number;
    var secondRatingChange: number;

    //Refer to wikipedia Chess Elo Algorithm
    var expectedOutcome = (1/(1 + Math.pow(exponentBase, (secondRating-firstRating)/scaleFactor)))
        if (firstPlayerWins) {
            firstRatingChange = Math.round(kFactor*(1-expectedOutcome))
            secondRatingChange = Math.round(kFactor*(expectedOutcome-1))
        } else {
            firstRatingChange = Math.round(kFactor*(expectedOutcome-1))
            secondRatingChange = Math.round(kFactor*(1-expectedOutcome))
        }
    let firstNewRating = firstRating + firstRatingChange
    let secondNewRating = secondRating + secondRatingChange
    return ({firstNewRating, secondNewRating})
}