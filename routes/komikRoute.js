import { Router } from 'express'
import komikListModel from "../models/komikListModel.js"
import komikDetailsModel from "../models/komikDetailsModel.js";
import makePipelineKomikList from '../utils/pipelineKomikList.js';

const route = Router()

route.get('/', (req, res) => {
    res.send('https://github.com/RizkyFauziIlmi')
})

route.get('/komik-list', async (req, res) => {
    try {
        let komik

        const pipeline = makePipelineKomikList(req, res)

        // Jalankan pipeline dan simpan hasilnya ke dalam variabel komik
        if (pipeline.length) {
            komik = await komikListModel.aggregate(pipeline);
        } else {
            komik = await komikListModel.find({});
        }

        // Kirim hasilnya ke client
        res.status(200).json(komik);
    } catch (error) {
        res.status(500).send(error);
    }
});

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