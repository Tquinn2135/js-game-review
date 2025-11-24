const { response } = require('express')

const router = require('express').Router()
const games = require('../../../data/games.json')

router.get('/', (_,response)=> {
    const summaries = games.map(game => {
        const { id, title, image, rating } = game
        return { id, title, image, rating }
    })

    response.send(summaries)
})

router.get('/game/:id', (req,res) => {
    const {id} =req.params
    const found = games.find(game => game.id.toString() === id)
    if(found) return res.send(found)

    res.status(400).send({ error: `couldnt find game ${games}`})
    //res.send(games[id - 1])
})

router.post('/game/add', (req, res) => {
    const id = games.length + 1
    const game = req.body
    const newGame = { id, ...game }
    games.push(newGame)
    res.send(newGame)
})

module.exports = router