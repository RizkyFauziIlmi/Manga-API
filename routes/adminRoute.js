import { Router } from 'express'
import komikChaptersModel from '../models/komikChaptersModel.js'
import komikDetailsModel from '../models/komikDetailsModel.js'
import komikListModel from '../models/komikListModel.js'

const route = Router()

route.get('/', (req, res) => {
    res.status(200).send("admin route")
})

route.delete('/delete/:endpoint', async (req, res) => {
    const { endpoint } = req.params

    try {
        const deleteKomikList = await komikListModel.findOneAndDelete({ endpoint: endpoint })
        const deletekomikDetail = await komikDetailsModel.findOneAndDelete({ endpoint: endpoint })
        const deleteKomikChapter = await komikChaptersModel.deleteMany({ endpoint: { $regex: `.*${endpoint}.*` } })

        if (!deleteKomikList && !deletekomikDetail && !deleteKomikChapter) {
            return res.status(404).send("Komik with the given endpoint was not found.")
        }

        res.status(200).send({
            message: {
                komikList: deleteKomikList,
                komikDetail: deletekomikDetail,
                komikChapter: deleteKomikChapter.deletedCount
            }
        })
    } catch (error) {
        res.status(500).send(error);
    }
})

export default route