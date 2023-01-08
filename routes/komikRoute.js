import { Router } from 'express'
import komikListModel from "../models/komikListModel.js"
import komikDetailsModel from "../models/komikDetailsModel.js";

const route = Router()

route.get('/', (req, res) => {
    res.send('https://github.com/RizkyFauziIlmi')
})

route.get('/all', async (req, res) => {

    try {
        if (req.query.limit) {
            const komik = await komikListModel.find({}).limit(req.query.limit)
            res.status(200).json(komik)
        } else {
            const komik = await komikListModel.find({})
            res.status(200).json(komik)
        }
    } catch (error) {
        res.status(500).send(error)
    }
})

route.get('/top-komik', async (req, res) => {

    try {
        if (req.query.limit) {
            const topKomik = await komikListModel.find({
                _id: {
                    $nin: ['63bb018d7f798af53669487d', '63bb23cded68117e55b6f367']
                }
            }).sort({ score: -1 }).limit(req.query.limit)
            res.status(200).json(topKomik)
        } else {
            const topKomik = await komikListModel.find({
                _id: {
                    $nin: ['63bb018d7f798af53669487d', '63bb23cded68117e55b6f367']
                }
            }).sort({ score: -1 })
            res.status(200).json(topKomik)
        }
    } catch (error) {
        res.status(500).send(error)
    }
})

route.get('/manga', async (req, res) => {
    try {
        if (req.query.limit) {
            const manga = await komikListModel.find({ type: { $eq: "Manga" } }).limit(req.query.limit)
            res.status(200).json(manga)
        } else {
            const manga = await komikListModel.find({ type: { $eq: "Manga" } })
            res.status(200).json(manga)
        }
    } catch (error) {
        res.status(500).send(error)
    }
})

route.get('/manhwa', async (req, res) => {
    try {
        if (req.query.limit) {
            const manhwa = await komikListModel.find({ type: { $eq: "Manhwa" } }).limit(req.query.limit)
            res.status(200).json(manhwa)
        } else {
            const manhwa = await komikListModel.find({ type: { $eq: "Manhwa" } })
            res.status(200).json(manhwa)
        }
    } catch (error) {
        res.status(500).send(error)
    }
})

route.get('/manhua', async (req, res) => {
    try {
        if (req.query.limit) {
            const manhua = await komikListModel.find({ type: { $eq: "Manhua" } }).limit(req.query.limit)
            res.status(200).json(manhua)
        } else {
            const manhua = await komikListModel.find({ type: { $eq: "Manhua" } })
            res.status(200).json(manhua)
        }
    } catch (error) {
        res.status(500).send(error)
    }
})

route.get('/search', async (req, res) => {
    try {
        if (req.query.q) {
            const searchedKomik = await komikListModel.find({ title: { $regex: new RegExp(req.query.q, 'i') } }).sort({ score: -1 })
            res.status(200).json(searchedKomik)
        } else {
            res.status(400).send('Please set query')
        }
    } catch (error) {
        res.status(500).send(error)
    }
})

route.get('/komik-detail/:endpoint', async (req, res) => {
    const { endpoint } = req.params

    try {
        if (endpoint) {
            const komikDetails = await komikDetailsModel.find({ endpoint: { $eq: endpoint } })
            res.status(200).json(komikDetails)
        } else {
            res.status(400).send('400 BAD REQUEST: endpoint is required')
        }
    } catch (error) {
        res.status(500).send(error)
    }
})

route.get('*', (req, res) => {
    res.send('wrong url!')
})

export default route