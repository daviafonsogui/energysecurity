
const auth = (req, res, next) => {
    console.log('Time: ', Date.now())

    console.log(req.body)
    //
    next()
}


export default auth