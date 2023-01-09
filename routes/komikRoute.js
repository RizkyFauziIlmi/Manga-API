import { Router } from 'express'
import komikListModel from "../models/komikListModel.js"
import komikDetailsModel from "../models/komikDetailsModel.js";
import makePipelineKomikList from '../utils/pipelineKomikList.js';
import path from 'path'
import makePipelineKomikDetail from '../utils/pipelineKomikDetail.js';

const route = Router()

route.get('/komik-list', async (req, res) => {
    try {
        let komikList

        const pipeline = makePipelineKomikList(req, res)

        // Jalankan pipeline dan simpan hasilnya ke dalam variabel komik
        if (pipeline.length !== 0) {
            komikList = await komikListModel.aggregate(pipeline);
        } else {
            komikList = await komikListModel.find({});
        }

        // Kirim hasilnya ke client
        res.status(200).json(komikList);
    } catch (error) {
        res.status(500).send(error);
    }
});

route.get('/komik-detail/:endpoint?', async (req, res) => {
    const { endpoint } = req.params
    let komikDetail

    const pipeline = makePipelineKomikDetail(req, res)

    try {
        if (endpoint) {
            if (pipeline.length !== 0) {
                res.status(400).send('400 BAD REQUEST: cannot use query if passed endpoint')
            } else {
                komikDetail = await komikDetailsModel.find({ endpoint: { $eq: endpoint } })
            }
        } else {
            komikDetail = await komikDetailsModel.aggregate(pipeline)
        }

        res.status(200).json(komikDetail)
    } catch (error) {
        res.status(500).send(error)
    }
})

route.get('*', (req, res) => {
    res.send({
        documentation: 'https://github.com/RizkyFauziIlmi/komikindo-api',
        endpoint: {
            getAllKomikList: "/komik-list",
            getKomikDetail: "/komik-detail/:endpoint?"
        }
    })
})

export default route