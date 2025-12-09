
const auth = (req, res, next) => {
    console.log('Time: ', Date.now())

    console.log(req)
    //
    next()
}


export default auth